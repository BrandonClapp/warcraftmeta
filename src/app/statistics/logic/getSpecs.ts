import { Spec } from '../models/Spec';
import { Role } from 'src/app/home/models/Class';
import { SpecDefinition } from '../models/SpecDefinition';

export function getSpecs(): SpecDefinition[] {
  return [
    {
      class: 'Monk',
      spec: Spec.Brewmaster,
      role: Role.Tank,
    },
    {
      class: 'Monk',
      spec: Spec.Mistweaver,
      role: Role.Healer,
    },
    {
      class: 'Monk',
      spec: Spec.Windwalker,
      role: Role.MeleeDPS,
    },
    {
      class: 'Shaman',
      spec: Spec.Restoration,
      role: Role.Healer,
    },
    {
      class: 'Shaman',
      spec: Spec.Enhancement,
      role: Role.MeleeDPS,
    },
    {
      class: 'Shaman',
      spec: Spec.Elemental,
      role: Role.RangedDPS,
    },
    {
      class: 'Death Knight',
      spec: Spec.Blood,
      role: Role.Tank,
    },
    {
      class: 'Death Knight',
      spec: Spec.Unholy,
      role: Role.MeleeDPS,
    },
    {
      class: 'Death Knight',
      spec: Spec.Frost,
      role: Role.MeleeDPS,
    },
    {
      class: 'Demon Hunter',
      spec: Spec.Vengeance,
      role: Role.Tank,
    },
    {
      class: 'Demon Hunter',
      spec: Spec.Havoc,
      role: Role.MeleeDPS,
    },
    {
      class: 'Warrior',
      spec: Spec.Protection,
      role: Role.Tank,
    },
    {
      class: 'Warrior',
      spec: Spec.Arms,
      role: Role.MeleeDPS,
    },
    {
      class: 'Warrior',
      spec: Spec.Fury,
      role: Role.MeleeDPS,
    },
    {
      class: 'Warlock',
      spec: Spec.Affliction,
      role: Role.RangedDPS,
    },
    {
      class: 'Warlock',
      spec: Spec.Demonology,
      role: Role.RangedDPS,
    },
    {
      class: 'Warlock',
      spec: Spec.Destruction,
      role: Role.RangedDPS,
    },
    {
      class: 'Rogue',
      spec: Spec.Subtlty,
      role: Role.MeleeDPS,
    },
    {
      class: 'Rogue',
      spec: Spec.Assassination,
      role: Role.MeleeDPS,
    },
    {
      class: 'Rogue',
      spec: Spec.Outlaw,
      role: Role.MeleeDPS,
    },
    {
      class: 'Priest',
      spec: Spec.Discipline,
      role: Role.Healer,
    },
    {
      class: 'Priest',
      spec: Spec.Holy,
      role: Role.Healer,
    },
    {
      class: 'Priest',
      spec: Spec.Shadow,
      role: Role.RangedDPS,
    },
    {
      class: 'Paladin',
      spec: Spec.Protection,
      role: Role.Tank,
    },
    {
      class: 'Paladin',
      spec: Spec.Holy,
      role: Role.Healer,
    },
    {
      class: 'Paladin',
      spec: Spec.Retribution,
      role: Role.MeleeDPS,
    },
    {
      class: 'Mage',
      spec: Spec.Frost,
      role: Role.RangedDPS,
    },
    {
      class: 'Mage',
      spec: Spec.Fire,
      role: Role.RangedDPS,
    },
    {
      class: 'Mage',
      spec: Spec.Arcane,
      role: Role.RangedDPS,
    },
    {
      class: 'Hunter',
      spec: Spec.BeastMastery,
      role: Role.RangedDPS,
    },
    {
      class: 'Hunter',
      spec: Spec.Marksmanship,
      role: Role.RangedDPS,
    },
    {
      class: 'Hunter',
      spec: Spec.Survival,
      role: Role.MeleeDPS,
    },
    {
      class: 'Druid',
      spec: Spec.Guardian,
      role: Role.Tank,
    },
    {
      class: 'Druid',
      spec: Spec.Feral,
      role: Role.MeleeDPS,
    },
    {
      class: 'Druid',
      spec: Spec.Balance,
      role: Role.RangedDPS,
    },
    {
      class: 'Druid',
      spec: Spec.Restoration,
      role: Role.Healer,
    },
  ];
}
