module.exports = app => {
  require('./common')(app);
  require('./v1')(app);
};
