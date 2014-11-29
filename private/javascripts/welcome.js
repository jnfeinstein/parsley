require('./lib/Pack');
window.basepath = '/welcome';

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;

var Helpers = require('./lib').Helpers;

function popupWindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function login() {
  if (Helpers.IsMobile.any()) {
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

var AboutComponent = React.createClass({
  render: function() {
    return (
      <div className="about">
        About!
      </div>
    );
  }
});

var ContactComponent = React.createClass({
  render: function() {
    return (
      <div className="contact">
        Contact!
      </div>
    );
  }
});

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
  routes: {
    '/': 'welcome',
    '/welcome': 'welcome',
    '/welcome/about': 'about',
    '/welcome/contact': 'contact'
  },
  render: function() {
    var brand = <a className="navbar-brand" href={basepath}>Parsley</a>;

    return (
      <div className="app-container">
        <div className="primary-navbar-container">
          <Navbar fluid brand={brand} toggleNavKey={1}>
            <Nav eventKey={1}>
              <NavItem eventKey={1} href={basepath + '/about'}>About</NavItem>
              <NavItem eventKey={2} href={basepath + '/contact'}>Contact</NavItem>
            </Nav>
            <Nav right eventKey={1}>
              <NavItem eventKey={3} href='#' onSelect={login}>Sign up</NavItem>
              <NavItem eventKey={4} href='#' onSelect={login}>Log in</NavItem>
            </Nav>
          </Navbar>
        </div>
        <Locations>
          <Location path="/" handler={WelcomeComponent} />
          <Location path={basepath} handler={WelcomeComponent} />
          <Location path={basepath + "/about"} handler={AboutComponent} />
          <Location path={basepath + "/contact"} handler={ContactComponent} />
        </Locations>
      </div>
    );
  }
});

React.render(
  <AppComponent history={true} />,
  document.getElementById('interface')
);
