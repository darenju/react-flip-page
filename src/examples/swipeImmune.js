import React from 'react';
import FlipPage from 'react-flip-page';

export default () => (
  <FlipPage
    swipeImmune={['red']}
    pageBackground="#2ecc71"
  >
    <div>
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#e74c3c',
          color: '#fff',
          display: 'flex',
          height: 200,
          justifyContent: 'center',
          marginTop: 70,
          width: '100%',
        }}
        className="otherClass red somethingCool"
      >
        You can’t swipe from here
      </div>
      <button onClick={() => alert('Hello there!')}>I can be clicked!</button>
    </div>
  </FlipPage>
);
