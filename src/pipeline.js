const fs = require("fs");

const parseFile = require("./parser");
const dedupe = require("./dedupe");
const enrich = require("./enrich");

async function run() {

  console.log("Parsing RIS file...");

  let records = parseFile("./input/sample_scopus.ris");
  
  console.log("Input records:", records.length);

  const deduped = dedupe(records);

  console.log("After dedupe:", deduped.length);

  const enriched = [];

  for (let r of deduped) {

    const e = await enrich(r);

    enriched.push(e);
  }

  fs.writeFileSync(
    "./output/normalized.json",
    JSON.stringify(enriched, null, 2)
  );

  console.log("Normalized dataset saved.");
}

run();