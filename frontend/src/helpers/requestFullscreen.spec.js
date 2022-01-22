import requestFullscreen from './requestFullscreen';

describe.skip('requestFullscreen', () => {
  beforeEach(() => {
    // reset the document element methods. in testing, these are all undefined
    Object.defineProperty(document, 'documentElement', {
      value: {
        requestFullscreen: undefined,
        mozRequestFullScreen: undefined,
        webkitRequestFullScreen: undefined,
        msRequestFullscreen: undefined,
      },
      configurable: true,
    });
  });

  it('calls requestFullscreen if the method exists on the documentElement object', () => {
    global.document.documentElement.requestFullscreen = jest.fn();

    requestFullscreen();

    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  it('calls mozRequestFullScreen if the method exists on the documentElement object', () => {
    global.document.documentElement.mozRequestFullScreen = jest.fn();

    requestFullscreen();

    expect(document.documentElement.mozRequestFullScreen).toHaveBeenCalled();
  });

  it('calls webkitRequestFullScreen if the method exists on the documentElement object', () => {
    global.document.documentElement.webkitRequestFullScreen = jest.fn();

    requestFullscreen();

    expect(document.documentElement.webkitRequestFullScreen).toHaveBeenCalled();
  });

  it('calls msRequestFullscreen if the method exists on the documentElement object', () => {
    global.document.documentElement.msRequestFullscreen = jest.fn();

    requestFullscreen();

    expect(document.documentElement.msRequestFullscreen).toHaveBeenCalled();
  });

  it('calls a noop if none of the fullscreen methods exist on the documentElement object', () => {
    expect(() => requestFullscreen()).not.toThrow();
  });
});
