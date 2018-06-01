const userEngagement = {};

const clickWatchLogger = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const host = req.headers.host;

  if (!userEngagement[`${req.socket.remoteAddress}`]) {
    userEngagement[`${req.socket.remoteAddress}`] = { times: 0, last: Date.now() };
  }
  userEngagement[`${req.socket.remoteAddress}`].times += 1;
  userEngagement[`${req.socket.remoteAddress}`].last = Date.now();
  console.log('engagement: ', userEngagement);
  if (userEngagement[`${req.socket.remoteAddress}`]
    .times > 5 && (userEngagement[`${req.socket.remoteAddress}`]
      .last - (Date.now() - 5000)) < 5000) {
    setTimeout(() => {
      userEngagement[`${req.socket.remoteAddress}`] = 0;
      userEngagement[`${req.socket.remoteAddress}`].last = Date.now();
    }, 5000);
    res.send({ error: 'Too many Requests!' });
  } else {
    console.log('##----------------------##', '\nRequest Time: ', Date.now(),
      '\nRequest:', req.socket.remoteAddress, '\nUserAgent: ', userAgent,
      '\nHost: ', host, '\nUrl:', req.url, '\n##----------------------##');
    next();
  };
};

module.exports = clickWatchLogger;