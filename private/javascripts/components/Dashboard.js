var Stores = require('../stores');
var CurrentUserStore = Stores.CurrentUser;
var OrganizationStore = Stores.Organizations;

var NavItem = require('./NavItem');

var OrganizationPanel = React.createClass({
  render: function() {
    var id = this.props.organization.get('id');

    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={'heading' + id}>
          <h4 className="panel-title">
            <a data-toggle="collapse" data-parent="#org-accordion" href={'#' + id} aria-expanded="false" aria-controls={'collapse' + id}>
              {this.props.organization.Name()}
            </a>
          </h4>
        </div>
        <div id={'collapse' + id} className="panel-collapse collapse in" role="tabpanel" aria-labelledby={'heading' + id}>
          <div className="panel-body">
            {this.props.organization.Name()}
          </div>
        </div>
      </div>
    );
  }
});

var OrganizationTable = React.createClass({
  render: function() {
    var orgPanels = _.map(this.props.organizations, function(org) {
      return <OrganizationPanel key={org.get('id')} organization={org} />;
    });


    return (
      <div className="organization-table-container">
        <div className="panel-group" id="org-accordion" role="tablist" aria-multiselectable="true">
          {orgPanels}
        </div>
      </div>
    );
  }
});

var DashboardComponent = React.createClass({
  getInitialState: function() {
    return {
      currentUser: CurrentUserStore.get(),
      organizations: OrganizationStore.getAll()
    };
  },
  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.updateStateFromStores);
    OrganizationStore.addChangeListener(this.updateStateFromStores);
  },
  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this.updateStateFromStores);
    OrganizationStore.removeChangeListener(this.updateStateFromStores);
  },
  render: function() {
    return (
      <div className="dashboard-container">
        <h4>Welcome to Parsley, {this.state.currentUser.Name()}</h4>
        <br />
        <div>You have {this.state.organizations.length} organization{this.state.organizations.length > 1 && 's'}</div>
        <OrganizationTable organizations={this.state.organizations} />
      </div>
    );
  },
  updateStateFromStores: function() {
    this.setState({
      currentUser: CurrentUserStore.get(),
      organizations: OrganizationStore.getAll()
    });
  }
});

module.exports = DashboardComponent;
