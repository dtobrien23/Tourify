import React, { useEffect, useState, useRef } from 'react';
import { Flex, Tooltip } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import '../App.css';

export default function FiltersNavBar({
  selectedFilters,
  setSelectedFilters,
  hasTouchScreen,
}) {
  const desktopFilters = {
    flexDirection: 'row',
    pl: 1,
    mb: 7,
    style: {
      overflowX: 'hidden',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
      msOverflowStyle: 'none',
      scrollBehavior: 'smooth',
    },
  };

  const mobileFilters = {
    flexDirection: 'row',
    overflowX: 'auto',
    pb: 1,
    style: {
      overflowY: 'hidden',
      overflowX: 'scroll',
      zIndex: 0,
      width: '100%', // You can adjust this width as needed
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    },
  };

  const [flexProps, setFlexProps] = useState(desktopFilters);
  const filtersContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

  // for left arrow button
  const scrollLeft = () => {
    if (filtersContainerRef.current) {
      filtersContainerRef.current.scrollLeft -= 200;
    }
  };

  // for right arrow button
  const scrollRight = () => {
    if (filtersContainerRef.current) {
      filtersContainerRef.current.scrollLeft += 200;
    }
  };

  // for smooth scroll
  const handleScroll = () => {
    if (filtersContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        filtersContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft === scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (hasTouchScreen) {
      setFlexProps(mobileFilters);
    } else {
      setFlexProps(desktopFilters);
    }
  }, [hasTouchScreen]);

  return (
    <Flex
      ref={filtersContainerRef}
      onScroll={handleScroll}
      {...flexProps}
      alignItems="center"
    >
      {!hasTouchScreen && (
        <button
          onClick={scrollLeft}
          style={{
            display: isAtStart ? 'none' : 'inline-block',
            background: 'white',
            borderRadius: '50%',
            width: 'fit-content',
            padding: '5px',
            marginLeft: 0,
            boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            left: '-15px',
            overflow: 'visible',
          }}
        >
          <AiOutlineLeft size="20" color="orangered" />
        </button>
      )}
      {attractionTypes.map(attractionType => (
        <React.Fragment key={attractionType.value}>
          <Flex mb="5px">
            <Tooltip label={attractionType.label} placement="bottom">
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
                  width: !hasTouchScreen ? '50px' : '55px',
                  flexShrink: 0,
                  marginTop: '4px',
                  marginBottom: '6px',
                  marginRight: '10px',
                  padding: !hasTouchScreen ? '7px' : '10px',
                  boxShadow:
                    !hasTouchScreen && '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
                  border: !hasTouchScreen
                    ? 'solid 2px white'
                    : 'solid 1px orangered',
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
                      '.svg'
                    }
                    alt={attractionType.label}
                  />
                ) : (
                  <img
                    src={
                      '/images/attractions-icons/inactive/' +
                      attractionType.value +
                      '.svg'
                    }
                    alt={attractionType.label}
                  />
                )}
              </button>
            </Tooltip>
          </Flex>
        </React.Fragment>
      ))}
      {!hasTouchScreen && (
        <button
          onClick={scrollRight}
          style={{
            display: isAtEnd ? 'none' : 'inline-block',
            background: 'white',
            borderRadius: '50%',
            width: 'fit-content',
            padding: '5px',
            boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            right: '-15px',
          }}
        >
          <AiOutlineRight size="20" color="orangered" />
        </button>
      )}
    </Flex>
  );
}
