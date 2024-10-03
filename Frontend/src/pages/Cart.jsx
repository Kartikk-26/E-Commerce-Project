
// CartPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';

import { addToCart, removeItems, } from '../redux/cartSlice';
import Navbar from '../components/Home/Navbar';
const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  console.log(items);
  const taxRate = 0.18;
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * taxRate;
  const totalWithTax = subtotal + taxAmount;

  const handleIncreaseQuantity = (id) => {
    dispatch(addToCart({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(removeItems(id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
  };

  return (
    <div>
        
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-medium mb-8">Shopping Cart</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
              />
            ))}
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Order Summary
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                <dd className="text-sm text-gray-900">
                  Rs{subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-sm font-medium text-gray-500">
                  Tax ({(taxRate * 100).toFixed(0)}%)
                </dt>
                <dd className="text-sm text-gray-900">
                  Rs{taxAmount.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between py-2 font-medium text-gray-900">
                <dt className="text-lg">Total</dt>
                <dd className="text-lg">Rs{totalWithTax.toFixed(2)}</dd>
              </div>
              <button
                className="w-full bg-red-500 text-white py-2 mt-4 "
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      )}
    </div>
    </div>
  );
};

export default Cart;
