var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var DropdownButton = ReactBootstrap.DropdownButton;

var Organization = require('../models').Organization;

var SecondaryNavbar = React.createClass({
  render: function() {
    var self = this;

    var orgLinks = this.props.organizations.map(function(org, i) {
      var id = org.get('id');
      var isCurrent = org == self.props.currentOrganization;
      return <NavItem eventKey={id} key={id} className={isCurrent && 'current'} href={basepath + org.Link()}>{org.Name()}</NavItem>;
    });
    var curOrgUrl = basepath + this.props.currentOrganization.Link();

    return (
      <div className="secondary-navbar-container">
        <Navbar fluid>
          <Nav>
            <DropdownButton eventKey={1} title={this.props.currentOrganization.Name()}>
              {orgLinks}
              <NavItem className='create-new' eventKey='new' href={basepath + Organization.url + '/new'}>Create new</NavItem>
            </DropdownButton>
            <MenuItem divider className='divider-vertical' />
            <NavItem eventKey={2} href={curOrgUrl + '/recipes'}>Recipes</NavItem>
            <MenuItem divider className='divider-vertical'/>
            <NavItem eventKey={3} href={curOrgUrl + '/ingredients'}>Ingredients</NavItem>
            <MenuItem divider className='divider-vertical' />
            <NavItem eventKey={4} href={curOrgUrl + '/suppliers'}>Suppliers</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = SecondaryNavbar;
