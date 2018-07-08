import React from 'react';
import PropTypes from 'prop-types';

class FlipPageItem extends React.PureComponent {
  render() {
    const { component } = this.props;
    return component;
  }
}

FlipPageItem.propTypes = {
  component: PropTypes.node.isRequired,
};

export default FlipPageItem;
