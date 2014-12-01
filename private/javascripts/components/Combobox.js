var React = require('react/addons');
var _ = require('underscore');

var Match = React.createClass({
  render: function() {
    var start = this.props.start;
    var end = this.props.start + this.props.length;
    var preText = this.props.option.substring(0, start);
    var boldText = this.props.option.substring(start, end);
    var postText = this.props.option.substring(end, this.props.option.length);

    var classes = ["combobox-match-container"];
    if (this.props.highlighted) {
      classes.push("combobox-match-highlighted");
    }

    return (
      <div className={classes.join(" ")} onClick={this.clicked}>
        {preText}<span className="combobox-match-segment">{boldText}</span>{postText}
      </div>
    );
  },
  clicked: function() {
    if (_.isFunction(this.props.onClick)) {
      this.props.onClick(this.props.option, this);
    }
  }
});

var Suggestions = React.createClass({
  getInitialState: function() {
    return {
      matches: this.getMatches(this.props.options, this.props.input),
      highlighted: -1
    };
  },
  componentWillReceiveProps: function(nextprops) {
    if (this.props.input != nextprops.input ||
        this.props.options != nextprops.options ||
        this.props.options.length != nextprops.options.length) {
      this.setState({
        matches: this.getMatches(nextprops.options, nextprops.input),
        highlighted: -1
      });
    }
  },
  render: function() {
    var self = this;

    var outerStyle = {
      position: 'absolute',
      zIndex: 30,
      top: this.props.top,
      left: this.props.left,
      width: this.props.width
    };

    var innerStyle = {
      position: 'relative'
    }

    var matches = _.map(this.state.matches, function(match, i) {
      return <Match ref={i}
                    key={match.option}
                    start={match.start}
                    option={match.option}
                    length={self.props.input.length}
                    highlighted={i == self.state.highlighted}
                    onClick={self.matchClicked} /> 
    });

    return (
      <div className="combobox-suggestions-outer-container" style={outerStyle}>
        <div className="combobox-suggestions-inner-container" style={innerStyle}>
          {matches}
        </div>
      </div>
    );
  },
  getMatches: function(options, input) {
    return _.chain(options).map(function(option) {
      var matchIdx = option.toLowerCase().indexOf(input.toLowerCase());
      if (matchIdx > -1 && input.length < option.length) {
        return {
          option: option,
          start: matchIdx
        };
      }
    }).compact().value();
  },
  matchClicked: function(value, match) {
    if (_.isFunction(this.props.onClick)) {
      this.props.onClick(value, match);
    }
  },
  highlightIncremented: function() {
    var nextHighlight = this.state.highlighted + 1;
    if (nextHighlight < this.state.matches.length) {
      this.setState({
        highlighted: nextHighlight
      });
    }
  },
  highlightDecremented: function() {
    var nextHighlight = this.state.highlighted - 1;
    if (nextHighlight >= 0) {
      this.setState({
        highlighted: nextHighlight
      });
    }
  },
  highlightEntered: function() {
    this.matchClicked(this.state.matches[this.state.highlighted].option, this.refs[this.state.highlighted]);
  }
});

var Input = React.createClass({
  render: function() {
    return (
      <div className="combobox-input-contianer">
        <input type="text"
               value={this.props.value}
               onChange={this.props.onChange}
               onKeyUp={this.props.onKeyUp}
               onKeyDown={this.props.onKeyDown}
               onKeyPress={this.props.onKeyPress}
               onFocus={this.props.onFocus}
               onBlur={this.props.onBlur} />
      </div>
    );
  }
});

var Combobox = React.createClass({
  getInitialState: function() {
    return {
      inputHasFocus: false,
      input: "",
      suggestionsTop: -500,
      suggestionsLeft: -500,
      highlightedSuggestion: -1
    }
  },
  componentDidMount: function() {
    var coords = this.refs.input.getDOMNode().getBoundingClientRect();
    this.setState({
      suggestionsTop: coords.bottom,
      suggestionsLeft: coords.left,
      suggestionsWidth: coords.right - coords.left + "px"
    });
  },
  render: function() {
    var options = _.map(this.props.children, function(child) {
      return child.props.children;
    });

    var suggestions;
    if (_.any(this.state.input) && this.state.inputHasFocus) {
      suggestions = <Suggestions ref="suggestions"
                                 input={this.state.input}
                                 options={options}
                                 onClick={this.suggestionClicked}
                                 highlighted={this.state.highlightedSuggestion}
                                 top={this.state.suggestionsTop}
                                 left={this.state.suggestionsLeft}
                                 width={this.state.suggestionsWidth} />;
    }

    var classes = [this.props.className, "combobox-container"];
    return (
      <div className={classes.join(" ")}>
        <Input ref="input"
               value={this.state.input}
               onChange={this.handleInputChange}
               onKeyDown={this.handleInputKey}
               onFocus={this.handleInputFocus}
               onBlur={this.handleInputBlur} />
        {suggestions}
      </div>
    );
  },
  handleInputChange: function(e) {
    this.setState({
      input: e.target.value
    });
  },
  handleInputFocus: function() {
    clearTimeout(this.state.noFocusTimer);
    this.setState({
      noFocusTimer: null,
      inputHasFocus: true
    });
  },
  handleInputBlur: function() {
    var self = this;
    clearTimeout(this.state.noFocusTimer);
    var noFocusTimer = setTimeout(function() {
      self.setState({
        inputHasFocus: false
      })
    }, 250);
    this.setState({
      noFocusTimer: noFocusTimer
    });
  },
  handleInputKey: function(e) {
    if (e.which == 40) { // ArrowDown
      this.refs.suggestions.highlightIncremented();
    } else if (e.which == 38) { // ArrowUp
      this.refs.suggestions.highlightDecremented();
    } else if (e.which == 13) { // Enter
      this.refs.suggestions.highlightEntered();
    }
  },
  suggestionClicked: function(value, match) {
    this.setState({
      input: value
    });
  }
});

module.exports = Combobox;
