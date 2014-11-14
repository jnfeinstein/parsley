/** @jsx React.DOM */

var WelcomeComponent = React.createClass({
  render: function() {
    return (
      <div className="welcome">
        <div className="tagline">
          <h4>Welcome to Parsley</h4>
        </div>
      </div>
    );
  }
});

var AppComponent = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/parsley': 'welcome',
    '/parsley/ingredient': 'ingredients',
    '/parsley/supplier': 'suppliers'
  },
  render: function() {
    var routes = {
      left: [
        {href: '/parsley/ingredient', title: 'Ingredients'},
        {href: '/parsley/supplier', title: 'Suppliers'}
      ],
      right: [
        {href: '/logout', title: 'Log out'}
      ]
    };

    return (
      <div>
        <NavbarComponent routes={routes} id="main-nav" brandUrl="/parsley" search={true} />
        {this.renderCurrentRoute()}
      </div>
    );
  },
  welcome: function() {
    return <WelcomeComponent />
  },
  ingredients: function() {
    return <div>Ingredients</div>;
  },
  suppliers: function() {
    return <div>Suppliers</div>;
  }
});

$(function() {
  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
