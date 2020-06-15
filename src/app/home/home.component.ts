import { Component, OnInit } from '@angular/core';
import { Class, Role, getDefaultClasses } from './models/Class';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { StatisticsService } from '../statistics/statistics.service';
import { SpecStatistics } from '../statistics/models/SpecStatistics';
import { getClassColor } from './logic/getClassColor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public reqTank$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public reqHealer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public reqMeleeDps$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public reqRangedDps$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public survivability$: BehaviorSubject<number> = new BehaviorSubject<number>(
    1
  );
  public survivabilityLabel$: BehaviorSubject<string> = new BehaviorSubject<
    string
  >('Not Important');
  public versatility$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public versatilityLabel$: BehaviorSubject<string> = new BehaviorSubject<
    string
  >('Not Important');

  public mobility$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public mobilityLabel$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Not Important'
  );

  public utility$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public utilityLabel$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Not Important'
  );

  public selectedClass$: BehaviorSubject<Class> = new BehaviorSubject<Class>(
    undefined
  );

  public classes$: Observable<Class[]>;

  public specStats$: Observable<SpecStatistics[]> = this.stats.specs;
  public tierList$: Observable<any> = this.stats.tierList;

  constructor(public stats: StatisticsService) {
    this.classes$ = combineLatest(
      this.reqTank$,
      this.reqHealer$,
      this.reqMeleeDps$,
      this.reqRangedDps$,
      this.survivability$,
      this.versatility$,
      this.mobility$,
      this.utility$,
      this.specStats$
    ).pipe(
      map((x) => {
        const tank = x[0];
        const healer = x[1];
        const melee = x[2];
        const ranged = x[3];
        const survivability = x[4];
        const versatility = x[5];
        const mobility = x[6];
        const utility = x[7];
        const specStatz = x[8];

        let classes = getDefaultClasses().filter((c) => {
          const roles = [
            tank ? Role.Tank : undefined,
            healer ? Role.Healer : undefined,
            melee ? Role.MeleeDPS : undefined,
            ranged ? Role.RangedDPS : undefined,
          ].filter((item) => !_.isNil(item));

          const fitsRoles = this.includesAll(c.roles, roles);

          if (!fitsRoles) {
            return false;
          }

          const isSurvivable = c.survivability >= survivability;
          if (!isSurvivable) {
            return false;
          }

          const isVersitile = c.roles.length >= versatility;
          if (!isVersitile) {
            return false;
          }

          const isMobile = c.mobility >= mobility;
          if (!isMobile) {
            return false;
          }

          const isUtility = c.utility >= utility;
          if (!isUtility) {
            return false;
          }

          return true;
        });

        classes = classes.map((c) => {
          return {
            ...c,
            specStats: specStatz.filter((ss) => ss.klass === c.name),
          };
        });

        return classes;
      })
    );
  }

  ngOnInit() {
    this.stats.gatherData();
  }

  reqRoleChanged(role: string, event) {
    if (role === Role.Tank) {
      this.reqTank$.next(event.checked);
    } else if (role === Role.Healer) {
      this.reqHealer$.next(event.checked);
    } else if (role === Role.MeleeDPS) {
      this.reqMeleeDps$.next(event.checked);
    } else if (role === Role.RangedDPS) {
      this.reqRangedDps$.next(event.checked);
    }
  }

  sliderChanged(type: string, event) {
    if (type === 'survivability') {
      this.survivability$.next(event.value);
      this.survivabilityLabel$.next(this.toLabel(event.value));
    } else if (type === 'versatility') {
      this.versatility$.next(event.value);
      this.versatilityLabel$.next(this.toLabel(event.value));
    } else if (type === 'mobility') {
      this.mobility$.next(event.value);
      this.mobilityLabel$.next(this.toLabel(event.value));
    } else if (type === 'utility') {
      this.utility$.next(event.value);
      this.utilityLabel$.next(this.toLabel(event.value));
    }
  }

  selectClass(klass: Class) {
    this.selectedClass$.next(klass);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectClass2(klass: string) {
    // const selected = this.classes$.getValue().find((c) => c.name === klass);
    //this.selectedClass$.next(selected);
  }

  // getTier(bracket: string, spec: Spec, specStats: SpecStatistics[]) {
  //   const correctSpec = specStats.find((ss) => ss.spec === spec);
  //   if (bracket === '2v2') {
  //     return correctSpec.twosTier || '';
  //   }

  //   if (bracket === '3v3') {
  //     return correctSpec.threesTier || '';
  //   }
  // }

  tierClass(tier: string) {
    return tier ? tier.toLowerCase() + '-tier' : null;
  }

  private includesAll(arr: any[], values: any[]): boolean {
    return values.every((value) => {
      return arr.includes(value);
    });
  }

  getClassColor(klass: string) {
    const color = getClassColor(klass);
    return color;
  }

  private toLabel(value: string) {
    const level = parseInt(value, 10);
    if (level === 1) {
      return 'Not Important';
    } else if (level === 2) {
      return 'Somewhat Important';
    } else if (level === 3) {
      return 'Very Important';
    } else if (level === 4) {
      return 'Critically Important';
    }
  }
}
