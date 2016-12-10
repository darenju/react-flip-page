import {Component, PropTypes, Children, cloneElement} from 'react'

const m = (...objs) => Object.assign({}, ...objs)

class Flipboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,            // current index of page
      startY: -1,         // start position of swipe
      diff: 0,            // difference between last swipe position and current position
      timestamp: 0,       // time elapsed between two swipes
      angle: 0,           // rotate angle of half page
      rotate: 0,          // absolute value of above, limited to 45° if necessary
      direction: '',      // original swipe direction
      lastDirection: '',  // last registered swipe direction
      bottomStyle: {},    // transform style of bottom half
      topStyle: {}        // transform style of top half
    }

    // binding events
    this.startMoving = this.startMoving.bind(this)
    this.moveGesture = this.moveGesture.bind(this)
    this.stopMoving = this.stopMoving.bind(this)
    this.reset = this.reset.bind(this)

    this.transition = `transform ${this.props.animationDuration / 1000}s ease-in-out`
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

  startMoving (e) {
    e.preventDefault()

    const posY = e.pageY || e.touches[0].pageY

    this.setState({startY: posY})
  }

  moveGesture (e) {
    e.preventDefault()

    const posY = e.pageY || e.touches[0].pageY

    if (this.state.startY !== -1) {
      const diff = posY - this.state.startY
      const angle = (diff / 250) * 180
      let useMaxAngle = false
      if (this.state.direction === 'up') {
        useMaxAngle = this.isLastPage()
      } else if (this.state.direction === 'down') {
        useMaxAngle = this.isFirstPage()
      }
      const rotate = Math.min(Math.abs(angle), useMaxAngle ? this.props.maxAngle : 180)

      // determine direction to prevent two-directions swipe
      if (this.state.direction === '' && Math.abs(diff) > this.props.treshold) {
        let direction = ''

        if (diff < 0) {
          direction = 'up'
        } else if (diff > 0) {
          direction = 'down'
        }

        this.setState({direction: direction})
      }

      // set the last direction
      let lastDirection = this.state.lastDirection
      if (this.state.diff > diff) {
        lastDirection = 'up'
      } else if (this.state.diff < diff) {
        lastDirection = 'down'
      }

      this.setState({
        angle: angle,
        rotate: rotate,
        timestamp: Date.now(),
        diff: diff,
        lastDirection: lastDirection
      })

      // flip bottom
      if (diff < 0 && this.state.direction === 'up') {
        this.setState({angle: angle, bottomStyle: {
          transform: `perspective(${this.props.perspective}) rotateX(${rotate}deg)`
        }})
      } else if (diff > 0 && this.state.direction === 'down') {
        this.setState({angle: angle, topStyle: {
          transform: `perspective(${this.props.perspective}) rotateX(-${rotate}deg)`,
          zIndex: 2 // apply a z-index to pop over the back face
        }})
      }
    }
  }

  stopMoving (e) {
    const delay = Date.now() - this.state.timestamp

    const goNext = !this.isLastPage() && (
      this.state.angle <= -90 ||
        (delay <= 20 && this.state.direction === 'up' && this.state.lastDirection === 'up')
      )
    const goPrevious = !this.isFirstPage() && (
      this.state.angle >= 90 ||
        (delay <= 20 && this.state.direction === 'down' && this.state.lastDirection === 'down')
      )

    // reset everything
    this.reset()
    this.setState({
      bottomStyle: {
        transition: this.transition,
        transform: goNext ? `perspective(${this.props.perspective}) rotateX(180deg)` : ''
      },

      topStyle: {
        transition: this.transition,
        transform: goPrevious ? `perspective(${this.props.perspective}) rotateX(-180deg)` : '',
        zIndex: goPrevious ? 2 : 'auto'
      }
    }, () => {
      // load the next item if it was requested
      if (goNext) {
        setTimeout(() => {
          this.setState({
            bottomStyle: {},
            page: this.state.page + 1
          })
        }, this.props.animationDuration)
      } else if (goPrevious) { // or load the previous item
        setTimeout(() => {
          this.setState({
            topStyle: {},
            page: this.state.page - 1
          })
        }, this.props.animationDuration)
      }
    })
  }

  reset () {
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
    })
  }

  renderPage (page, key) {
    const height = this.getHeight()
    const halfHeight = this.getHalfHeight()
    const width = this.getWidth()
    const gradientTop = '0 -100px 100px -100px rgba(0,0,0,0.25) inset'
    const gradientBottom = '0 100px 100px -100px rgba(0,0,0,0.25) inset'

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
        marginTop: `-${halfHeight}`
      },
      gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        transition: `box-shadow ${this.props.animationDuration / 1000}s ease-in-out`
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
      container, part, visiblePart, top, bottom, face, back, before, after, cut, pull, gradient, gradientBottomBack, gradientTopBack, gradientBottomFace, gradientTopFace, mask
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
        <div style={m(part, after, cut)}>
          <div style={pull}>{afterItem}</div>
          <div style={mask} />
        </div>
        <div style={m(part, visiblePart, top, this.state.topStyle)}>
          <div style={face}>
            <div style={cut}>{pageItem}</div>
            <div style={m(gradient, gradientTopFace)} />
          </div>
          <div style={m(face, back)}>
            <div style={cut}>
              <div style={pull}>{beforeItem}</div>
            </div>
            <div style={m(gradient, gradientTopBack)} />
          </div>
        </div>
        <div style={m(part, visiblePart, bottom, this.state.bottomStyle)}>
          <div style={face}>
            <div style={cut}>
              <div style={pull}>{pageItem}</div>
            </div>
            <div style={m(gradient, gradientBottomFace)} />
          </div>
          <div style={m(face, back)}>
            <div style={m(part, after, cut)}>
              {afterItem}
            </div>
            <div style={m(gradient, gradientBottomBack)} />
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
}

Flipboard.propTypes = {
  animationDuration: PropTypes.number,
  treshold: PropTypes.number,
  maxAngle: PropTypes.number,
  maskOpacity: PropTypes.number,
  perspective: PropTypes.string,
  pageBackground: PropTypes.string,
  firstComponent: PropTypes.element,
  lastComponent: PropTypes.element,
  style: PropTypes.object
}

export default Flipboard
