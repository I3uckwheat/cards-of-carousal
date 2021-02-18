// TODO: Implement query params
// TODO: Add documentation
// TODO: Handle duplicate routes
// TODO: Handle `all` route

module.exports = class SocketRouter {
  #routes = {
    GET: [],
    PUT: [],
    POST: [],
    DELETE: [],
  };

  #notFoundHandler;

  constructor(notFoundHandler) {
    if (!notFoundHandler) throw new Error('Missing 404 handler');
    this.#notFoundHandler = notFoundHandler;
  }

  addRoute = (routeDeclaration, handler) => {
    if (!handler)
      throw new Error(`Missing routeDeclaration "${routeDeclaration}" handler`);

    const { method, route } = this.#parseRouteDeclaration(routeDeclaration);

    if (
      this.#routes[method].find((existingRoute) =>
        this.#isRouteMatch(existingRoute.route, route),
      )
    )
      throw new Error(`Route ${route} has already been declared`);

    this.#routes[method].push({ route, handler });
  };

  handleRequest = (webSocket, request) => {
    const method = request.method.toUpperCase();
    const { url } = request;
    const match = this.#routes[method].find(({ route }) =>
      this.#isRouteMatch(route, url),
    );
    if (!match) return this.#notFoundHandler({ url, params: {} }, request);

    const req = this.#parseUrl(match.route, url);

    return match.handler(req, webSocket);
  };

  #parseRouteDeclaration = (routeDeclaration) => {
    const splitRoute = routeDeclaration.split(' ');
    if (splitRoute.length !== 2)
      throw new Error('Invalid route declaration, check syntax');

    const method = splitRoute[0].toUpperCase();
    if (!/GET|PUT|POST|DELETE/.test(method))
      throw new Error('Route method must be "GET", "PUT", "POST", "DELETE"');

    const route = splitRoute[1];
    if (route[0] !== '/') throw new Error('Route must start from root');

    return { method, route };
  };

  #isRouteMatch = (route, url) => {
    const splitRoute = route.split('/');
    const splitUrl = url.split('/');
    if (splitRoute.length !== splitUrl.length) return false;

    return splitRoute.every(
      (routePiece, index) =>
        routePiece[0] === ':' || routePiece === splitUrl[index],
    );
  };

  #parseUrl = (route, url) => {
    const splitRoute = route.split('/');
    const splitUrl = url.split('/');

    const params = splitRoute.reduce((acc, val, index) => {
      if (val[0] === ':') {
        const paramName = val.slice(1);
        acc[paramName] = splitUrl[index];
      }

      return acc;
    }, {});

    return {
      url,
      params,
    };
  };
};
