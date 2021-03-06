import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import FlipPageItem from './item';
import './Hint.css';
import generateStyles from './generateStyles';

const m = (...objs) => Object.assign({}, ...objs);

const doNotMove = (e) => {
  e.preventDefault();
};

const getPosition = (e) => ({
  posX: e.pageX || e.clientX || (e.touches && e.touches[0].pageX),
  posY: e.pageY || e.clientY || (e.touches && e.touches[0].pageY),
});

class FlipPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.startAt, // current index of page
      startY: -1, // start position of swipe
      diffY: 0, // diffYerence between last swipe position and current position
      timestamp: 0, // time elapsed between two swipes
      angle: 0, // rotate angle of half page
      rotate: 0, // absolute value of above, limited to 45° if necessary
      direction: '', // original swipe direction
      lastDirection: '', // last registered swipe direction
      secondHalfStyle: {}, // transform style of bottom half
      firstHalfStyle: {}, // transform style of top half
      canAnimate: true, // should the component animate with the methods?
    };

    // binding events
    this.startMoving = this.startMoving.bind(this);
    this.moveGesture = this.moveGesture.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
    this.reset = this.reset.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.hasNextPage = this.hasNextPage.bind(this);
    this.hasPreviousPage = this.hasPreviousPage.bind(this);
    this.turnRightOrDown = this.turnRightOrDown.bind(this);
    this.turnLeftOrUp = this.turnLeftOrUp.bind(this);

    this.transition = `transform ${this.props.animationDuration / 1000}s ease-in-out`;
    this.onStartSwipingCalled = false;
  }

  componentDidMount() {
    const { showHint, showSwipeHint } = this.props;

    if (showHint) {
      this.hintTimeout = setTimeout(() => this.showHint(), showSwipeHint ? 1800 : 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hintTimeout);
    clearTimeout(this.hintHideTimeout);
  }

  getHeight() {
    const { responsive } = this.props;
    return !responsive ? `${this.props.height}px` : '100%';
  }

  getWidth() {
    const { responsive } = this.props;
    return !responsive ? `${this.props.width}px` : '100%';
  }

  flatChildren() {
    return Array.prototype.flat.call(this.props.children);
  }

  isLastPage() {
    return this.state.page + 1 === Children.count(this.flatChildren());
  }

  isFirstPage() {
    return this.state.page === 0;
  }

  showHint() {
    const { orientation, perspective } = this.props;
    const { transition } = this;

    this.setState({ secondHalfStyle: { transition } }, () => {
      this.setState({
        secondHalfStyle: {
          transition,
          transform: orientation === 'vertical' ? `perspective(${perspective}) rotateX(30deg)` : `perspective(${perspective}) rotateY(-30deg)`,
        },
      });

      const callback = () => this.setState({ secondHalfStyle: { transition } });
      this.hintHideTimeout = setTimeout(callback, 1000);
    });
  }

  incrementPage() {
    const lastPage = Children.count(this.flatChildren());
    const { page } = this.state;
    this.setState({
      page: (page + 1) % lastPage,
    }, () => this.props.onPageChange(this.state.page, 'next'));
  }

  decrementPage() {
    const lastPage = Children.count(this.flatChildren());
    const { page } = this.state;
    let nextPage;

    if (this.isFirstPage()) {
      nextPage = lastPage - 1;
    } else {
      nextPage = page - 1;
    }
    this.setState({
      page: nextPage,
    }, () => this.props.onPageChange(this.state.page, 'prev'));
  }

  hasNextPage() {
    const { loopForever } = this.props;
    return !this.isLastPage() || loopForever;
  }

  hasPreviousPage() {
    const { loopForever } = this.props;
    return !this.isFirstPage() || loopForever;
  }

  startMoving(e) {
    // prevent the button's and a's to not be clickable.
    const { tagName, className } = e.target;

    if (tagName === 'BUTTON' || tagName === 'A') {
      return;
    }

    doNotMove(e);

    const { swipeImmune } = this.props;
    const cancel = swipeImmune.some((testedClassName) => className.indexOf(testedClassName) !== -1);

    if (cancel) {
      return;
    }

    const { posX, posY } = getPosition(e);

    this.setState({
      startX: posX,
      startY: posY,
      canAnimate: false,
    });
  }

  moveGesture(e) {
    e.preventDefault();

    const { posX, posY } = getPosition(e);

    const {
      orientation, treshold, maxAngle, perspective, reverse,
    } = this.props;
    const {
      startX, startY, diffX, diffY, direction, lastDirection,
    } = this.state;

    if (startY !== -1) {
      const newDiffY = posY - startY;
      const newDiffX = posX - startX;
      const diffToUse = (direction === 'up' || direction === 'down') ? newDiffY : newDiffX;
      const angle = (diffToUse / 250) * 180;
      let useMaxAngle = false;
      if (direction === 'up' || direction === 'left') {
        useMaxAngle = reverse ? !this.hasPreviousPage() : !this.hasNextPage();
      } else if (direction === 'down' || direction === 'right') {
        useMaxAngle = reverse ? !this.hasNextPage() : !this.hasPreviousPage();
      }

      const rotate = Math.min(Math.abs(angle), useMaxAngle ? maxAngle : 180);
      const aboveTreshold = (Math.abs(newDiffX) > treshold || Math.abs(newDiffY) > treshold);

      let nextDirection = '';

      if (!this.onStartSwipingCalled && aboveTreshold) {
        this.props.onStartSwiping();
        this.onStartSwipingCalled = true;
      }

      // determine direction to prevent two-directions swipe
      if (direction === '' && aboveTreshold) {
        if (newDiffY < 0 && orientation === 'vertical') {
          nextDirection = 'up';
        } else if (newDiffY > 0 && orientation === 'vertical') {
          nextDirection = 'down';
        } else if (newDiffX < 0 && orientation === 'horizontal') {
          nextDirection = 'left';
        } else if (newDiffX > 0 && orientation === 'horizontal') {
          nextDirection = 'right';
        }

        this.setState({ direction: nextDirection });
      }

      // set the last direction
      let nextLastDirection = lastDirection;
      if (diffY > newDiffY) {
        nextLastDirection = 'up';
      } else if (diffY < newDiffY) {
        nextLastDirection = 'down';
      } else if (diffX > newDiffX) {
        nextLastDirection = 'right';
      } else if (diffX < newDiffX) {
        nextLastDirection = 'left';
      }

      this.setState({
        angle,
        rotate,
        timestamp: Date.now(),
        diffY: newDiffY,
        diffX: newDiffX,
        lastDirection: nextLastDirection,
      });

      // flip bottom
      if (newDiffY < 0 && this.state.direction === 'up') {
        this.setState({
          angle,
          secondHalfStyle: {
            transform: `perspective(${perspective}) rotateX(${rotate}deg)`,
          },
        });
      } else if (newDiffY > 0 && this.state.direction === 'down') {
        this.setState({
          angle,
          firstHalfStyle: {
            transform: `perspective(${perspective}) rotateX(-${rotate}deg)`,
            zIndex: 2, // apply a z-index to pop over the back face
          },
        });
      } else if (newDiffX < 0 && this.state.direction === 'left') {
        this.setState({
          angle,
          secondHalfStyle: {
            transform: `perspective(${perspective}) rotateY(-${rotate}deg)`,
          },
        });
      } else if (newDiffX > 0 && this.state.direction === 'right') {
        this.setState({
          angle,
          firstHalfStyle: {
            transform: `perspective(${perspective}) rotateY(${rotate}deg)`,
            zIndex: 2, // apply a z-index to pop over the back face
          },
        });
      }
    }
  }

  turnRightOrDown(callback) {
    const {
      perspective, orientation, animationDuration,
    } = this.props;
    const { transition } = this;
    let secondHalfTransform = `perspective(${perspective}) `;

    if (orientation === 'vertical') {
      secondHalfTransform += 'rotateX(180deg)';
    } else {
      secondHalfTransform += 'rotateY(-180deg)';
    }

    this.setState({
      firstHalfStyle: {
        transition,
        transform: '',
        zIndex: 'auto',
      },

      secondHalfStyle: {
        transition,
        transform: secondHalfTransform,
      },

      canAnimate: false,
    }, () => {
      setTimeout(() => {
        callback();
        this.setState({
          secondHalfStyle: {},
          canAnimate: true,
        });
      }, animationDuration);
    });
  }

  turnLeftOrUp(callback) {
    const {
      perspective, orientation, animationDuration,
    } = this.props;
    const { transition } = this;
    let firstHalfTransform = `perspective(${perspective}) `;

    if (orientation === 'vertical') {
      firstHalfTransform += 'rotateX(-180deg)';
    } else {
      firstHalfTransform += 'rotateY(180deg)';
    }

    this.setState({
      firstHalfStyle: {
        transition,
        transform: firstHalfTransform,
        zIndex: 2,
      },

      secondHalfStyle: {
        transition,
        transform: '',
      },

      canAnimate: false,
    }, () => {
      setTimeout(() => {
        callback();
        this.setState({
          firstHalfStyle: {},
          canAnimate: true,
        });
      }, animationDuration);
    });
  }

  gotoNextPage() {
    if (!this.hasNextPage() || !this.state.canAnimate) return;

    const { onStartPageChange, reverse } = this.props;
    // Send an event before the end of the change page animation
    onStartPageChange(this.state.page, 'next');
    // We separe the next/previous logic to the right/left logic
    if (!reverse) this.turnRightOrDown(this.incrementPage);
    else this.turnLeftOrUp(this.incrementPage);
  }

  gotoPreviousPage() {
    if (!this.hasPreviousPage() || !this.state.canAnimate) return;

    const { onStartPageChange, reverse } = this.props;

    // Send an event before the end of the change page animation
    onStartPageChange(this.state.page, 'prev');
    // We separe the next/previous logic to the right/left logic
    if (!reverse) this.turnLeftOrUp(this.decrementPage);
    else this.turnRightOrDown(this.decrementPage);
  }

  gotoPage(page) {
    const children = this.flatChildren();
    const { onPageChange } = this.props;

    if (page >= 0 && page < children.length) {
      this.setState({ page }, () => {
        onPageChange(page, 'set');
      });
    } else {
      throw new RangeError('`page` argument is out of bounds.');
    }
  }

  stopMoving(cb) {
    const { reverse, onStopSwiping } = this.props;
    const {
      timestamp, angle, direction, lastDirection,
    } = this.state;
    const delay = Date.now() - timestamp;

    // We don't check hasNextPage because it is done in gotoNextPage
    const goUpOrRight = angle <= -90
      || (delay <= 20 && direction === 'up' && lastDirection === 'up')
      || (delay <= 20 && direction === 'right' && lastDirection === 'right');

    const goDownOrLeft = angle >= 90
      || (delay <= 20 && direction === 'down' && lastDirection === 'down')
      || (delay <= 20 && direction === 'left' && lastDirection === 'left');

    // reset everything
    this.reset(() => {
      onStopSwiping();

      if (goUpOrRight) {
        if (!reverse) this.gotoNextPage();
        else this.gotoPreviousPage();
      }

      if (goDownOrLeft) {
        if (!reverse) this.gotoPreviousPage();
        else this.gotoNextPage();
      }

      if (typeof cb === 'function') {
        cb();
      }
    });
  }

  beforeItem() {
    const lastPage = Children.count(this.props.children);
    const { firstComponent, loopForever } = this.props;
    const children = this.flatChildren();

    if (!this.isFirstPage()) {
      return children[this.state.page - 1];
    }

    return loopForever ? children[lastPage - 1] : firstComponent;
  }

  afterItem() {
    const { lastComponent, loopForever } = this.props;
    const children = this.flatChildren();

    if (!this.isLastPage()) {
      return children[this.state.page + 1];
    }

    return loopForever ? children[0] : lastComponent;
  }

  mouseLeave() {
    if (this.props.flipOnLeave) {
      this.stopMoving();
    } else {
      this.reset();
    }
  }

  reset(callback) {
    const { transition } = this;
    this.onStartSwipingCalled = false;

    this.setState({
      startY: -1,
      startX: -1,
      angle: 0,
      rotate: 0,
      direction: '',
      lastDirection: '',
      secondHalfStyle: { transition },
      firstHalfStyle: { transition },
      canAnimate: true,
    }, callback);
  }

  renderPage(_page, key) {
    const activeItem = key === this.state.page;

    const { page, direction, rotate } = this.state;
    const {
      orientation,
      uncutPages,
      maskOpacity,
      pageBackground,
      animationDuration,
      flipOnTouch,
      disableSwipe,
      reverse,
      noShadow,
    } = this.props;

    const style = generateStyles(
      page,
      key,
      direction,
      rotate,
      uncutPages,
      orientation,
      maskOpacity,
      pageBackground,
      animationDuration,
    );

    const {
      container,
      part,
      visiblePart,
      firstHalf,
      secondHalf,
      face,
      back,
      before,
      after,
      cut,
      firstCut,
      pull,
      gradient,
      gradientBefore,
      gradientAfter,
      gradientSecondHalf,
      gradientFirstHalf,
      mask,
      maskReverse,
    } = style;

    const pageItem = (
      <FlipPageItem
        shouldUpdate={activeItem}
        component={_page}
      />
    );

    const beforeItem = reverse ? this.afterItem() : this.beforeItem();
    const afterItem = reverse ? this.beforeItem() : this.afterItem();

    const clonedBeforeItem = beforeItem ? (
      <FlipPageItem
        component={beforeItem}
        shouldUpdate={activeItem}
      />
    ) : null;
    const clonedAfterItem = afterItem ? (
      <FlipPageItem
        component={afterItem}
        shouldUpdate={activeItem}
      />
    ) : null;

    const allowSwipe = (flipOnTouch && !disableSwipe) || !flipOnTouch;
    const onStartTouching = allowSwipe ? this.startMoving : doNotMove;

    return (
      <div
        role="presentation"
        key={key}
        onMouseDown={onStartTouching}
        onTouchStart={onStartTouching}
        onMouseMove={this.moveGesture}
        onTouchMove={this.moveGesture}
        onMouseUp={this.stopMoving}
        onTouchEnd={this.stopMoving}
        onMouseLeave={this.mouseLeave}
        style={container}
      >
        <div style={m(part, before, cut)}>
          {clonedBeforeItem}
          <div style={mask} />
          <div style={m(gradient, gradientBefore)} />
        </div>
        <div style={m(part, cut, after)}>
          <div style={pull}>
            {clonedAfterItem}
          </div>
          <div style={mask} />
          <div style={m(gradient, gradientAfter)} />
        </div>
        <div style={m(part, visiblePart, firstHalf, this.state.firstHalfStyle)}>
          <div style={face}>
            <div style={m(cut, firstCut)}>
              {pageItem}
            </div>
            <div style={m(mask, maskReverse)} />
            {!noShadow && <div style={m(gradient, gradientFirstHalf)} />}
          </div>
          <div style={m(face, back)}>
            <div style={cut}>
              <div style={pull}>
                {clonedBeforeItem}
              </div>
            </div>
          </div>
        </div>
        <div style={m(part, visiblePart, secondHalf, this.state.secondHalfStyle)}>
          <div style={face}>
            <div style={cut}>
              <div style={pull}>
                {pageItem}
              </div>
            </div>
            <div style={m(mask, maskReverse)} />
            {!noShadow && <div style={m(gradient, gradientSecondHalf)} />}
          </div>
          <div style={m(face, back)}>
            <div style={m(part, after, cut, firstCut)}>
              {clonedAfterItem}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      style,
      className,
      orientation,
      showSwipeHint,
      showTouchHint,
      flipOnTouch,
      flipOnTouchZone,
      disableSwipe,
      reverse,
    } = this.props;

    const children = this.flatChildren();

    const containerStyle = m(style, {
      height: this.getHeight(),
      position: 'relative',
      width: this.getWidth(),
    });

    const touchZoneStyle = {
      height: orientation === 'vertical' ? `${flipOnTouchZone}%` : '100%',
      position: 'absolute',
      touchAction: 'none',
      width: orientation === 'vertical' ? '100%' : `${flipOnTouchZone}%`,
      zIndex: 3,
    };

    const leftZone = { left: 0, top: 0 };
    const rightZone = { bottom: 0, right: 0 };

    const previousPageTouchZoneStyle = m(touchZoneStyle, reverse ? rightZone : leftZone);
    const nextPageTouchZoneStyle = m(touchZoneStyle, reverse ? leftZone : rightZone);

    const onStartTouching = !disableSwipe ? this.startMoving : doNotMove;
    const gotoPreviousPage = () => {
      this.stopMoving(() => this.gotoPreviousPage());
    };
    const gotoNextPage = () => {
      this.stopMoving(() => this.gotoNextPage());
    };

    // all the pages are rendered once, to prevent glitching
    // (React would reload the child page and cause a image glitch)
    return (
      <div style={containerStyle} className={className}>
        {Children.map(children, (page, key) => this.renderPage(page, key))}
        {showSwipeHint && <div className={`rfp-swipeHint rfp-swipeHint--${orientation}`} />}
        {
          flipOnTouch && (
            <div>
              <div
                role="presentation"
                onMouseDown={onStartTouching}
                onTouchStart={onStartTouching}
                onMouseUp={gotoPreviousPage}
                onMouseMove={this.moveGesture}
                onTouchMove={this.moveGesture}
                onTouchEnd={this.stopMoving}
                onMouseLeave={this.mouseLeave}
                style={previousPageTouchZoneStyle}
                className="rfp-touchZone rfp-touchZone-previous"
              />
              <div
                role="presentation"
                onMouseDown={onStartTouching}
                onTouchStart={onStartTouching}
                onMouseUp={gotoNextPage}
                onMouseMove={this.moveGesture}
                onTouchMove={this.moveGesture}
                onTouchEnd={this.stopMoving}
                onMouseLeave={this.mouseLeave}
                style={nextPageTouchZoneStyle}
                className="rfp-touchZone rfp-touchZone-next"
              />
              {showTouchHint && <div className={`rfp-touchHint rfp-touchHint--${orientation}`} />}
            </div>
          )
        }
      </div>
    );
  }
}

