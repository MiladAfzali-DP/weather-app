export function formatDate(date, option, unicode = "en-US") {
  return new Intl.DateTimeFormat(unicode, option).format(date);
}
