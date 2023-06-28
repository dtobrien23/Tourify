// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '../App.css';

// mapboxgl.accessToken =
//   'pk.eyJ1IjoiZGF2ZWRveWxlIiwiYSI6ImNsajVnNm0xYzA5a3ozZXBlYzJmY2FldWIifQ.flqjNTDCZ5tNntgbrBtB1A';

// const MapBox = ({ tabIndex, attractions }) => {
//   const mapContainerRef = useRef(null);
//   const geocoderInputRef = useRef(null);

//   useEffect(() => {
//     console.log(tabIndex, 'tab index is');
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [-73.978285, 40.755091],
//       zoom: 13,
//     });

//     attractions.forEach(attraction => {
//       const { name, coordinates_lat, coordinates_lng, type } = attraction;
//       const coordinates = [coordinates_lng, coordinates_lat];

//       const marker = new mapboxgl.Marker()
//         .setLngLat(coordinates)
//         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`))
//         .addTo(map);

//       // Set the type property on the marker object
//       marker.properties = { type };
//     });

//     // Create search input element
//     const geocoderInput = document.createElement('input');
//     geocoderInput.type = 'text';
//     geocoderInput.placeholder = 'Search';

//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl,
//       container: geocoderInputRef.current,
//       input: geocoderInput,
//     });

//     // Add search control to map
//     map.addControl(geocoder);

//     // // Adjust map size when search container is resized
//     // const observer = new ResizeObserver(() => {
//     //   map.resize();
//     // });
//     // observer.observe(geocoderInputRef.current);

//     map.on('load', () => {
//       // console.log(tabIndex, 'inside map load index');
//       // if (tabIndex === 0) {
//       //   map.resize();
//       // }

//       // Add a GeoJSON source
//       map.addSource('zones', {
//         type: 'geojson',
//         data: '/manhattan_zones.geojson',
//         generateId: true,
//       });

//       map.addLayer({
//         id: 'zone',
//         type: 'fill',
//         source: 'zones',
//         layout: {},
//         paint: {
//           'fill-color': [
//             'case',
//             ['boolean', ['feature-state', 'hover'], false],
//             'red', // Change fill color when hovering
//             'blue', // Default fill color
//           ],
//           'fill-opacity': 0.5,
//           'fill-outline-color': 'red',
//           // 'fill-translate': [
//           //   'case',
//           //   ['boolean', ['feature-state', 'hover'], false],
//           //   ['literal', [10, 10]], // Translate when hovering
//           //   ['literal', [0, 0]], // Default translation
//           // ],
//         },
//       });

//       map.on('mousemove', 'zone', e => {
//         const { objectid } = e.features[0].properties;
//         console.log('Hovered Zone ID:', objectid);

//         // Reset previously hovered zone to blue
//         map.querySourceFeatures('zones').forEach(feature => {
//           map.setFeatureState(
//             { source: 'zones', id: feature.id },
//             { hover: false }
//           );
//         });

//         // Set currently hovered zone to red
//         e.features.forEach(feature => {
//           if (feature.properties.objectid === objectid) {
//             map.setFeatureState(
//               { source: 'zones', id: feature.id },
//               { hover: true }
//             );
//           }
//         });

//         map.getCanvas().style.cursor = 'pointer';
//       });

//       map.on('mouseleave', 'zone', () => {
//         map.querySourceFeatures('zones').forEach(feature => {
//           map.setFeatureState(
//             { source: 'zones', id: feature.id },
//             { hover: false }
//           );
//         });

//         map.getCanvas().style.cursor = '';
//       });

//       // Add controls (optional)
//       // map.addControl(new mapboxgl.NavigationControl());
//     });

//     // // Clean up
//     // return () => map.remove();
//   }, [tabIndex, attractions]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <div
//         ref={mapContainerRef}
//         style={{
//           height: '84vh',
//           width: '100%',
//           borderRadius: '20px',
//         }}
//       />
//       <div
//         ref={geocoderInputRef}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10',
//           zIndex: 1,
//         }}
//       />
//     </div>
//   );
// };

// export default MapBox;

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGF2ZWRveWxlIiwiYSI6ImNsajVnNm0xYzA5a3ozZXBlYzJmY2FldWIifQ.flqjNTDCZ5tNntgbrBtB1A';

const MapBox = props => {
  const mapContainerRef = useRef(null);
  const { tabIndex } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(tabIndex, 'tab index is');
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.978285, 40.755091],
      zoom: 13,
    });


    

    map.on('load', () => {
      console.log(tabIndex, 'inside map load index');
      // Store the map reference in the ref
      mapRef.current = map;
      // Add a GeoJSON source
      map.addSource('zones', {
        type: 'geojson',
        data: '/manhattan_zones.geojson',
        generateId: true,
      });

      map.addLayer({
        id: 'zone',
        type: 'fill',
        source: 'zones',
        layout: {},
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'red', // Change fill color when hovering
            'blue', // Default fill color
          ],
          'fill-opacity': 0.5,
          'fill-outline-color': 'red',
          // 'fill-translate': [
          //   'case',
          //   ['boolean', ['feature-state', 'hover'], false],
          //   ['literal', [10, 10]], // Translate when hovering
          //   ['literal', [0, 0]], // Default translation
          // ],
        },
      });

      map.on('mousemove', 'zone', e => {
        const { objectid } = e.features[0].properties;
        console.log('Hovered Zone ID:', objectid);

        // Reset previously hovered zone to blue
        map.querySourceFeatures('zones').forEach(feature => {
          map.setFeatureState(
            { source: 'zones', id: feature.id },
            { hover: false }
          );
        });

        // Set currently hovered zone to red
        e.features.forEach(feature => {
          if (feature.properties.objectid === objectid) {
            map.setFeatureState(
              { source: 'zones', id: feature.id },
              { hover: true }
            );
          }
        });

        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'zone', () => {
        map.querySourceFeatures('zones').forEach(feature => {
          map.setFeatureState(
            { source: 'zones', id: feature.id },
            { hover: false }
          );
        });

        map.getCanvas().style.cursor = '';
      });

      // Add controls (optional)
      // map.addControl(new mapboxgl.NavigationControl());
    });

    // // Clean up
    // return () => map.remove();
  });

  useEffect(() => {
    if (mapRef.current) {
      // Resize the map when the tab index changes
      mapRef.current.resize();
    }
  }, [tabIndex]);

  return <div ref={mapContainerRef} className="map" />;
};

export default MapBox;
