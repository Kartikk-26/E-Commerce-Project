import React from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-md rounded-lg border border-gray-200 mb-4">
      {/* Product Image and Info */}
      <div className="flex items-center">
        <img
          src={`http://localhost:3000/${item.image}`}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg border border-gray-300"
        />
        <div className="ml-6">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-500">Color: {item.color}</p>
          <p className="text-gray-500">Size: {item.size}</p>
          <p className="text-green-500 font-semibold">In Stock</p>
          <button className="text-sm text-blue-500 hover:underline mt-2">
            Save for later
          </button>
        </div>
      </div>

      {/* Quantity Control and Price */}
      <div className="flex items-center">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-all duration-200"
            onClick={() => onDecrease(item.id)}
          >
            <FaMinus />
          </button>
          <span className="px-4 py-2 bg-gray-100">{item.quantity}</span>
          <button
            className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-all duration-200"
            onClick={() => onIncrease(item.id)}
          >
            <FaPlus />
          </button>
        </div>
        <p className="text-lg font-medium ml-8 text-gray-800">
          Rs {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <div>
        <button
          className="text-red-500 hover:text-red-600 transition-all duration-200 ml-6"
          onClick={() => onRemove(item.id)}
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
