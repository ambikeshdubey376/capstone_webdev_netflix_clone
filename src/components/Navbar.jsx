import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Shopify
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg outline-none focus:border-primary text-sm"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            🔍
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-gray-700 text-sm">
          
          {/* Wishlist */}
          <Link to="/wishlist" className="relative hover:text-primary transition">
            🛍️
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-secondary text-white text-xs px-1.5 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-primary transition">
            🛒
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-secondary text-white text-xs px-1.5 rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link to="/profile" className="hover:text-primary transition">
            👤
          </Link>

        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-gray-50 px-6 py-2 flex gap-6 text-sm overflow-x-auto border-t">
        {["All", "Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"].map((cat) => (
          <Link
            key={cat}
            to={cat === "All" ? "/" : `/?category=${cat.toLowerCase()}`}
            className="whitespace-nowrap text-gray-600 hover:text-primary transition font-medium"
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;