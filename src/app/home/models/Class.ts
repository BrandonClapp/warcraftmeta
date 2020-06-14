export enum Role {
  Tank = 'tank',
  Healer = 'healer',
  RangedDPS = 'ranged',
  MeleeDPS = 'melee',
}

export enum Survivability {
  Bad = 1,
  Decent = 2,
  Good = 3,
  Great = 4,
}

export enum Mobility {
  Bad = 1,
  Decent = 2,
  Good = 3,
  Great = 4,
}

export enum Utility {
  Bad = 1,
  Decent = 2,
  Good = 3,
  Great = 4,
}

export interface Class {
  id: string;
  name: string;
  color: string;
  roles: Role[];
  survivability: Survivability;
  mobility: Mobility;
  utility: Utility;
  specs: string[];
}

export function getDefaultClasses(): Class[] {
  return [
    {
      id: 'shaman',
      name: 'Shaman',
      color: '0070de',
      roles: [Role.Healer, Role.MeleeDPS, Role.RangedDPS],
      survivability: Survivability.Good,
      mobility: Mobility.Decent,
      utility: Utility.Great,
      specs: ['Restoration', 'Enhancement', 'Elemental'],
    },
    {
      id: 'death-knight',
      name: 'Death Knight',
      color: 'c41f3b',
      roles: [Role.Tank, Role.MeleeDPS],
      survivability: Survivability.Great,
      mobility: Mobility.Bad,
      utility: Utility.Decent,
      specs: ['Blood', 'Frost', 'Unholy'],
    },
    {
      id: 'demon-hunter',
      name: 'Demon Hunter',
      color: 'a330c9',
      roles: [Role.Tank, Role.MeleeDPS],
      survivability: Survivability.Great,
      mobility: Mobility.Great,
      utility: Utility.Bad,
      specs: ['Vengeance', 'Havoc'],
    },
    {
      id: 'warrior',
      name: 'Warrior',
      color: 'c79c6e',
      roles: [Role.Tank, Role.MeleeDPS],
      survivability: Survivability.Decent,
      mobility: Mobility.Great,
      utility: Utility.Decent,
      specs: ['Protection', 'Arms', 'Fury'],
    },
    {
      id: 'warlock',
      name: 'Warlock',
      color: '9482c9',
      roles: [Role.RangedDPS],
      survivability: Survivability.Decent,
      mobility: Mobility.Bad,
      utility: Utility.Good,
      specs: ['Affliction', 'Demonolgy', 'Destruction'],
    },
    {
      id: 'rogue',
      name: 'Rogue',
      color: 'fff569',
      roles: [Role.MeleeDPS],
      survivability: Survivability.Bad,
      mobility: Mobility.Decent,
      utility: Utility.Bad,
      specs: ['Subtlty', 'Assassin', 'Outlaw'],
    },
    {
      id: 'priest',
      name: 'Priest',
      color: 'ffffff',
      roles: [Role.Healer, Role.RangedDPS],
      survivability: Survivability.Good,
      mobility: Mobility.Bad,
      utility: Utility.Great,
      specs: ['Holy', 'Discipline', 'Shadow'],
    },
    {
      id: 'paladin',
      name: 'Paladin',
      color: 'f58cba',
      roles: [Role.Tank, Role.Healer, Role.MeleeDPS],
      survivability: Survivability.Great,
      mobility: Mobility.Bad,
      utility: Utility.Great,
      specs: ['Holy', 'Protection', 'Retribution'],
    },
    {
      id: 'monk',
      name: 'Monk',
      color: '00ff96',
      roles: [Role.Tank, Role.Healer, Role.MeleeDPS],
      survivability: Survivability.Good,
      mobility: Mobility.Great,
      utility: Utility.Bad,
      specs: ['Brewmaster', 'Mistweaver', 'Windwalker'],
    },
    {
      id: 'mage',
      name: 'Mage',
      color: '69ccf0',
      roles: [Role.RangedDPS],
      survivability: Survivability.Bad,
      mobility: Mobility.Good,
      utility: Utility.Bad,
      specs: ['Fire', 'Frost', 'Arcane'],
    },
    {
      id: 'hunter',
      name: 'Hunter',
      color: 'abd473',
      roles: [Role.RangedDPS, Role.MeleeDPS],
      survivability: Survivability.Bad,
      mobility: Mobility.Great,
      utility: Utility.Bad,
      specs: ['Beast Mastery', 'Marksmanship', 'Survival'],
    },
    {
      id: 'druid',
      name: 'Druid',
      color: 'ff7d0a',
      roles: [Role.Tank, Role.Healer, Role.MeleeDPS, Role.RangedDPS],
      survivability: Survivability.Good,
      mobility: Mobility.Good,
      utility: Utility.Good,
      specs: ['Guardian', 'Feral', 'Balance', 'Restoration'],
    },
  ];
}
