function stripHtml(string) {
  if (!string) return '';

  return string.replace(/<(?:.|\n)*?>/gm, '');
}

module.exports = stripHtml;
