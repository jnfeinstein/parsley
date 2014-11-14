/** @jsx React.DOM */

function popupWindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function login() {
  var win = popupWindow("/loggedin", "Parsley", 800, 600);
  var pollInterval = setInterval(function() {
    try {
      if (win.document.URL.indexOf('loggedin')) {
        win.close();
        window.location.href = "/parsley";
      }
    } catch(e) {

    }
  }, 500);
  win.onClose = function() {
    clearInterval(pollInterval);
  };
}

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
        {href: '#', title: 'Sign up', onClick: login},
        {href: '#', title: 'Login', onClick: login}
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
