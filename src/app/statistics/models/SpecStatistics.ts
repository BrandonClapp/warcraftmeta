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
  }
  private klass: string;
  private spec: string;

  private twos: number;
  private twosSampleSize: number;

  private threes: number;
  private threesSampleSize: number;

  private raiding: number;
  private raidingSampleSize: number;

  private mplus: number;
  private mplusSampleSize: number;

  public get percentRole2s(): number {
    return (this.twos / this.twosSampleSize) * 100;
  }

  public get percentRole3s(): number {
    return (this.threes / this.threesSampleSize) * 100;
  }
}
