const ProductApiUtil = {
  fetchAllProducts(cb) {
    $.ajax({
      url: "https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js",
      type: 'GET',
      dataType: "json",
      success (resp) {
        // console.log(resp);
        window.resp = resp;
        cb(resp.products);
      }
    });
  }
};


export default ProductApiUtil;
