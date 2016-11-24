import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    $.ajax({
      url: 'https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js',
      type: 'GET',
      dataType: 'json',
      data: 
    })
  }

  render() {
    return(
      <div>
        HELLO TESTING
      </div>
    );
  }
}

export default App;

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
