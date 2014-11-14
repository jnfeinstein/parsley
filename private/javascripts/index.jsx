/** @jsx React.DOM */

var WelcomeComponent = React.createClass({
  render: function() {
    return (
      <div className="welcome">
        <div className="tagline">
          <h4>Sometimes what you need is simplicity</h4>
        </div>
        <img className="center" src="/images/parsley.jpg" />
        <div className="tagline">
          <h5>Coming soon</h5>
        </div>
      </div>
    );
  }
});

var AppComponent = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/': 'welcome',
    '/index': 'welcome',
    '/index/about': 'about',
    '/index/contact': 'contact'
  },
  render: function() {
    var routes = {
      left: [
        {href: '/index/about', title: 'About'},
        {href: '/index/contact', title: 'Contact'}
      ],
      right: [
        {href: '/parsley', title: 'Sign up'},
        {href: '/parsley', title: 'Login'}
      ]
    };

    return (
      <div>
        <NavbarComponent routes={routes} id="main-nav" brandUrl="/" />
        {this.renderCurrentRoute()}
      </div>
    );
  },
  welcome: function() {
    return <WelcomeComponent />
  },
  about: function() {
    return <div>About</div>;
  },
  contact: function() {
    return <div>Contact</div>;
  }
});

$(function() {
  React.render(
    <AppComponent history={true} />,
    document.getElementById('interface')
  );
});
