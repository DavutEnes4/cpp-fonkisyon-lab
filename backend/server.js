// C++ Derleme Backend Servisi
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware - Domain desteği ile CORS ayarları
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // Domain'lerinizi buraya ekleyin
  'https://uzaygemisi.com',
  'https://www.uzaygemisi.com',
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Geliştirme ortamında tüm originlere izin ver
    if (!origin || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Üretim ortamında sadece izin verilen domainlere izin ver
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(express.json());

// Temp klasörünü oluştur
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Temp dosya temizleme fonksiyonu
function cleanupTempFiles() {
  try {
    const files = fs.readdirSync(tempDir);
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 dakika

    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      const stats = fs.statSync(filePath);
      
      // 5 dakikadan eski dosyaları sil
      if (now - stats.mtime.getTime() > maxAge) {
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️  Eski temp dosyası silindi: ${file}`);
        } catch (error) {
          console.log(`⚠️  Temp dosyası silinemedi: ${file} - ${error.message}`);
        }
      }
    });
  } catch (error) {
    console.log(`⚠️  Temp klasörü temizlenemedi: ${error.message}`);
  }
}

// Her 2 dakikada bir temp dosyaları temizle
setInterval(cleanupTempFiles, 2 * 60 * 1000);

// Sunucu başlarken eski dosyaları temizle
cleanupTempFiles();

// C++ kodunu derle ve çalıştır
app.post('/api/compile', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Kod gerekli' });
    }

    const timestamp = Date.now();
    const fileName = `temp_${timestamp}`;
    const cppPath = path.join(tempDir, `${fileName}.cpp`);
    const exePath = path.join(tempDir, `${fileName}.exe`);

    // C++ dosyasını oluştur
    fs.writeFileSync(cppPath, code, 'utf8');

    // C++ kodunu derle
    const compileCommand = `g++ -o "${exePath}" "${cppPath}"`;
    
    console.log('Derleme komutu:', compileCommand);
    console.log('Cpp dosyası:', cppPath);
    console.log('Exe dosyası:', exePath);
    
    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        // Derleme hatası
        console.log('Derleme hatası:', compileError);
        console.log('Stderr:', compileStderr);
        console.log('Stdout:', compileStdout);
        console.log('Komut:', compileCommand);
        cleanup();
        return res.json({
          success: false,
          output: '',
          errors: [compileStderr || compileError.message || 'Bilinmeyen derleme hatası'],
          executionTime: 0
        });
      }

      // Derleme başarılı, kodu çalıştır
      exec(`"${exePath}"`, { timeout: 5000 }, (runError, runStdout, runStderr) => {
        cleanup();
        
        if (runError) {
          return res.json({
            success: false,
            output: '',
            errors: [runStderr || runError.message],
            executionTime: 0
          });
        }

        res.json({
          success: true,
          output: runStdout,
          errors: [],
          executionTime: 0
        });
      });
    });

    // Temizlik fonksiyonu
    function cleanup() {
      try {
        if (fs.existsSync(cppPath)) {
          fs.unlinkSync(cppPath);
        }
        if (fs.existsSync(exePath)) {
          fs.unlinkSync(exePath);
        }
      } catch (error) {
        console.warn('Dosya temizleme hatası:', error);
      }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      output: '',
      errors: [`Sunucu hatası: ${error.message}`],
      executionTime: 0
    });
  }
});

// Test case'leri çalıştır
app.post('/api/test', async (req, res) => {
  try {
    const { code, testCases } = req.body;
    
    if (!code || !testCases) {
      return res.status(400).json({ error: 'Kod ve test case\'leri gerekli' });
    }

    const results = [];
    let passed = 0;

    for (const testCase of testCases) {
      try {
        const timestamp = Date.now();
        const fileName = `test_${timestamp}`;
        const cppPath = path.join(tempDir, `${fileName}.cpp`);
        const exePath = path.join(tempDir, `${fileName}.exe`);

        // C++ dosyasını oluştur
        fs.writeFileSync(cppPath, code, 'utf8');

        // C++ kodunu derle
        const compileCommand = `g++ -o "${exePath}" "${cppPath}"`;
        
        exec(compileCommand, (compileError, compileStdout, compileStderr) => {
          if (compileError) {
            results.push({
              passed: false,
              expected: testCase.expectedOutput,
              actual: `Derleme hatası: ${compileStderr || compileError.message}`,
              description: testCase.description
            });
            
            if (results.length === testCases.length) {
              res.json({
                passed,
                total: testCases.length,
                results
              });
            }
            return;
          }

          // Derleme başarılı, kodu çalıştır
          exec(`"${exePath}"`, { timeout: 5000 }, (runError, runStdout, runStderr) => {
            // Temizlik
            try {
              if (fs.existsSync(cppPath)) fs.unlinkSync(cppPath);
              if (fs.existsSync(exePath)) fs.unlinkSync(exePath);
            } catch (cleanupError) {
              console.warn('Temizlik hatası:', cleanupError);
            }

            // Boşlukları ve yeni satırları normalize et
            const normalizeText = (text) => {
              return text
                .trim()
                .replace(/\s+/g, ' ')  // Çoklu boşlukları tek boşluğa çevir
                .replace(/\n+/g, ' ')  // Yeni satırları boşluğa çevir
                .replace(/\r+/g, ' ')  // Carriage return'leri boşluğa çevir
                .replace(/\t+/g, ' ')  // Tab'ları boşluğa çevir
                .replace(/\s+/g, ' ')  // Tekrar çoklu boşlukları temizle
                .trim();
            };

            const actual = normalizeText(runStdout);
            const expected = normalizeText(testCase.expectedOutput);
            const testPassed = actual === expected;

            if (testPassed) {
              passed++;
            }

            results.push({
              passed: testPassed,
              expected,
              actual,
              description: testCase.description
            });

            if (results.length === testCases.length) {
              res.json({
                passed,
                total: testCases.length,
                results
              });
            }
          });
        });

      } catch (error) {
        results.push({
          passed: false,
          expected: testCase.expectedOutput,
          actual: `Hata: ${error.message}`,
          description: testCase.description
        });

        if (results.length === testCases.length) {
          res.json({
            passed,
            total: testCases.length,
            results
          });
        }
      }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Sunucu hatası: ${error.message}`
    });
  }
});

// Sunucuyu başlat - Herkese açık erişim için 0.0.0.0'a bind
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 C++ Derleme Servisi çalışıyor: http://0.0.0.0:${PORT}`);
  console.log(`🌐 Herkese açık erişim: http://[SUNUCU_IP]:${PORT}`);
  console.log(`📁 Temp klasörü: ${tempDir}`);
  console.log(`⚙️  g++ derleyici kullanılıyor`);
  console.log(`🔒 CORS: Tüm originlere izin verildi`);
});
