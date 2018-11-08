module.exports = {
sendUserSuccess: (res, status, promise) => {
  res.status(status).json(promise);
},
sendUserError: (status, msg, res, err) => {
  res.status(status).json({ error: msg });
  console.error(err);
  return;
}
}
