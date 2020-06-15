import { getRole } from './getRole';
import { Role } from '../models/Role';
import { getRoleSpecs } from './getRoleSpecs';
import { LowerCasePipe } from '@angular/common';

export function calculatePvpTier(
  klass: string,
  spec: string,
  percentage: number
) {
  const role = getRole(klass, spec);

  if (role === Role.Tank) {
    return null;
  }

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
