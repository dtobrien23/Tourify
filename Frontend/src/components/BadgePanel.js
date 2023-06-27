import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

function BadgePanel() {
  const badges = [
    {
      "id": 1,
      "name": "Explorers' Delight Badge",
      "description": "Acquire the Explorers' Delight badge by exploring iconic landmarks in Manhattan.",
      "acquisition": "Visit Statue of Liberty.",
      "points": 100,
      "image": "badgeimages/explorers_delight_badge.png"
    },
    {
      "id": 2,
      "name": "Foodie Explorer Badge",
      "description": "Acquire the Foodie Explorer badge by indulging in culinary delights in Manhattan.",
      "acquisition": "Visit Katz's Delicatessen.",
      "points": 200,
      "image": "badgeimages/foodie_explorer_badge.png"
    },
    {
      "id": 3,
      "name": "Skyline Master Badge",
      "description": "Acquire the Skyline Master badge by enjoying breathtaking views of Manhattan.",
      "acquisition": "Visit Empire State Building.",
      "points": 300,
      "image": "badgeimages/skyline_master_badge.png"
    },
    {
      "id": 4,
      "name": "Culture Connoisseur Badge",
      "description": "Acquire the Culture Connoisseur badge by immersing yourself in arts and culture in Manhattan.",
      "acquisition": "Visit The Metropolitan Museum of Art.",
      "points": 400,
      "image": "badgeimages/culture_connoisseur_badge.png"
    },
    {
      "id": 5,
      "name": "Adrenaline Junkie Badge",
      "description": "Acquire the Adrenaline Junkie badge by seeking thrilling experiences in Manhattan.",
      "acquisition": "Visit Central Park.",
      "points": 500,
      "image": "badgeimages/adrenaline_junkie_badge.png"
    },
    {
      "id": 6,
      "name": "Shopaholic Badge",
      "description": "Acquire the Shopaholic badge by indulging in retail therapy in Manhattan.",
      "acquisition": "Visit Fifth Avenue.",
      "points": 600,
      "image": "badgeimages/shopaholic_badge.png"
    },
    {
      "id": 7,
      "name": "Nightlife Guru Badge",
      "description": "Acquire the Nightlife Guru badge by exploring the vibrant nightlife of Manhattan.",
      "acquisition": "Visit Times Square.",
      "points": 700,
      "image": "badgeimages/nightlife_guru_badge.png"
    },
    {
      "id": 8,
      "name": "Nature Lover Badge",
      "description": "Acquire the Nature Lover badge by enjoying the natural beauty of Manhattan.",
      "acquisition": "Visit Central Park Zoo.",
      "points": 800,
      "image": "badgeimages/nature_lover_badge.png"
    },
    {
      "id": 9,
      "name": "History Buff Badge",
      "description": "Acquire the History Buff badge by delving into the rich history of Manhattan.",
      "acquisition": "Visit Ellis Island Immigration Museum.",
      "points": 900,
      "image": "badgeimages/history_buff_badge.png"
    },
    {
      "id": 10,
      "name": "Music Maestro Badge",
      "description": "Acquire the Music Maestro badge by exploring the music scene in Manhattan.",
      "acquisition": "Visit Carnegie Hall.",
      "points": 1000,
      "image": "badgeimages/music_maestro_badge.png"
    }
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {badges.map((badge) => (
        <GridItem key={badge.id} bg="blue.500" color="white" p={4}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={badge.image} alt={badge.name} style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <h3>{badge.name}</h3>
            <p>{badge.description}</p>
            <p>Acquisition: {badge.acquisition}</p>
            <p>Points: {badge.points}</p>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
}

export default BadgePanel;
