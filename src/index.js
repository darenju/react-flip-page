import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'

const m = (...objs) => Object.assign({}, ...objs)

class FlipPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,            // current index of page
      startY: -1,         // start position of swipe
      diffY: 0,            // diffYerence between last swipe position and current position
      timestamp: 0,       // time elapsed between two swipes
      angle: 0,           // rotate angle of half page
      rotate: 0,          // absolute value of above, limited to 45° if necessary
      direction: '',      // original swipe direction
      lastDirection: '',  // last registered swipe direction
      secondHalfStyle: {},    // transform style of bottom half
      firstHalfStyle: {}        // transform style of top half
    }

    // binding events
    this.startMoving = this.startMoving.bind(this)
    this.moveGesture = this.moveGesture.bind(this)
    this.stopMoving = this.stopMoving.bind(this)
    this.reset = this.reset.bind(this)

    this.transition = `transform ${this.props.animationDuration / 1000}s ease-in-out`
  }

  componentDidMount () {
    if (this.props.showHint) {
      setTimeout(() => this.showHint(), 1000)
    }
  }

  isLastPage () {
    return this.state.page + 1 === Children.count(this.props.children)
  }

  isFirstPage () {
    return this.state.page === 0
  }

  getHeight () {
    return `${this.props.height}px`
  }

  getHalfHeight () {
    return `${this.props.height / 2}px`
  }

  getWidth () {
    return `${this.props.width}px`
  }

  getHalfWidth () {
    return `${this.props.width / 2}px`
  }

  showHint () {
    this.setState({
      secondHalfStyle: {
        transition: this.transition
      }
    }, () => {
      this.setState({
        secondHalfStyle: {
          transition: this.transition,
          transform: this.props.orientation === 'vertical' ? `perspective(${this.props.perspective}) rotateX(30deg)` : `perspective(${this.props.perspective}) rotateY(-30deg)`
        }
      })

      setTimeout(() => {
        this.setState({
          secondHalfStyle: {
            transition: this.transition
          }
        })
      }, 1000)
    })
  }

  startMoving (e) {
    e.preventDefault()

    const posX = e.pageX || e.touches[0].pageX
    const posY = e.pageY || e.touches[0].pageY

    this.setState({
      startX: posX,
      startY: posY
    })
  }

  moveGesture (e) {
    e.preventDefault()

    const posX = e.pageX || e.touches[0].pageX
    const posY = e.pageY || e.touches[0].pageY

    const {orientation} = this.props

    if (this.state.startY !== -1) {
      const diffY = posY - this.state.startY
      const diffX = posX - this.state.startX
      const diffToUse = (this.state.direction === 'up' || this.state.direction === 'down') ? diffY : diffX
      const angle = (diffToUse / 250) * 180
      let useMaxAngle = false
      if (this.state.direction === 'up' || this.state.direction === 'left') {
        useMaxAngle = this.isLastPage()
      } else if (this.state.direction === 'down' || this.state.direction === 'right') {
        useMaxAngle = this.isFirstPage()
      }
      const rotate = Math.min(Math.abs(angle), useMaxAngle ? this.props.maxAngle : 180)

      // determine direction to prevent two-directions swipe
      if (this.state.direction === '' && (Math.abs(diffX) > this.props.treshold || Math.abs(diffY) > this.props.treshold)) {
        let direction = ''

        if (diffY < 0 && orientation === 'vertical') {
          direction = 'up'
        } else if (diffY > 0 && orientation === 'vertical') {
          direction = 'down'
        } else if (diffX < 0 && orientation === 'horizontal') {
          direction = 'left'
        } else if (diffX > 0 && orientation === 'horizontal') {
          direction = 'right'
        }

        this.setState({direction: direction})
      }

      // set the last direction
      let lastDirection = this.state.lastDirection
      if (this.state.diffY > diffY) {
        lastDirection = 'up'
      } else if (this.state.diffY < diffY) {
        lastDirection = 'down'
      } else if (this.state.diffX > diffX) {
        lastDirection = 'right'
      } else if (this.state.diffX < diffX) {
        lastDirection = 'left'
      }

      this.setState({
        angle: angle,
        rotate: rotate,
        timestamp: Date.now(),
        diffY: diffY,
        diffX: diffX,
        lastDirection: lastDirection
      })

      console.log(this.state.direction)

      // flip bottom
      if (diffY < 0 && this.state.direction === 'up') {
        this.setState({angle: angle, secondHalfStyle: {
          transform: `perspective(${this.props.perspective}) rotateX(${rotate}deg)`
        }})
      } else if (diffY > 0 && this.state.direction === 'down') {
        this.setState({angle: angle, firstHalfStyle: {
          transform: `perspective(${this.props.perspective}) rotateX(-${rotate}deg)`,
          zIndex: 2 // apply a z-index to pop over the back face
        }})
      } else if (diffX < 0 && this.state.direction === 'left') {
        this.setState({angle: angle, secondHalfStyle: {
          transform: `perspective(${this.props.perspective}) rotateY(-${rotate}deg)`
        }})
      } else if (diffX > 0 && this.state.direction === 'right') {
        this.setState({angle: angle, firstHalfStyle: {
          transform: `perspective(${this.props.perspective}) rotateY(${rotate}deg)`,
          zIndex: 2 // apply a z-index to pop over the back face
        }})
      }
    }
  }

  stopMoving (e) {
    const delay = Date.now() - this.state.timestamp

    const goNext = !this.isLastPage() && (
      this.state.angle <= -90 ||
        (delay <= 20 && this.state.direction === 'up' && this.state.lastDirection === 'up') ||
        (delay <= 20 && this.state.direction === 'right' && this.state.lastDirection === 'right')
      )
    const goPrevious = !this.isFirstPage() && (
      this.state.angle >= 90 ||
        (delay <= 20 && this.state.direction === 'down' && this.state.lastDirection === 'down') ||
        (delay <= 20 && this.state.direction === 'left' && this.state.lastDirection === 'left')
      )

    // reset everything
    this.reset()

    const {orientation} = this.props

    let secondHalfTransform, firstHalfTransform;

    if (goNext) {
      secondHalfTransform = `perspective(${this.props.perspective}) `

      if (orientation === 'vertical') {
        secondHalfTransform += 'rotateX(180deg)'
      } else {
        secondHalfTransform += 'rotateY(-180deg)'
      }
    }

    if (goPrevious) {
      firstHalfTransform = `perspective(${this.props.perspective}) `

      if (orientation === 'vertical') {
        firstHalfTransform += 'rotateX(-180deg)'
      } else {
        firstHalfTransform += 'rotateY(180deg)'
      }
    }

    this.setState({
      secondHalfStyle: {
        transition: this.transition,
        transform: secondHalfTransform
      },

      firstHalfStyle: {
        transition: this.transition,
        transform: firstHalfTransform,
        zIndex: goPrevious ? 2 : 'auto'
      }
    }, () => {
      // load the next item if it was requested
      if (goNext) {
        setTimeout(() => {
          this.setState({
            secondHalfStyle: {},
            page: this.state.page + 1
          })
        }, this.props.animationDuration)
      } else if (goPrevious) { // or load the previous item
        setTimeout(() => {
          this.setState({
            firstHalfStyle: {},
            page: this.state.page - 1
          })
        }, this.props.animationDuration)
      }
    })
  }

  reset () {
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
    })
  }

  renderPage (page, key) {
    const height = this.getHeight()
    const halfHeight = this.getHalfHeight()
    const width = this.getWidth()
    const halfWidth = this.getHalfWidth()
    const {orientation} = this.props
    const gradientTop = '0 -100px 100px -100px rgba(0,0,0,0.25) inset'
    const gradientLeft = '-100px 0 100px -100px rgba(0,0,0,0.25) inset'
    const gradientBottom = '0 100px 100px -100px rgba(0,0,0,0.25) inset'
    const gradientRight = '100px 0 100px -100px rgba(0,0,0,0.25) inset'

    const pageItem = cloneElement(page, {
      style: Object.assign({}, page.props.style, {
        height: height
      })
    })

    const style = {
      container: {
        display: this.state.page === key ? 'block' : 'none',
        height: height,
        overflow: 'hidden',
        position: 'relative',
        width: width
      },
      part: {
        height: orientation === 'vertical' ? halfHeight : height,
        left: 0,
        position: 'absolute',
        width: orientation === 'vertical' ? width : halfWidth,
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
        left: orientation === 'vertical' ? 0 : halfWidth
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
        marginTop: orientation === 'vertical' ? `-${halfHeight}` : 0,
        marginLeft: orientation === 'vertical' ? 0 : `-${halfWidth}`,
        width: width
      },
      gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        transition: `box-shadow ${this.props.animationDuration / 1000}s ease-in-out`
      },
      gradientSecondHalf: {
        boxShadow: (() => {
          if (this.state.direction === 'up') {
            return gradientBottom
          } else if (this.state.direction === 'right') {
            return gradientRight
          }
        })()
      },
      gradientFirstHalf: {
        boxShadow: (() => {
          if (this.state.direction === 'down') {
            return gradientTop
          } else if (this.state.direction === 'left') {
            return gradientLeft
          }
        })()
      },
      gradientSecondHalfBack: {
        boxShadow: (() => {
          if (this.state.direction === 'up') {
            return gradientTop
          } else if (this.state.direction === 'left') {
            return gradientLeft
          }
        })()
      },
      gradientFirstHalfBack: {
        boxShadow: (() => {
          if (this.state.direction === 'down') {
            return gradientBottom
          } else if (this.state.direction === 'right') {
            return gradientRight
          }
        })()
      },
      mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        opacity: this.state.direction !== '' ? Math.max(this.props.maskOpacity - ((Math.abs(this.state.rotate) / 90) * this.props.maskOpacity), 0) : 0
      }
    }

    const beforeItem = !this.isFirstPage() ? (
      this.props.children[this.state.page - 1]
    ) : this.props.firstComponent

    const afterItem = !this.isLastPage() ? (
      this.props.children[this.state.page + 1]
    ) : this.props.lastComponent


    const {
      container, part, visiblePart, firstHalf, secondHalf, face, back, before, after, cut, pull, gradient, gradientSecondHalfBack, gradientFirstHalfBack, gradientSecondHalf, gradientFirstHalf, mask
    } = style

    return (
      <div
        key={key}
        onMouseDown={this.startMoving}
        onTouchStart={this.startMoving}
        onMouseMove={this.moveGesture}
        onTouchMove={this.moveGesture}
        onMouseUp={this.stopMoving}
        onTouchEnd={this.stopMoving}
        onMouseLeave={this.reset}
        style={container}
        >
        <div style={m(part, before, cut)}>
          {beforeItem}
          <div style={mask} />
        </div>
        <div style={m(part, cut, after)}>
          <div style={pull}>{afterItem}</div>
          <div style={mask} />
        </div>
        <div style={m(part, visiblePart, firstHalf, this.state.firstHalfStyle)}>
          <div style={face}>
            <div style={cut}>{pageItem}</div>
            <div style={m(gradient, gradientFirstHalf)} />
          </div>
          <div style={m(face, back)}>
            <div style={cut}>
              <div style={pull}>{beforeItem}</div>
            </div>
            <div style={m(gradient, gradientFirstHalfBack)} />
          </div>
        </div>
        <div style={m(part, visiblePart, secondHalf, this.state.secondHalfStyle)}>
          <div style={face}>
            <div style={cut}>
              <div style={pull}>{pageItem}</div>
            </div>
            <div style={m(gradient, gradientSecondHalf)} />
          </div>
          <div style={m(face, back)}>
            <div style={m(part, after, cut)}>
              {afterItem}
            </div>
            <div style={m(gradient, gradientSecondHalfBack)} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    const style = m(this.props.style, {
      height: this.getHeight(),
      position: 'relative',
      width: this.getWidth()
    })

    // all the pages are rendered once, to prevent glitching
    // (React would reload the child page and cause a image glitch)
    return (
      <div style={style}>
        {Children.map(this.props.children, (page, key) => this.renderPage(page, key))}
      </div>
    )
  }
}

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
  style: {},
}

FlipPage.propTypes = {
  orientation: PropTypes.string,
  animationDuration: PropTypes.number,
  treshold: PropTypes.number,
  maxAngle: PropTypes.number,
  maskOpacity: PropTypes.number,
  perspective: PropTypes.string,
  pageBackground: PropTypes.string,
  firstComponent: PropTypes.element,
  lastComponent: PropTypes.element,
  showHint: PropTypes.bool,
  style: PropTypes.object
}

export default FlipPage
