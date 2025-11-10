import { onRequestGet as __api_hello_js_onRequestGet } from "/root/ebonidatin/functions/api/hello.js"

export const routes = [
    {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_hello_js_onRequestGet],
    },
  ]
