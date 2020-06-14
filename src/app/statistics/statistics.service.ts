import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpecStatistics } from './models/SpecStatistics';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { PlayerRecord } from './models/PlayerRecord';
import {
  getSpecs,
  Role,
  organizePlayers,
  SpecDefinition,
} from './models/SpecDefinition';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public specs: BehaviorSubject<SpecStatistics[]> = new BehaviorSubject<
    SpecStatistics[]
  >([]);

  constructor(private http: HttpClient) {}

  public gatherData() {
    const sub = combineLatest(
      this.http.get<PlayerRecord[]>('/assets/data/2v2.json'),
      this.http.get<PlayerRecord[]>('/assets/data/3v3.json')
    ).subscribe((results) => {
      const [twos, threes] = results;
      this.calculateStatistics(twos, threes);
      sub.unsubscribe();
    });
  }

  private calculateStatistics(twos: PlayerRecord[], threes: PlayerRecord[]) {
    const specs = getSpecs();
    const calculated = [];

    specs.forEach((spec) => {
      const twosRatio = this.calculatePvpStats(twos, spec);
      const threesRatio = this.calculatePvpStats(threes, spec);

      let stats = new SpecStatistics(
        spec.class,
        spec.spec,
        twosRatio,
        threesRatio,
        '2/10',
        '3/10'
      );

      calculated.push(stats);
    });
    this.specs.next(calculated);
  }

  private calculatePvpStats(players: PlayerRecord[], spec: SpecDefinition) {
    const { healers, damage, tanks } = organizePlayers(players);

    const total = players.filter(
      (p) => p.class === spec.class && p.spec === spec.spec
    ).length;

    let totalRole = 0;
    if (spec.role === Role.Healer) {
      totalRole = healers.length;
    } else if (spec.role === Role.MeleeDPS || spec.role === Role.RangedDPS) {
      totalRole = damage.length;
    } else if (spec.role === Role.Tank) {
      totalRole = tanks.length;
    }

    return `${total}/${totalRole}`;
  }
}
