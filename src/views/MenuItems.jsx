import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../slices/cartSlice';

const menuItems = [
  { id: 1, name: 'Sandwich', price: 5.0 },
  { id: 2, name: 'Butter Chicken', price: 12.0 },
  { id: 3, name: 'Rice', price: 3.0 },
];

const MenuItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const dineInData = useSelector((state) => state.dineIn);
  const takeawayData = useSelector((state) => state.takeaway);
  const deliveryData = useSelector((state) => state.delivery);

  const [showCheckout, setShowCheckout] = useState(false);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const openCheckout = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  const handleConfirm = () => {
    // Perform final submission logic here
    console.log('Submitting order with data:', {
      dineIn: dineInData,
      takeaway: takeawayData,
      delivery: deliveryData,
      cart: cartItems,
    });
    setShowCheckout(false);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Menu List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between p-4 bg-white rounded-2xl shadow-md"
              >
                <div className="text-lg font-medium">{item.name}</div>
                <div className="mt-2 text-gray-600">${item.price.toFixed(2)}</div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart View */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                <div className="font-semibold">Total:</div>
                <div className="font-semibold">${total.toFixed(2)}</div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Clear Cart
                </button>
                <button
                  onClick={openCheckout}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Checkout Summary</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Order Details</h3>
                {dineInData.tableNumber && (
                  <div>Dining In: Table {dineInData.tableNumber}, Guests {dineInData.guests}</div>
                )}
                {takeawayData.name && (
                  <div>Takeaway: {takeawayData.name}, Phone {takeawayData.phone}, Pickup {takeawayData.pickupTime}</div>
                )}
                {deliveryData.address && (
                  <div>Delivery: {deliveryData.address}, Phone {deliveryData.phone}, Instructions {deliveryData.instructions}</div>
                )}
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Cart Items</h3>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between font-semibold">
                  <span>Total:</span> <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeCheckout}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
