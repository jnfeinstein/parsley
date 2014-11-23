require('./Pack');

window.basepath = '/welcome';

var NavItemComponent = require('./components').NavItem;

function popupWindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function login() {
  if (isMobile.any()) {
    window.location.href = "/parsley";
    return;
  }

  var win = popupWindow("/loggedin", "Parsley", 800, 600);
  var pollInterval = setInterval(function() {
    try {
      if (win.document.URL.indexOf('loggedin')) {
        win.close();
        window.location.href = "/parsley";
      }
    } catch(e) {

    }
  }, 500);
  win.onClose = function() {
    clearInterval(pollInterval);
  };
}

var WelcomeComponent = React.createClass({
  render: function() {
    return (
      <div className="welcome">
        <div className="tagline">
          <h4>Sometimes what you need is simplicity</h4>
        </div>
        <img className="center" src="/images/parsley.jpg" />
        <div className="tagline">
          <h5>Coming soon</h5>
        </div>
      </div>
    );
  }
});

var AppComponent = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/': 'welcome',
    '/welcome': 'welcome',
    '/welcome/about': 'about',
    '/welcome/contact': 'contact'
  },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#welcome-navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href={basepath}>Parsley</a>
            </div>

            <div className="collapse navbar-collapse" id="welcome-navbar">
              <ul className="nav navbar-nav">
                <NavItemComponent href={basepath + '/about'} title="About" />
                <NavItemComponent href={basepath + '/contact'} title="Contact" />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <NavItemComponent href={'#'} title="Sign up" onClick={login} />
                <NavItemComponent href={'#'} title="Log in" onClick={login} />
              </ul>
            </div>
          </div>
        </nav>
        {this.renderCurrentRoute()}
      </div>
    );
  },
  welcome: function() {
    return <WelcomeComponent />
  },
  about: function() {
    return <div>About</div>;
  },
  contact: function() {
    return <div>Contact</div>;
  }
});

$(function() {
  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
