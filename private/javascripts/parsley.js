require('./lib/Pack');
window.basepath = '/parsley';

var WebAPI = require('./util').WebAPI;

var Components = require('./components');
var DashboardComponent = Components.Dashboard;
var OrganizationComponent = Components.Organization;
var SidebarComponent = Components.Sidebar;
var ErrorComponent = Components.Error;

var Stores = require('./stores');
var CurrentUserStore = Stores.CurrentUser;
var OrganizationStore = Stores.Organizations;
var CurrentOrganizationStore = Stores.CurrentOrganization;

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
  mixins: [RouterMixin],
  routes: {
    '/parsley': 'dashboard',
    '/parsley/ingredients': 'ingredients',
    '/parsley/suppliers': 'suppliers',
    '/parsley/organizations/:id': 'organizations'
  },
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
    } else {
      rez = this.renderCurrentRoute();
    }

    return (
      <div>
        <SidebarComponent organizations={this.state.organizations} />
        <div className="app-container">
          {rez}
        </div>
      </div>
    );
  },
  error: function() {
    return <ErrorComponent message={this.state.error} />
  },
  dashboard: function() {
    return <DashboardComponent />
  },
  ingredients: function() {
    return <div>Ingredients</div>;
  },
  suppliers: function() {
    return <div>Suppliers</div>;
  },
  organizations: function(id) {
    return <OrganizationComponent id={id} />;
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
  WebAPI.getCurrentUser();

  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
