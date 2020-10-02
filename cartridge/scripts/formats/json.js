exports.format = function(results) {
  let output = {
    results: results,
    count: results.length
  };

  return JSON.stringify(output);
};
