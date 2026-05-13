import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {

  const {
    currency,
    products,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    user,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Convert cart object to array
  useEffect(() => {

    const temp = [];

    for (const key in cartItems) {

      const product = products.find((p) => p._id === key);

      if (product) {

        temp.push({
          ...product,
          quantity: cartItems[key],
        });

      }

    }

    setCartArray(temp);

  }, [products, cartItems]);

  // Load saved address
  useEffect(() => {

    const saved = localStorage.getItem("shippingAddress");

    if (saved) {
      setSelectedAddress(JSON.parse(saved));
    }

  }, []);

  // Save COD Order
  const saveOrder = (paymentType) => {

    const totalAmount = Number((getCartAmount() * 1.02).toFixed(2));

    const newOrder = {

      _id: Date.now().toString(),

      paymentType,

      amount: totalAmount,

      status: "Placed",

      createdAt: new Date().toISOString(),

      address: selectedAddress,

      items: cartArray.map((item) => ({
        product: {
          _id: item._id,
          name: item.name,
          image: item.image,
          category: item.category,
          offerPrice: item.offerPrice,
        },
        quantity: item.quantity,
      })),

    };

    const oldOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

    localStorage.setItem(
      "myOrders",
      JSON.stringify([newOrder, ...oldOrders])
    );

  };

  // Place Order Button
  const placeOrder = () => {

    if (!user) {
      toast.error("Please login to continue");
      setShowUserLogin(true);
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select delivery address");
      navigate("/add-address");
      return;
    }

    if (cartArray.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (paymentOption === "Online") {

      navigate("/online-payment");

    } else {

      saveOrder("COD");

      toast.success("Order placed successfully");

      navigate("/my-orders");

    }

  };

  return (

    <div className="w-[90%] mx-auto mt-16 flex flex-col lg:flex-row gap-10">

      {/* CART SECTION */}

      <div className="flex-1">

        <h1 className="text-3xl font-semibold mb-8">
          Shopping Cart
          <span className="text-primary text-lg ml-2">
            ({getCartCount()} items)
          </span>
        </h1>

        {cartArray.length === 0 && (

          <div className="text-center py-20">

            <img src={assets.empty_cart} className="w-40 mx-auto" alt="" />

            <p className="mt-4 text-gray-500">
              Your cart is empty
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-5 px-6 py-2 bg-primary text-white rounded"
            >
              Start Shopping
            </button>

          </div>

        )}

        {cartArray.map((product, i) => (

          <div
            key={i}
            className="flex items-center justify-between border p-4 rounded-lg mb-5 hover:shadow-md transition"
          >

            <div className="flex gap-4 items-center">

              <img
                src={product.image[0]}
                className="w-20 h-20 object-cover rounded"
                alt=""
              />

              <div>

                <p className="font-medium">
                  {product.name}
                </p>

                <p className="text-sm text-gray-500">
                  {currency}{product.offerPrice}
                </p>

                <select
                  value={cartItems[product._id]}
                  onChange={(e) =>
                    updateCartItem(product._id, Number(e.target.value))
                  }
                  className="border px-2 py-1 mt-2 rounded"
                >

                  {[...Array(9)].map((_, i) => (

                    <option key={i} value={i + 1}>
                      Qty: {i + 1}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            <p className="font-medium">
              {currency}{product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="hover:scale-110 transition"
            >
              <img src={assets.remove_icon} className="w-6" alt="" />
            </button>

          </div>

        ))}

      </div>

      {/* ORDER SUMMARY */}

      <div className="w-full lg:w-[380px] bg-gray-50 border p-6 rounded-lg shadow-sm">

        <h2 className="text-xl font-semibold mb-5">
          Order Summary
        </h2>

        <p className="text-sm uppercase text-gray-500">
          Delivery Address
        </p>

        <p className="text-gray-600 mt-1">
          {selectedAddress
            ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
            : "No address found"}
        </p>

        <button
          onClick={() => navigate("/add-address")}
          className="text-primary underline mt-2 text-sm"
        >
          Change Address
        </button>

        {/* PAYMENT METHOD */}

        <p className="text-sm uppercase mt-6 text-gray-500">
          Payment Method
        </p>

        <div className="flex flex-col gap-3 mt-2">

          <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentOption === "COD"}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            <span>Cash On Delivery</span>
          </label>

          <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentOption === "Online"}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            <span>Online Payment</span>
          </label>

        </div>

        {/* PRICE DETAILS */}

        <div className="mt-6 space-y-3 text-gray-600">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{getCartAmount()}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
          </div>

        </div>

        {/* PLACE ORDER BUTTON */}

        <button
          onClick={placeOrder}
          className="w-full mt-6 py-3 bg-primary hover:bg-primary-dull text-white rounded transition"
        >

          {paymentOption === "COD"
            ? "Place Order"
            : "Proceed to Checkout"}

        </button>

      </div>

    </div>

  );

};

export default Cart;