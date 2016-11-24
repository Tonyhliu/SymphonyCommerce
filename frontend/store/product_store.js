import AppDispatcher from '../dispatcher/dispatcher';
const Store = require('flux/utils').Store;
const ProductStore = new Store(AppDispatcher);

let _products = {};

ProductStore.all = function(){
  let products = [];

  Object.keys(_products).map(key => {
    products.push(_products[key]);
  });

  return products;
};

function resetAllProducts(products) {
  _products = {};
  _products = products;
}

ProductStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case 'PRODUCTS_RECEIVED':
      resetAllProducts(payload.products);
      this.__emitChange();
      break;
    default:
  }
};

export default ProductStore;
