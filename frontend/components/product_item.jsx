// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Table } from 'react-bootstrap';
//
// class ProductItem extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const imgLink = 'http://' + this.props.product.mainImage.ref;
//     let dollars = this.props.product.defaultPriceInCents / 100;
//     return (
//       <div>
//         <Table>
//           <thead>
//             <tr>
//               <th>Product Picture</th>
//               <th>Product Name</th>
//               <th>Price of Product in Dollars</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td><img src={imgLink}></img></td>
//               <td>{this.props.product.name}</td>
//               <td>{dollars}</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     );
//   }
// }
//
// export default ProductItem;
