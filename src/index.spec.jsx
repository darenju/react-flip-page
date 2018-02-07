import React from 'react';
import { shallow } from 'enzyme';

import FlipPage from './index';

jest.useFakeTimers();

const getState = wrapper => wrapper.instance().state;

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

  describe('getHalfHeight()', () => {
    it('should return the half height with pixel unit', () => {
      const target = 123;
      const wrapper = shallow(<FlipPage height={target} />);
      const result = wrapper.instance().getHalfHeight();

      expect(result).toEqual(`${target / 2}px`);
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

  describe('getHalfWidth()', () => {
    it('should return the half width with pixel unit', () => {
      const target = 123;
      const wrapper = shallow(<FlipPage width={target} />);
      const result = wrapper.instance().getHalfWidth();

      expect(result).toEqual(`${target / 2}px`);
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

  describe('moveGesture', () => {
    let wrapper;
    let event;

    beforeEach(() => {
      wrapper = shallow(<FlipPage />);
      event = {
        preventDefault: jest.fn(),
        pageX: 1,
        pageY: 1,
      };
    });

    it('should not change state when startY is -1', () => {
      wrapper.instance().moveGesture(event);
      const initialState = { ...wrapper.state() };
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(wrapper.state()).toEqual(initialState);
    });

    describe('Horizontal', () => {
      beforeEach(() => {
        wrapper.setProps({ orientation: 'horizontal' });
      });

      it('should move LEFT with an angle of -180deg', () => {
        wrapper.setState({
          startX: 251,
          startY: 1,
        });
        wrapper.instance().moveGesture(event);

        const { timestamp, ...timelessState } = wrapper.state();
        expect(timelessState).toEqual({
          angle: -180,
          diffX: -250,
          diffY: 0,
          direction: 'left',
          firstHalfStyle: {},
          lastDirection: '',
          page: 0,
          rotate: 180,
          secondHalfStyle: {
            transform: 'perspective(130em) rotateY(-180deg)',
          },
          startX: 251,
          startY: 1,
        });
      });

      it('should move RIGHT with an angle of 90deg', () => {
        wrapper.setState({
          startX: -124,
          startY: 1,
        });
        wrapper.instance().moveGesture(event);

        const { timestamp, ...timelessState } = wrapper.state();
        expect(timelessState).toEqual({
          angle: 90,
          diffX: 125,
          diffY: 0,
          direction: 'right',
          firstHalfStyle: {
            transform: 'perspective(130em) rotateY(90deg)',
            zIndex: 2,
          },
          lastDirection: '',
          page: 0,
          rotate: 90,
          secondHalfStyle: {},
          startX: -124,
          startY: 1,
        });
      });
    });

    describe('Vertical', () => {
      beforeEach(() => {
        wrapper.setProps({ orientation: 'vertical' });
      });

      it('should move UP with an angle of -135deg', () => {
        wrapper.setState({
          startX: 1,
          startY: 188.5,
        });
        wrapper.instance().moveGesture(event);

        const { timestamp, ...timelessState } = wrapper.state();
        expect(timelessState).toEqual({
          angle: 0,
          diffX: 0,
          diffY: -187.5,
          direction: 'up',
          firstHalfStyle: {},
          lastDirection: 'up',
          page: 0,
          rotate: 0,
          secondHalfStyle: {
            transform: 'perspective(130em) rotateX(0deg)',
          },
          startX: 1,
          startY: 188.5,
        });
      });

      it('should move DOWN with an angle of 45deg', () => {
        wrapper.setState({
          startX: 1,
          startY: -61.5,
        });
        wrapper.instance().moveGesture(event);

        const { timestamp, ...timelessState } = wrapper.state();
        expect(timelessState).toEqual({
          angle: 0,
          diffX: 0,
          diffY: 62.5,
          direction: 'down',
          firstHalfStyle: {
            transform: 'perspective(130em) rotateX(-0deg)',
            zIndex: 2,
          },
          lastDirection: 'down',
          page: 0,
          rotate: 0,
          secondHalfStyle: {},
          startX: 1,
          startY: -61.5,
        });
      });
    });
  });

  describe('mouseLeave', () => {
    let wrapper;
    const mockFn = {
      stopMoving: undefined,
      reset: undefined,
    };

    beforeEach(() => {
      mockFn.stopMoving = jest.fn();
      mockFn.reset = jest.fn();

      wrapper = shallow(<FlipPage />);
      wrapper.instance().stopMoving = mockFn.stopMoving;
      wrapper.instance().reset = mockFn.reset;
    });

    it('should call stopMoving() when flipOnLeave === TRUE', () => {
      wrapper.setProps({ flipOnLeave: true });
      wrapper.instance().mouseLeave();

      expect(mockFn.stopMoving).toHaveBeenCalledTimes(1);
      expect(mockFn.reset).not.toHaveBeenCalled();
    });

    it('should call reset() when flipOnLeave === FALSE', () => {
      wrapper.setProps({ flipOnLeave: false });
      wrapper.instance().mouseLeave();

      expect(mockFn.reset).toHaveBeenCalledTimes(1);
      expect(mockFn.stopMoving).not.toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should reset state to initial values', () => {
      const wrapper = shallow(<FlipPage />);
      wrapper.setState({
        startY: 999,
        startX: 999,
        angle: 180,
        rotate: 180,
        direction: 'up',
        lastDirection: 'down',
        secondHalfStyle: {
          transform: 'perspective(130em) rotateY(-180deg)',
        },
        firstHalfStyle: {
          transform: 'perspective(130em) rotateX(-0deg)',
          zIndex: 2,
        },
      });

      wrapper.instance().reset();
      const {
        timestamp,
        diffY,
        page,
        ...result
      } = wrapper.state();

      expect(result).toEqual({
        startY: -1,
        startX: -1,
        angle: 0,
        rotate: 0,
        direction: '',
        lastDirection: '',
        secondHalfStyle: {
          transition: 'transform 0.2s ease-in-out',
        },
        firstHalfStyle: {
          transition: 'transform 0.2s ease-in-out',
        },
      });
    });
  });
});

describe('<FlipPage orientation />', () => {
  it('should allow "vertical" as an orientation entry', () => {
    const wrapper = shallow(<FlipPage orientation="vertical" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow "horizontal" as an orientation entry', () => {
    const wrapper = shallow(<FlipPage orientation="horizontal" />);
    expect(wrapper.html()).toMatchSnapshot();
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
