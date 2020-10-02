function convertList(string) {
  if (!string) return '';

  return string.replace(/<(?:.|\n)*?>/gm, '') // remove any html
               .split(/(?:\r\n|\r|\n)/g)
               .filter(function(item) { return item.replace(/\s+/g, '') != ''; })
               .map(function(item) { return item.replace(/\s+/g, ' '); }) // remove multi-spaces
               .join(', ') // replace newlines
               .replace(/ +/g, ' '); // replace double space
}

module.exports = convertList;
