require('./lib/Pack');
window.basepath = '/parsley';

var Helpers = require('./lib').Helpers;
require('react-bootstrap').NavItem.defaultProps.onSelect = Helpers.BSNavigate;

var WebAPI = require('./util').WebAPI;
var Constants = require('./constants');

var Components = require('./components');

// UI widget components
var PrimaryNavbarComponent = Components.PrimaryNavbar;
var SecondaryNavbarComponent = Components.SecondaryNavbar;
var LoadingComponent = Components.Loading;
var ErrorComponent = Components.Error

// Main page components
var DashboardComponent = Components.Dashboard;
var OrganizationComponent = Components.Organization;
var SupplierComponent = Components.Supplier;
var SupplierListComponent = Components.SupplierList;

var Stores = require('./stores');
var CurrentUserStore = Stores.CurrentUser;
var OrganizationStore = Stores.Organizations;

var Models = require('./models');
var Organization = Models.Organization;
var Supplier = Models.Supplier;

var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;

var AppComponent = React.createClass({
  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.updateStateFromStores);
  },
  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this.updateStateFromStores);
  },
  getInitialState: function() {
    return {
      currentUser: CurrentUserStore.get()
    };
  },
  render: function() {
    var rez;
    if (_.isEmpty(this.state.currentUser)) {
      rez = <LoadingComponent />;
    } else {
      rez = (
        <Locations>
          <Location path={basepath} handler={DashboardComponent} />
          <Location path={basepath + Organization.url + "/:org_id(/*)"} handler={OrganizationSpecificComponent} />
        </Locations>
      );
    }

    return (
      <div>
        <PrimaryNavbarComponent organizations={this.state.organizations} />
        <div className="app-container">
          {rez}
        </div>
      </div>
    );
  },
  updateStateFromStores: function() {
    this.setState({
      currentUser: CurrentUserStore.get()
    });
  }
});

var OrganizationSpecificComponent = React.createClass({
  getInitialState: function() {
    return {
      currentOrganization: this.getOrganization(this.props.org_id),
      organizations: OrganizationStore.getAll()
    };
  },
  updateStateFromStores: function() {
    var rez = { organizations: OrganizationStore.getAll() };
    if (this.props.org_id != Constants.NewIdPlaceholder) {
      rez.currentOrganization = OrganizationStore.get(this.props.org_id); // May have changed due to loading new orgs
    }
    this.setState(rez);
  },
  componentDidMount: function() {
    OrganizationStore.addChangeListener(this.updateStateFromStores);
  },
  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this.updateStateFromStores);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentOrganization: this.getOrganization(nextProps.org_id)
    });
  },
  render: function() {
    if (_.isEmpty(this.state.currentOrganization)) {
      return <ErrorComponent message="Organization does not exist!" />;
    }

    return (
      <div className="organization-container">
        <SecondaryNavbarComponent currentOrganization={this.state.currentOrganization} organizations={this.state.organizations} />
        <Locations contextual>
          <Location path="/" // Will also handle URL without trailing slash
            handler={OrganizationComponent} organization={this.state.currentOrganization} />
          <Location path={Supplier.org_url} handler={SupplierListComponent} />
          <Location path={Supplier.org_url + "/:supplier_id"} handler={SupplierComponent} />
        </Locations>
      </div>
    );
  },
  getOrganization: function(id) {
    if (id == Constants.NewIdPlaceholder) {
      return new Organization();
    } else {
      return OrganizationStore.get(id);
    }
  },
});

WebAPI.GetCurrentUser();
React.render(
  <AppComponent history={true} />,
  document.getElementById('interface')
);
