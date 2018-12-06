const toUpperCase = (req, res, next) => {
  const { name } = req.body;

  if (name) {
    let currentName = name.split(' ');
    let UpperCaseName = currentName.map( word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
  
    console.log(UpperCaseName)
    req.body.name = UpperCaseName
  }
  next()
}

module.exports = toUpperCase;