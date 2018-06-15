// express
import { NextFunction, Response, Request, Router } from "express";
// Okta
import { oktaClient } from "../lib/oktaClient";

// models
import { User } from "./../models/user";
import { UserModel } from "./../models/user";

/**
 * @class User Api
 */

export class UserApi {
  public static create(router: Router) {
    // Create a new User (register).
    router.post("/", (req, res, next) => {
      if (!req.body) return res.sendStatus(400);
      const newUser = {
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          login: req.body.login
        },
        credentials: {
          password: {
            value: req.body.password
          }
        }
      };
      oktaClient
        .createUser(newUser)
        .then(user => {
          res.status(201);
          res.send(user);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });
  }
}
