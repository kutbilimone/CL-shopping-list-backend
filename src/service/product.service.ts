import { ProductList } from "../typings/product.typings";

export default {
  async createClusteredList(product: ProductList): Promise<ProductList | never> {
    return [{ _id: "001", name: "rice" }];
  },
};
