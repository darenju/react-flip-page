import React from 'react';
import FlipPage from 'react-flip-page';
import { baseUrl, images } from './base';

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
  <FlipPage showSwipeHint lastComponent={theEnd}>
    {images.map((n, i) => <img key={i} src={`${baseUrl}${n}`} />)}
  </FlipPage>
);
