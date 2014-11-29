jest.dontMock('../Organizations');

var Constants = require('../../constants');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Organization', function() {

  var Organization;

  beforeEach(function() {
    Organization = require('../Organizations');
  });

  it('renders an organization editor when passed id \'new\'', function() {
    var orgComponent = TestUtils.renderIntoDocument(
      <Organization id={Constants.NewIdPlaceholder} />
    );

    TestUtils.findRenderedDOMComponentWithClass(orgComponent, 'organization-editor-container');
  });
});