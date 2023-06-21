import React from 'react';

import {
  Box,
  Flex,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
} from '@chakra-ui/react';

const attractions = [
  {
    name: 'Empire State Building',
    address: '20 W 34th St., New York, NY 10001, United States',
    openingHours: {
      Monday: '9am-11pm',
      Tuesday: '9am-11pm',
      Wednesday: '9am-11pm',
      Thursday: '9am-11pm',
      Friday: '9am-11pm',
      Saturday: '9am-11pm',
      Sunday: '9am-11pm',
    },
    website: 'https://www.esbnyc.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
  },
  {
    name: 'Statue of Liberty',
    address: 'New York, NY 10004, United States',
    openingHours: {
      Monday: '9am-6:45pm',
      Tuesday: '9am-6:45pm',
      Wednesday: '9am-6:45pm',
      Thursday: '9am-6:45pm',
      Friday: '9am-6:45pm',
      Saturday: '9am-6:45pm',
      Sunday: '9am-6:45pm',
    },
    website: 'https://www.nps.gov/stli/index.htm',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg',
  },
  {
    name: 'Brooklyn Bridge',
    address: 'New York, NY 10038, United States',
    openingHours: {
      Monday: 'Open 24 hours',
      Tuesday: 'Open 24 hours',
      Wednesday: 'Open 24 hours',
      Thursday: 'Open 24 hours',
      Friday: 'Open 24 hours',
      Saturday: 'Open 24 hours',
      Sunday: 'Open 24 hours',
    },
    website: 'https://www.brooklynbridgepark.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Brooklyn_Bridge_September_2022_008.jpg',
  },
  {
    name: 'Metropolitan Museum of Art',
    address: '1000 5th Ave, New York, NY 10028, United States',
    openingHours: {
      Monday: '10am-5pm',
      Tuesday: '10am-5pm',
      Wednesday: 'Closed',
      Thursday: '10am-5pm',
      Friday: '10am-9pm',
      Saturday: '10am-9pm',
      Sunday: '10am-5pm',
    },
    website: 'https://www.metmuseum.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg',
  },
  {
    name: 'Museum of Modern Art (MoMA)',
    address: '11 W 53rd St, New York, NY 10019, United States',
    openingHours: {
      Monday: '10:30am-5:30pm',
      Tuesday: '10:30am-5:30pm',
      Wednesday: '10:30am-5:30pm',
      Thursday: '10:30am-5:30pm',
      Friday: '10:30am-5:30pm',
      Saturday: '10:30am-7pm',
      Sunday: '10:30am-5:30pm',
    },
    website: 'https://www.moma.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/MoMa_NY_USA_1.jpg',
  },
  {
    name: 'Guggenheim Museum',
    address: '1071 5th Ave, New York, NY 10128, United States',
    openingHours: {
      Monday: '11am-6pm',
      Tuesday: '11am-6pm',
      Wednesday: '11am-6pm',
      Thursday: '11am-6pm',
      Friday: '11am-8pm',
      Saturday: '10am-8pm',
      Sunday: '10am-6pm',
    },
    website: 'https://www.guggenheim.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/NYC_-_Guggenheim_Museum.jpg',
  },
  {
    name: 'Central Park',
    address: 'New York, NY 10024, United States',
    openingHours: {
      Monday: 'Open 24 hours',
      Tuesday: 'Open 24 hours',
      Wednesday: 'Open 24 hours',
      Thursday: 'Open 24 hours',
      Friday: 'Open 24 hours',
      Saturday: 'Open 24 hours',
      Sunday: 'Open 24 hours',
    },
    website: 'https://www.centralparknyc.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg',
  },
  {
    name: 'Times Square',
    address: 'Manhattan, NY 10036, United States',
    openingHours: {
      Monday: 'Open 24 hours',
      Tuesday: 'Open 24 hours',
      Wednesday: 'Open 24 hours',
      Thursday: 'Open 24 hours',
      Friday: 'Open 24 hours',
      Saturday: 'Open 24 hours',
      Sunday: 'Open 24 hours',
    },
    website: 'https://www.timessquarenyc.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/1_times_square_night_2013.jpg',
  },
  {
    name: 'The High Line',
    address: 'New York, NY 10011, United States',
    openingHours: {
      Monday: '7am-11pm',
      Tuesday: '7am-11pm',
      Wednesday: '7am-11pm',
      Thursday: '7am-11pm',
      Friday: '7am-11pm',
      Saturday: '7am-11pm',
      Sunday: '7am-11pm',
    },
    website: 'https://www.thehighline.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/56/AHigh_Line_Park%2C_Section_1a.jpg',
  },
  {
    name: 'Rockefeller Center',
    address: '45 Rockefeller Plaza, New York, NY 10111, United States',
    openingHours: {
      Monday: '8am-12am',
      Tuesday: '8am-12am',
      Wednesday: '8am-12am',
      Thursday: '8am-12am',
      Friday: '8am-12am',
      Saturday: '8am-12am',
      Sunday: '8am-12am',
    },
    website: 'https://www.rockefellercenter.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/db/GE_Building_by_David_Shankbone.JPG',
  },
  {
    name: 'Broadway',
    address: 'New York, NY, United States',
    openingHours: {
      Monday: 'Varies',
      Tuesday: 'Varies',
      Wednesday: 'Varies',
      Thursday: 'Varies',
      Friday: 'Varies',
      Saturday: 'Varies',
      Sunday: 'Varies',
    },
    website: 'https://www.broadway.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/56/Broadway_Theaters_45th_Street_Night.jpg',
  },
  {
    name: 'Brooklyn Museum',
    address: '200 Eastern Pkwy, Brooklyn, NY 11238, United States',
    openingHours: {
      Monday: 'Closed',
      Tuesday: '11am-6pm',
      Wednesday: '11am-6pm',
      Thursday: '11am-10pm',
      Friday: '11am-6pm',
      Saturday: '11am-6pm',
      Sunday: '11am-6pm',
    },
    website: 'https://www.brooklynmuseum.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/Brooklyn_Museum_-_Entrance_%2852302265063%29.jpg',
  },
  {
    name: 'Coney Island',
    address: 'Brooklyn, NY 11235, United States',
    openingHours: {
      Monday: 'Varies',
      Tuesday: 'Varies',
      Wednesday: 'Varies',
      Thursday: 'Varies',
      Friday: 'Varies',
      Saturday: 'Varies',
      Sunday: 'Varies',
    },
    website: 'https://www.coneyisland.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f0/Coney_Island_beach_and_amusement_parks_%28June_2016%29.jpg',
  },
  {
    name: 'Staten Island Ferry',
    address: '4 South St, New York, NY 10004, United States',
    openingHours: {
      Monday: '24 hours',
      Tuesday: '24 hours',
      Wednesday: '24 hours',
      Thursday: '24 hours',
      Friday: '24 hours',
      Saturday: '24 hours',
      Sunday: '24 hours',
    },
    website: 'https://www.siferry.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/06/Spirit_of_America_-_Staten_Island_Ferry.jpg',
  },
  {
    name: 'The Vessel',
    address: '20 Hudson Yards, New York, NY 10001, United States',
    openingHours: {
      Monday: 'Closed',
      Tuesday: '10am-9pm',
      Wednesday: '10am-9pm',
      Thursday: '10am-9pm',
      Friday: '10am-9pm',
      Saturday: '10am-9pm',
      Sunday: '10am-9pm',
    },
    website: 'https://www.hudsonyardsnewyork.com/discover/vessel',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Hudson_Yards_Plaza_March_2019_53.jpg',
  },
  {
    name: 'Ellis Island',
    address: 'Ellis Island, New York, NY 10004, United States',
    openingHours: {
      Monday: '9:30am-3:30pm',
      Tuesday: '9:30am-3:30pm',
      Wednesday: '9:30am-3:30pm',
      Thursday: '9:30am-3:30pm',
      Friday: '9:30am-3:30pm',
      Saturday: '9:30am-3:30pm',
      Sunday: '9:30am-3:30pm',
    },
    website: 'https://www.nps.gov/elis/index.htm',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Aerial_view_of_Ellis_Island%2C_Jersey_City%2C_New_Jersey_LCCN2011635626_-_cropped_balance.jpg',
  },
  {
    name: 'American Museum of Natural History',
    address: 'Central Park West & 79th St, New York, NY 10024, United States',
    openingHours: {
      Monday: '10am-5:45pm',
      Tuesday: '10am-5:45pm',
      Wednesday: '10am-5:45pm',
      Thursday: '10am-5:45pm',
      Friday: '10am-5:45pm',
      Saturday: '10am-5:45pm',
      Sunday: '10am-5:45pm',
    },
    website: 'https://www.amnh.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/ec/USA-NYC-American_Museum_of_Natural_History.JPG',
  },
  {
    name: 'One World Trade Center',
    address: '285 Fulton St, New York, NY 10007, United States',
    openingHours: {
      Monday: '9am-9pm',
      Tuesday: '9am-9pm',
      Wednesday: '9am-9pm',
      Thursday: '9am-9pm',
      Friday: '9am-9pm',
      Saturday: '9am-9pm',
      Sunday: '9am-9pm',
    },
    website: 'https://oneworldobservatory.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/8c/One_World_Trade_Center_Tower.jpg',
  },
  {
    name: 'Grand Central Terminal',
    address: '89 E 42nd St, New York, NY 10017, United States',
    openingHours: {
      Monday: 'Open 24 hours',
      Tuesday: 'Open 24 hours',
      Wednesday: 'Open 24 hours',
      Thursday: 'Open 24 hours',
      Friday: 'Open 24 hours',
      Saturday: 'Open 24 hours',
      Sunday: 'Open 24 hours',
    },
    website: 'https://www.grandcentralterminal.com/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/47/GCT_in_Blizzard_of_2015.jpg',
  },
  {
    name: 'Top of the Rock Observation Deck',
    address: '30 Rockefeller Plaza, New York, NY 10112, United States',
    openingHours: {
      Monday: '8am-12am',
      Tuesday: '8am-12am',
      Wednesday: '8am-12am',
      Thursday: '8am-12am',
      Friday: '8am-12am',
      Saturday: '8am-12am',
      Sunday: '8am-12am',
    },
    website: 'https://www.topoftherocknyc.com/',
    image:
      'https://untappedcities.com/wp-content/uploads/2020/08/featured-top-of-the-tock-observation-deck-rockefeller-center-MAnhattan-NYC1.jpg',
  },
  {
    name: 'The Frick Collection',
    address: '1 E 70th St, New York, NY 10021, United States',
    openingHours: {
      Monday: 'Closed',
      Tuesday: 'Closed',
      Wednesday: 'Closed',
      Thursday: '10am-6pm',
      Friday: '10am-6pm',
      Saturday: '10am-6pm',
      Sunday: '11am-5pm',
    },
    website: 'https://www.frick.org/',
    image:
      'https://media.cntraveler.com/photos/5a773f26ee3bb7795af31941/16:9/w_2240,c_limit/Frick_Michael-Bodycomb_2018_14_West_Gallery_B_2010_FULL.jpg',
  },
  {
    name: 'Battery Park',
    address: 'New York, NY 10004, United States',
    openingHours: {
      Monday: 'Open 24 hours',
      Tuesday: 'Open 24 hours',
      Wednesday: 'Open 24 hours',
      Thursday: 'Open 24 hours',
      Friday: 'Open 24 hours',
      Saturday: 'Open 24 hours',
      Sunday: 'Open 24 hours',
    },
    website: 'https://www.thebattery.org/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/62/Battery_Park.JPG',
  },
  {
    name: 'Chinatown',
    address: 'New York, NY, United States',
    openingHours: {
      Monday: 'Varies',
      Tuesday: 'Varies',
      Wednesday: 'Varies',
      Thursday: 'Varies',
      Friday: 'Varies',
      Saturday: 'Varies',
      Sunday: 'Varies',
    },
    website: 'https://www.explorechinatown.com/',
    image:
      'https://www.google.com/url?sa=i&url=http%3A%2F%2Ft3.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcQuBCMWcw_hsMqaDVWb3c-Mqg3uT7LfJXyb7HSK_U9nOac7v2VKHrmqrOJMAj9BvMMf&psig=AOvVaw1hgexvewCmBzUQCF1I9-IK&ust=1686920820682000&source=images&cd=vfe&ved=0CAwQjhxqFwoTCKCrgPSrxf8CFQAAAAAdAAAAABAD',
  },
];

