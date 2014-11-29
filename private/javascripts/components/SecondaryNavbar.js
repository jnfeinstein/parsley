var React = require('react/addons');
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
      var isCurrent = org == self.props.currentOrganization;
      return <NavItem key={org.Id()} className={isCurrent && 'current'} href={basepath + org.Link()}>{org.Name()}</NavItem>;
    });
    var curOrgUrl = basepath + this.props.currentOrganization.Link();

    return (
      <div className="secondary-navbar-container">
        <Navbar fluid>
          <Nav>
            <DropdownButton title={this.props.currentOrganization.Name()}>
              {orgLinks}
              <NavItem className='create-new' eventKey='new' href={basepath + Organization.url + '/new'}>Create new</NavItem>
            </DropdownButton>
            <MenuItem divider className='divider-vertical' />
            <NavItem href={curOrgUrl + '/recipes'}>Recipes</NavItem>
            <MenuItem divider className='divider-vertical'/>
            <NavItem href={curOrgUrl + '/ingredients'}>Ingredients</NavItem>
            <MenuItem divider className='divider-vertical' />
            <NavItem href={curOrgUrl + '/suppliers'}>Suppliers</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = SecondaryNavbar;
