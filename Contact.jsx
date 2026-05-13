import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Later: connect to backend or email service
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="mt-16 w-[90%] mx-auto px-4 md:px-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-2">
          We’d love to hear from you. Get in touch!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium text-gray-800">Our Office</h2>
            <p className="text-gray-500 mt-2">
              123 Business Street <br />
              Bengaluru, India
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-800">Email</h2>
            <p className="text-gray-500 mt-2">support@example.com</p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-800">Phone</h2>
            <p className="text-gray-500 mt-2">+91 98765 43210</p>
          </div>

          {/* Map */}
          <iframe
            title="map"
            className="w-full h-64 rounded-lg border"
            src="https://maps.google.com/maps?q=Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-5"
        >
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 px-3 py-2 border rounded outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white rounded hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
