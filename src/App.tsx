import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SpaceBackground from './components/SpaceBackground';
import HomePage from './pages/HomePage';
import ModulePage from './pages/ModulePage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #00ff88;
  position: relative;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <SpaceBackground />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/module/:id" element={<ModulePage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;
