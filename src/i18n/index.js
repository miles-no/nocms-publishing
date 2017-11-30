import dictionary from './dictionary';

// @TODO Dictionary should get lang from global scope
export default (phraseKey, lang) => {
  if (!dictionary[phraseKey] || !dictionary[phraseKey][lang]) {
    return phraseKey;
  }

  return dictionary[phraseKey][lang];
};
