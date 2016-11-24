import AppDispatcher from '../dispatcher/dispatcher';
import ProductApiUtil from '../util/product_api_util';

const ProductActions = {
  fetchAllProducts() {
    ProductApiUtil.fetchAllProducts(this.receiveAllProducts);
  },

  receiveAllProducts(products) {
    AppDispatcher.dispatch({
      actionType: 'PRODUCTS_RECEIVED',
      products: products
    });
  }
};

export default ProductActions;
