import { Spec } from '../models/Spec';
import { Role } from 'src/app/home/models/Class';
import { getSpecs } from './getSpecs';

export function getRoleSpecs(role: Role): Spec[] {
  const specs = getSpecs();

  if (role === Role.Tank) {
    return specs.filter((s) => s.role === Role.Tank).map((x) => x.spec);
  }

  if (role === Role.Healer) {
    return specs.filter((sx) => sx.role === Role.Healer).map((x) => x.spec);
  }

  if (role === Role.MeleeDPS || role === Role.RangedDPS) {
    return specs
      .filter((sx) => sx.role === Role.MeleeDPS || sx.role === Role.RangedDPS)
      .map((x) => x.spec);
  }
}
