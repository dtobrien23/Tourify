import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const url = (name, wrap = false) =>
  `${
    wrap ? 'url(' : ''
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ')' : ''
  }`;

const ParallaxContent = ({ onClose }) => {
  const parallax = useRef(null);

  return (
    <>
      <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: '#805E73' }}
          />
          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: '#87BCDE' }}
          />

          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

          <ParallaxLayer
            offset={1.3}
            speed={-0.3}
            style={{ pointerEvents: 'none' }}
          >
            <img
              src={url('satellite4')}
              style={{ width: '15%', marginLeft: '70%' }}
              alt="Satellite"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '55%' }}
              alt="Cloud"
            />
            <img
              src={'/images/parallax/DEAN.jpg'}
              style={{ display: 'block', width: '50%', marginLeft: '15%' }}
              alt="Cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '70%' }}
              alt="Cloud"
            />
            <img
              src={'/images/parallax/AJ.jpg'}
              style={{ display: 'block', width: '20%', marginLeft: '40%' }}
              alt="Cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '10%', marginLeft: '10%' }}
              alt="Cloud"
            />
            <img
              src={'/images/parallax/ALICIA.jpg'}
              style={{ display: 'block', width: '20%', marginLeft: '75%' }}
              alt="Cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '60%' }}
              alt="Cloud"
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '25%', marginLeft: '30%' }}
              alt="Cloud"
            />
            <img
              src={'/images/parallax/DAVE.jpg'}
              style={{ display: 'block', width: '10%', marginLeft: '80%' }}
              alt="Cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '5%' }}
              alt="Cloud"
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '15%', marginLeft: '75%' }}
              alt="Cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.7}
            speed={-0.3}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src={'/images/parallax/skyline.jpg'}
              style={{
                maxHeight: '500px',
                maxWidth: '680px',
                marginBottom: '800px',
              }}
              alt="Earth"
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: '80%',
              backgroundPosition: 'center',
              backgroundImage: url('clients', true),
            }}
          />

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={'/images/parallax/logo1.png'}
              style={{
                maxWidth: '300px',
                height: '100px',
                marginRight: '10px',
                border: '2px solid orangered',
                borderRadius: '5px',
              }}
              alt="Server"
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={'/images/parallax/ANA.jpg'}
              style={{ width: '100px' }}
              alt="Bash"
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => parallax.current.scrollTo(0)}
          >
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', position: 'absolute', marginBottom:'200px',border: '2px solid orangered',
                                        borderRadius: '5px', }}>
              The API King
            </h2>
            <img
              src={'/images/parallax/YJ.jpg'}
              style={{ width: '100px', marginRight:'30px' }}
              alt="Clients"
            />
            
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
};

export default ParallaxContent;
