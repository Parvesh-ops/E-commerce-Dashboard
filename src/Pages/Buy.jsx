import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  if (!product) return <p className="text-center mt-6">No product selected!</p>;

  const handleConfirm = () => {
    if (!name || !contact || !email || !address || !city || !zip) {
      alert("Please fill out all required fields!");
      return;
    }
    alert(
      `Thank you, ${name}! Your purchase of ${quantity} x ${product.title} has been confirmed.`
    );
    navigate("/");
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const subtotal = product.price * quantity;
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders > $100
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-blue from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full grid md:grid-cols-2 gap-8 border border-gray-100">
        
        {/* Product Summary */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

          <div className="flex gap-4 items-center mb-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-28 h-28 object-contain rounded-lg border p-2 bg-gray-50"
            />
            <div>
              <p className="font-semibold text-gray-800">{product.title}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-4">
            <p className="font-semibold text-gray-700">Quantity:</p>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center outline-none"
              />
              <button
                onClick={handleIncrement}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 space-y-1 text-gray-700">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (7%): ${tax.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p className="font-bold text-lg mt-2">
              Total: <span className="text-green-600">${total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Shipping & Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleConfirm}
            className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-green-700 hover:-translate-y-1 transition-all duration-300"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
