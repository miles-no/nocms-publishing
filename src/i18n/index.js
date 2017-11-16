const dictionary = require('./dictionary');

// @TODO Dictionary should get lang from global scope
module.exports = (phraseKey, lang) => {
  if (!dictionary[phraseKey] || !dictionary[phraseKey][lang]) {
    return phraseKey;
  }

  return dictionary[phraseKey][lang];
};
