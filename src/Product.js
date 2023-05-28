const Product = ({ title, image, price }) => {
  return (
    <div className="product">
      <img className="product__image" src={image} />
      <h3 className="product__title">{title}</h3>
      <p className="product__price">${price}</p>
    </div>
  );
};

export default Product;
