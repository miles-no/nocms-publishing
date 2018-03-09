import { dictionary } from 'nocms-i18n';

export default (i18n, statusCode, lang) => {
  let message = 'Det oppstod en feil. Prøv igjen senere!';

  switch (statusCode) {
    case 409:
      message = 'Det finnes allerede en side på uri. Velg en annen eller avbryt.';
      break;
    default:
      return dictionary(i18n, message, lang);
  }
  return dictionary(i18n, message, lang);
};
