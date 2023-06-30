import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import attractions from '../static/attractions.json';
import { libraries, mapOptions } from '../static/mapConfig.js';
import { Flex } from '@chakra-ui/react';
import '../App.css';
import SliderBar from './SliderBar';
import SearchBar from './SearchBar';

export default function Map() {
  //receiving filtered attractions from slider
  //pass setSliderList method into slider to receive sliders filtered
  //attractions list, update sliderList state with that list we receive
  const [sliderList, setSliderList] = useState(attractions);

  //console.log(sliderList, 'this came from the slider component to the map!!!!')
  const [map, setMap] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['all']);

  const google = window.google;
  const mapCenter = { lat: 40.755091, lng: -73.978285 };
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
        return marker;
      });

      // set the markers state
      setMarkers(newMarkers);

      if (selectedFilters.includes('all')) {
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
    >
      <Flex
        flexDirection="column"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
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
    </GoogleMap>
  );
}
