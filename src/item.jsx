import React from 'react';
import PropTypes from 'prop-types';

class FlipPageItem extends React.PureComponent {
  render() {
    return this.props.component;
  }
}

FlipPageItem.propTypes = {
  component: PropTypes.node.isRequired,
};
