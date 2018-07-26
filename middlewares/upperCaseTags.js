

function tagsToUpper(item) {
  if (Array.isArray(item)) {
    return item.map(subitem => ({ ...subitem, tag: subitem.tag.toUpperCase() }));
  }
  if (typeof item === 'object') {
    return ({ ...item, tag: item.tag.toUpperCase() });
  }
  return item;
}


function handleTags(req, res, next) {
  if (req.local.payload !== undefined) {
    req.local.payload = tagsToUpper(req.local.payload);
  }
  next();
}

module.exports = handleTags;
