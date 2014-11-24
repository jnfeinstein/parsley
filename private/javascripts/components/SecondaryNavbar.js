var NavItem = require('./NavItem');

var SecondaryNavbar = React.createClass({
  render: function() {
    var self = this;

    var orgLinks = this.props.organizations.map(function(org, i) {
      var isCurrent = org == self.props.currentOrganization;
      return <NavItem key={org.get('id')} className={isCurrent && 'current'} href={basepath + org.Link()} title={org.Name()} />;
    });

    return (
      <div className="secondary-navbar-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#secondary-navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="secondary-navbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.currentOrganization.Name()}<span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    {orgLinks}
                    <li className="divider"></li>
                    <NavItem className="create-new" key="new" href={basepath + "/organizations/new"} title="Create new" />
                  </ul>
                </li>
                <li className="divider-vertical"></li>
                <NavItem href={basepath + '/recipes'} title="Recipes" />
                <li className="divider-vertical"></li>
                <NavItem href={basepath + '/ingredients'} title="Ingredients" />
                <li className="divider-vertical"></li>
                <NavItem href={basepath + '/suppliers'} title="Suppliers" />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = SecondaryNavbar;
