// express
import { NextFunction, Response, Request, Router } from "express";
// http
import * as request from "request-promise-native";
// models
import { Book } from "./../models/book";
import { BookModel } from "./../models/book";

/**
 * @class Book Api
 */
export class BookApi {
  /**
   * Create the api.
   * @static
   */
  public static create(router: Router) {
    // POST
    router.post(
      "/book/add",
      (req: Request, res: Response, next: NextFunction) => {
        new BookApi().add(req, res, next);
      }
    );
    router.post(
      "/book/add/:isbn",
      (req: Request, res: Response, next: NextFunction) => {
        new BookApi().addByIsbn(req, res, next);
      }
    );

    // PUT
    router.put(
      "/book/:isbn",
      (req: Request, res: Response, next: NextFunction) => {
        new BookApi().update(req, res, next);
      }
    );

    // GET
    router.get("/book", (req: Request, res: Response, next: NextFunction) => {
      new BookApi().list(req, res, next);
    });
    router.get(
      "/book/:isbn",
      (req: Request, res: Response, next: NextFunction) => {
        new BookApi().get(req, res, next);
      }
    );

    // DELETE
    router.delete(
      "/book/delete/:isbn",
      (req: Request, res: Response, next: NextFunction) => {
        new BookApi().delete(req, res, next);
      }
    );
  }

  /**
   * Deletes a book from the library by ISBN
   * @param req
   * @param res
   * @param next
   */
  public delete(req: Request, res: Response, next: NextFunction) {
    // verify the isbn exists
    const PARAM_ISBN: string = "isbn";
    if (req.params[PARAM_ISBN] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    const isbn: string = req.params[PARAM_ISBN];

    // get book
    Book.findOne({ isbn: isbn })
      .then(book => {
        // verify book exists
        if (book === null) {
          res.sendStatus(404);
          next();
          return;
        }

        book
          .remove()
          .then(() => {
            res.sendStatus(200);
            next();
          })
          .catch(next);
      })
      .catch(next);
  }

  /**
   * Update a book.
   * @param req
   * @param res
   * @param next
   */
  public update(req: Request, res: Response, next: NextFunction) {
    const PARAM_ISBN: string = "isbn";
    // verify the isbn parameter exists
    if (req.params[PARAM_ISBN] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get isbn
    const isbn: string = req.params[PARAM_ISBN];

    // get book
    Book.findOne({ isbn: isbn })
      .then(book => {
        // verify the book exists
        if (book === null) {
          res.sendStatus(404);
          next();
          return;
        }

        // save the book
        Object.assign(book, req.body)
          .save()
          .then((book: BookModel) => {
            res.json(book.toObject());
            next();
          })
          .catch(next);
      })
      .catch(next);
  }

  /**
   * Get the book by ISBN
   * @param req
   * @param res
   * @param next
   */
  public get(req: Request, res: Response, next: NextFunction) {
    // verify the isbn parameter exists
    const PARAM_ISBN: string = "isbn";
    if (req.params[PARAM_ISBN] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    const isbn: string = req.params[PARAM_ISBN];

    // get book
    Book.findOne({ isbn: isbn })
      .then(book => {
        if (book === null) {
          res.sendStatus(404);
          next();
          return;
        }

        res.json(book.toObject());
        next();
      })
      .catch(next);
  }

  /**
   * Get the list of books
   * @param req
   * @param res
   * @param next
   */
  public list(req: Request, res: Response, next: NextFunction) {
    // get books
    Book.find()
      .then(books => {
        res.json(books.map(book => book.toObject()));
        next();
      })
      .catch(next);
  }

  /**
   * Add a book manually parameters
   * @param req
   * @param res
   * @param next
   */
  public add(req: Request, res: Response, next: NextFunction) {
    // add a new book
    const newBook = new Book(req.body);
    newBook
      .save()
      .then(newBook => {
        res.json(newBook.toObject());
        next();
      })
      .catch(next);
  }

  /**
   * Add our book by the ISBN using the openLibrary APIs
   * @param req
   * @param res
   * @param next
   */
  public addByIsbn(req: Request, res: Response, next: NextFunction) {
    const PARAM_ISBN: string = "isbn";
    if (req.params[PARAM_ISBN] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    const isbn: string = req.params[PARAM_ISBN];
    Book.findOne({ isbn: isbn })
      .then(book => {
        // verify book does not exist
        if (book !== null) {
          res.sendStatus(400);
          next();
          return;
        }
      })
      .catch(next);

    let bookResult;

    if (isbn.length === (13 || 10)) {
      bookResult = this.getBookInformation(isbn)
        .then(book => {
          const ISBN: string = `ISBN:${isbn}`;
          if (book[ISBN] === undefined) {
            res.sendStatus(404);
            next();
            return;
          }
          return book[ISBN];
        })
        .catch(next);
    } else {
      res.sendStatus(400);
      next();
      return;
    }

    // Set the bookObject with the bookResult properties
    let bookObject: BookModel;
    bookObject.isbn = isbn;
    bookObject.available = true;

    if (bookResult["identifiers"]["lccn"])
      bookObject.lccn = bookResult["identifiers"]["lccn"];
    else console.log("No LCCN on response object.");

    if (bookResult["title"]) bookObject.title = bookResult["title"];
    else console.log("No title on response object");

    if (bookResult["authors"]) bookObject.authors = bookResult["authors"];
    else console.log("No authors on response object");

    if (bookResult["publish_date"])
      bookObject.publish_date = bookResult["publish_date"];
    else console.log("No publish_date on response object");

    // Save our new book
    let newBook = new Book(bookObject);
    newBook
      .save()
      .then(newBook => {
        res.json(newBook.toObject());
        next();
      })
      .catch(next);
  }

  public async getBookInformation(isbn: string) {
    const openLibraryBase = "http://openlibrary.org/api/books";
    const query = `?bibkeys=ISBN${isbn}&jscmd=data&format=json`;

    let options = {
      uri: openLibraryBase + query
    };
    return await request.get(options);
  }
}
