const fs = require("fs").promises;
const pvp = require("./pvp");
const mplus = require("./mplus");

async function writeData(fileName, threes) {
  await fs.writeFile(
    __dirname + `/../src/assets/data/${fileName}.json`,
    JSON.stringify(threes)
  );
}

(async () => {
  const mp = await mplus.aggregateMplus();
  await writeData("mplus", mp);
  return;
  const threes = await pvp.aggregatePvpBracket("3v3");
  const twos = await pvp.aggregatePvpBracket("2v2");

  // console.log(await pvp3page1.text());
  await writeData("3v3", threes);
  await writeData("2v2", twos);
})();
