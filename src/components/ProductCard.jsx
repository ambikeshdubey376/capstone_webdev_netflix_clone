import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { addToWishlist, removeFromWishlist } from "../redux/Wishlistslice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-card rounded-xl2 shadow-soft hover:shadow-xl transition duration-300 flex flex-col overflow-hidden group">

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="h-52 flex items-center justify-center p-4 bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain transition duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">

        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-textMain line-clamp-2 hover:text-primary mb-1">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-textSub capitalize mb-2">
          {product.category}
        </p>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-xs text-textSub">
            {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>

        <p className="text-primary font-bold text-lg mb-3">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">

          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg transition"
          >
            Add to Bag
          </button>

          <button
            onClick={() =>
              isWishlisted
                ? dispatch(removeFromWishlist(product.id))
                : dispatch(addToWishlist(product))
            }
            className={`px-3 py-2 rounded-lg text-lg transition ${
              isWishlisted
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-400 hover:text-red-400"
            }`}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;