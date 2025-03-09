import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors from "../libs/Errors";

const productController: T = {};

productController.getAllProducts = async (req: Response, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products");
  } catch (err) {
    console.log("Error, getAllProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (req: Response, res: Response) => {
  try {
    console.log("createNewProduct");
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.updateChosenProduct = async (
  req: Response,
  res: Response
) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
