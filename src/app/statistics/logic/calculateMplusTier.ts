import { getRole } from './getRole';
import { Role } from '../models/Role';
import { getRoleSpecs } from './getRoleSpecs';

export function calculateMplusTier(
  klass: string,
  spec: string,
  percentage: number
) {
  const role = getRole(klass, spec);

  const roleSpecs = getRoleSpecs(role);
  const average = 100 / roleSpecs.length;
  const stdDev = average / 2;
  const stdDevExtreme = average / 4;

  const caps = {
    highest: average + stdDev + stdDevExtreme,
    upper: average + stdDev,
    lower: average - stdDev,
    lowest: average - stdDev - stdDevExtreme,
  };

  if (percentage > caps.highest) {
    return 'S';
  }

  if (percentage > caps.upper) {
    return 'A';
  }

  if (percentage > caps.lower) {
    return 'B';
  }

  if (percentage > caps.lowest) {
    return 'C';
  }

  return 'D';
}
