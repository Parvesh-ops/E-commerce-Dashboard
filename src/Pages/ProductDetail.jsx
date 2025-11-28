import React from 'react'
import useFetch from '../Hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`/products/${id}`);

  if (loading) return <p className="text-center mt-6 text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">Failed to fetch data</p>;
  if (!product) return <p className="text-center mt-6">No product found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-blue from-gray-100 to-gray-200 p-8">

      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">{product.title}</h1>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-10 mt-8 items-center">

          {/* Image Box */}
          <div className="bg-white rounded-xl border shadow-md p-6 w-full md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-64 h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Side Details */}
          <div className="md:w-1/2">
            <p className="text-3xl font-semibold text-green-600">{`$${product.price}`}</p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300">
                Add to Cart
              </button>

              <button
                onClick={() => navigate('/buy', { state: { product } })}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 hover:-translate-y-1 transition-all duration-300"
              >
                Buy Now
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
