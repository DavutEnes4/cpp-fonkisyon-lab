import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import { getModuleById } from '../utils/modules';
import { codeCompiler } from '../utils/codeCompiler';
import { CookieManager } from '../utils/cookieManager';
import { Module, CodeExecutionResult } from '../types';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const BackButton = styled.button`
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  border: 2px solid #00ff88;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  }
`;

const ModuleTitle = styled.h1`
  font-size: 2.5rem;
  color: #00ff88;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ModuleDescription = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ExplanationSection = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  color: #00ff88;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ExplanationText = styled.div`
  color: #cccccc;
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 0.95rem;

  h3 {
    color: #00ff88;
    margin: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.3rem 0;
  }

  code {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
  }

  pre {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }
`;

const OutputSection = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const OutputContent = styled.pre`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #00ff88;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  min-height: 200px;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 400px;
`;

const TestResults = styled.div`
  margin-top: 1rem;
`;

const TestResult = styled.div<{ $passed: boolean }>`
  background: ${props => props.$passed ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)'};
  border: 1px solid ${props => props.$passed ? '#00ff88' : '#ff4444'};
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  color: ${props => props.$passed ? '#00ff88' : '#ff4444'};
`;

const ModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const moduleData = getModuleById(parseInt(id));
      if (moduleData) {
        setModule(moduleData);
        setCode(moduleData.exampleCode);
      }
    }
  }, [id]);

  const handleRunCode = async () => {
    if (!module) return;

    setIsLoading(true);
    setOutput('Kod çalıştırılıyor...\n');

    try {
      const result: CodeExecutionResult = await codeCompiler.compileAndRun(code);
      
      if (result.success) {
        setOutput(`✅ Kod başarıyla çalıştırıldı!\n\nÇıktı:\n${result.output}\n\nÇalışma süresi: ${result.executionTime}ms`);
      } else {
        // Timeout uyarısını özel olarak işle
        const isTimeout = result.errors.some(error => error.includes('Zaman aşımı'));
        if (isTimeout) {
          setOutput(`⏰ ZAMAN AŞIMI UYARISI!\n\n${result.errors.join('\n')}\n\n💡 Bu durum genellikle şu nedenlerden kaynaklanır:\n• cin, scanf gibi kullanıcı girişi bekleyen kodlar\n• Sonsuz döngüler\n• Çok uzun hesaplamalar\n\n🔧 Çözüm önerileri:\n• Kullanıcı girişi gerektiren kodları kaldırın\n• Döngülerinizin sonlanma koşullarını kontrol edin\n• Hesaplama süresini azaltın`);
        } else {
          setOutput(`❌ Derleme hatası:\n\n${result.errors.join('\n')}`);
        }
      }
    } catch (error) {
      setOutput(`❌ Hata: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestCode = async () => {
    if (!module) return;

    setIsLoading(true);
    setOutput('Testler çalıştırılıyor...\n');

    try {
      const results = await codeCompiler.runTests(code, module.testCases);
      setTestResults(results.results);
      
      let outputText = `🧪 Test Sonuçları:\n\n`;
      outputText += `✅ Geçen: ${results.passed}/${results.total}\n\n`;
      
      results.results.forEach((result, index) => {
        const status = result.passed ? '✅' : '❌';
        outputText += `${status} Test ${index + 1}: ${result.description}\n`;
        if (!result.passed) {
          // Timeout uyarısını özel olarak işle
          if (result.actual.includes('Zaman aşımı')) {
            outputText += `   ⏰ ZAMAN AŞIMI!\n`;
            outputText += `   💡 Bu test cin, scanf gibi kullanıcı girişi bekleyen kodlardan dolayı zaman aşımına uğradı.\n`;
          } else {
            outputText += `   Beklenen: ${result.expected}\n`;
            outputText += `   Gerçek: ${result.actual}\n`;
          }
        }
        outputText += '\n';
      });

      // Eğer tüm testler geçtiyse modülü tamamlandı olarak işaretle
      if (results.passed === results.total && results.total > 0) {
        CookieManager.markModuleCompleted(module.id);
        outputText += `🎉 Tebrikler! Modül ${module.id} başarıyla tamamlandı!\n`;
        outputText += `📊 İlerleme: ${CookieManager.getProgressPercentage(6)}% tamamlandı\n`;
      }

      setOutput(outputText);
    } catch (error) {
      setOutput(`❌ Test hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!module) {
    return (
      <Container>
        <div style={{ textAlign: 'center', color: '#ff4444' }}>
          <h1>Modül bulunamadı</h1>
          <BackButton onClick={() => navigate('/')}>
            ← Ana Sayfaya Dön
          </BackButton>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          ← Geri
        </BackButton>
        <ModuleTitle>
          {module.icon} {module.title} - {module.description}
        </ModuleTitle>
        <ModuleDescription>{module.concept}</ModuleDescription>
      </Header>

      <Content>
        <ExplanationSection>
          <SectionTitle>📚 ÖĞREN</SectionTitle>
          <ExplanationText>
            {module.detailedExplanation}
          </ExplanationText>
        </ExplanationSection>

        <div>
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRunCode}
            onTest={handleTestCode}
            isLoading={isLoading}
          />
        </div>
      </Content>

      <OutputSection>
        <SectionTitle>📊 Çıktı ve Sonuçlar</SectionTitle>
        <OutputContent>
          {output || 'Kod çıktısı burada görünecek...'}
        </OutputContent>
        
        {testResults.length > 0 && (
          <TestResults>
            <SectionTitle>🧪 Test Detayları</SectionTitle>
            {testResults.map((result, index) => (
              <TestResult key={index} $passed={result.passed}>
                <strong>Test {index + 1}:</strong> {result.description}<br/>
                <strong>Beklenen:</strong> {result.expected}<br/>
                <strong>Gerçek:</strong> {result.actual}
              </TestResult>
            ))}
          </TestResults>
        )}
      </OutputSection>
    </Container>
  );
};

export default ModulePage;
