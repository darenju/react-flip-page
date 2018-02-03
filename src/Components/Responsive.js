import React, { Component } from 'react';
import Helmet from 'react-helmet';
import FlipPage from 'react-flip-page';

const pageStyle = {
  padding: 10,
};

const imageStyle = {
  display: 'block',
  margin: '0 auto 20px',
  maxWidth: 450,
  width: '100%',
};

const page1 = (switchOrientation, orientation) => (
  <div style={pageStyle}>
    <img src="http://unsplash.it/450/200?image=15" alt="Placeholder image" style={imageStyle} />
    <h2>Demo content</h2>
    <button onClick={switchOrientation}>
      Switch orientation (now is {orientation})
    </button>
    <p>This is a demo content to show the responsive feature of react-flip-page.</p>
    <p>The image above is 450x200, but if you watch this page on a mobile device, it will probably appear smaller as it is meant to be responsive. If you are lucky, you can see the image being "cut" while swiping to switch pages.</p>
  </div>
);

const page2 = (switchOrientation, orientation) => (
  <div style={pageStyle}>
    <h2>Second demo content</h2>
    <button onClick={switchOrientation}>
      Switch orientation (now is {orientation})
    </button>
    <p>This is a demo content to show the responsive feature of react-flip-page.</p>
    <p>The image below is 450x200, but if you watch this page on a mobile device, it will probably appear smaller as it is meant to be responsive. If you are lucky, you can see the image being "cut" while swiping to switch pages.</p>
    <img src="http://unsplash.it/450/200?image=18" alt="Placeholder image" style={imageStyle} />
  </div>
);

export default class Responsive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: 'vertical',
    };
  }

  switchOrientation() {
    this.setState({
      orientation: this.state.orientation === 'vertical' ? 'horizontal' : 'vertical',
    });
  };

  render() {
    const { orientation } = this.state;

    return (
      <div style={{backgroundColor: '#000', height: '100vh', paddingTop: 50, paddingBottom: 1, width: '100%'}}>
        <Helmet title="Responsive Demo" />
        <FlipPage responsive orientation={orientation}>
          {page1(() => this.switchOrientation(), orientation)}
          {page2(() => this.switchOrientation(), orientation)}
        </FlipPage>
      </div>
    );
  }
};
