import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const FlipCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div onClick={handleClick} style={{ position: 'relative' }}>
      <animated.div
        className="card"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      >
        {frontContent}
      </animated.div>
      <animated.div
        className="card"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      >
        {backContent}
      </animated.div>
    </div>
  );
};

export default FlipCard;
