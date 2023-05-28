import { forwardRef } from "react";

const createFilter = (filterName, length = 10) => {
  return Array.from({ length }).map((item, index) => (
    <div key={`${filterName}-${index}`}>
      <input type="checkbox" />
      <label>
        {filterName} {index + 1}
      </label>
      <br />
    </div>
  ));
};

const Filters = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="products-list__filters">
      <h3>Brand</h3>
      {createFilter("Brand")}

      <h3>Category</h3>
      {createFilter("Category", 20)}

      <h3>Price</h3>
      <input type="range" id="points" name="points" min="0" max="500" />

      <h3>Size</h3>
      {createFilter("Size", 12)}

      <h3>Color</h3>
      {createFilter("Color", 7)}
    </div>
  );
});

export default Filters;
