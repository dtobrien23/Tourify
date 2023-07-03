import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import attractions from '../static/attractions.json';
import { libraries, mapOptions } from '../static/mapConfig.js';
import { Flex, Divider, Drawer } from '@chakra-ui/react';
import '../App.css';
import SliderBar from './SliderBar';
import MarkerDrawer from './MarkerDrawer';
import SearchBar from './SearchBar';

export default function Map() {
  const [mapCenter, setMapCenter] = useState({
    lat: 40.755091,
    lng: -73.978285,
  });

  //receiving filtered attractions from slider
  //pass setSliderList method into slider to receive sliders filtered
  //attractions list, update sliderList state with that list we receive
  const [sliderList, setSliderList] = useState(attractions);

  //marker click state to open drawer
  const [markerState, setMarkerState] = useState(false);
  // get the marker object info when clicking on a marker
  const [markerObject, setMarkerObject] = useState(null);
  //function call on marker click
  const handleMarkerClick = marker => {
    // just take desired object info
    const markerData = {
      name: marker.name,
      coordinates_lat: marker.position.lat(),
      coordinates_lng: marker.position.lng(),
      price_dollars: marker.price_dollars,
      image: marker.image
    };
    setMarkerObject(markerData);

    //state opens drawer
    setMarkerState(true);
  };
  // close the drawer when state goes to false
  const handleClose = () => {
    setMarkerState(false);
  };

  //console.log(sliderList, 'this came from the slider component to the map!!!!')
  const [map, setMap] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['all']);

  const google = window.google;
  const mapZoom = 13;

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (map) {
      map.setCenter({ lat: mapCenter.lat, lng: mapCenter.lng });
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
          name: { name: attraction.name },
          position: {
            lat: attraction.coordinates_lat,
            lng: attraction.coordinates_lng,
          },
          map: map,
          price_dollars: {price_dollars: attraction.price_dollars},
          image: {image: attraction.image}
        

        });

        marker.addListener('click', () => handleMarkerClick(marker));
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        console.log(marker, 'markerinfo here');

        return marker;
      });

      // set the markers state
      setMarkers(newMarkers);
    }
  }, [map, markerState, sliderList, selectedFilters, mapCenter]);

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
      onDragEnd={() => {
        if (map) {
          // Get the coordinates of the map center after the drag ends
          const center = map.getCenter();
          setMapCenter({ lat: center.lat(), lng: center.lng() });
        }
      }}
    >
      <Flex
        flexDirection="column"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          height: 'fit-content',
        }}
      >
        <SearchBar map={map} style={{ zIndex: 1 }} />
        <Flex
          flexDirection="column"
          style={{
            zIndex: 0,
            // height: '38px',
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
        //marker state true opens drawer
        //false closes it
        //have to pass set state method into
        //drawer so the X button can change state to false and close the drawer
        // also pass in marker object to render infor in drawer
        isOpenFunc={markerState}
        isCloseFunc={handleClose}
        markerObject={markerObject}
      />
    </GoogleMap>
  );
}
