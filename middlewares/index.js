const getTagToUpperCase = (req, res, next) => {
    let oldSend = res.send;
    let newTagObjects;
    let tags;

    res.send = function(data) {
      let tagObjects = JSON.parse(arguments[0]);
      if (tagObjects.tags.length > 0) {
        let tags = tagObjects.tags; 
        for(let i = 0; i < tags.length; i++) {
            tags[i] = tags[i].toUpperCase();
        }        
      }
      
      arguments[0] = JSON.stringify(tagObjects);
      oldSend.apply(res, arguments);
    };

    next();
}

const getTagsToUpperCase = (req, res, next) => {
    let oldSend = res.send;
    let newTagObjects;
    let tags;

    res.send = function(data) {
      let tagObjects = JSON.parse(arguments[0]);
      if(Array.isArray(tagObjects)) {
        for(let i = 0; i < tagObjects.length; i++) {
            tagObjects[i].tag = tagObjects[i].tag.toUpperCase();
        }
        }
        else if(tagObjects.tag){
            tagObjects.tag = tagObjects.tag.toUpperCase();
        }
      arguments[0] = JSON.stringify(tagObjects);
      oldSend.apply(res, arguments);
    };

    next();
}

const tagToUpperCase = (req, res, next) => {
    if(req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }

    next();
}

module.exports = {
  getTagToUpperCase,
  tagToUpperCase,
  getTagsToUpperCase,
};
