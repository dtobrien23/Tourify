import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import attractions from '../static/attractions.json';
import { libraries, mapOptions } from '../static/mapConfig.js';
import { Flex, Divider, Drawer } from '@chakra-ui/react';
import '../App.css';
import LocationButton from './LocationButton';
import SliderBar from './SliderBar';
import LocationInput from './LocationInput';
import MarkerDrawer from './MarkerDrawer';

export default function Map() {
  //receiving filtered attractions from slider
  //pass setSliderList method into slider to receive sliders filtered
  //attractions list, update sliderList state with that list we receive
  const [sliderList, setSliderList] = useState(attractions);

  //marker click state
  const [markerState, setMarkerState] = useState(false);

  const handleMarkerClick = () => {
    // if (markerState) {
    //   setMarkerState(false);
    // } else setMarkerState(true);
    setMarkerState(true);
  };

  const handleClose = () =>{
    setMarkerState(false);
  }

  //console.log(sliderList, 'this came from the slider component to the map!!!!')
  const [map, setMap] = useState(null);

  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const currentLocationInputRef = useRef(null);

  const google = window.google;
  const mapCenter = { lat: 40.755091, lng: -73.978285 };
  const mapZoom = 13;
  let currentLocation;

  const attractionTypes = [
    { label: 'All', value: 'all' },
    { label: 'Landmarks', value: 'landmark' },
    { label: 'Museums', value: 'museum' },
    { label: 'Parks', value: 'park' },
    { label: 'Theatres', value: 'theater' },
    { label: 'Neighborhoods', value: 'neighborhood' },
    { label: 'Dining', value: 'dining' },
    { label: 'Galleries', value: 'gallery' },
    { label: 'Libraries', value: 'library' },
    { label: 'Historic Sites', value: 'historic_site' },
    { label: 'Observatories', value: 'observatory' },
  ];

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert('Sorry, Geolocation is not supported by this browser.');
    }
  };

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
          alert(
            'Enable location permissions for this website in your browser settings.'
          );
        }
      });
    } else {
      alert(
        'Unable to access your location. You can continue by submitting location manually.'
      );
    }
  };

  const showPosition = position => {
    const latlng = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    const geocoder = new google.maps.Geocoder();
    // const infowindow = new google.maps.InfoWindow();

    geocoder
      .geocode({ location: latlng })
      .then(response => {
        if (response.results[0]) {
          currentLocation = response.results[0].formatted_address;
          console.log(latlng);
          map.setCenter(latlng);
          map.setZoom(15);

          if (currentLocationInputRef.current) {
            currentLocationInputRef.current.value = currentLocation;
          }

          // eslint-disable-next-line
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: '/images/you-are-here.png',
          });

          // infowindow.setContent('You are here!');
          // infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      })
      .catch(e => window.alert('Geocoder failed due to: ' + e));
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (map) {
      // // clear existing markers from the map for filter
      markers.forEach(marker => {
        marker.setMap(null);
      });

      // filter attractions based on the selected filter value
      const filteredMarkers = selectedFilters.includes('all')
        ? sliderList
        : sliderList.filter(attraction =>
            selectedFilters.includes(attraction.type)
          );

      // add filtered markers
      const newMarkers = filteredMarkers.map(attraction => {
        const marker = new google.maps.Marker({
          position: {
            lat: attraction.coordinates_lat,
            lng: attraction.coordinates_lng,
          },
          map: map,
          title: attraction.name,
        });

        marker.addListener('click', handleMarkerClick);
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        console.log(markerState, 'marker has been clicked');

        return marker;
      });

      // set the markers state
      setMarkers(newMarkers);

      if (selectedFilters.includes('all')) {
      }
    }
  }, [map, markerState, sliderList, selectedFilters]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={mapZoom}
      center={mapCenter}
      options={mapOptions}
      mapContainerClassName="map"
      onLoad={map => {
        setMap(map);
      }}
    >
      <Flex
        flexDirection="column"
        style={{ position: 'absolute', top: 10, left: 10 }}
      >
        <Flex
          style={{
            width: 'fit-content',
            border: 'solid 2px orangered',
            borderRadius: '20px',
            backgroundColor: 'white',
            zIndex: 1,
            height: '38px',
          }}
        >
          <LocationInput map={map} />
          <Divider orientation="vertical" />
          {/* <LocationInput map={map} /> */}
          <input
            ref={currentLocationInputRef}
            style={{
              paddingLeft: '10px',
            }}
            placeholder={'Current Map View'}
            value={currentLocation}
          />
          <LocationButton getPosition={getPosition} />
        </Flex>
        <Flex
          flexDirection="column"
          style={{
            // position: 'absolute',
            // top: 10,
            // right: 10,
            zIndex: 1,
            height: '38px',
          }}
        >
          {attractionTypes.map(attractionType => (
            <button
              key={attractionType.value}
              onClick={() => {
                if (attractionType.value === 'all') {
                  if (selectedFilters.includes('all')) {
                    setSelectedFilters([]); // Unselect all filters
                  } else {
                    setSelectedFilters(['all']); // Select 'All' filter
                  }
                } else {
                  if (selectedFilters.includes('all')) {
                    setSelectedFilters([attractionType.value]); // Select the clicked filter only
                  } else if (selectedFilters.includes(attractionType.value)) {
                    setSelectedFilters(
                      selectedFilters.filter(
                        filter => filter !== attractionType.value
                      )
                    ); // Unselect the clicked filter
                  } else {
                    setSelectedFilters([
                      ...selectedFilters,
                      attractionType.value,
                    ]); // Add the clicked filter
                  }
                }
              }}
              style={{
                // width: 'fit-content',
                width: '145px',
                marginTop: '10px',
                padding: '5px',
                paddingRight: '10px',
                paddingLeft: '10px',
                border: 'solid 2px orangered',
                borderRadius: '20px',
                background: selectedFilters.includes(attractionType.value)
                  ? 'orangered'
                  : 'white',
                color: selectedFilters.includes(attractionType.value)
                  ? 'white'
                  : 'black',
              }}
            >
              {attractionType.label}
            </button>
          ))}
        </Flex>
      </Flex>
      {/* passing the setSliderListFunc to the slider from map 
         data it receives will be used by setSliderList method to update
        the sliderList state */}
      <SliderBar setSliderListFunc={setSliderList} />

      <MarkerDrawer
        isOpenFunc={markerState}
        isCloseFunc={handleClose}
        
        
      />
    </GoogleMap>
  );
}
