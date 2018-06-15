// middleware
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as cors from "cors";
import * as OktaJwtVerifier from "@okta/jwt-verifier";
import errorHandler = require("errorhandler");

// mongoose
import mongoose = require("mongoose");

// REST API
import { BookApi } from "./api/book";
import { HerosApi } from "./api/heros";
import { UserApi } from "./api/user";

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
   * OktaJwtVerifier
   */
  oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.ORG_URL,
    assertClaims: {
      aud: "api://default"
    }
  });

  /**
   * A simple middleware that asserts valid access tokens and sends 401 responses
   * if the token is not present or fails validation.  If the token is valid its
   * contents are attached to req.jwt
   */
  authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      return res.status(401).end();
    }

    const accessToken = match[1];

    return this.oktaJwtVerifier
      .verifyAccessToken(accessToken)
      .then(jwt => {
        req.jwt = jwt;
        next();
      })
      .catch(err => {
        res.status(401).send(err.message);
      });
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
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token"
      ],
      credentials: true,
      methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
      origin: "http://localhost:4200",
      preflightContinue: false
    };
    router.use(cors(corsOptions));

    // root request
    router.get(
      "/",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.json({ announcement: "Welcome to our API." });
        next();
      }
    );

    // create API routes
    HerosApi.create(router);
    BookApi.create(router);
    UserApi.create(router);

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
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    // connect to mongoose
    mongoose.connect("mongodb://localhost:27017/m_library");
    mongoose.connection.on("error", error => {
      console.log(error);
    });

    // catch 404 and forward to error handler
    this.app.use(function(
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }
}
