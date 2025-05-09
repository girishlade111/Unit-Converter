export default class Storage {
  static saveHistory(history) {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }

  static getHistory() {
    return JSON.parse(localStorage.getItem('conversionHistory') || '[]');
  }

  static clearHistory() {
    localStorage.removeItem('conversionHistory');
  }

  static getTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  static saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }
}