FlipPage.defaultProps = {
  children: [],
  orientation: 'vertical',
  animationDuration: 200,
  treshold: 10,
  maxAngle: 45,
  maskOpacity: 0.4,
  perspective: '130em',
  pageBackground: '#fff',
  firstComponent: null,
  lastComponent: null,
  showHint: false,
  showSwipeHint: false,
  showTouchHint: false,
  uncutPages: false,
  style: {},
  height: 480,
  width: 320,
  onPageChange: () => {},
  onStartPageChange: () => {},
  onStartSwiping: () => {},
  onStopSwiping: () => {},
  className: '',
  flipOnLeave: false,
  loopForever: false, // loop back to first page after last one
  flipOnTouch: false,
  flipOnTouchZone: 10,
  disableSwipe: false,
  responsive: false,
  startAt: 0,
  reverse: false,
  swipeImmune: [],
  noShadow: false,
};

FlipPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  animationDuration: PropTypes.number,
  treshold: PropTypes.number,
  maxAngle: PropTypes.number,
  maskOpacity: PropTypes.number,
  perspective: PropTypes.string,
  pageBackground: PropTypes.string,
  firstComponent: PropTypes.element,
  flipOnLeave: PropTypes.bool,
  lastComponent: PropTypes.element,
  showHint: PropTypes.bool,
  showSwipeHint: PropTypes.bool,
  showTouchHint: PropTypes.bool,
  uncutPages: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  height: PropTypes.number,
  width: PropTypes.number,
  onPageChange: PropTypes.func,
  onStartPageChange: PropTypes.func,
  onStartSwiping: PropTypes.func,
  onStopSwiping: PropTypes.func,
  className: PropTypes.string,
  loopForever: PropTypes.bool,
  flipOnTouch: PropTypes.bool,
  flipOnTouchZone: PropTypes.number,
  disableSwipe: PropTypes.bool,
  responsive: PropTypes.bool,
  startAt: PropTypes.number,
  reverse: PropTypes.bool,
  swipeImmune: PropTypes.arrayOf(PropTypes.string),
  noShadow: PropTypes.bool,
};

export default FlipPage;
