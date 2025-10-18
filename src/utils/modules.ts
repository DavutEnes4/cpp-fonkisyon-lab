// Modül verileri - Resimdeki tasarıma uygun
import { Module } from '../types';

export const modules: Module[] = [
  // Başlangıç Seviyesi
  {
    id: 1,
    title: "İletişim Sistemi",
    description: "Fonksiyon Tanımlama",
    level: "beginner",
    concept: "C++ fonksiyonları nasıl tanımlanır ve kullanılır",
    detailedExplanation: `
Bu modülde C++ fonksiyonlarının temellerini öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Fonksiyon nedir ve neden kullanılır?
- void fonksiyonları nasıl tanımlanır?
- Fonksiyonları nasıl çağırırız?
- cout ile ekrana nasıl yazdırırız?

📝 **Görev:**
Uzay gemisinin iletişim sistemini çalıştırmak için bir selamlama fonksiyonu yazın.

💡 **İpucu:**
- void selamla() fonksiyonu tanımlayın
- cout << kullanarak "Merhaba Komutan!" yazdırın
- Fonksiyonu main() içinde çağırın

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    selamla();
    return 0;
}`,
    testCases: [
      {
        input: "",
        expectedOutput: "Merhaba Komutan!",
        description: "Selamlama fonksiyonu testi"
      }
    ],
    isActive: true,
    icon: "📡"
  },
  {
    id: 2,
    title: "Enerji Sistemi",
    description: "Parametre Kullanımı",
    level: "beginner",
    concept: "Fonksiyonlara parametre gönderme ve değer döndürme",
    detailedExplanation: `
Bu modülde fonksiyon parametrelerini öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Fonksiyonlara parametre nasıl gönderilir?
- Return ile değer nasıl döndürülür?
- Fizik formüllerini kod olarak nasıl yazarız?
- Değişken türleri (double, int) nasıl kullanılır?

📝 **Görev:**
Uzay gemisinin enerji sistemini hesaplamak için bir fonksiyon yazın.

💡 **İpucu:**
- double enerjiHesapla(double voltaj, double akim) fonksiyonu tanımlayın
- Enerji = Voltaj × Akım formülünü kullanın
- Sonucu return ile döndürün

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    double sonuc = enerjiHesapla(10, 2);
    cout << "Enerji: " << sonuc << " Watt" << endl;
    return 0;
}`,
    testCases: [
      {
        input: "enerjiHesapla(10, 2)",
        expectedOutput: "Enerji: 20 Watt",
        description: "Enerji hesaplama testi"
      }
    ],
    isActive: true,
    icon: "⚡"
  },
  {
    id: 3,
    title: "Motor Sistemi",
    description: "Döngüler ve Algoritmalar",
    level: "beginner",
    concept: "For döngüleri ve temel algoritmalar",
    detailedExplanation: `
Bu modülde döngüleri öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- For döngüleri nasıl kullanılır?
- Algoritma nedir?
- Döngü değişkenleri nasıl kullanılır?
- Koşullu ifadeler (if-else)

📝 **Görev:**
Uzay gemisinin motor sistemini test etmek için bir sayma fonksiyonu yazın.

💡 **İpucu:**
- void motorTest(int adim) fonksiyonu tanımlayın
- For döngüsü ile 1'den adim'e kadar sayın
- Her adımda "Motor test " + sayı yazdırın

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    motorTest(5);
    return 0;
}`,
    testCases: [
      {
        input: "motorTest(3)",
        expectedOutput: "Motor test 1\nMotor test 2\nMotor test 3",
        description: "Motor test döngüsü"
      }
    ],
    isActive: true,
    icon: "🚀"
  },
  {
    id: 4,
    title: "Radar Sistemi",
    description: "Dizi İşleme",
    level: "beginner",
    concept: "Diziler ve fonksiyonlar",
    detailedExplanation: `
Bu modülde dizileri öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Dizi nedir ve nasıl tanımlanır?
- Dizi elemanlarına nasıl erişilir?
- Dizileri fonksiyonlara nasıl göndeririz?
- Döngülerle dizi işleme

📝 **Görev:**
Uzay gemisinin radar sistemindeki sinyal güçlerini toplayan bir fonksiyon yazın.

💡 **İpucu:**
- int sinyalTopla(int sinyaller[5]) fonksiyonu tanımlayın
- For döngüsü ile tüm elemanları toplayın
- Sonucu return ile döndürün

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    int sinyaller[5] = {10, 20, 30, 40, 50};
    int toplam = sinyalTopla(sinyaller);
    cout << "Toplam sinyal: " << toplam << endl;
    return 0;
}`,
    testCases: [
      {
        input: "sinyalTopla({10, 20, 30, 40, 50})",
        expectedOutput: "Toplam sinyal: 150",
        description: "Dizi toplama testi"
      }
    ],
    isActive: true,
    icon: "📡"
  },
  {
    id: 5,
    title: "Yakıt Sistemi",
    description: "Dizi İşleme",
    level: "beginner",
    concept: "Diziler ve fonksiyonlar",
    detailedExplanation: `
Bu modülde dizileri öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Dizi nedir ve nasıl tanımlanır?
- Dizi elemanlarına nasıl erişilir?
- Dizileri fonksiyonlara nasıl göndeririz?
- Döngülerle dizi işleme

📝 **Görev:**
Uzay gemisinin yakıt hücrelerinin doluluk oranlarını toplayan bir fonksiyon yazın.

💡 **İpucu:**
- int yakitTopla(int yakit[5]) fonksiyonu tanımlayın
- For döngüsü ile tüm elemanları toplayın
- Sonucu return ile döndürün

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    int yakit[5] = {80, 90, 70, 85, 95};
    int toplam = yakitTopla(yakit);
    cout << "Toplam yakıt: " << toplam << "%" << endl;
    return 0;
}`,
    testCases: [
      {
        input: "yakitTopla({80, 90, 70, 85, 95})",
        expectedOutput: "Toplam yakıt: 420%",
        description: "Yakıt toplama testi"
      }
    ],
    isActive: true,
    icon: "⛽"
  },
  {
    id: 6,
    title: "Güvenlik Sistemi",
    description: "Koşullu İfadeler",
    level: "beginner",
    concept: "If-else koşulları ve güvenlik kontrolleri",
    detailedExplanation: `
Bu modülde koşullu ifadeleri öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- If-else koşulları nasıl kullanılır?
- Karşılaştırma operatörleri (>, <, ==, !=)
- Mantıksal operatörler (&&, ||)
- Güvenlik kontrolleri nasıl yapılır?

📝 **Görev:**
Uzay gemisinin güvenlik sistemini kontrol etmek için bir fonksiyon yazın.

💡 **İpucu:**
- bool guvenlikKontrol(int sicaklik) fonksiyonu tanımlayın
- Sıcaklık 50'den büyükse false döndürün
- Sıcaklık 50'den küçük veya eşitse true döndürün
- Sonucu ekrana yazdırın

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    int sicaklik = 45;
    bool guvenli = guvenlikKontrol(sicaklik);
    if (guvenli) {
        cout << "Güvenlik durumu: GÜVENLİ" << endl;
    } else {
        cout << "Güvenlik durumu: TEHLİKELİ" << endl;
    }
    return 0;
}`,
    testCases: [
      {
        input: "guvenlikKontrol(45)",
        expectedOutput: "Güvenlik durumu: GÜVENLİ",
        description: "Güvenlik kontrol testi"
      }
    ],
    isActive: true,
    icon: "🔒"
  },
  {
    id: 7,
    title: "Navigasyon Sistemi",
    description: "Matematiksel Hesaplamalar",
    level: "beginner",
    concept: "Matematik fonksiyonları ve hesaplamalar",
    detailedExplanation: `
Bu modülde matematiksel hesaplamaları öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Matematik kütüphanesi nasıl kullanılır?
- Karekök hesaplama (sqrt)
- Kuvvet hesaplama (pow)
- Trigonometrik fonksiyonlar
- Mesafe hesaplama formülleri

📝 **Görev:**
Uzay gemisinin navigasyon sisteminde mesafe hesaplamak için bir fonksiyon yazın.

💡 **İpucu:**
- double mesafeHesapla(double x1, double y1, double x2, double y2) fonksiyonu tanımlayın
- Mesafe = √((x2-x1)² + (y2-y1)²) formülünü kullanın
- sqrt() fonksiyonunu kullanın
- Sonucu return ile döndürün

    `,
    exampleCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double x1 = 0, y1 = 0, x2 = 3, y2 = 4;
    double mesafe = mesafeHesapla(x1, y1, x2, y2);
    cout << "İki nokta arası mesafe: " << mesafe << " birim" << endl;
    return 0;
}`,
    testCases: [
      {
        input: "mesafeHesapla(0, 0, 3, 4)",
        expectedOutput: "İki nokta arası mesafe: 5 birim",
        description: "Mesafe hesaplama testi"
      }
    ],
    isActive: true,
    icon: "🧭"
  },
  {
    id: 8,
    title: "Kalkan Sistemi",
    description: "While Döngüsü",
    level: "beginner",
    concept: "While döngüsü ve sürekli kontrol",
    detailedExplanation: `
Bu modülde while döngüsünü öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- While döngüsü nasıl kullanılır?
- Koşul kontrolü nasıl yapılır?
- Döngü içinde sayaç nasıl artırılır?
- Sürekli kontrol sistemleri nasıl yazılır?

📝 **Görev:**
Uzay gemisinin kalkan sistemini sürekli kontrol etmek için bir fonksiyon yazın.

💡 **İpucu:**
- void kalkanKontrol(int maksimum) fonksiyonu tanımlayın
- While döngüsü ile 1'den maksimum'a kadar sayın
- Her adımda "Kalkan gücü: X%" yazdırın
- Döngü sonunda "Kalkan hazır!" yazdırın

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    kalkanKontrol(3);
    return 0;
}`,
    testCases: [
      {
        input: "kalkanKontrol(3)",
        expectedOutput: "Kalkan gücü: 1%\nKalkan gücü: 2%\nKalkan gücü: 3%\nKalkan hazır!",
        description: "Kalkan kontrol döngüsü"
      }
    ],
    isActive: true,
    icon: "🛡️"
  },
  {
    id: 9,
    title: "Sensör Sistemi",
    description: "Switch-Case Yapısı",
    level: "beginner",
    concept: "Switch-case ve çoklu seçim yapıları",
    detailedExplanation: `
