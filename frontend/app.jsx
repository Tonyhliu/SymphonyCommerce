import React from 'react';
import ReactDOM from 'react-dom';
import ProductActions from './actions/product_actions';
import ProductStore from './store/product_store';
import ProductItem from './components/product_item';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: []
    };

    this._productChange = this._productChange.bind(this);
  }

  componentDidMount() {
    this.productListener = ProductStore.addListener(this._productChange);
    ProductActions.fetchAllProducts();
  }

  componentWillUnmount() {
    this.productListener.remove();
  }

  _productChange() {
    this.setState({ products: ProductStore.all() });
  }

  render() {
    return(
      <div>
        {
          this.state.products.map(product => {
            return <ProductItem key={product.id}
                                product={product} />;
          })
        }
      </div>
    );
  }
}

export default App;

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
