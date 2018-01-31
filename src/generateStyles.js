const gradientTop = '0 -100px 100px -100px rgba(0,0,0,0.25) inset';
const gradientLeft = '-100px 0 100px -100px rgba(0,0,0,0.25) inset';
const gradientBottom = '0 100px 100px -100px rgba(0,0,0,0.25) inset';
const gradientRight = '100px 0 100px -100px rgba(0,0,0,0.25) inset';

export default (
  currentPage,
  key,
  direction,
  rotate,
  uncutPages,
  width,
  halfWidth,
  height,
  halfHeight,
  orientation,
  maskOpacity,
  pageBackground,
  animationDuration,
) => ({
  container: {
    display: currentPage === key ? 'block' : 'none',
    height,
    overflow: uncutPages === false ? 'hidden' : '',
    position: 'relative',
    width,
  },
  part: {
    height: orientation === 'vertical' ? halfHeight : height,
    left: 0,
    position: 'absolute',
    width: orientation === 'vertical' ? width : halfWidth,
  },
  visiblePart: {
    transformStyle: 'preserve-3d',
  },
  firstHalf: {
    top: 0,
    left: 0,
    transformOrigin: orientation === 'vertical' ? 'bottom center' : 'right center',
  },
  secondHalf: {
    left: orientation === 'vertical' ? 0 : halfWidth,
    bottom: 0,
    right: 0,
    transformOrigin: orientation === 'vertical' ? 'top center' : 'left center',
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
    width: orientation === 'vertical' ? width : halfWidth,
  },
  back: {
    transform: orientation === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)',
  },
  before: {
    top: 0,
    left: 0,
  },
  after: {
    top: orientation === 'vertical' ? halfHeight : 0,
    left: orientation === 'vertical' ? 0 : halfWidth,
    width: orientation === 'horizontal' ? halfWidth : width,
  },
  cut: {
    background: pageBackground,
    height: orientation === 'vertical' ? halfHeight : height,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
    width,
  },
  pull: {
    marginTop: orientation === 'vertical' ? `-${halfHeight}` : 0,
    marginLeft: orientation === 'vertical' ? 0 : `-${halfWidth}`,
    width,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    transition: `box-shadow ${animationDuration / 1000}s ease-in-out`,
    pointerEvents: 'none',
  },
  gradientSecondHalf: {
    boxShadow: (() => {
      if (direction === 'up') {
        return gradientBottom;
      } else if (direction === 'right') {
        return gradientRight;
      }

      return '';
    })(),
  },
  gradientFirstHalf: {
    boxShadow: (() => {
      if (direction === 'down') {
        return gradientTop;
      } else if (direction === 'left') {
        return gradientLeft;
      }

      return '';
    })(),
  },
  gradientSecondHalfBack: {
    boxShadow: (() => {
      if (direction === 'up') {
        return gradientTop;
      } else if (direction === 'left') {
        return gradientLeft;
      }

      return '';
    })(),
  },
  gradientFirstHalfBack: {
    boxShadow: (() => {
      if (direction === 'down') {
        return gradientBottom;
      } else if (direction === 'right') {
        return gradientRight;
      }

      return '';
    })(),
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: direction !== '' ? Math.max(maskOpacity - ((Math.abs(rotate) / 90) * maskOpacity), 0) : 0,
    pointerEvents: 'none',
  },
  maskReverse: {
    opacity: direction !== '' ? Math.max(((Math.abs(rotate) / 90) * maskOpacity) - maskOpacity, 0) : 0,
  },
});
