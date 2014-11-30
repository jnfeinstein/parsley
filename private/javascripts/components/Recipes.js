var _ = require('underscore');
var React = require('react/addons');

var RecipesComponent = React.createClass({
  render: function() {
    if (_.isEmpty(this.props.organization.recipes)) {
      return <div className="recipe-container">You have no recipes!</div>;
    }
    return (
      <div className="recipe-container">

      </div>
    );
  }
})

module.exports = RecipesComponent;
