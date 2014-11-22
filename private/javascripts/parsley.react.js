require('./pack');

var UserModel = require('./models').User;
var OrganizationModel = require('./models').Organization;

var DashboardComponent = require('./components').Dashboard;
var OrganizationComponent = require('./components').Organization;
var SidebarComponent = require('./components').Sidebar;

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

var ErrorComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.message}</div>
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
  componentWillMount: function() {
    var self = this;
    this.props.model.fetch({key: 'me'})
    .done(function() {
      self.setState({loading: false, error: null});
    })
    .fail(function() {
      self.setState({loading: false, error: "An error occured. :-("});
    });
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
        <SidebarComponent organizations={this.props.model.get('organizations')} />
        <div className="app-container">
          {rez}
        </div>
      </div>
    );
  },
  dashboard: function() {
    return <DashboardComponent model={this.props.model} />
  },
  ingredients: function() {
    return <div>Ingredients</div>;
  },
  suppliers: function() {
    return <div>Suppliers</div>;
  },
  organizations: function(id) {
    var org;
    if (id == 'new') {
      org = new OrganizationModel({id: 'new'});
    } else {
      org = this.props.model.get('organizations').get(id);
    }
    return <OrganizationComponent model={org} />;
  }
});

$(function() {
  var user = new UserModel({id: 'me'});
  React.render(
    <AppComponent history={true} model={user} />,
    document.getElementById('interface')
  );
});
