import { Role } from '../models/Role';
import { getSpecs } from './getSpecs';

export function getRole(klass: string, spec: string): Role {
  return getSpecs().find((s) => s.class === klass && s.spec === spec).role;
}
