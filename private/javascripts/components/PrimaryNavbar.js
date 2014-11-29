var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var Link = require('react-router').Link;

var PrimaryNavbarComponent = React.createClass({
  render: function() {
    var brand = <Link className="navbar-brand" to="main">Parsley</Link>;

    return (
      <div className="primary-navbar-container">
        <Navbar fluid brand={brand}>
          <Nav right>
            <NavItem href="/logout" onSelect={null}>Log out</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = PrimaryNavbarComponent;
