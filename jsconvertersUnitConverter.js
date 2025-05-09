export default class UnitConverter {
  constructor(unitsData) {
    this.units = unitsData;
  }

  convert(value, fromUnit, toUnit) {
    const from = this._findUnit(fromUnit);
    const to = this._findUnit(toUnit);

    if (!from || !to) return null;

    // Temperature requires special handling
    if (from.type === 'temp' && to.type === 'temp') {
      return this._convertTemperature(value, from.symbol, to.symbol);
    }

    // Standard unit conversion
    return (value * from.factor) / to.factor;
  }

  _findUnit(nameOrSymbol) {
    for (const category in this.units) {
      const unit = this.units[category].find(u => 
        u.name === nameOrSymbol || u.symbol === nameOrSymbol
      );
      if (unit) return unit;
    }
    return null;
  }

  _convertTemperature(value, from, to) {
    if (from === '°C' && to === '°F') return (value * 9/5) + 32;
    if (from === '°F' && to === '°C') return (value - 32) * 5/9;
    if (from === 'K' && to === '°C') return value - 273.15;
    if (from === '°C' && to === 'K') return value + 273.15;
    if (from === '°F' && to === 'K') return ((value - 32) * 5/9) + 273.15;
    if (from === 'K' && to === '°F') return ((value - 273.15) * 9/5) + 32;
    return value; // Same unit
  }

  getUnits() {
    const flat = [];
    for (const category in this.units) {
      flat.push(...this.units[category].map(u => u.name));
    }
    return [...new Set(flat)]; // Deduplicate
  }
}