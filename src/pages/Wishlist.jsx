import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/Wishlistslice";
import { addToCart } from "../redux/Cartslice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-5xl">❤️</p>
        <p className="text-xl font-semibold text-textSub">
          Your wishlist is empty!
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryDark transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold text-textMain mb-8">
          ❤️ Your Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl2 shadow-soft hover:shadow-card transition flex flex-col overflow-hidden group"
            >
              
              {/* Image */}
              <Link to={`/product/${item.id}`}>
                <div className="h-52 flex items-center justify-center p-4 bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                
                <h3 className="text-sm font-semibold text-textMain line-clamp-2 mb-2">
                  {item.title}
                </h3>

                <p className="text-primary font-bold text-lg mb-4">
                  ₹{item.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                  
                  {/* Add to Cart */}
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="flex-1 bg-primary hover:bg-primaryDark text-white text-sm font-semibold py-2 rounded-lg transition"
                  >
                    Add to Bag
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="px-3 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition"
                  >
                    🗑️
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;