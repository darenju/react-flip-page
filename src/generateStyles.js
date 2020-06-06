const makeGradient = (direction) => `linear-gradient(to ${direction}, rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 50px)`;

export default (
  currentPage,
  key,
  direction,
  rotate,
  uncutPages,
  orientation,
  maskOpacity,
  pageBackground,
  animationDuration,
) => ({
  container: {
    display: currentPage === key ? 'block' : 'none',
    height: '100%',
    overflow: uncutPages === false ? 'hidden' : '',
    position: 'relative',
    touchAction: 'none',
    width: '100%',
  },
  part: {
    position: 'absolute',
  },
  visiblePart: {
    transformStyle: 'preserve-3d',
  },
  firstHalf: {
    bottom: orientation === 'vertical' ? '50%' : 0,
    left: 0,
    right: orientation === 'vertical' ? 0 : '50%',
    top: 0,
    transformOrigin: orientation === 'vertical' ? 'bottom center' : 'right center',
  },
  secondHalf: {
    bottom: 0,
    left: orientation === 'vertical' ? 0 : '50%',
    right: 0,
    top: orientation === 'vertical' ? '50%' : 0,
    transformOrigin: orientation === 'vertical' ? 'top center' : 'left center',
  },
  face: {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    transformStyle: 'preserve-3d',
  },
  back: {
    transform: orientation === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)',
  },
  before: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  after: {
    bottom: 0,
    left: orientation === 'vertical' ? 0 : '50%',
    right: 0,
    top: orientation === 'vertical' ? '50%' : 0,
  },
  cut: {
    background: pageBackground,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  firstCut: {
    right: orientation === 'vertical' ? 0 : '-100%',
  },
  pull: {
    left: orientation === 'vertical' ? 0 : '-100%',
    position: 'absolute',
    height: '100%',
    right: 0,
    top: orientation === 'vertical' ? '-100%' : 0,
  },
  gradient: {
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: `opacity ${animationDuration / 1000}s ease-in-out`,
    opacity: (() => {
      if (direction) {
        return 1;
      }
      return 0;
    })(),
  },
  gradientBefore: {
    background: (() => {
      if (direction === 'right') {
        return makeGradient('left');
      }
      if (direction === 'down') {
        return makeGradient('top');
      }

      return '';
    })(),
    width: (() => {
      if (orientation === 'horizontal') {
        return '50%';
      }
      return '100%';
    })(),
    height: (() => {
      if (orientation === 'vertical') {
        return '50%';
      }
      return '100%';
    })(),
  },
  gradientAfter: {
    background: (() => {
      if (direction === 'left') {
        return makeGradient('right');
      }
      if (direction === 'up') {
        return makeGradient('bottom');
      }

      return '';
    })(),
  },
  gradientFirstHalf: {
    background: (() => {
      if (direction === 'left') {
        return makeGradient('left');
      } if (direction === 'up') {
        return makeGradient('top');
      }

      return '';
    })(),
  },
  gradientSecondHalf: {
    background: (() => {
      if (direction === 'right') {
        return makeGradient('right');
      } if (direction === 'down') {
        return makeGradient('bottom');
      }

      return '';
    })(),
  },
  mask: {
    backgroundColor: '#000',
    bottom: 0,
    left: 0,
    opacity: direction !== '' ? Math.max(maskOpacity - ((Math.abs(rotate) / 90) * maskOpacity), 0) : 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  maskReverse: {
    opacity: direction !== '' ? Math.max(((Math.abs(rotate) / 90) * maskOpacity) - maskOpacity, 0) : 0,
  },
});
