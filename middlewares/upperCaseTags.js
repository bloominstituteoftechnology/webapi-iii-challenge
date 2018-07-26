

function tagsToUpper(item) {
  if (typeof item === 'array') {
    return item.map(subitem => ({ ...subitem, tag: subitem.tag.toUpperCase() }));
  }
  if (typeof item === 'object') {
    return ({ ...item, tag: item.tag.toUpperCase() });
  }
  return item;
}


function handleTags(req, res, next) {
  if (req.locals.payload !== undefined) {
    req.locals.payload = tagsToUpper(req.locals.payload);
  }
}

module.exports = handleTags;
