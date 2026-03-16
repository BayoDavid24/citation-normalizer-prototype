const axios = require("axios");

async function enrich(record) {

  if (!record.doi) return record;

  try {

    const res = await axios.get(
      `https://api.crossref.org/works/${record.doi}`
    );

    const data = res.data.message;

    return {
      ...record,
      abstract: data.abstract || null,
      publisher: data.publisher || null
    };

  } catch (err) {

    console.log("CrossRef lookup failed:", record.doi);

    return record;
  }
}

module.exports = enrich;