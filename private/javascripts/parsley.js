require('./lib');

var WebAPI = require('./util').WebAPI;

var UserModel = require('./models').User;
var OrganizationModel = require('./models').Organization;

var DashboardComponent = require('./components').Dashboard;
var OrganizationComponent = require('./components').Organization.Component;
var OrganizationEditorComponent = require('./components').Organization.EditorComponent;
var SidebarComponent = require('./components').Sidebar;
var ErrorComponent = require('./components').Error;

var CurrentUserStore = require('./stores').CurrentUser;
window.basepath = '/parsley';

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
    CurrentUserStore.addChangeListener(this.receiveCurrentUser);
  },
  getInitialState: function() {
    return {
      error: null,
      currentUser: CurrentUserStore.get()
    }
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
        <SidebarComponent organizations={[]} />
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
    if (id == 'new') {
      return (
        <OrganizationEditorComponent org={new OrganizationModel()} />
      );
    } else {
      var org = this.state.currentUser.organizations[id];
      if (_.isEmpty(org)) {
        return <ErrorComponent message="An error occured" />;
      }
      return <OrganizationComponent org={org} />;
    }
  },
  receiveCurrentUser: function() {
    this.setState({currentUser: CurrentUserStore.get()});
  }
});

$(function() {
  WebAPI.getCurrentUser();

  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
