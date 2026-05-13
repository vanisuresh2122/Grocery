import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  
  const { user, navigate, currency,convertPrice } = useAppContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ❌ Not logged in → redirect
    if (!user) {
      navigate("/");
      return;
    }

    // ✅ Load orders
    const savedOrders = localStorage.getItem("myOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [user, navigate]);

  // ✅ CLEAR ORDERS
  const clearOrders = () => {
    localStorage.removeItem("myOrders");
    setOrders([]);
    toast.success("Order history cleared");
  };

  if (!user) return null;

  if (!orders.length) {
    return (
      <div className="mt-20 text-center text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Orders</h1>

        {/* CLEAR BUTTON */}
        <button
          onClick={clearOrders}
          className="text-sm text-red-600 underline"
        >
          Clear Orders
        </button>
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-8 p-4"
        >
          <div className="mb-4 text-gray-600 text-sm">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Payment:</b> {order.paymentType}</p>
            <p>
              <b>Total:</b> {currency}{Number(order.amount)}
            </p>
          </div>

          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-t pt-4 mt-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border rounded overflow-hidden">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-medium">
              {currency}{item.product.offerPrice * item.quantity}


              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
