var _ = require('underscore');
var ReactRouter = require('react-router-component');

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

function navigate(path) {
  ReactRouter.environment.defaultEnvironment.navigate(path);
}

module.exports = {
  IsMobile: isMobile,
  Make: function(model, data) {
    if (_.isArray(data)) {
      return _.map(data, function(d) {
        return new model(d);
      });
    } else {
      return new model(data);
    }
  },
  GetValues: function(refs) {
    var values = {};
    _.each(refs, function(ref, attr) {
      values[attr] = ref.state.value;      
    });
    return values;
  },
  Navigate: navigate,
  BSNavigate: function(eventKey, path) {
    navigate(path);
  }
};
