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
    this._reset = this._reset.bind(this);
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


  render() {
    let sortDirectionArrow = '';
    if (this.state.sortDir !== null) {
      sortDirectionArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
    }

    return(
      <div className='main-container'>
        <div>
          <Button className='filter'
            onClick={this._filter}>$25 or more</Button>
          <Button className='reset'
            onClick={this._reset}>Reset</Button>
        </div>
        <Table responsive
                striped
                bordered
                hover>
          <thead className='table-head'>
            <tr className='table-row'>
              <th className='table-header'>
                  Product Picture
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'name')}
                  className='table-header sort-by-row'>
                  Product Name {this.state.sortBy === 'name' ? sortDirectionArrow : ''}
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'defaultPriceInCents')}
                  className='table-header sort-by-row'>
                  Price of Product in Dollars {this.state.sortBy === 'defaultPriceInCents' ? sortDirectionArrow : ''}
              </th>
              <th onClick={this._sortRowsBy.bind(this, 'createdAt')}
                  className='table-header sort-by-row'>
                  Created at {this.state.sortBy === 'createdAt' ? sortDirectionArrow : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              const imgLink = 'http://' + product.mainImage.ref;
              return (<tr key={product.id}>
                <td className='table-data'><img src={imgLink}
                        className='product-image'></img></td>
                <td className='table-data'>{product.name}</td>
                <td className='table-data'>${product.defaultPriceInCents / 100}</td>
                <td className='table-data'>{product.createdAt}</td>
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
