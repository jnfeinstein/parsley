var NavItem = require('./navitem.react');

var SidebarComponent = React.createClass({
  render: function() {
    var orgs = this.props.organizations.map(function(org, i) {
      return <NavItem key={org.name()} href={org.link()} title={org.name()} />;
    });
    orgs.push(<NavItem key="new" href={basepath + "/organizations/new"} title="Add new" />);

    return (
      <div className="sidebar-container">
        <ul className="nav nav-pills nav-stacked">
          <li className="nav-header">Organizations</li>
          {orgs}
        </ul>
      </div>
    );
  }
});

module.exports = SidebarComponent;
