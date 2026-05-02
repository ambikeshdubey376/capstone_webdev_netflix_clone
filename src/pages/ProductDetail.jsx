import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { addToWishlist, removeFromWishlist } from "../redux/Wishlistslice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-primary text-xl animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-textSub mt-10">
        Product not found.
      </p>
    );
  }

  return (
    <div className="bg-bg min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-card rounded-xl2 shadow-card p-8 flex flex-col md:flex-row gap-12">
        
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain transition duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col justify-between">
          
          <div>
            {/* Category */}
            <p className="text-xs text-primary uppercase font-semibold mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-textMain mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="text-yellow-400">
                {"⭐".repeat(Math.round(product.rating?.rate))}
              </div>
              <span className="text-sm text-textSub">
                {product.rating?.rate} / 5 ({product.rating?.count} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-textSub text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Price + Actions */}
          <div>
            <p className="text-3xl font-bold text-primary mb-6">
              ₹{product.price}
            </p>

            <div className="flex gap-4">
              
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
                  added
                    ? "bg-green-500"
                    : "bg-primary hover:bg-primaryDark"
                }`}
              >
                {added ? "✅ Added!" : "Add to Bag"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() =>
                  isWishlisted
                    ? dispatch(removeFromWishlist(product.id))
                    : dispatch(addToWishlist(product))
                }
                className={`px-5 py-3 rounded-xl text-xl transition ${
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
      </div>
    </div>
  );
};

export default ProductDetail;