import React from 'react';
import FlipPage from 'react-flip-page';

const baseUrl = 'http://unsplash.it/320/480/?image=';
const images = [434, 428, 413, 400];
const theEndStyle = {
  alignItems: 'flex-end',
  backgroundColor: '#000',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  padding: 10
};
const theEnd = <div style={theEndStyle}>The End!</div>;

export default () => (
  <FlipPage showTouchHint lastComponent={theEnd}>
    {images.map((n, i) => <img key={i} src={`${baseUrl}${n}`} />)}
  </FlipPage>
);
