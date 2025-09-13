beforeAll(() => {
  // override console methods globally
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
});