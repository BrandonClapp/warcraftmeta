export function getClassColor(klass: string): { bg: string; color: string } {
  if (klass === 'shaman' || klass === 'Shaman') {
    return { bg: '#0070de', color: '#fff' };
  }

  if (klass === 'death-knight' || klass === 'Death Knight') {
    return { bg: '#c41f3b', color: '#fff' };
  }

  if (klass === 'demon-hunter' || klass === 'Demon Hunter') {
    return { bg: '#a330c9', color: '#fff' };
  }

  if (klass === 'warrior' || klass === 'Warrior') {
    return { bg: '#c79c6e', color: '#fff' };
  }

  if (klass === 'warlock' || klass === 'Warlock') {
    return { bg: '#9482c9', color: '#fff' };
  }

  if (klass === 'priest' || klass === 'Priest') {
    return { bg: '#ccc', color: '#fff' };
  }

  if (klass === 'rogue' || klass === 'Rogue') {
    return { bg: '#fff569', color: '#fff' };
  }

  if (klass === 'paladin' || klass === 'Paladin') {
    return { bg: '#f58cba', color: '#fff' };
  }

  if (klass === 'monk' || klass === 'Monk') {
    return { bg: '#00ff96', color: '#fff' };
  }
  if (klass === 'mage' || klass === 'Mage') {
    return { bg: '#69ccf0', color: '#fff' };
  }

  if (klass === 'hunter' || klass === 'Hunter') {
    return { bg: '#abd473', color: '#fff' };
  }

  if (klass === 'druid' || klass === 'Druid') {
    return { bg: '#ff7d0a', color: '#fff' };
  }
}
