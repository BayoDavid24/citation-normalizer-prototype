const fs = require("fs")
const { Cite } = require("@citation-js/core")

require("@citation-js/plugin-ris")
require("@citation-js/plugin-bibtex")

function parseFile(filePath) {

  const content = fs.readFileSync(filePath, "utf8")

  const cite = new Cite(content)

  const data = cite.data

  const normalized = data.map(item => ({
    title: item.title,
    authors: item.author
      ? item.author.map(a => `${a.family}, ${a.given}`)
      : [],
    year: item.issued ? item.issued["date-parts"][0][0] : null,
    journal: item["container-title"],
    doi: item.DOI
  }))

  return normalized
}

module.exports = parseFile