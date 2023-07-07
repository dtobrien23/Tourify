import React, { useEffect, useState } from 'react';
import { Box, Flex, Tooltip } from '@chakra-ui/react';
import '../App.css';

export default function FiltersNavBar({
  isMobile,
  selectedFilters,
  setSelectedFilters,
}) {
  const desktopFilters = {
    flexDirection: 'column',
    overflow: 'auto',
    // overflowX: 'auto',
    pl: 1,
    style: {
      zIndex: 0,
      width: '70px',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  };

  const mobileFilters = {
    flexDirection: 'row',
    overflowX: 'auto',
    pb: 1,
    style: {
      zIndex: 0,
      width: 'calc(100% + 1px)',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  };

  const [flexProps, setFlexProps] = useState(desktopFilters);

  // used for filtering attractions markers
  const attractionTypes = [
    { label: 'All', value: 'ALL' },
    { label: 'Landmarks', value: 'LANDMARK' },
    { label: 'Museums', value: 'MUSEUM' },
    { label: 'Parks', value: 'PARK' },
    { label: 'Theatres', value: 'THEATER' },
    { label: 'Neighborhoods', value: 'NEIGHBORHOOD' },
    { label: 'Dining', value: 'DINING' },
    { label: 'Galleries', value: 'GALLERY' },
    { label: 'Libraries', value: 'LIBRARY' },
    { label: 'Historic Sites', value: 'HISTORIC_SITE' },
    { label: 'Observatories', value: 'OBSERVATORY' },
  ];

  useEffect(() => {
    if (isMobile) {
      setFlexProps(mobileFilters);
    }
  }, [isMobile]);

  return (
    <Flex {...flexProps}>
      {attractionTypes.map(attractionType => (
        <Tooltip label={attractionType.label} placement="right">
          <button
            key={attractionType.value}
            onClick={() => {
              if (attractionType.value === 'ALL') {
                if (selectedFilters.includes('ALL')) {
                  setSelectedFilters([]); // Unselect all filters
                } else {
                  setSelectedFilters(['ALL']); // Select 'All' filter
                }
              } else {
                if (selectedFilters.includes('ALL')) {
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
            overflow="visible"
            style={{
              width: 'fit-content',
              marginTop: '4px',
              marginBottom: '6px',
              marginRight: '10px',
              padding: '7px',
              boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
              border: 'solid 2px white',
              borderRadius: '50%',
              background: selectedFilters.includes(attractionType.value)
                ? 'orangered'
                : 'white',
              color: selectedFilters.includes(attractionType.value)
                ? 'white'
                : 'black',
            }}
          >
            {selectedFilters.includes(attractionType.value) ? (
              <img
                src={
                  '/images/attractions-icons/active/' +
                  attractionType.value +
                  '.png'
                }
                alt={attractionType.label}
              />
            ) : (
              <img
                src={
                  '/images/attractions-icons/inactive/' +
                  attractionType.value +
                  '.png'
                }
                alt={attractionType.label}
              />
            )}
          </button>
        </Tooltip>
      ))}
    </Flex>
  );
}
