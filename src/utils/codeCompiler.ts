// C++ Kod Derleyici - Gerçek derleme sistemi
import { CodeExecutionResult } from '../types';
import { realCppCompiler } from './realCompiler';

// Gerçek C++ derleyici wrapper
export class CodeCompiler {
  private static instance: CodeCompiler;

  private constructor() {}

  public static getInstance(): CodeCompiler {
    if (!CodeCompiler.instance) {
      CodeCompiler.instance = new CodeCompiler();
    }
    return CodeCompiler.instance;
  }

  // Derleyiciyi başlat
  public async initialize(): Promise<void> {
    try {
      console.log('Gerçek C++ Derleyici başlatıldı');
      console.log('Node.js ortamında gerçek g++ derleyici kullanılacak');
      console.log('Browser ortamında gelişmiş simülasyon kullanılacak');
    } catch (error) {
      console.error('CodeCompiler initialization failed:', error);
    }
  }

  // C++ kodunu derle ve çalıştır
  public async compileAndRun(code: string): Promise<CodeExecutionResult> {
    // Gerçek C++ derleyiciyi kullan
    return await realCppCompiler.compileAndRun(code);
  }


  // Test case'leri çalıştır
  public async runTests(code: string, testCases: any[]): Promise<{
    passed: number;
    total: number;
    results: Array<{
      passed: boolean;
      expected: string;
      actual: string;
      description: string;
    }>;
  }> {
    // Gerçek C++ derleyiciyi kullan
    return await realCppCompiler.runTests(code, testCases);
  }
}

// Singleton instance
export const codeCompiler = CodeCompiler.getInstance();
