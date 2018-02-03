import React from 'react';
import { shallow } from 'enzyme';

import FlipPage from './index';

jest.useFakeTimers();

const getState = (wrapper) => wrapper.instance().state;

describe('<FlipPage />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FlipPage />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('componentDidMount()', () => {
    it('should start a timer', () => {
      const wrapper = shallow(<FlipPage showHint />);
      const result = wrapper.instance().hintTimeout;
      expect(result).not.toBeNull();
    });
  });

  describe('componentWillUnmount()', () => {
    it('should end two timers', () => {
      const wrapper = shallow(<FlipPage showHint />);
      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalledTimes(2);
    });
  });

  describe('showHint()', () => {
    it('should update state', () => {
      const wrapper = shallow(<FlipPage showHint />);
      const transition = wrapper.instance().transition;
      wrapper.instance().showHint();

      expect(Object.keys(getState(wrapper).secondHalfStyle)).toEqual(['transition', 'transform']);
      expect(setTimeout).toHaveBeenCalled();

      jest.runOnlyPendingTimers();

      expect(Object.keys(getState(wrapper).secondHalfStyle)).toEqual(['transition']);
    });
  });

  describe('hasNextPage()', () => {
    it('should return FALSE if already on last page and `loopForever` is FALSE', () => {
      const wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
      wrapper.setState({ page: 1 });
      const result = wrapper.instance().hasNextPage();
      expect(result).toEqual(false);
    });

    it('should return TRUE if already on last page and `loopForever` is TRUE', () => {
      const wrapper = shallow(<FlipPage loopForever><div /><div /></FlipPage>);
      wrapper.setState({ page: 1 });
      const result = wrapper.instance().hasNextPage();
      expect(result).toEqual(true);
    });
  });

  describe('hasPreviousPage()', () => {
    it('should return FALSE if already on first page and `loopForever` is FALSE', () => {
      const wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
      const result = wrapper.instance().hasPreviousPage();
      expect(result).toEqual(false);
    });

    it('should return TRUE if already on first page and `loopForever` is TRUE', () => {
      const wrapper = shallow(<FlipPage loopForever><div /><div /></FlipPage>);
      const result = wrapper.instance().hasPreviousPage();
      expect(result).toEqual(true);
    });
  });

  describe('getHeight()', () => {
    it('should return the height with pixel unit', () => {
      const target = 123;
      const wrapper = shallow(<FlipPage height={target} />);
      const result = wrapper.instance().getHeight();

      expect(result).toEqual(`${target}px`);
    });
  });

  describe('getWidth()', () => {
    it('should return the width with pixel unit', () => {
      const target = 123;
      const wrapper = shallow(<FlipPage width={target} />);
      const result = wrapper.instance().getWidth();

      expect(result).toEqual(`${target}px`);
    });
  });

  describe('isLastPage()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
    });

    it('should return FALSE when state.page === 0', () => {
      wrapper.setState({ page: 0 });
      const result = wrapper.instance().isLastPage();
      expect(result).toBeFalsy();
    });

    it('should return TRUE when state.page === 1', () => {
      wrapper.setState({ page: 1 });
      const result = wrapper.instance().isLastPage();
      expect(result).toBeTruthy();
    });
  });

  describe('isFirstPage()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
    });

    it('should return TRUE when state.page === 0', () => {
      wrapper.setState({ page: 0 });
      const result = wrapper.instance().isFirstPage();
      expect(result).toBeTruthy();
    });

    it('should return FALSE when state.page === 1', () => {
      wrapper.setState({ page: 1 });
      const result = wrapper.instance().isFirstPage();
      expect(result).toBeFalsy();
    });
  });

  describe('incrementPage()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
    });

    it('should increment the page by one', () => {
      wrapper.setState({ page: 0 });
      wrapper.instance().incrementPage();
      expect(wrapper.state().page).toEqual(1);
    });

    it('should return FIRT PAGE when incrementing the last page', () => {
      wrapper.setState({ page: 1 });
      wrapper.instance().incrementPage();
      expect(wrapper.state().page).toEqual(0);
    });
  });

  describe('decrementPage()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FlipPage><div /><div /></FlipPage>);
    });

    it('should decrement the page by one', () => {
      wrapper.setState({ page: 1 });
      wrapper.instance().decrementPage();
      expect(wrapper.state().page).toEqual(0);
    });

    it('should return LAST PAGE when decrementing the first page', () => {
      wrapper.setState({ page: 0 });
      wrapper.instance().decrementPage();
      expect(wrapper.state().page).toEqual(1);
    });
  });

  describe('startMoving()', () => {
    let wrapper;
    let event;

    beforeEach(() => {
      wrapper = shallow(<FlipPage />);
      event = {
        preventDefault: jest.fn(),
        pageX: 1,
        pageY: 2,
        touches: [{
          pageX: 3,
          pageY: 4,
        }],
      };
    });

    it('should call event.preventDefault()', () => {
      wrapper.instance().startMoving(event);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should setState as event.pageX and event.pageY', () => {
      wrapper.instance().startMoving(event);
      expect(wrapper.state().startX).toEqual(event.pageX);
      expect(wrapper.state().startY).toEqual(event.pageY);
    });

    it('should setState as event.touches[0].pageX and event.touches[0].pageY', () => {
      event.pageX = 0;
      event.pageY = NaN;
      wrapper.instance().startMoving(event);
      expect(wrapper.state().startX).toEqual(event.touches[0].pageX);
      expect(wrapper.state().startY).toEqual(event.touches[0].pageY);
    });
  });
});

describe('<FlipPage showSwipeHint />', () => {
  it('should include a swipe hint element', () => {
    const wrapper = shallow(<FlipPage showSwipeHint />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<FlipPage flipOnTouch />', () => {
  it('should include two touch zones', () => {
    const wrapper = shallow(<FlipPage flipOnTouch />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<FlipPage showTouchHint />', () => {
  it('should not include a touch hint element', () => {
    const wrapper = shallow(<FlipPage showTouchHint />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<FlipPage flipOnTouch showTouchHint />', () => {
  it('should include a touch hint element', () => {
    const wrapper = shallow(<FlipPage flipOnTouch showTouchHint />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
