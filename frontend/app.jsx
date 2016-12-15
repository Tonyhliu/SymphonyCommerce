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

// <Table responsive
//   striped
//   bordered
//   hover>
//   <thead className='table-head'>
//     <tr className='table-row'>
//       <th className='table-header'>
//         Product Picture
//       </th>
//       <th onClick={this._sortRowsBy.bind(this, 'name')}
//         className='table-header sort-by-row'>
//         Product Name {this.state.sortBy === 'name' ? sortDirectionArrow : ''}
//       </th>
//       <th onClick={this._sortRowsBy.bind(this, 'defaultPriceInCents')}
//         className='table-header sort-by-row'>
//         Price of Product in Dollars {this.state.sortBy === 'defaultPriceInCents' ? sortDirectionArrow : ''}
//       </th>
//       <th onClick={this._sortRowsBy.bind(this, 'createdAt')}
//         className='table-header sort-by-row'>
//         Created at {this.state.sortBy === 'createdAt' ? sortDirectionArrow : ''}
//       </th>
//     </tr>
//   </thead>
//   <tbody>
//     {this.state.products.map(product => {
//       const imgLink = 'http://' + product.mainImage.ref;
//       let productPrice;
//
//       if (this.state.wholesale) {
//         productPrice = ((product.defaultPriceInCents / 100) - (product.defaultPriceInCents / 100) * .2).toFixed(2);
//       } else {
//         productPrice = (product.defaultPriceInCents / 100).toFixed(2);
//       }
//       return (<tr key={product.id}>
//         <td className='table-data'><img src={imgLink}
//           className='product-image'></img></td>
//         <td className='product-name table-data'>{product.name}</td>
//         <td className='product-price table-data'>${productPrice}</td>
//         <td className='table-data'>{product.createdAt}</td>
//         <td className='table-data'
//           onClick={this._addToCart}>Add to Cart</td>
//       </tr>);
//     })}
//   </tbody>
// </Table>

export default App;

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
