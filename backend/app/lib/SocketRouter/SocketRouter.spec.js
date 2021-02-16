// TODO: Write tests for SocketRouter class

/*
constructor()
- expect new SocketRouter() without handler to throw Error 'Missing 404 handler'
? expect new SocketRouter(handler) with handler in the wrong format to throw error

addRoute()
- expect socketRouter.addRoute('routeDeclaration') without handler to throw Error 'Missing routeDeclaration "${routeDeclaration}" handler'
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong syntax to throw Error 'Invalid route declaration, check syntax' 
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong HTTP method to throw Error 'Route method must be "GET", "PUT", "POST", "DELETE"' 
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong route syntax to throw Error 'Route must start from root' 
- verify socketRouter.addRoute('routeDeclaration', handler) with correct syntax to properly add given route

handleRequest()
- expect socketRouter.handleRequest(webSocket, request) with request to undefined route to call the original handler passed as a param to socketRouter constructor
- expect socketRouter.handleRequest(webSocket, request) with valid request to call the appropriate addRoute handler
*/

describe('SocketRouter', () => {
  it('Proof of concept', () => {
    expect(true).toBe(true);
  });
});
