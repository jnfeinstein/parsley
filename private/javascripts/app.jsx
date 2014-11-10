/** @jsx React.DOM */

var RouterMixin = ReactMiniRouter.RouterMixin;

$.postJSON = function(url, data) {
  return $.ajax({
    url: url,
    type: 'POST',
    contentType:'application/json',
    data: JSON.stringify(data),
    dataType:'json'
  });
}

var NavItem = React.createClass({
  render: function() {
    return (
      <li><a href={this.props.href}>{this.props.title}</a></li>
    );
  }
});

var NavbarComponent = React.createClass({
  render: function() {
    var leftNav = _.map(this.props.routes.left, function(link) {
      return <NavItem key={link.title} href={link.href} title={link.title} />;
    });

    var rightNav = _.map(this.props.routes.right, function(link) {
      return <NavItem key={link.title} href={link.href} title={link.title} />;
    });

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
            <a className="navbar-brand" href="/">Parsley</a>
          </div>

          <div className="collapse navbar-collapse" id={this.props.id}>
            <ul className="nav navbar-nav">
              {leftNav}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {rightNav}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
