import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%23ffffff" opacity="0.8"/><circle cx="80" cy="40" r="0.5" fill="%2300ff88" opacity="0.6"/><circle cx="40" cy="80" r="1.5" fill="%23ffffff" opacity="0.4"/><circle cx="90" cy="90" r="0.8" fill="%2300ff88" opacity="0.7"/><circle cx="10" cy="60" r="1.2" fill="%23ffffff" opacity="0.5"/></svg>') repeat;
  animation: move-twink-back 200s linear infinite;
`;

const Stars2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="0.8" fill="%2300ff88" opacity="0.5"/><circle cx="70" cy="20" r="1.2" fill="%23ffffff" opacity="0.3"/><circle cx="50" cy="70" r="0.6" fill="%2300ff88" opacity="0.8"/><circle cx="20" cy="80" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="80" cy="60" r="0.9" fill="%2300ff88" opacity="0.6"/></svg>') repeat;
  animation: move-twink-back 100s linear infinite;
`;

const Stars3 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="1.1" fill="%23ffffff" opacity="0.2"/><circle cx="75" cy="35" r="0.7" fill="%2300ff88" opacity="0.4"/><circle cx="45" cy="75" r="1.3" fill="%23ffffff" opacity="0.3"/><circle cx="15" cy="85" r="0.8" fill="%2300ff88" opacity="0.5"/><circle cx="85" cy="15" r="1" fill="%23ffffff" opacity="0.6"/></svg>') repeat;
  animation: move-twink-back 150s linear infinite;
`;

const SpaceBackground: React.FC = () => {
  return (
    <BackgroundContainer>
      <Stars />
      <Stars2 />
      <Stars3 />
      <style>{`
        @keyframes move-twink-back {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
      `}</style>
    </BackgroundContainer>
  );
};

export default SpaceBackground;
