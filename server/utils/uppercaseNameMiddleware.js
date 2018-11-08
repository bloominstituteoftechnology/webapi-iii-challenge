const uppercaseName = (req, res, next) => {
  const { name } = req.body
  req.body.name = name.substring(0, 1).toUpperCase() + name.substring(1)
  next()
}

module.exports = uppercaseName