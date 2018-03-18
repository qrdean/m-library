// middleware
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as cors from "cors";
import errorHandler = require("errorhandler");

// mongoose
import mongoose = require("mongoose");

// REST API
import { HerosApi } from './api/heros';


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
        var router = express.Router();

        // configure CORS
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
            origin: "http://localhost:4200",
            preflightContinue: false
        };
        router.use(cors(corsOptions));
        
        // root request
        router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({ announcement: "Welcome to our API." });
            next();
        });

        // create API routes
        HerosApi.create(router);

        // wire up the REST API
        this.app.use("/api", router);

        // enable CORS pre-flight
        router.options("*", cors(corsOptions));
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
