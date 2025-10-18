import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onTest: () => void;
  isLoading: boolean;
}

const EditorContainer = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const EditorHeader = styled.div`
  background: rgba(0, 255, 136, 0.1);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditorTitle = styled.h3`
  color: #00ff88;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? '#00ff88' : 'transparent'};
  color: ${props => props.variant === 'primary' ? '#0a0a0a' : '#00ff88'};
  border: 2px solid #00ff88;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#88ffaa' : 'rgba(0, 255, 136, 0.1)'};
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditorWrapper = styled.div`
  height: 400px;
  position: relative;
`;

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onTest,
  isLoading
}) => {
  // Editor tema ayarları kaldırıldı

  useEffect(() => {
    // Monaco Editor tema ayarları
    // setEditorTheme('vs-dark');
  }, []);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // C++ syntax highlighting için özel tema
    monaco.editor.defineTheme('space-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'identifier', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#00ff88',
        'editor.lineHighlightBackground': 'rgba(0, 255, 136, 0.1)',
        'editor.selectionBackground': 'rgba(0, 255, 136, 0.2)',
        'editorCursor.foreground': '#00ff88',
        'editorLineNumber.foreground': '#666666',
        'editorLineNumber.activeForeground': '#00ff88',
      }
    });

    monaco.editor.setTheme('space-theme');
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>🚀 Kod Editörü</EditorTitle>
        <ButtonGroup>
          <Button 
            variant="secondary" 
            onClick={onTest}
            disabled={isLoading}
          >
            {isLoading ? 'Test Ediliyor...' : 'Test Et'}
          </Button>
          <Button 
            variant="primary" 
            onClick={onRun}
            disabled={isLoading}
          >
            {isLoading ? 'Çalıştırılıyor...' : 'Çalıştır'}
          </Button>
        </ButtonGroup>
      </EditorHeader>
      <EditorWrapper>
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default CodeEditor;
