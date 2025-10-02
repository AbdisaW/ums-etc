import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";
import { createBook, getBooks, updateBook, deleteBook } from "../controlles/book.controller.js";

const router = express.Router();

router.post("/books", authenticate, authorize(["ADMIN","LIBRARIAN"]), createBook );

router.get("/books", authenticate, authorize(["ADMIN","LIBRARIAN"]), getBooks );

router.put( "/books/:id",  authenticate,  authorize(["ADMIN","LIBRARIAN"]), updateBook);

router.delete("/books/:id",  authenticate,  authorize(["ADMIN","LIBRARIAN"]),  deleteBook);

export default router;
