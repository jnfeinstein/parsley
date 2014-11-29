require('./lib/Pack');
window.basepath = '/parsley';

var Helpers = require('./lib').Helpers;
require('react-bootstrap').NavItem.defaultProps.onSelect = Helpers.BSNavigate;

var WebAPI = require('./util').WebAPI;
var Constants = require('./constants');

var Components = require('./components');
var DashboardComponent = Components.Dashboard;
var OrganizationComponent = Components.Organization;
var RecipesComponent = Components.Recipes;
var PrimaryNavbarComponent = Components.PrimaryNavbar;
var LoadingComponent = Components.Loading;

var Stores = require('./stores');
var CurrentUserStore = Stores.CurrentUser;
var LoadingStore = Stores.Loading;

var Models = require('./models');
var Organization = Models.Organization;

var Router = require("react-router");
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

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
      loading: LoadingStore.get(),
      currentUser: CurrentUserStore.get()
    };
  },
  render: function() {
    var rez;
    if (this.state.loading) {
      rez = <LoadingComponent />;
    } else {
      rez = <RouteHandler params={this.props.params} />;
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

var routes = (
  <Route name="main" handler={AppComponent} path={basepath}>
    <DefaultRoute handler={DashboardComponent} />
    <Route name="organization" path={basepath + "/organizations/:org_id"} handler={OrganizationComponent}>
      <Route name="recipes" path="recipes" handler={RecipesComponent} />
      <Route name="recipe" path="recipes/:recipe_id" handler={RecipesComponent} />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.getElementById('interface'));
});
