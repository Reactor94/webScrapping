import React from 'react';

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
    };
  }
  static defaultProps = {
    sugestions: [],
  };
  onKeyDown = event => {
    if (event.key == 'Enter') {
      this.props.onChange(this.state.userInput);
    }
    // console.log('onkey up', event.target.value);
  };
  onChange = event => {
    // console.log('onchange');
    this.setState({ userInput: event.target.value });
  };
  static propTypes = {};
  render() {
    return (
      <div className="autocomplete">
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {this.state.userInput &&
          this.props.suggestions
            .filter(s => s.movieName.includes(this.state.userInput))
            .map(s => <div>{s.movieName}</div>)}
      </div>
    );
  }
}

export default Autocomplete;
