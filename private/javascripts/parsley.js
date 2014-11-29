require('./lib/Pack');
window.basepath = '/parsley';

var Helpers = require('./lib').Helpers;
require('react-bootstrap').NavItem.defaultProps.onSelect = Helpers.BSNavigate;

var WebAPI = require('./util').WebAPI;
var Constants = require('./constants');

var Components = require('./components');
var DashboardComponent = Components.Dashboard;
var OrganizationComponent = Components.Organization;
var PrimaryNavbarComponent = Components.PrimaryNavbar;
var LoadingComponent = Components.Loading;

var Stores = require('./stores');
var CurrentUserStore = Stores.CurrentUser;
var LoadingStore = Stores.Loading;

var Models = require('./models');
var Organization = Models.Organization;

var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;

var AppComponent = React.createClass({
  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.updateStateFromStores);
    LoadingStore.addChangeListener(this.updateStateFromStores);
  },
  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this.updateStateFromStores);
    LoadingStore.removeChangeListener(this.updateStateFromStores);
  },
  getInitialState: function() {
    return {
      currentUser: CurrentUserStore.get()
    };
  },
  render: function() {
    var rez;
    if (this.state.loading) {
      rez = <LoadingComponent />;
    } else {
      rez = (
        <Locations>
          <Location path={basepath} handler={DashboardComponent} />
          <Location path={basepath + Organization.url + "/:id"} handler={OrganizationComponent} />
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
      currentUser: CurrentUserStore.get(),
      loading: LoadingStore.get()
    });
  }
});

WebAPI.GetCurrentUser();
React.render(
  <AppComponent history={true} />,
  document.getElementById('interface')
);
