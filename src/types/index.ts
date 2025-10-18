// Uzay Gemisi Fonksiyon Laboratuvarı - Type Definitions

export interface Module {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  concept: string;
  detailedExplanation: string;
  exampleCode: string;
  testCases: TestCase[];
  isActive: boolean;
  icon: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface CodeExecutionResult {
  output: string;
  errors: string[];
  executionTime: number;
  success: boolean;
}

export interface User {
  id: number;
  username: string;
  currentLevel: string;
  totalScore: number;
  completedModules: number[];
}

export interface GameState {
  currentLevel: string;
  selectedModule: number | null;
  userProgress: User;
  isAuthenticated: boolean;
}

