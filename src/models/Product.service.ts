import ProductModel from "../schema/Product.model";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { Request, Response } from "express";
import { Member, MemberInput, LoginInput } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
import { Product, ProductUpdateInput } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  // SPA--------------------------------------------------------------------------

  // SSR--------------------------------------------------------------------------
  public async getAllProducts(): Promise<Product> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Product;
  }

  public async createNewProduct(input: ProductInput): Promise<Product[]> {
    try {
      const result = await this.productModel.create(input);

      return result as unknown as Product[];
    } catch (err) {
      console.log("ERROR, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(id: string, input: ProductUpdateInput) {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}
export default ProductService;
