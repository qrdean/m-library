require("dotenv").config();
import { Request } from "express";
process.env.NODE_ENV = "test";

// mocha
import "mocha";
import { suite, test } from "mocha-typescript";

// mongodb
import { ObjectID } from "mongodb";

// server
import { Server } from "../server";

// model
import { Hero } from "../interfaces/hero";
import { HeroModel, HeroModelStatic } from "./../models/hero";
import { heroSchema } from "../schemas/hero";

// mongoose
import mongoose = require("mongoose");

// require http server
var http = require("http");

// require chai and use should assertions
let chai = require("chai");
chai.should();

// configure chai-http
chai.use(require("chai-http"));

@suite
class HerosTest {
  // constants
  public static BASE_URI: string = "/api/heros";

  // the mongoose connection
  public static connection: mongoose.Connection;

  // hero model
  public static Hero: HeroModelStatic;

  // hero document
  public static hero: HeroModel;

  // the http server
  public static server: any;

  /**
   * Before all hook.
   */
  public static before() {
    // connect to MongoDB
    mongoose.connect("mongodb://localhost:27017/m_library");
    HerosTest.Hero = mongoose.model<HeroModel, HeroModelStatic>(
      "Hero",
      heroSchema
    );

    // create http server
    let port = 8002;
    let app = Server.bootstrap().app;
    app.set("port", port);
    HerosTest.server = http.createServer(app);
    HerosTest.server.listen(port);

    return HerosTest.createHero();
  }

  /**
   * After all hook
   */
  public static after() {
    return HerosTest.hero.remove().then(() => {
      return mongoose.disconnect();
    });
  }

  /**
   * Create a test hero.
   */
  public static createHero(): Promise<HeroModel> {
    const data: Hero = {
      name: "Quinton Dean"
    };
    return new HerosTest.Hero(data)
      .save()
      .then(hero => (HerosTest.hero = hero));
  }

  @test
  public delete() {
    const data: Hero = {
      name: "To be deleted"
    };
    return new HerosTest.Hero(data).save().then(hero => {
      return chai
        .request(HerosTest.server)
        .del(`${HerosTest.BASE_URI}/${hero._id}`)
        .then(response => {
          {
            response.should.have.status(200);
          }
        });
    });
  }

  @test
  public get() {
    return chai
      .request(HerosTest.server)
      .get(`${HerosTest.BASE_URI}/${HerosTest.hero._id}`)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("name").eql(HerosTest.hero.name);
      });
  }

  @test
  public list() {
    return chai
      .request(HerosTest.server)
      .get(HerosTest.BASE_URI)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.an("array");
        response.body.should.have.lengthOf(1);
      });
  }

  @test
  public post() {
    const data: Hero = {
      name: "Magneto"
    };
    return chai
      .request(HerosTest.server)
      .post(HerosTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.a.property("_id");
        response.body.should.have.property("name").eql(data.name);
        return HerosTest.Hero.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const data: Hero = {
      name: "Superman"
    };
    return chai
      .request(HerosTest.server)
      .put(`${HerosTest.BASE_URI}/${HerosTest.hero._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.a.property("_id");
        response.body.should.have.property("name").eql(data.name);
      });
  }
}
