import { Component, OnInit } from '@angular/core';
import { Class, Role } from './models/Class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public classes: Class[] = [
    {
      id: 'shaman',
      name: 'Shaman',
      color: '0070de',
      roles: [Role.Healer, Role.Damage],
    },
    {
      id: 'death-knight',
      name: 'Death Knight',
      color: 'c41f3b',
      roles: [Role.Tank, Role.Damage],
    },
    {
      id: 'demon-hunter',
      name: 'Demon Hunter',
      color: 'a330c9',
      roles: [Role.Tank, Role.Damage],
    },
    {
      id: 'warrior',
      name: 'Warrior',
      color: 'c79c6e',
      roles: [Role.Tank, Role.Damage],
    },
    { id: 'warlock', name: 'Warlock', color: '9482c9', roles: [Role.Damage] },
    { id: 'rogue', name: 'Rogue', color: 'fff569', roles: [Role.Damage] },
    {
      id: 'priest',
      name: 'Priest',
      color: 'ffffff',
      roles: [Role.Healer, Role.Damage],
    },
    {
      id: 'paladin',
      name: 'Paladin',
      color: 'f58cba',
      roles: [Role.Tank, Role.Healer, Role.Damage],
    },
    {
      id: 'monk',
      name: 'Monk',
      color: '00ff96',
      roles: [Role.Tank, Role.Healer, Role.Damage],
    },
    { id: 'mage', name: 'Mage', color: '69ccf0', roles: [Role.Damage] },
    { id: 'hunter', name: 'Hunter', color: 'abd473', roles: [Role.Damage] },
    {
      id: 'druid',
      name: 'Druid',
      color: 'ff7d0a',
      roles: [Role.Tank, Role.Healer, Role.Damage],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
