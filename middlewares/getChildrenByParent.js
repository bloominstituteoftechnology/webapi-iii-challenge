

const getChildrenByParent = async (dbCall, req, res, next) => {
  try {
    const { id } = req.params;
    const dbResponse = await dbCall(id);
    res.status(200).json(dbResponse);
  } catch (err) {
    res.status(500).json('Database query was not successful. Please ensure your request is well formed and contact the database administrator.');
  }
  next();
}

module.exports = getChildrenByParent;
