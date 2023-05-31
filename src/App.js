import "./App.css";
import products from "./products.json";
import Product from "./Product";
import Filters from "./Filters";
import useStickySidebar from "./useStickySidebar";
import { useRef } from "react";

function App() {
  const sidebarRef = useRef(null);

  useStickySidebar({ targetRef: sidebarRef });

  return (
    <>
      <div className="root">
        <header className="header">
          <h1>My Shopping</h1>
        </header>
        <main className="products-list">
          <aside className="products-list__sidebar">
            <Filters ref={sidebarRef} />
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
