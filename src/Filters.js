import { forwardRef, useState } from "react";

const Filter = ({ filterName, length = 10, children }) => {
  const [isOpened, setIsOpened] = useState(true);

  const symbol = isOpened ? "-" : "+";

  const renderOptions = () => {
    return children
      ? children
      : Array.from({ length }).map((item, index) => (
          <div key={`${filterName}-${index}`}>
            <input type="checkbox" />
            <label style={{ marginLeft: 8 }}>
              {filterName} {index + 1}
            </label>
          </div>
        ));
  };

  return (
    <>
      <br />
      <button onClick={() => setIsOpened(!isOpened)}>
        <h3>
          {filterName} {symbol}
        </h3>
      </button>
      {isOpened && renderOptions()}
    </>
  );
};

const Filters = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="products-list__filters">
      <Filter filterName="Brand" />

      <Filter filterName="Category" length={20} />

      <Filter filterName="Price">
        <br />
        <input type="range" id="points" name="points" min="0" max="500" />
        <br />
      </Filter>

      <Filter filterName="Size" length={12} />

      <Filter filterName="Colors" length={13} />

      <Filter filterName="Others" length={13} />
    </div>
  );
});

export default Filters;
