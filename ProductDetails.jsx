import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {

  const { products, addToCart } = useAppContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const currency = "₹";

  const [image, setImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (product?.image?.length) {
      setImage(product.image[0]);
    }
  }, [product]);

  useEffect(() => {
    if (products.length && product) {
      const related = products.filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id
      );

      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading product...
      </div>
    );
  }

  return (

    <div className="w-[90%] mx-auto mt-12">

      {/* Breadcrumb */}

      <p className="text-sm text-gray-600">

        <Link to="/" className="hover:underline">Home</Link>
        {" / "}
        <Link to="/products" className="hover:underline">Products</Link>
        {" / "}
        <Link
          to={`/products/${product.category?.toLowerCase()}`}
          className="hover:underline"
        >
          {product.category}
        </Link>
        {" / "}
        <span className="text-primary">{product.name}</span>

      </p>

      {/* Product Section */}

      <div className="flex flex-col md:flex-row gap-16 mt-6">

        {/* Product Image */}

        <div className="flex items-center justify-center w-full md:w-1/2">

          <div className="border border-gray-300 rounded-lg overflow-hidden max-w-[420px] w-full">

            <img
              src={image || assets.placeholder}
              alt={product.name}
              className="w-full h-full object-contain"
            />

          </div>

        </div>

        {/* Product Info */}

        <div className="text-sm w-full md:w-1/2">

          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}

          <div className="flex items-center gap-1 mt-2">

            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4"
              />
            ))}

            <p className="text-base ml-2">(4)</p>

          </div>

          {/* Price */}

          <div className="mt-6">

            <p className="text-gray-500/70 line-through">
              MRP: {currency}{product.price}
            </p>

            <p className="text-2xl font-medium">
              {currency}{product.offerPrice}
            </p>

            <span className="text-gray-500/70">
              (inclusive of all taxes)
            </span>

          </div>

          {/* Description */}

          <p className="text-base font-medium mt-6">
            About Product
          </p>

          <ul className="list-disc ml-4 text-gray-500/70 space-y-1">

            {product.description?.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}

          </ul>

          {/* Buttons */}

          <div className="flex items-center mt-10 gap-4 text-base">

            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 font-medium cursor-pointer bg-primary text-white hover:bg-primary-dull transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 font-medium  cursor-pointer bg-primary text-white hover:bg-primary-dull transition"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

      {/* Related Products */}

      <div className="flex flex-col items-center mt-25">

        <div className="flex flex-col items-center w-max">

          <p className="text-3xl font-medium">
            Related Products
          </p>

          <div className="w-20 h-0.5 bg-primary rounded-full mt-5"></div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-6 w-full">

          {relatedProducts
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}

        </div>

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="mx-auto my-16 px-12 py-2.5 border rounded text-primary flex items-center gap-2 hover:bg-primary/10 transition"
        >

          See more

          <img
            src={assets.black_arrow_icon}
            alt="arrow"
            className="w-4 h-4"
          />

        </button>

      </div>

    </div>

  );
};

export default ProductDetails;