Bu modülde switch-case yapısını öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- Switch-case nasıl kullanılır?
- Break komutu ne işe yarar?
- Default case nedir?
- Çoklu seçim yapıları nasıl yazılır?

📝 **Görev:**
Uzay gemisinin sensör sisteminde farklı sensör türlerini kontrol etmek için bir fonksiyon yazın.

💡 **İpucu:**
- void sensorKontrol(int sensorTipi) fonksiyonu tanımlayın
- Switch-case ile farklı sensör türlerini kontrol edin
- 1: "Sıcaklık sensörü aktif"
- 2: "Basınç sensörü aktif"
- 3: "Hız sensörü aktif"
- Default: "Bilinmeyen sensör"

    `,
    exampleCode: `#include <iostream>
using namespace std;

int main() {
    sensorKontrol(2);
    return 0;
}`,
    testCases: [
      {
        input: "sensorKontrol(2)",
        expectedOutput: "Basınç sensörü aktif",
        description: "Sensör kontrol testi"
      }
    ],
    isActive: true,
    icon: "📊"
  },
  {
    id: 10,
    title: "Komut Sistemi",
    description: "String İşleme",
    level: "beginner",
    concept: "String veri tipi ve metin işleme",
    detailedExplanation: `
Bu modülde string işlemlerini öğreneceksiniz:

🎯 **Öğrenme Hedefleri:**
- String veri tipi nasıl kullanılır?
- String fonksiyonları nelerdir?
- Metin karşılaştırma nasıl yapılır?
- Komut işleme sistemleri nasıl yazılır?

📝 **Görev:**
Uzay gemisinin komut sisteminde komutları işlemek için bir fonksiyon yazın.

💡 **İpucu:**
- void komutIsle(string komut) fonksiyonu tanımlayın
- If-else ile farklı komutları kontrol edin
- "baslat": "Sistem başlatılıyor..."
- "durdur": "Sistem durduruluyor..."
- "durum": "Sistem durumu: AKTİF"
- Diğer: "Bilinmeyen komut: [komut]"

    `,
    exampleCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    komutIsle("baslat");
    return 0;
}`,
    testCases: [
      {
        input: "komutIsle(\"baslat\")",
        expectedOutput: "Sistem başlatılıyor...",
        description: "Komut işleme testi"
      }
    ],
    isActive: true,
    icon: "⌨️"
  }
];

export const getModulesByLevel = (level: string): Module[] => {
  return modules.filter(module => module.level === level);
};

export const getModuleById = (id: number): Module | undefined => {
  return modules.find(module => module.id === id);
};
