var NavItem = require('./navitem.react');

var SidebarComponent = React.createClass({
  render: function() {
    var orgs = this.props.organizations.map(function(org, i) {
      return <NavItem key={i} href={org.link(basepath)} title={org.name()} />;
    });

    return (
      <div className="sidebar-container container-fluid">
        <ul className="nav nav-pills nav-stacked">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Organizations<span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              {orgs}
              <li className="divider"></li>
              <NavItem className="create-new" key="new" href={basepath + "/organizations/new"} title="Create new" />
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = SidebarComponent;
