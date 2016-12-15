import React from 'react';
import ReactDOM from 'react-dom';
import ProductStore from '../store/product_store';
import { Table } from 'react-bootstrap';

class Data extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props);
    this.state = {
      products: this.props.products,
      sortBy: null,
      sortDir: null
    };

    this._sortRowsBy = this._sortRowsBy.bind(this);
    this._reset = this._reset.bind(this);
  }

  componentDidMount() {

  }

  _reset() {
    this.setState({ products: ProductStore.all(),
                    sortDir: null,
                    sortBy: null });
  }

  _sortRowsBy(arg) {
    let sortDir = this.state.sortDir,
        sortBy = this.state.sortBy,
        prods = this.state.products.slice(); // dup the products array

    if (sortDir !== null) {
      // flip direction
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      // default first click to descending order
      sortDir = 'DESC';
    }

    if (arg !== sortBy) {
      // if sorting by name, then click to another column, will sort ascending
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

    return (
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
    );
  }
}

export default Data;