function Attraction({ name, address, openingHours, website, image }) {
  return (
    <Flex
      mb={8}
      border="1px"
      borderRadius="20px"
      borderColor="orangered"
      bg="white"
      justify="center"
      align="center"
      w="80%"
    >
      <Box flex="1">
        <img
          src={image}
          alt={name}
          border="1px"
          borderRadius="20px"
          style={{ height: '225px', width: '225px', borderRadius: '20px' }}
        />
      </Box>
      <Flex flex="2" justify="center">
        <Box>
          <Heading as="h2" fontSize="xl">
            {name}
          </Heading>
          <Text>{address}</Text>
          <Text>Opening Hours:</Text>
          <Box ml={4}>
            {Object.entries(openingHours).map(([day, hours]) => (
              <Flex key={day} justifyContent="space-between">
                <Text>{day}:</Text>
                <Text ml={2}>{hours}</Text>
              </Flex>
            ))}
          </Box>
          <Text>
            Website:{' '}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </Text>
        </Box>
      </Flex>
      <Flex flex="1" flexDirection="column" mr={7}>
        <Alert status="success" borderRadius={20}>
          <AlertIcon />
          <AlertTitle>Visited</AlertTitle>
          <AlertDescription>
            You have already visited this attraction.
          </AlertDescription>
        </Alert>
        <Alert status="error" borderRadius={20} mt={5}>
          <AlertIcon />
          <AlertTitle>Busy</AlertTitle>
          <AlertDescription>
            This attraction is currently busy.
          </AlertDescription>
        </Alert>
      </Flex>
    </Flex>
  );
}

export default function AttractionsList() {
  return (
    <SimpleGrid
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
    >
      {attractions.map((attraction, index) => (
        <Attraction key={index} {...attraction} />
      ))}
    </SimpleGrid>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));
