/** @jsx React.DOM */

window.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$.postJSON = function(url, data) {
  return $.ajax({
    url: url,
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json'
  });
}

window.NavItem = React.createClass({
  render: function() {
    return (
      <li><a href={this.props.href} onClick={this.props.onClick}>{this.props.title}</a></li>
    );
  }
});

window.NavSearch = React.createClass({
  render: function() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </form>
    );
  }
});

window.NavbarComponent = React.createClass({
  render: function() {
    var leftNav = _.map(this.props.routes.left, function(link) {
      return <NavItem key={link.title} href={link.href} title={link.title} onClick={link.onClick} />;
    });

    var rightNav = _.map(this.props.routes.right, function(link) {
      return <NavItem key={link.title} href={link.href} title={link.title} onClick={link.onClick} />;
    });

    var searchBox = this.props.search ? <NavSearch /> : '';

    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target={"#" + this.props.id}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.props.brandUrl}>Parsley</a>
          </div>

          <div className="collapse navbar-collapse" id={this.props.id}>
            <ul className="nav navbar-nav">
              {leftNav}
            </ul>
            {searchBox}
            <ul className="nav navbar-nav navbar-right">
              {rightNav}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
