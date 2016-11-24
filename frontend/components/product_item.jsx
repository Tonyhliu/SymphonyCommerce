import React from 'react';
import ReactDOM from 'react-dom';
// import ProductActions from './actions/product_actions';
// import ProductStore from './store/product_store';
// import ProductItem from './components/product_item';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgLink = 'http://' + this.props.product.mainImage.ref;
    return (
      <li>
        <div>Name: {this.props.product.name}</div>
        <div>id: {this.props.product.id}</div>
        <div>{this.props.product.defaultPriceInCents}</div>
        <img src={imgLink}></img>
      </li>
    );
  }
}

export default ProductItem;
