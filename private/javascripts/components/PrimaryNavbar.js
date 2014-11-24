var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var PrimaryNavbarComponent = React.createClass({
  render: function() {
    var brand = <a className="navbar-brand" href={basepath}>Parsley</a>;
    var toggleButton = (
      <button>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );

    return (
      <div className="primary-navbar-container">
        <Navbar fluid brand={brand} toggleButton={toggleButton}>
          <Nav right>
            <NavItem eventKey={1} href="/logout">Log out</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = PrimaryNavbarComponent;
