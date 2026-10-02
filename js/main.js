import UnitConverter from './converters/UnitConverter.js';
import Storage from './utils/storage.js';

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  const theme = Storage.getTheme();
  document.documentElement.setAttribute('data-theme', theme);

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';

  const response = await fetch('data/units.json');
  const unitsData = await response.json();
  const converter = new UnitConverter(unitsData);

  const fromSelect = document.getElementById('from-unit');
  const toSelect = document.getElementById('to-unit');
  const resultSection = document.getElementById('result-section');
  const historyBody = document.getElementById('history-body');
  const history = Storage.getHistory();

  // Populate unit selects
  const units = converter.getUnits();
  [fromSelect, toSelect].forEach(select => {
    units.forEach(unit => {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      select.appendChild(option);
    });
  });

  // Handle form submission
  document.getElementById('converter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseFloat(document.getElementById('input-value').value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!value || from === to) {
      resultSection.textContent = from === to ? 
        'Please select different units.' : 
        'Enter a valid number.';
      return;
    }

    const result = converter.convert(value, from, to);
    resultSection.textContent = `${value} ${from} = ${result.toFixed(4)} ${to}`;

    // Save to history
    const timestamp = new Date().toLocaleString();
    const entry = { value, from, to, result, timestamp };
    history.unshift(entry);
    Storage.saveHistory(history);
    renderHistory();
  });

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    Storage.saveTheme(next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // Clear history
  document.getElementById('clear-history').addEventListener('click', () => {
    Storage.clearHistory();
    history.length = 0;
    renderHistory();
  });

  function renderHistory() {
    historyBody.innerHTML = '';
    history.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.value}</td>
        <td>${entry.from}</td>
        <td>${entry.to}</td>
        <td>${entry.result.toFixed(4)}</td>
        <td>${entry.timestamp}</td>
      `;
      historyBody.appendChild(row);
    });
  }

  renderHistory();
});