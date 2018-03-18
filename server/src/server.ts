import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import mongoose = require("mongoose");

/** 
 * The server.
 * 
 * @class Server
*/
export class Server {


    /**
     * The express aplication.
     * @type {Application}
     */
    public app: express.Application;

    /**
     * Bootstrap the application.
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();

        // configure applicaiton
        this.config();

        // add api
        this.api();
    }

    /**
     * Create REST API routes
     * 
     * @class Server
     */
    public api() {
        // empty
    }

    /**
     * Configure application
     * 
     * @class Server
     */
    public config() {
        // morgan middleware to log HTTP requests
        this.app.use(morgan("dev"));

        // use json form parser middleware
        this.app.use(bodyParser.json());

        // use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // connect to mongoose
        mongoose.connect("mongodb://localhost:27017/m_library");
        mongoose.connection.on("error", error => {
            console.log(error);
        });

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }
}
