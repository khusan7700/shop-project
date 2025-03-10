import ProductModel from "../schema/Product.model";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { Request, Response } from "express";
import { Member, MemberInput, LoginInput } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
import { Product } from "../libs/types/product";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  // SPA--------------------------------------------------------------------------

  // SSR--------------------------------------------------------------------------
  public async createNewProduct(input: ProductInput): Promise<Product[]> {
    try {
      const result = await this.productModel.create(input);

      return result as unknown as Product[];
    } catch (err) {
      console.log("ERROR, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}
export default ProductService;
