import generateStyles from './generateStyles';

describe('generateStyles', () => {
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
