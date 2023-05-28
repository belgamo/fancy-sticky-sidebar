import "./App.css";
import products from "./products.json";
import Product from "./Product";
import Filters from "./Filters";

function App() {
  return (
    <>
      <div className="root">
        <header className="header">
          <h1>My Shopping</h1>
        </header>
        <main className="products-list">
          <aside className="products-list__sidebar">
            <Filters />
          </aside>
          <section className="products-list__list">
            {products.map((product) => (
              <Product
                title={product.title}
                image={product.image}
                price={product.price}
                key={product.id}
              />
            ))}
          </section>
        </main>
      </div>
      <footer className="footer">Footer</footer>
    </>
  );
}

export default App;
