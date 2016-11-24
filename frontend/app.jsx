import React from 'react';
import ReactDOM from 'react-dom';
import ProductActions from './actions/product_actions';
import ProductStore from './store/product_store';
import { Button, Table } from 'react-bootstrap';
// import ProductItem from './components/product_item';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      sortBy: null,
      sortDir: null
    };

    this._productChange = this._productChange.bind(this);
    this._filter = this._filter.bind(this);
    this._sortRowsBy = this._sortRowsBy.bind(this);
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
      if (product.defaultPriceInCents > 2000) {
        filtered.push(product);
      }
    });

    this.setState({ products: filtered });
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


  render() {
    let sortDirectionArrow = '';
    if (this.state.sortDir !== null) {
      sortDirectionArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
    }

    return(
      <div>
        <div>
          <Button className='filter'
            onClick={this._filter}>Hide if less than $20</Button>
          <Button className='reset'
            onClick={this._productChange}>Reset</Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th className='sort-by-row'>
                  Product Picture
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'name')}
                  className='sort-by-row'>
                  Product Name {this.state.sortBy === 'name' ? sortDirectionArrow : ''}
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'defaultPriceInCents')}
                  className='sort-by-row'>
                  Price of Product in Dollars {this.state.sortBy === 'defaultPriceInCents' ? sortDirectionArrow : ''}
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'createdAt')}
                  className='sort-by-row'>
                  Created at {this.state.sortBy === 'createdAt' ? sortDirectionArrow : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              const imgLink = 'http://' + product.mainImage.ref;
              return (<tr key={product.id}>
                <td><img src={imgLink}></img></td>
                <td>{product.name}</td>
                <td>${product.defaultPriceInCents / 100}</td>
                <td>{product.createdAt}</td>
              </tr>);
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
