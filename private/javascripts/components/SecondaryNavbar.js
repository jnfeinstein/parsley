var NavItem = require('./NavItem');

var SecondaryNavbar = React.createClass({
  render: function() {
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
                <li><p className="navbar-text organization-name">{this.props.organization.Name()}</p></li>
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
