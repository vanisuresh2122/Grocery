import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  

  const {
    user,
    logout,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
  } = useAppContext();

  // 🔍 Auto navigate on search
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <nav className=" w-[98%] mx-auto sticky top-0 z-40 flex items-center justify-between px-4 md:px-14 lg:px-24 xl:px-32 py-5 border-b border-gray-300 bg-white">
   
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>


      <div className="hidden sm:flex items-center gap-10">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>


      <div className="hidden sm:flex items-center gap-4">
 
        <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-4 py-1.5 rounded-full">
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-36 placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <span className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center text-xs text-white bg-primary rounded-full">
            {getCartCount()}
          </span>
        </div>

        {/* User */}
      {!user ? (
  <button
    onClick={() => setShowUserLogin(true)}
    className="px-7 py-2 bg-primary rounded-full text-white hover:bg-primary-dull transition"
  >
    Login
  </button>
) : (
  <div className="relative cursor-pointer">

    <div
      onClick={() => setShowMenu(!showMenu)}
      className="flex items-center gap-2"
    >
      <img
        src={user.photo || assets.profile_icon}
        alt="profile"
        className="w-9 h-9 rounded-full"
      />
      <span className="text-sm text-gray-700 max-w-[140px] truncate">
        {user.name || user.email}
      </span>
    </div>

    {showMenu && (
      <ul className="absolute right-0 top-12 bg-white border shadow-md rounded-md w-36 text-sm z-40">
        
        <li
          onClick={() => {
            navigate("/my-orders");
            setShowMenu(false);   // ✅ close menu
          }}
          className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
        >
          My Orders
        </li>

        <li
          onClick={() => {
            logout();
            setShowMenu(false);   // ✅ close menu
          }}
          className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
        >
          Logout
        </li>

      </ul>
    )}
  </div>
)}
      </div>

      {/* Mobile Right */}
      <div className="flex items-center gap-5 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <span className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center text-xs text-white bg-primary rounded-full">
            {getCartCount()}
          </span>
        </div>

        <button onClick={() => setOpen(true)}>
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white sm:hidden">
          <div className="flex flex-col gap-6 px-6 pt-20 text-base">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-xl"
            >
              ✕
            </button>

            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)}>
              All Products
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>

            {user && (
              <NavLink to="/my-orders" onClick={() => setOpen(false)}>
                My Orders
              </NavLink>
            )}

            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-full"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
