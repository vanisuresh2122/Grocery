import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

/* Reusable Input Field */
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
  />
);

const AddAddress = () => {
  const { user, navigate } = useAppContext();

  /* Address State */
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

   localStorage.setItem("shippingAddress", JSON.stringify(address));
    navigate("/cart");


    toast.success("Address updated successfully!");

  };

  useEffect(() => {
    if (user === null) return;
    if (!user) navigate("/cart");

    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 w-[90%] mx-auto pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping{" "}
        <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        {/* FORM */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                name="lastName"
                type="text"
                placeholder="Last Name"
                handleChange={handleChange}
                address={address}
              />
            </div>

            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              handleChange={handleChange}
              address={address}
            />

            <InputField
              name="street"
              type="text"
              placeholder="Street"
              handleChange={handleChange}
              address={address}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="city"
                type="text"
                placeholder="City"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                name="state"
                type="text"
                placeholder="State"
                handleChange={handleChange}
                address={address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="zipcode"
                type="text"
                placeholder="Zip Code"
                handleChange={handleChange}
                address={address}
              />
              <InputField
                name="country"
                type="text"
                placeholder="Country"
                handleChange={handleChange}
                address={address}
              />
            </div>

            <InputField
              name="phone"
              type="text"
              placeholder="Phone Number"
              handleChange={handleChange}
              address={address}
            />

            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition uppercase">
              Save Address
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
