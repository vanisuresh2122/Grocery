import { Route, Routes, useLocation,Navigate  } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import OnlinePayment from "./pages/OnlinePayment";
import Contact from "./pages/Contact";

import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct"
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";


const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith("/seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <>
      {!isSellerPath && <Navbar />}
      {showUserLogin && !isSellerPath && <Login />}

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/online-payment" element={<OnlinePayment />} />
        <Route path="/contact" element={<Contact />} />

       <Route
          path="/seller"
          element={isSeller ? <Navigate to="/seller/dashboard" /> : <SellerLogin />}
        />

        <Route
          path="/seller/dashboard"
          element={isSeller ? <SellerLayout /> : <Navigate to="/seller" />}
        >
          <Route index element={ isSeller ? <AddProduct /> : null} />
           <Route path="orders" element={  <Orders /> } />
            <Route path="product-list" element={ <ProductList/> } />
        </Route>
      </Routes>

      {!isSellerPath && <Footer />}
    </>
  );
};

export default App;
