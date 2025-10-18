import React from 'react';
import styled from 'styled-components';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const CardContainer = styled.div<{ isSelected: boolean; isCompleted: boolean }>`
  background: ${props => props.isSelected ? 'rgba(0, 255, 136, 0.1)' : 'rgba(26, 26, 26, 0.8)'};
  border: 2px solid ${props => 
    props.isCompleted ? '#00ff88' : 
    props.isSelected ? '#00ff88' : 
    'rgba(0, 255, 136, 0.3)'
  };
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
  }
`;

const StatusIndicator = styled.div<{ isCompleted: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.isCompleted ? '#00ff88' : '#ff4444'};
  box-shadow: 0 0 10px ${props => props.isCompleted ? '#00ff88' : '#ff4444'};
`;

const ModuleIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
`;

const ModuleTitle = styled.h3`
  color: #00ff88;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
`;

const ModuleDescription = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.8;
`;

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  isSelected, 
  isCompleted, 
  onClick 
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <CardContainer 
      isSelected={isSelected} 
      isCompleted={isCompleted}
      onClick={handleClick}
    >
      <StatusIndicator isCompleted={isCompleted} />
      <ModuleIcon>{module.icon}</ModuleIcon>
      <ModuleTitle>{module.title}</ModuleTitle>
      <ModuleDescription>{module.description}</ModuleDescription>
    </CardContainer>
  );
};

export default ModuleCard;
