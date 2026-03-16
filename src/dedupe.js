const stringSimilarity = require("string-similarity");

function dedupe(records) {
  const unique = [];
  const seenDOI = new Set();

  for (let rec of records) {

    if (rec.doi && seenDOI.has(rec.doi)) {
      continue;
    }

    let duplicate = unique.find(u =>
      stringSimilarity.compareTwoStrings(
        u.title.toLowerCase(),
        rec.title.toLowerCase()
      ) > 0.95
    );

    if (!duplicate) {
      unique.push(rec);
      if (rec.doi) seenDOI.add(rec.doi);
    }
  }

  return unique;
}

module.exports = dedupe;