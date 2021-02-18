const SocketRouter = require('./SocketRouter');

describe('SocketRouter', () => {
  // ----------------------------------------------------------------
  // Constructor
  describe('constructor', () => {
    it('throws an error without a handler', () => {
      expect(() => new SocketRouter()).toThrow('Missing 404 handler');
    });
  });

  // ----------------------------------------------------------------
  // Public method - addRoute
  describe('addRoute', () => {
    it('throws an error without a handler', () => {
      const socketRouter = new SocketRouter(() => {});

      expect(() => socketRouter.addRoute('GET /test')).toThrow(
        'Missing routeDeclaration',
      );
    });

    it('throws an error for wrong route syntax', () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );

      expect(() => socketRouter.addRoute('GET/test', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );

      expect(() => socketRouter.addRoute('GET /test group', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );
    });

    it(`throws an error for wrong HTTP method'`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GTE /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );

      expect(() => socketRouter.addRoute('COPY /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );

      expect(() => socketRouter.addRoute('test /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );
    });

    it(`throws an error for wrong route format`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET test', handler)).toThrow(
        'Route must start from root',
      );

      expect(() => socketRouter.addRoute('GET .test', handler)).toThrow(
        'Route must start from root',
      );

      expect(() =>
        socketRouter.addRoute('GET testgroup/test', handler),
      ).toThrow('Route must start from root');
    });

    it(`throws an error for duplicate route`, () => {
      const socketRouter = new SocketRouter(() => {});
      socketRouter.addRoute('GET /test', () => {});

      expect(() => socketRouter.addRoute('GET /test', () => {})).toThrow(
        'Route /test has already been declared',
      );
    });
  });

  // ----------------------------------------------------------------
  // Public method - handleRequest
  describe('handleRequest', () => {
    it(`calls the notFoundHandler passed in the constructor for a request to undefined route`, () => {
      const notFoundHandler = jest.fn();
      const socketRouter = new SocketRouter(notFoundHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/test',
        },
      );

      expect(notFoundHandler).toHaveBeenCalled();
    });

    it(`calls the addRoute handler for a valid request`, () => {
      const routeHandler = jest.fn();
      const socketRouter = new SocketRouter(() => {});
      socketRouter.addRoute('GET /test', routeHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/test',
        },
      );

      expect(routeHandler).toHaveBeenCalled();
    });

    it(`calls the appropriate addRoute handler for a valid request even if there are multiple defined routes for that method`, () => {
      const fooRouteHandler = jest.fn();
      const barRouteHandler = jest.fn();
      const socketRouter = new SocketRouter(() => {});

      socketRouter.addRoute('GET /foo', fooRouteHandler);
      socketRouter.addRoute('GET /bar', barRouteHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/bar',
        },
      );

      expect(barRouteHandler).toHaveBeenCalled();
      expect(fooRouteHandler).not.toHaveBeenCalled();
    });

    it(`calls the appropriate addRoute handler for a valid request even if there are multiple defined methods for that route`, () => {
      const getRouteHandler = jest.fn();
      const postRouteHandler = jest.fn();
      const socketRouter = new SocketRouter(() => {});

      socketRouter.addRoute('GET /test', getRouteHandler);
      socketRouter.addRoute('POST /test', postRouteHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'POST',
          url: '/test',
        },
      );

      expect(postRouteHandler).toHaveBeenCalled();
      expect(getRouteHandler).not.toHaveBeenCalled();
    });

    it(`correctly parses incoming parameters`, () => {
      const fooRouteHandler = jest.fn((req) => req.params);
      const socketRouter = new SocketRouter(() => {});

      socketRouter.addRoute(`GET /foo/:param`, fooRouteHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/foo/bar',
        },
      );

      expect(fooRouteHandler).toHaveReturnedWith({ param: 'bar' });
    });

    it(`calls the same appropriate routeHandler for URLs with different params`, () => {
      const fooRouteHandler = jest.fn();
      const socketRouter = new SocketRouter(() => {});

      socketRouter.addRoute(`GET /foo/:param`, fooRouteHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/foo/bar',
        },
      );

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/foo/qux',
        },
      );

      expect(fooRouteHandler).toHaveBeenCalledTimes(2);
    });

    it(`correctly parses incoming parameters even in elaborate requests`, () => {
      const fooRouteHandler = jest.fn((req) => req.params);
      const socketRouter = new SocketRouter(() => {});

      socketRouter.addRoute(`GET /foo/:param/qux`, fooRouteHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/foo/bar/qux',
        },
      );

      expect(fooRouteHandler).toHaveReturnedWith({ param: 'bar' });
    });
  });
});
