require('./lib/Pack');
window.basepath = '/parsley';

var WebAPI = require('./util').WebAPI;
var Constants = require('./constants');

var Components = require('./components');
var DashboardComponent = Components.Dashboard;
var OrganizationComponent = Components.Organization;
var PrimaryNavbarComponent = Components.PrimaryNavbar;
var ErrorComponent = Components.Error;

var Stores = require('./stores');
var CurrentUserStore = Stores.CurrentUser;
var OrganizationStore = Stores.Organizations;
var CurrentOrganizationStore = Stores.CurrentOrganization;

var Models = require('./models');
var Organization = Models.Organization;

var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;

var LoadingComponet = React.createClass({
  render: function() {
    return (
      <div>
        Loading...
      </div>
    );
  }
});

var AppComponent = React.createClass({
  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.updateStateFromStores);
    CurrentOrganizationStore.addChangeListener(this.updateStateFromStores);
    OrganizationStore.addChangeListener(this.updateStateFromStores);
  },
  getInitialState: function() {
    return {
      error: null,
      currentUser: CurrentUserStore.get(),
      organizations: OrganizationStore.getAll(),
      currentOrganization: CurrentOrganizationStore.get()
    };
  },
  render: function() {
    var rez;
    if (_.isEmpty(this.state.currentUser)) {
      rez = <LoadingComponet />;
    } else if (this.state.error) {
      rez = <ErrorComponent message={this.props.error} />;
    }

    return (
      <div>
        <PrimaryNavbarComponent organizations={this.state.organizations} />
        <div className="app-container">
          <Locations>
            <Location path={basepath} handler={DashboardComponent} />
            <Location path={basepath + Organization.url + "/:id"} handler={OrganizationComponent} />
          </Locations>
        </div>
      </div>
    );
  },
  updateStateFromStores: function() {
    this.setState({
      currentUser: CurrentUserStore.get(),
      currentOrganization: CurrentOrganizationStore.get(),
      organizations: OrganizationStore.getAll()
    });
  }
});

$(function() {
  WebAPI.GetCurrentUser();

  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
