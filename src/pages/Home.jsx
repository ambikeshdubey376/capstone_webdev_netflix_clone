import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "https://fakestoreapi.com/products";
        if (categoryQuery) {
          url = `https://fakestoreapi.com/products/category/${categoryQuery}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [categoryQuery]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-primary text-xl font-semibold animate-pulse">
          Loading amazing products...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen">

      {/* 🔥 Premium Banner */}
      <div className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 text-white text-center py-14 px-4 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide">
          Welcome to Shopify 🛍️
        </h1>

        <p className="text-lg text-white/90 mb-2">
          Best deals. Every day.
        </p>

        <p className="text-sm text-white/70">
          Trusted by 10,000+ happy users 🚀
        </p>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-bold text-textMain mb-3">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : categoryQuery
            ? `Category: ${categoryQuery}`
            : "All Products"}
        </h2>

        <p className="text-textSub text-sm mb-6">
          Showing {filtered.length} products
        </p>

        {filtered.length === 0 ? (
          <p className="text-textSub text-center text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;