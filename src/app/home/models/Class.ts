export enum Role {
  Tank = 'tank',
  Healer = 'healer',
  Damage = 'damage',
}

export interface Class {
  id: string;
  name: string;
  color: string;
  roles: Role[];
}
