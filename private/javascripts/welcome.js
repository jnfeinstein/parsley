require('./lib/Pack');
window.basepath = '/welcome';

var Helpers = require('./lib/Helpers');
require('react-bootstrap').NavItem.defaultProps.onSelect = Helpers.BSNavigate;

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var Router = require("react-router");
var Route = Router.Route;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

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
  render: function() {
    var brand = <Link className="navbar-brand" to="main">Parsley</Link>;

    return (
      <div className="app-container">
        <div className="primary-navbar-container">
          <Navbar fluid brand={brand}>
            <Nav>
              <NavItem eventKey={1} href={basepath + "/about"}>About</NavItem>
              <NavItem eventKey={2} href={basepath + "/contact"}>Contact</NavItem>
            </Nav>
            <Nav right>
              <NavItem eventKey={3} href='#' onSelect={login}>Sign up</NavItem>
              <NavItem eventKey={4} href='#' onSelect={login}>Log in</NavItem>
            </Nav>
          </Navbar>
        </div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="main" handler={AppComponent} path={basepath}>
    <DefaultRoute handler={WelcomeComponent} />
    <Redirect from="/" to={basepath} />
    <Route name="about" path={basepath + '/about'} handler={AboutComponent} />
    <Route name="contact" path={basepath + '/contact'} handler={ContactComponent} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('interface'));
});
