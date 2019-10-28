import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div>
        <button className={'btn-' + this.props.genre} onClick={this.props.handleClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
