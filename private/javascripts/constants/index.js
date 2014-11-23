var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    RECEIVE_CURRENT_USER: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};