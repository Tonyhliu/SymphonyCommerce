import React from 'react';
import ReactDOM from 'react-dom';
import ProductActions from './actions/product_actions';
import ProductStore from './store/product_store';
import { Button, Table } from 'react-bootstrap';
import Data from './components/table';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      sortBy: null,
      sortDir: null,
      wholesale: false,
      cart: 0
    };

    this._productChange = this._productChange.bind(this);
    this._filter = this._filter.bind(this);
    this._sortRowsBy = this._sortRowsBy.bind(this);
    this._reset = this._reset.bind(this);
    this._wholesaleClicked = this._wholesaleClicked.bind(this);
    this._addToCart = this._addToCart.bind(this);
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

  _filter() {
    let filtered = [];
    this.state.products.forEach(product => {
      if (product.defaultPriceInCents > 2500) {
        filtered.push(product);
      }
    });

    this.setState({ products: filtered });
  }

  _reset() {
    this.setState({ products: ProductStore.all(),
                    sortBy: null,
                    sortDir: null });
  }

  _sortRowsBy(arg) {
    let sortDir = this.state.sortDir,
        sortBy = this.state.sortBy,
        prods = this.state.products.slice();

    if (sortDir !== null) {
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      sortDir = 'DESC';
    }

    if (arg !== sortBy) {
      sortDir = 'ASC';
    }

    prods.sort((a, b) => {
      let sortVal = 0;
      if (a[arg] > b[arg]) {
        sortVal = 1;
      }
      if (a[arg] < b[arg]) {
        sortVal = -1;
      }

      if (sortDir === 'DESC') {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({ products: prods, sortDir: sortDir, sortBy: arg });
  }

  _wholesaleClicked() {
    this.setState({ wholesale: !this.state.wholesale });
  }

  _addToCart(e) {
    let productName = $(e.currentTarget.parentNode).children('.product-name')[0].innerHTML,
        productPrice = $(e.currentTarget.parentNode).children('.product-price')[0].innerText,
        length;
    $('.cart').append(`<span> ${productName} </span>`);
    $('.cart').append(`<span> ${productPrice} </span>`);

    length = ($('.cart').children().length / 2);
    this.setState({ cart: length });
  }

  render() {
    let sortDirectionArrow = '';
    if (this.state.sortDir !== null) {
      sortDirectionArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
    }

    return(
      <div className='main-container'>
        <div className='buttons'>
          <Button className='filter'
            onClick={this._filter}>
            $25 or more
          </Button>
          <div className='divider'></div>
          <Button className='reset'
            onClick={this._reset}>
            Reset
          </Button>
          <label className='wholesale-checkbox'>
            <input type='checkbox'
                  onClick={this._wholesaleClicked}/>Wholesale
          </label>
          <div className='cart'>
            CART {this.state.cart}
          </div>
        </div>
        <Data products={this.state.products}
              addToCart={this._addToCart} />
      </div>
    );
  }
}

export default App;

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
