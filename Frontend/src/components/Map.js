import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { libraries, mapOptions } from '../static/mapConfig.js';
import '../App.css';
import SliderBar from './SliderBar';
import MarkerDrawer from './MarkerDrawer';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay.js';
import { Flex } from '@chakra-ui/react';
import FiltersNavBar from './FiltersNavBar.js';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
import ContentDrawer from './ContentDrawer.js';

export default function Map() {
  const { apiAttractions, setChartVisible } = useContext(APIContext);
  const {
    map,
    setMap,
    setButtonState,
    google,
    isMobile,
    hasTouchScreen,
    mapCenter,
    setMapCenter,
    attractionsWithBusyness,
  } = useContext(MapContext);

  ////////////////
  // USE STATES //
  ////////////////

  const [sliderList, setSliderList] = useState(attractionsWithBusyness);
  const [markerState, setMarkerState] = useState(false); //marker click state to open drawer
  const [markerObject, setMarkerObject] = useState(null); // get the marker object info when clicking on a marker
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['ALL']);

  const mapZoom = 13; // default map zoom

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  /////////////////
  // RECOMMENDER //
  /////////////////

  //function call on marker click
  const handleMarkerClick = marker => {
    // just take desired object info
    const markerData = {
      name: marker.name,
      coordinates_lat: marker.position.lat(),
      coordinates_lng: marker.position.lng(),
      price_dollars: marker.price_dollars,
      //image: `/images/${marker.name}.jpg`
    };
    setMarkerObject(markerData);

    //state opens drawer
    setMarkerState(true);
  };

  // close the drawer when state goes to false
  const handleClose = () => {
    setMarkerState(false);
    setChartVisible(false);
  };

  const recommendClose = () => {
    setButtonState(false);
  };

  /////////////
  // MARKERS //
  /////////////

  useEffect(() => {
    if (map) {
      // fetchData();

      if (sliderList !== null) {
        console.log(apiAttractions, 'this is the log');
        // clear existing markers from the map for filter
        markers.forEach(marker => {
          marker.setMap(null);
        });

        // filter attractions based on the selected filter value
        const filteredMarkers = selectedFilters.includes('ALL')
          ? sliderList
          : sliderList.filter(attraction =>
              selectedFilters.includes(attraction.attractionTypeEnum)
            );

        // add filtered markers
        const newMarkers = filteredMarkers.map(attraction => {
          const marker = new google.maps.Marker({
            name: { name: attraction.name },
            position: {
              lat: parseFloat(attraction.coordinates_lat),
              lng: parseFloat(attraction.coordinates_lng),
            },
            map: map,
            price_dollars: { price_dollars: attraction.price_dollars },
            image: { image: attraction.image },
          });

          marker.addListener('click', () => handleMarkerClick(marker));
          console.log(marker, 'these are the markers man!');

          return marker;
        });

        // set the markers state
        setMarkers(newMarkers);
      }
    }
  }, [map, sliderList, selectedFilters]);

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
      <WeatherDisplay />
      {hasTouchScreen ? (
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex justifyContent="center" alignItems="center" mt="5px">
            <SearchBar />
          </Flex>
          <Flex
            justifyContent="flex-end"
            flexDirection="column"
            style={{
              // position: 'absolute',
              // height: 'fit-content',
              // width: 'calc(100% - 20px)',

              width: '295px',
              marginBottom: '10px',
              '-ms-overflow-style': 'none' /* Hide scrollbar on Edge */,
              'scrollbar-width': 'none' /* Hide scrollbar on Firefox */,
              '::-webkit-scrollbar': {
                display: 'none' /* Hide scrollbar on Chrome and Safari */,
              },
            }}
          >
            <FiltersNavBar
              isMobile={isMobile}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          style={{
            position: 'absolute',
            top: 10,
            right: 120,
            height: 'fit-content',
            // width: 'calc(100% - 20px)',
            width: '295px',
          }}
        >
          <FiltersNavBar
            isMobile={isMobile}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Flex>
      )}
      {/* passing the setSliderListFunc to the slider from map 
         data it receives will be used by setSliderList method to update
        the sliderList state */}
      {!hasTouchScreen && <SliderBar setSliderListFunc={setSliderList} />}
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
      <ContentDrawer />
    </GoogleMap>
  );
}
