import { uptime } from 'process';
import { getRoleSpecs } from '../logic/getRoleSpecs';
import { getRole } from '../logic/getRole';
import { Role } from './Role';
import { calculatePvpTier } from '../logic/calculatePvpTier';
import { calculateMplusTier } from '../logic/calculateMplusTier';

export class SpecStatistics {
  // new SpecStatistics('warrior', 'arms', '84/1000', '75/1000', '100/500', '204/500')
  constructor(
    klass: string,
    spec: string,
    twos: string,
    threes: string,
    raiding: string,
    mplus: string
  ) {
    this.klass = klass;
    this.spec = spec;

    [this.twos, this.twosSampleSize] = twos.split('/').map((s) => parseInt(s));
    [this.threes, this.threesSampleSize] = threes
      .split('/')
      .map((s) => parseInt(s));
    [this.raiding, this.raidingSampleSize] = raiding
      .split('/')
      .map((s) => parseInt(s));
    [this.mplus, this.mplusSampleSize] = mplus
      .split('/')
      .map((s) => parseInt(s));

    this.percent = {
      twos: (this.twos / this.twosSampleSize) * 100,
      threes: (this.threes / this.threesSampleSize) * 100,
      raiding: null,
      mplus: (this.mplus / this.mplusSampleSize) * 100,
    };

    // Calculate tier
    this.twosTier = calculatePvpTier(this.klass, this.spec, this.percent.twos);
    this.mplusTier = calculateMplusTier(
      this.klass,
      this.spec,
      this.percent.mplus
    );

    console.log(
      '2v2',
      this.klass,
      this.spec,
      this.twos,
      this.twosSampleSize,
      this.twosTier
    );
    this.threesTier = calculatePvpTier(
      this.klass,
      this.spec,
      this.percent.threes
    );
    console.log(
      '3v3',
      this.klass,
      this.spec,
      this.threes,
      this.threesSampleSize,
      this.threesTier
    );
  }

  public klass: string;
  public spec: string;

  public twos: number;
  public twosSampleSize: number;
  public twosTier: string;

  public threes: number;
  public threesSampleSize: number;
  public threesTier: string;

  public raiding: number;
  public raidingSampleSize: number;
  public raidingTier: string;

  public mplus: number;
  public mplusSampleSize: number;
  public mplusTier: string;

  public percent: {
    twos: number;
    threes: number;
    raiding: number;
    mplus: number;
  };
}
