import { PlayerRecord } from '../models/PlayerRecord';
import { getRoleSpecs } from './getRoleSpecs';
import { Spec } from '../models/Spec';
import { Role } from '../models/Role';

export function organizePlayers(
  players: PlayerRecord[]
): {
  healers: PlayerRecord[];
  damage: PlayerRecord[];
  tanks: PlayerRecord[];
} {
  const tankSpecs = getRoleSpecs(Role.Tank);
  const healerSpecs = getRoleSpecs(Role.Healer);
  const damageSpecs = getRoleSpecs(Role.MeleeDPS);

  const healers = players.filter((p) => healerSpecs.includes(p.spec as Spec));
  const damage = players.filter((p) => damageSpecs.includes(p.spec as Spec));
  const tanks = players.filter((p) => tankSpecs.includes(p.spec as Spec));

  return {
    healers,
    damage,
    tanks,
  };
}
