var NavItem = require('./NavItem');

var PrimaryNavbarComponent = React.createClass({
  render: function() {
    return (
      <div className="primary-navbar-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#primary-navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href={basepath}>Parsley</a>
            </div>

            <div className="collapse navbar-collapse" id="primary-navbar">
              <ul className="nav navbar-nav navbar-right">
                <NavItem href='/logout' title="Log out" />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = PrimaryNavbarComponent;
