var NavItem = require('./NavItem');

var SidebarComponent = React.createClass({
  render: function() {
    var orgLinks = this.props.organizations.map(function(org, i) {
      return <NavItem key={i} href={basepath + org.link(basepath)} title={org.name()} onClick={this.orgLinkClicked} />;
    });

    return (
      <div className="sidebar-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#parsley-navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href={basepath}>Parsley</a>
            </div>

            <div className="collapse navbar-collapse" id="parsley-navbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Organizations<span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    {orgLinks}
                    <li className="divider"></li>
                    <NavItem className="create-new" key="new" href={basepath + "/organizations/new"} title="Create new" />
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <NavItem href='/logout' title="Log out" />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  },
  orgLinkClicked: function(e) {

  }
});

module.exports = SidebarComponent;
