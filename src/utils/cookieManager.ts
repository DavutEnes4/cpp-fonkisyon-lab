// Cookie yönetimi için utility fonksiyonları
export class CookieManager {
  // Cookie'den değer oku
  static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    return null;
  }

  // Cookie'ye değer yaz
  static setCookie(name: string, value: string, days: number = 365): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  // Cookie'yi sil
  static deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  // Tamamlanan modülleri al
  static getCompletedModules(): number[] {
    const completed = this.getCookie('completedModules');
    if (completed) {
      try {
        return JSON.parse(completed);
      } catch (error) {
        console.error('Tamamlanan modüller parse hatası:', error);
        return [];
      }
    }
    return [];
  }

  // Modülü tamamlandı olarak işaretle
  static markModuleCompleted(moduleId: number): void {
    const completed = this.getCompletedModules();
    if (!completed.includes(moduleId)) {
      completed.push(moduleId);
      this.setCookie('completedModules', JSON.stringify(completed));
    }
  }

  // Modülü tamamlanmamış olarak işaretle
  static markModuleIncomplete(moduleId: number): void {
    const completed = this.getCompletedModules();
    const updated = completed.filter(id => id !== moduleId);
    this.setCookie('completedModules', JSON.stringify(updated));
  }

  // Modülün tamamlanıp tamamlanmadığını kontrol et
  static isModuleCompleted(moduleId: number): boolean {
    const completed = this.getCompletedModules();
    return completed.includes(moduleId);
  }

  // Tüm modül durumlarını sıfırla
  static resetAllModules(): void {
    this.deleteCookie('completedModules');
  }

  // Modül ilerlemesini al (yüzde olarak)
  static getProgressPercentage(totalModules: number): number {
    const completed = this.getCompletedModules();
    return (completed.length / totalModules) * 100;
  }
}

