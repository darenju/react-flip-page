import React from 'react';
import { shallow } from 'enzyme';

import FlipPage from './index';

describe('<FlipPage />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FlipPage />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
