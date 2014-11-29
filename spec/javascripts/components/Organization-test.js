jest.dontMock('../../../private/javascripts/components');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Components = require('../../../private/javascripts/components');
var Constants = require('../../../private/javascripts/constants');

describe('Organization', function() {
  it('renders an organization editor when passed id \'new\'', function() {
    var Organization = Components.Organization;

    // Render a checkbox with label in the document
    var orgComponent = TestUtils.renderIntoDocument(
      <Organization id={Constants.NewIdPlaceholder} />
    );

    TestUtils.findRenderedDOMComponentWithClass(orgComponent, 'organization-editor-container');
  });
});