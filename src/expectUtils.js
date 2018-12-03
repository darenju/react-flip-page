module.exports.expectTurnRight = (wrapper) => {
  let state = wrapper.state();
  expect(state.secondHalfStyle.transform).toMatch(/rotateY\(-180deg\)$/);

  jest.runOnlyPendingTimers();
  state = wrapper.state();

  expect(state.secondHalfStyle).toEqual({});
};

module.exports.expectTurnLeft = (wrapper) => {
  let state = wrapper.state();
  expect(state.firstHalfStyle.transform).toMatch(/rotateY\(180deg\)$/);

  jest.runOnlyPendingTimers();
  state = wrapper.state();

  expect(state.firstHalfStyle).toEqual({});
};


module.exports.expectTurnTop = (wrapper) => {
  let state = wrapper.state();
  expect(state.firstHalfStyle.transform).toMatch(/rotateX\(-180deg\)$/);

  jest.runOnlyPendingTimers();
  state = wrapper.state();

  expect(state.firstHalfStyle).toEqual({});
};
module.exports.expectTurnBottom = (wrapper) => {
  let state = wrapper.state();
  expect(state.secondHalfStyle.transform).toMatch(/rotateX\(180deg\)$/);

  jest.runOnlyPendingTimers();
  state = wrapper.state();

  expect(state.secondHalfStyle).toEqual({});
};
