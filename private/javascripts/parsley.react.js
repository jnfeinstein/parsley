require('./pack');

var Fluxbone = require('./lib').Fluxbone;

var UserModel = require('./models').User;
var OrganizationModel = require('./models').Organization;

var DashboardComponent = require('./components').Dashboard;
var OrganizationComponent = require('./components').Organization.Component;
var OrganizationEditorComponent = require('./components').Organization.EditorComponent;
var SidebarComponent = require('./components').Sidebar;
var ErrorComponent = require('./components').Error;

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
  mixins: [RouterMixin, Fluxbone.EventMixin('user', 'add:organizations'), Fluxbone.LoadingMixin('user')],
  routes: {
    '/parsley': 'dashboard',
    '/parsley/ingredients': 'ingredients',
    '/parsley/suppliers': 'suppliers',
    '/parsley/organizations/:id': 'organizations'
  },
  componentWillMount: function() {
    var self = this;
    this.props.user.fetch();
  },
  getInitialState: function() {
    return {
      loading: true,
      error: null
    }
  },
  render: function() {
    var rez;
    if (this.state.loading) {
      rez = <LoadingComponet />;
    } else if (this.state.error) {
      rez = <ErrorComponent message={this.props.error} />;
    } else {
      rez = this.renderCurrentRoute();
    }

    return (
      <div>
        <SidebarComponent organizations={this.props.user.get('organizations')} />
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
    return <DashboardComponent model={this.props.user} />
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
        <OrganizationEditorComponent org={new OrganizationModel()} user={this.props.user} />
      );
    } else {
      var org = this.props.user.get('organizations').get(id);
      if (_.isUndefined(org)) {
        return <ErrorComponent message="An error occured" />;
      }
      return <OrganizationComponent org={org} />;
    }
  }
});

$(function() {
  var user = new UserModel({id: 'me'});
  React.render(
    <AppComponent history={true} user={user} />,
    document.getElementById('interface')
  );
});
