import React from 'react';
import { shallow } from 'enzyme';

import FlipPage from './index';

describe('<FlipPage />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FlipPage />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<FlipPage showTouchHint />', () => {
  it('should include a touch hint element', () => {
    const wrapper = shallow(<FlipPage showTouchHint />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<FlipPage flipOnTouch />', () => {
  it('should include two touch zones', () => {
    const wrapper = shallow(<FlipPage flipOnTouch />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
