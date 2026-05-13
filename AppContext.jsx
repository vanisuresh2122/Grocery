import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  
  const currency = "₹";

  
  const navigate = useNavigate();

  const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
  );


  const [isSeller, setIsSeller] = useState(
     JSON.parse(localStorage.getItem("isSeller")) || false
  );
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // ✅ FIXED
  const convertPrice = (priceInUSD) => {
    return Math.round(priceInUSD * USD_TO_INR);
  };

  // 🔒 LOGIN REQUIRED
  const addToCart = (itemId) => {
    if (!user) {
      setShowUserLogin(true);
      toast.error("Please login to continue");
      return;
    }

    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find(
        (product) => product._id === items
      );
      if (cartItems[items] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
;
      }
    }
    return totalAmount;
  };

  // 🔁 AUTO LOGIN
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
useEffect(() => {
  const seller = localStorage.getItem("isSeller");
  if (seller === "true") setIsSeller(true);
}, []);

useEffect(() => {
  localStorage.setItem("isSeller", isSeller);
}, [isSeller])

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
