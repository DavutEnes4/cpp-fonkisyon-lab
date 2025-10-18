import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModuleCard from '../components/ModuleCard';
import { modules } from '../utils/modules';
import { CookieManager } from '../utils/cookieManager';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #00ff88;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  font-weight: 900;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const ProgressBar = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 25px;
  height: 20px;
  margin: 1rem auto;
  max-width: 400px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, #00ff88, #88ffaa);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
`;

const ProgressText = styled.p`
  color: #00ff88;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const ResetButton = styled.button`
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 2px solid #ff4444;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 68, 68, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
  }
`;

const ModulesSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #00ff88;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  // Cookie'den tamamlanan modülleri yükle
  useEffect(() => {
    const completed = CookieManager.getCompletedModules();
    setCompletedModules(completed);
  }, []);

  // Sayfa focus olduğunda modül durumlarını güncelle
  useEffect(() => {
    const handleFocus = () => {
      const completed = CookieManager.getCompletedModules();
      setCompletedModules(completed);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleModuleClick = (moduleId: number) => {
    setSelectedModule(moduleId);
    // Modül sayfasına yönlendirme
    navigate(`/module/${moduleId}`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Tüm modül ilerlemesini sıfırlamak istediğinizden emin misiniz?')) {
      CookieManager.resetAllModules();
      setCompletedModules([]);
    }
  };

  const progress = CookieManager.getProgressPercentage(modules.length);

  return (
    <Container>
      <Header>
        <Title>🚀 UZAY GEMİSİ KONTROL MERKEZİ</Title>
        <Subtitle>C++ Fonksiyon Laboratuvarı</Subtitle>
        
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <ProgressText>{completedModules.length}/{modules.length} Sistem Aktif</ProgressText>
        <ResetButton onClick={handleResetProgress}>
          🔄 İlerlemeyi Sıfırla
        </ResetButton>
      </Header>

      <ModulesSection>
        <SectionTitle>
          🔧 SİSTEM MODÜLLERİ
        </SectionTitle>
        
        <ModulesGrid>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isSelected={selectedModule === module.id}
              isCompleted={completedModules.includes(module.id)}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </ModulesGrid>
      </ModulesSection>
    </Container>
  );
};

export default HomePage;
