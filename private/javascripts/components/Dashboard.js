var Stores = require('../stores');
var CurrentUserStore = Stores.CurrentUser;
var OrganizationStore = Stores.Organizations;

var ReactBootstrap = require('react-bootstrap');
var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var Link = require('react-router-component').Link;

var Organization = require('../models').Organization;

var OrganizationPanel = React.createClass({
  render: function() {
    return (
      <Panel header={this.props.organization.Name()}>
        {this.props.organization.Name()}
      </Panel>
    );
  }
});

var OrganizationAccordion = React.createClass({
  render: function() {
    var orgPanels = _.map(this.props.organizations, function(org) {
      return (
        <Panel key={org.get('id')} eventKey={org.get('id')} header={org.Name()}>
          <Link href={basepath + org.Link()}>Manage {org.Name()}</Link>
        </Panel>
      );
    });

    return (
      <div className="organization-accordion-container">
        <Accordion>
          {orgPanels}
        </Accordion>
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
    var rez;
    if (!this.state.organizations.length) {
      rez = (
        <Link href={basepath + Organization.url + '/new'}>Create your first organization</Link>
      );
    } else {
      rez = (
        <div>
          <div>
            You have {this.state.organizations.length} organization{this.state.organizations.length > 1 && 's'}
            <br />
            <Link href={basepath + Organization.url + '/new'}>Create another organization</Link>
          </div>
          <br />
          <OrganizationAccordion organizations={this.state.organizations} />
        </div>
      );
    }
    return (
      <div className="dashboard-container">
        <h4>Welcome to Parsley, {this.state.currentUser.Name()}</h4>
        {rez}
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
