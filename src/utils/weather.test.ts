import { describe, it, expect } from 'vitest';
import { getWeatherInfo, DAY_NAMES_HU } from './weather';

describe('weather utils', () => {
  it('returns weather info for known code', () => {
    const info = getWeatherInfo(0);

    expect(info).toEqual({ label: 'Tiszta idő', icon: '☀️' });
  });

  it('returns unknown info for unsupported code', () => {
    const info = getWeatherInfo(999);

    expect(info).toEqual({ label: 'Ismeretlen', icon: '❓' });
  });

  it('provides Hungarian day names', () => {
    expect(DAY_NAMES_HU[0]).toBe('Vasárnap');
    expect(DAY_NAMES_HU[6]).toBe('Szombat');
  });
});
