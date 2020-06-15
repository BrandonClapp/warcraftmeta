import { Spec } from './Spec';
import { Role } from './Role';

export interface SpecDefinition {
  class: string;
  spec: Spec;
  role: Role;
}
