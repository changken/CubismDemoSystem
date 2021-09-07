import { modelControl } from "./modelControl";

export class Route{
    private static routes:object = {};
    private static instance:Route = null;

    public static getInstance(){
        if(Route.instance === null){
            Route.instance = new Route();
        }

        return Route.instance;
    }
    
    constructor(){
        // default route
        Route.routes["default"] = () => {
            modelControl(0, 0.4, 1.4);
        };
    }

    public setRoute(routeUrl:string, callback:Function){
        Route.routes[routeUrl] = callback;
    }

    public getRoute(routeUrl: string){
        if(Route.routes[routeUrl] === undefined){
            return Route.routes['default']();
        }

        return Route.routes[routeUrl]();
    }
}