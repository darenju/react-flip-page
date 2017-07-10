(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var m = function m() {
    for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
      objs[_key] = arguments[_key];
    }

    return Object.assign.apply(Object, [{}].concat(objs));
  };

  var FlipPage = function (_Component) {
    _inherits(FlipPage, _Component);

    function FlipPage(props) {
      _classCallCheck(this, FlipPage);

      var _this = _possibleConstructorReturn(this, (FlipPage.__proto__ || Object.getPrototypeOf(FlipPage)).call(this, props));

      _this.state = {
        page: 0, // current index of page
        startY: -1, // start position of swipe
        diffY: 0, // diffYerence between last swipe position and current position
        timestamp: 0, // time elapsed between two swipes
        angle: 0, // rotate angle of half page
        rotate: 0, // absolute value of above, limited to 45° if necessary
        direction: '', // original swipe direction
        lastDirection: '', // last registered swipe direction
        secondHalfStyle: {}, // transform style of bottom half
        firstHalfStyle: {} // transform style of top half
      };

      // binding events
      _this.startMoving = _this.startMoving.bind(_this);
      _this.moveGesture = _this.moveGesture.bind(_this);
      _this.stopMoving = _this.stopMoving.bind(_this);
      _this.reset = _this.reset.bind(_this);

      _this.transition = 'transform ' + _this.props.animationDuration / 1000 + 's ease-in-out';
      return _this;
    }

    _createClass(FlipPage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (this.props.showHint) {
          setTimeout(function () {
            return _this2.showHint();
          }, 1000);
        }
      }
    }, {
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
      key: 'getHalfWidth',
      value: function getHalfWidth() {
        return this.props.width / 2 + 'px';
      }
    }, {
      key: 'showHint',
      value: function showHint() {
        var _this3 = this;

        this.setState({
          secondHalfStyle: {
            transition: this.transition
          }
        }, function () {
          _this3.setState({
            secondHalfStyle: {
              transition: _this3.transition,
              transform: _this3.props.orientation === 'vertical' ? 'perspective(' + _this3.props.perspective + ') rotateX(30deg)' : 'perspective(' + _this3.props.perspective + ') rotateY(-30deg)'
            }
          });

          setTimeout(function () {
            _this3.setState({
              secondHalfStyle: {
                transition: _this3.transition
              }
            });
          }, 1000);
        });
      }
    }, {
      key: 'startMoving',
      value: function startMoving(e) {
        e.preventDefault();

        var posX = e.pageX || e.touches[0].pageX;
        var posY = e.pageY || e.touches[0].pageY;

        this.setState({
          startX: posX,
          startY: posY
        });
      }
    }, {
      key: 'moveGesture',
      value: function moveGesture(e) {
        e.preventDefault();

        var posX = e.pageX || e.touches[0].pageX;
        var posY = e.pageY || e.touches[0].pageY;

        var orientation = this.props.orientation;


        if (this.state.startY !== -1) {
          var diffY = posY - this.state.startY;
          var diffX = posX - this.state.startX;
          var diffToUse = this.state.direction === 'up' || this.state.direction === 'down' ? diffY : diffX;
          var angle = diffToUse / 250 * 180;
          var useMaxAngle = false;
          if (this.state.direction === 'up' || this.state.direction === 'left') {
            useMaxAngle = this.isLastPage();
          } else if (this.state.direction === 'down' || this.state.direction === 'right') {
            useMaxAngle = this.isFirstPage();
          }
          var rotate = Math.min(Math.abs(angle), useMaxAngle ? this.props.maxAngle : 180);

          // determine direction to prevent two-directions swipe
          if (this.state.direction === '' && (Math.abs(diffX) > this.props.treshold || Math.abs(diffY) > this.props.treshold)) {
            var direction = '';

            if (diffY < 0 && orientation === 'vertical') {
              direction = 'up';
            } else if (diffY > 0 && orientation === 'vertical') {
              direction = 'down';
            } else if (diffX < 0 && orientation === 'horizontal') {
              direction = 'left';
            } else if (diffX > 0 && orientation === 'horizontal') {
              direction = 'right';
            }

            this.setState({ direction: direction });
          }

          // set the last direction
          var lastDirection = this.state.lastDirection;
          if (this.state.diffY > diffY) {
            lastDirection = 'up';
          } else if (this.state.diffY < diffY) {
            lastDirection = 'down';
          } else if (this.state.diffX > diffX) {
            lastDirection = 'right';
          } else if (this.state.diffX < diffX) {
            lastDirection = 'left';
          }

          this.setState({
            angle: angle,
            rotate: rotate,
            timestamp: Date.now(),
            diffY: diffY,
            diffX: diffX,
            lastDirection: lastDirection
          });

          // flip bottom
          if (diffY < 0 && this.state.direction === 'up') {
            this.setState({ angle: angle, secondHalfStyle: {
                transform: 'perspective(' + this.props.perspective + ') rotateX(' + rotate + 'deg)'
              } });
          } else if (diffY > 0 && this.state.direction === 'down') {
            this.setState({ angle: angle, firstHalfStyle: {
                transform: 'perspective(' + this.props.perspective + ') rotateX(-' + rotate + 'deg)',
                zIndex: 2 // apply a z-index to pop over the back face
              } });
          } else if (diffX < 0 && this.state.direction === 'left') {
            this.setState({ angle: angle, secondHalfStyle: {
                transform: 'perspective(' + this.props.perspective + ') rotateY(-' + rotate + 'deg)'
              } });
          } else if (diffX > 0 && this.state.direction === 'right') {
            this.setState({ angle: angle, firstHalfStyle: {
                transform: 'perspective(' + this.props.perspective + ') rotateY(' + rotate + 'deg)',
                zIndex: 2 // apply a z-index to pop over the back face
              } });
          }
        }
      }
    }, {
      key: 'gotoNextPage',
      value: function gotoNextPage() {
        var _this4 = this;

        if (this.isLastPage()) return;

        var secondHalfTransform = 'perspective(' + this.props.perspective + ') ';

        if (this.props.orientation === 'vertical') {
          secondHalfTransform += 'rotateX(180deg)';
        } else {
          secondHalfTransform += 'rotateY(-180deg)';
        }

        this.setState({
          firstHalfStyle: {
            transition: this.transition,
            transform: '',
            zIndex: 'auto'
          },

          secondHalfStyle: {
            transition: this.transition,
            transform: secondHalfTransform
          }
        }, function () {
          setTimeout(function () {
            _this4.setState({
              secondHalfStyle: {},
              page: _this4.state.page + 1
            });
          }, _this4.props.animationDuration);
        });
      }
    }, {
      key: 'gotoPreviousPage',
      value: function gotoPreviousPage() {
        var _this5 = this;

        if (this.isFirstPage()) return;

        var firstHalfTransform = 'perspective(' + this.props.perspective + ') ';

        if (this.props.orientation === 'vertical') {
          firstHalfTransform += 'rotateX(-180deg)';
        } else {
          firstHalfTransform += 'rotateY(180deg)';
        }

        this.setState({
          firstHalfStyle: {
            transition: this.transition,
            transform: firstHalfTransform,
            zIndex: 2
          },

          secondHalfStyle: {
            transition: this.transition,
            transform: ''
          }
        }, function () {
          setTimeout(function () {
            _this5.setState({
              firstHalfStyle: {},
              page: _this5.state.page - 1
            });
          }, _this5.props.animationDuration);
        });
      }
    }, {
      key: 'stopMoving',
      value: function stopMoving(e) {
        var delay = Date.now() - this.state.timestamp;

        var goNext = !this.isLastPage() && (this.state.angle <= -90 || delay <= 20 && this.state.direction === 'up' && this.state.lastDirection === 'up' || delay <= 20 && this.state.direction === 'right' && this.state.lastDirection === 'right');
        var goPrevious = !this.isFirstPage() && (this.state.angle >= 90 || delay <= 20 && this.state.direction === 'down' && this.state.lastDirection === 'down' || delay <= 20 && this.state.direction === 'left' && this.state.lastDirection === 'left');

        // reset everything
        this.reset();

        if (goNext) {
          this.gotoNextPage();
        }

        if (goPrevious) {
          this.gotoPreviousPage();
        }
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.setState({
          startY: -1,
          startX: -1,
          angle: 0,
          rotate: 0,
          direction: '',
          lastDirection: '',
          secondHalfStyle: {
            transition: this.transition
          },
          firstHalfStyle: {
            transition: this.transition
          }
        });
      }
    }, {
      key: 'renderPage',
      value: function renderPage(page, key) {
        var _this6 = this;

        var height = this.getHeight();
        var halfHeight = this.getHalfHeight();
        var width = this.getWidth();
        var halfWidth = this.getHalfWidth();
        var _props = this.props,
            orientation = _props.orientation,
            uncutPages = _props.uncutPages;

        var gradientTop = '0 -100px 100px -100px rgba(0,0,0,0.25) inset';
        var gradientLeft = '-100px 0 100px -100px rgba(0,0,0,0.25) inset';
        var gradientBottom = '0 100px 100px -100px rgba(0,0,0,0.25) inset';
        var gradientRight = '100px 0 100px -100px rgba(0,0,0,0.25) inset';

        var pageItem = (0, _react.cloneElement)(page, {
          style: Object.assign({}, page.props.style, {
            height: height
          })
        });

        var style = {
          container: {
            display: this.state.page === key ? 'block' : 'none',
            height: height,
            overflow: uncutPages === false ? 'hidden' : '',
            position: 'relative',
            width: width
          },
          part: {
            height: orientation === 'vertical' ? halfHeight : height,
            left: 0,
            position: 'absolute',
            width: orientation === 'vertical' ? width : halfWidth
          },
          visiblePart: {
            transformStyle: 'preserve-3d'
          },
          firstHalf: {
            top: 0,
            left: 0,
            transformOrigin: orientation === 'vertical' ? 'bottom center' : 'right center'
          },
          secondHalf: {
            left: orientation === 'vertical' ? 0 : halfWidth,
            bottom: 0,
            right: 0,
            transformOrigin: orientation === 'vertical' ? 'top center' : 'left center'
          },
          face: {
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            height: orientation === 'vertical' ? halfHeight : height,
            left: 0,
            position: 'absolute',
            top: 0,
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            width: orientation === 'vertical' ? width : halfWidth
          },
          back: {
            transform: orientation === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)'
          },
          before: {
            top: 0,
            left: 0
          },
          after: {
            top: orientation === 'vertical' ? halfHeight : 0,
            left: orientation === 'vertical' ? 0 : halfWidth,
            width: orientation === 'horizontal' ? halfWidth : width
          },
          cut: {
            background: this.props.pageBackground,
            height: orientation === 'vertical' ? halfHeight : height,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
            width: width
          },
          pull: {
            marginTop: orientation === 'vertical' ? '-' + halfHeight : 0,
            marginLeft: orientation === 'vertical' ? 0 : '-' + halfWidth,
            width: width
          },
          gradient: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            transition: 'box-shadow ' + this.props.animationDuration / 1000 + 's ease-in-out'
          },
          gradientSecondHalf: {
            boxShadow: function () {
              if (_this6.state.direction === 'up') {
                return gradientBottom;
              } else if (_this6.state.direction === 'right') {
                return gradientRight;
              }
            }()
          },
          gradientFirstHalf: {
            boxShadow: function () {
              if (_this6.state.direction === 'down') {
                return gradientTop;
              } else if (_this6.state.direction === 'left') {
                return gradientLeft;
              }
            }()
          },
          gradientSecondHalfBack: {
            boxShadow: function () {
              if (_this6.state.direction === 'up') {
                return gradientTop;
              } else if (_this6.state.direction === 'left') {
                return gradientLeft;
              }
            }()
          },
          gradientFirstHalfBack: {
            boxShadow: function () {
              if (_this6.state.direction === 'down') {
                return gradientBottom;
              } else if (_this6.state.direction === 'right') {
                return gradientRight;
              }
            }()
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
            firstHalf = style.firstHalf,
            secondHalf = style.secondHalf,
            face = style.face,
            back = style.back,
            before = style.before,
            after = style.after,
            cut = style.cut,
            pull = style.pull,
            gradient = style.gradient,
            gradientSecondHalfBack = style.gradientSecondHalfBack,
            gradientFirstHalfBack = style.gradientFirstHalfBack,
            gradientSecondHalf = style.gradientSecondHalf,
            gradientFirstHalf = style.gradientFirstHalf,
            mask = style.mask;


        return _react2.default.createElement(
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
          _react2.default.createElement(
            'div',
            { style: m(part, before, cut) },
            beforeItem,
            _react2.default.createElement('div', { style: mask })
          ),
          _react2.default.createElement(
            'div',
            { style: m(part, cut, after) },
            _react2.default.createElement(
              'div',
              { style: pull },
              afterItem
            ),
            _react2.default.createElement('div', { style: mask })
          ),
          _react2.default.createElement(
            'div',
            { style: m(part, visiblePart, firstHalf, this.state.firstHalfStyle) },
            _react2.default.createElement(
              'div',
              { style: face },
              _react2.default.createElement(
                'div',
                { style: cut },
                pageItem
              ),
              _react2.default.createElement('div', { style: m(gradient, gradientFirstHalf) })
            ),
            _react2.default.createElement(
              'div',
              { style: m(face, back) },
              _react2.default.createElement(
                'div',
                { style: cut },
                _react2.default.createElement(
                  'div',
                  { style: pull },
                  beforeItem
                )
              ),
              _react2.default.createElement('div', { style: m(gradient, gradientFirstHalfBack) })
            )
          ),
          _react2.default.createElement(
            'div',
            { style: m(part, visiblePart, secondHalf, this.state.secondHalfStyle) },
            _react2.default.createElement(
              'div',
              { style: face },
              _react2.default.createElement(
                'div',
                { style: cut },
                _react2.default.createElement(
                  'div',
                  { style: pull },
                  pageItem
                )
              ),
              _react2.default.createElement('div', { style: m(gradient, gradientSecondHalf) })
            ),
            _react2.default.createElement(
              'div',
              { style: m(face, back) },
              _react2.default.createElement(
                'div',
                { style: m(part, after, cut) },
                afterItem
              ),
              _react2.default.createElement('div', { style: m(gradient, gradientSecondHalfBack) })
            )
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _this7 = this;

        var style = m(this.props.style, {
          height: this.getHeight(),
          position: 'relative',
          width: this.getWidth()
        });

        // all the pages are rendered once, to prevent glitching
        // (React would reload the child page and cause a image glitch)
        return _react2.default.createElement(
          'div',
          { style: style },
          _react.Children.map(this.props.children, function (page, key) {
            return _this7.renderPage(page, key);
          })
        );
      }
    }]);

    return FlipPage;
  }(_react.Component);

  FlipPage.defaultProps = {
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
    uncutPages: false,
    style: {},
    height: 480,
    width: 320
  };

  FlipPage.propTypes = {
    orientation: function orientation(props, propName, componentName) {
      if (!/(vertical|horizontal)/.test(props[propName])) {
        return new Error('Invalid prop `' + propName + '` supplied to ' + ' `' + componentName + '`. Expected `horizontal` or `vertical`. Validation failed.');
      }
    },
    animationDuration: _propTypes2.default.number,
    treshold: _propTypes2.default.number,
    maxAngle: _propTypes2.default.number,
    maskOpacity: _propTypes2.default.number,
    perspective: _propTypes2.default.string,
    pageBackground: _propTypes2.default.string,
    firstComponent: _propTypes2.default.element,
    lastComponent: _propTypes2.default.element,
    showHint: _propTypes2.default.bool,
    uncutPages: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    height: _propTypes2.default.number,
    width: _propTypes2.default.number
  };

  exports.default = FlipPage;
});