import React from 'react';
import ReactDOM from 'react-dom';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgLink = 'http://' + this.props.product.mainImage.ref;
    let dollars = this.props.product.defaultPriceInCents / 100;
    return (
      <li>
        <div>Name: {this.props.product.name}</div>
        <div>id: {this.props.product.id}</div>
        <div>Default price Dollars: ${dollars}</div>
        <div>Default Price in Cents: {this.props.product.defaultPriceInCents}</div>
        <div>MSRP in Cents: {this.props.product.msrpInCents}</div>
        <img src={imgLink}></img>
      </li>
    );
  }
}

export default ProductItem;
