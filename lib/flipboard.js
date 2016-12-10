'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var m = function m() {
  for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(objs));
};

var Flipboard = function (_Component) {
  _inherits(Flipboard, _Component);

  function Flipboard(props) {
    _classCallCheck(this, Flipboard);

    var _this = _possibleConstructorReturn(this, (Flipboard.__proto__ || Object.getPrototypeOf(Flipboard)).call(this, props));

    _this.state = {
      page: 0, // current index of page
      startY: -1, // start position of swipe
      diff: 0, // difference between last swipe position and current position
      timestamp: 0, // time elapsed between two swipes
      angle: 0, // rotate angle of half page
      rotate: 0, // absolute value of above, limited to 45° if necessary
      direction: '', // original swipe direction
      lastDirection: '', // last registered swipe direction
      bottomStyle: {}, // transform style of bottom half
      topStyle: {} // transform style of top half
    };

    // binding events
    _this.startMoving = _this.startMoving.bind(_this);
    _this.moveGesture = _this.moveGesture.bind(_this);
    _this.stopMoving = _this.stopMoving.bind(_this);
    _this.reset = _this.reset.bind(_this);

    _this.transition = 'transform ' + _this.props.animationDuration / 1000 + 's ease-in-out';
    return _this;
  }

  _createClass(Flipboard, [{
    key: 'isLastPage',
    value: function isLastPage() {
      return this.state.page + 1 === _react.Children.count(this.props.children);
    }
  }, {
    key: 'isFirstPage',
    value: function isFirstPage() {
      return this.state.page === 0;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.props.height + 'px';
    }
  }, {
    key: 'getHalfHeight',
    value: function getHalfHeight() {
      return this.props.height / 2 + 'px';
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.props.width + 'px';
    }
  }, {
    key: 'startMoving',
    value: function startMoving(e) {
      e.preventDefault();

      var posY = e.pageY || e.touches[0].pageY;

      this.setState({ startY: posY });
    }
  }, {
    key: 'moveGesture',
    value: function moveGesture(e) {
      e.preventDefault();

      var posY = e.pageY || e.touches[0].pageY;

      if (this.state.startY !== -1) {
        var diff = posY - this.state.startY;
        var angle = diff / 250 * 180;
        var useMaxAngle = false;
        if (this.state.direction === 'up') {
          useMaxAngle = this.isLastPage();
        } else if (this.state.direction === 'down') {
          useMaxAngle = this.isFirstPage();
        }
        var rotate = Math.min(Math.abs(angle), useMaxAngle ? this.props.maxAngle : 180);

        // determine direction to prevent two-directions swipe
        if (this.state.direction === '' && Math.abs(diff) > this.props.treshold) {
          var direction = '';

          if (diff < 0) {
            direction = 'up';
          } else if (diff > 0) {
            direction = 'down';
          }

          this.setState({ direction: direction });
        }

        // set the last direction
        var lastDirection = this.state.lastDirection;
        if (this.state.diff > diff) {
          lastDirection = 'up';
        } else if (this.state.diff < diff) {
          lastDirection = 'down';
        }

        this.setState({
          angle: angle,
          rotate: rotate,
          timestamp: Date.now(),
          diff: diff,
          lastDirection: lastDirection
        });

        // flip bottom
        if (diff < 0 && this.state.direction === 'up') {
          this.setState({ angle: angle, bottomStyle: {
              transform: 'perspective(' + this.props.perspective + ') rotateX(' + rotate + 'deg)'
            } });
        } else if (diff > 0 && this.state.direction === 'down') {
          this.setState({ angle: angle, topStyle: {
              transform: 'perspective(' + this.props.perspective + ') rotateX(-' + rotate + 'deg)',
              zIndex: 2 // apply a z-index to pop over the back face
            } });
        }
      }
    }
  }, {
    key: 'stopMoving',
    value: function stopMoving(e) {
      var _this2 = this;

      var delay = Date.now() - this.state.timestamp;

      var goNext = !this.isLastPage() && (this.state.angle <= -90 || delay <= 20 && this.state.direction === 'up' && this.state.lastDirection === 'up');
      var goPrevious = !this.isFirstPage() && (this.state.angle >= 90 || delay <= 20 && this.state.direction === 'down' && this.state.lastDirection === 'down');

      // reset everything
      this.reset();
      this.setState({
        bottomStyle: {
          transition: this.transition,
          transform: goNext ? 'perspective(' + this.props.perspective + ') rotateX(180deg)' : ''
        },

        topStyle: {
          transition: this.transition,
          transform: goPrevious ? 'perspective(' + this.props.perspective + ') rotateX(-180deg)' : '',
          zIndex: goPrevious ? 2 : 'auto'
        }
      }, function () {
        // load the next item if it was requested
        if (goNext) {
          setTimeout(function () {
            _this2.setState({
              bottomStyle: {},
              page: _this2.state.page + 1
            });
          }, _this2.props.animationDuration);
        } else if (goPrevious) {
          // or load the previous item
          setTimeout(function () {
            _this2.setState({
              topStyle: {},
              page: _this2.state.page - 1
            });
          }, _this2.props.animationDuration);
        }
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({
        startY: -1,
        angle: 0,
        rotate: 0,
        direction: '',
        lastDirection: '',
        bottomStyle: {
          transition: this.transition
        },
        topStyle: {
          transition: this.transition
        }
      });
    }
  }, {
    key: 'renderPage',
    value: function renderPage(page, key) {
      var height = this.getHeight();
      var halfHeight = this.getHalfHeight();
      var width = this.getWidth();
      var gradientTop = '0 -100px 100px -100px rgba(0,0,0,0.25) inset';
      var gradientBottom = '0 100px 100px -100px rgba(0,0,0,0.25) inset';

      var pageItem = (0, _react.cloneElement)(page, {
        style: Object.assign({}, page.props.style, {
          height: height
        })
      });

      var style = {
        container: {
          display: this.state.page === key ? 'block' : 'none',
          height: height,
          overflow: 'hidden',
          position: 'relative',
          width: width
        },
        part: {
          height: halfHeight,
          left: 0,
          position: 'absolute',
          width: width
        },
        visiblePart: {
          transformStyle: 'preserve-3d'
        },
        top: {
          top: 0,
          transformOrigin: 'bottom center'
        },
        bottom: {
          bottom: 0,
          transformOrigin: 'top center'
        },
        face: {
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          height: halfHeight,
          left: 0,
          position: 'absolute',
          top: 0,
          transformStyle: 'preserve-3d',
          width: width
        },
        back: {
          transform: 'rotateX(180deg)'
        },
        before: {
          top: 0
        },
        after: {
          bottom: 0
        },
        cut: {
          background: this.props.pageBackground,
          height: halfHeight,
          overflow: 'hidden',
          position: 'relative',
          width: width
        },
        pull: {
          marginTop: '-' + halfHeight
        },
        gradient: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          transition: 'box-shadow ' + this.props.animationDuration / 1000 + 's ease-in-out'
        },
        gradientBottomFace: {
          boxShadow: this.state.direction === 'up' ? gradientBottom : ''
        },
        gradientTopFace: {
          boxShadow: this.state.direction === 'down' ? gradientTop : ''
        },
        gradientBottomBack: {
          boxShadow: this.state.direction === 'up' ? gradientTop : ''
        },
        gradientTopBack: {
          boxShadow: this.state.direction === 'down' ? gradientBottom : ''
        },
        mask: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: this.state.direction !== '' ? Math.max(this.props.maskOpacity - Math.abs(this.state.rotate) / 90 * this.props.maskOpacity, 0) : 0
        }
      };

      var beforeItem = !this.isFirstPage() ? this.props.children[this.state.page - 1] : this.props.firstComponent;

      var afterItem = !this.isLastPage() ? this.props.children[this.state.page + 1] : this.props.lastComponent;

      var container = style.container,
          part = style.part,
          visiblePart = style.visiblePart,
          top = style.top,
          bottom = style.bottom,
          face = style.face,
          back = style.back,
          before = style.before,
          after = style.after,
          cut = style.cut,
          pull = style.pull,
          gradient = style.gradient,
          gradientBottomBack = style.gradientBottomBack,
          gradientTopBack = style.gradientTopBack,
          gradientBottomFace = style.gradientBottomFace,
          gradientTopFace = style.gradientTopFace,
          mask = style.mask;


      return React.createElement(
        'div',
        {
          key: key,
          onMouseDown: this.startMoving,
          onTouchStart: this.startMoving,
          onMouseMove: this.moveGesture,
          onTouchMove: this.moveGesture,
          onMouseUp: this.stopMoving,
          onTouchEnd: this.stopMoving,
          onMouseLeave: this.reset,
          style: container
        },
        React.createElement(
          'div',
          { style: m(part, before, cut) },
          beforeItem,
          React.createElement('div', { style: mask })
        ),
        React.createElement(
          'div',
          { style: m(part, after, cut) },
          React.createElement(
            'div',
            { style: pull },
            afterItem
          ),
          React.createElement('div', { style: mask })
        ),
        React.createElement(
          'div',
          { style: m(part, visiblePart, top, this.state.topStyle) },
          React.createElement(
            'div',
            { style: face },
            React.createElement(
              'div',
              { style: cut },
              pageItem
            ),
            React.createElement('div', { style: m(gradient, gradientTopFace) })
          ),
          React.createElement(
            'div',
            { style: m(face, back) },
            React.createElement(
              'div',
              { style: cut },
              React.createElement(
                'div',
                { style: pull },
                beforeItem
              )
            ),
            React.createElement('div', { style: m(gradient, gradientTopBack) })
          )
        ),
        React.createElement(
          'div',
          { style: m(part, visiblePart, bottom, this.state.bottomStyle) },
          React.createElement(
            'div',
            { style: face },
            React.createElement(
              'div',
              { style: cut },
              React.createElement(
                'div',
                { style: pull },
                pageItem
              )
            ),
            React.createElement('div', { style: m(gradient, gradientBottomFace) })
          ),
          React.createElement(
            'div',
            { style: m(face, back) },
            React.createElement(
              'div',
              { style: m(part, after, cut) },
              afterItem
            ),
            React.createElement('div', { style: m(gradient, gradientBottomBack) })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = m(this.props.style, {
        height: this.getHeight(),
        position: 'relative',
        width: this.getWidth()
      });

      // all the pages are rendered once, to prevent glitching
      // (React would reload the child page and cause a image glitch)
      return React.createElement(
        'div',
        { style: style },
        _react.Children.map(this.props.children, function (page, key) {
          return _this3.renderPage(page, key);
        })
      );
    }
  }]);

  return Flipboard;
}(_react.Component);

Flipboard.defaultProps = {
  animationDuration: 200,
  treshold: 10,
  maxAngle: 45,
  maskOpacity: 0.4,
  perspective: '130em',
  pageBackground: '#fff',
  firstComponent: null,
  lastComponent: null,
  style: {}
};

Flipboard.propTypes = {
  animationDuration: _react.PropTypes.number,
  treshold: _react.PropTypes.number,
  maxAngle: _react.PropTypes.number,
  maskOpacity: _react.PropTypes.number,
  perspective: _react.PropTypes.string,
  pageBackground: _react.PropTypes.string,
  firstComponent: _react.PropTypes.element,
  lastComponent: _react.PropTypes.element,
  style: _react.PropTypes.object
};

exports.default = Flipboard;
