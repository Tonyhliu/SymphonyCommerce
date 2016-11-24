import React from 'react';
import ReactDOM from 'react-dom';
import ProductActions from './actions/product_actions';
import ProductStore from './store/product_store';
import ProductItem from './components/product_item';
import { Button, Table } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: []
    };

    this._productChange = this._productChange.bind(this);
    this._filter = this._filter.bind(this);
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


  render() {
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
              <th>Product Picture</th>
              <th>Product Name</th>
              <th>Price of Product in Dollars</th>
              <th>Created at</th>
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
