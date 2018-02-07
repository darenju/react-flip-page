import generateStyles from './generateStyles';

describe('generateStyles', () => {
  describe('after.width', () => {
    it('should be `halfWidth` if orientation is `horizontal`', () => {
      const { after } = generateStyles(0, 0, 0, 0, 0, 'width', 'halfWidth', 'height', 'halfHeight', 'horizontal');
      const { width } = after;
      expect(width).toEqual('halfWidth');
    });

    it('should be `width` otherwise', () => {
      const { after } = generateStyles(0, 0, 0, 0, 0, 'width', 'halfWidth', 'height', 'halfHeight', 'vertical');
      const { width } = after;
      expect(width).toEqual('width');
    });
  });

  describe('gradientFirstHalf.boxShadow', () => {
    it('should start with `0 -100px` if direction is down', () => {
      const { gradientFirstHalf } = generateStyles(0, 0, 'down');
      const { boxShadow } = gradientFirstHalf;
      expect(boxShadow).toMatch(/^0 -100px/);
    });

    it('should start with `-100px` if direction is left', () => {
      const { gradientFirstHalf } = generateStyles(0, 0, 'left');
      const { boxShadow } = gradientFirstHalf;
      expect(boxShadow).toMatch(/^-100px/);
    });

    it('should be empty otherwise', () => {
      const { gradientFirstHalf } = generateStyles(0, 0, 'right');
      const { boxShadow } = gradientFirstHalf;
      expect(boxShadow).toBeFalsy();
    });
  });

  describe('gradientSecondHalf.boxShadow', () => {
    it('should start with `0 100px` if direction is up', () => {
      const { gradientSecondHalf } = generateStyles(0, 0, 'up');
      const { boxShadow } = gradientSecondHalf;
      expect(boxShadow).toMatch(/^0 100px/);
    });

    it('should start with `100px if direction is right', () => {
      const { gradientSecondHalf } = generateStyles(0, 0, 'right');
      const { boxShadow } = gradientSecondHalf;
      expect(boxShadow).toMatch(/^100px/);
    });

    it('should be empty otherwise', () => {
      const { gradientSecondHalf } = generateStyles(0, 0, 'down');
      const { boxShadow } = gradientSecondHalf;
      expect(boxShadow).toBeFalsy();
    });
  });
});
