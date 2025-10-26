import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/EsamudaayAuthContext';
import { cart } from '@/lib/api-endpoints';
import { Cart as CartType, CartItem } from '@/lib/types/api-types';

export default function Cart() {
  const { token } = useAuth();
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await cart.getCart(token!);
      setCartData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await cart.updateCartItem(token!, itemId, quantity);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError('Failed to update quantity. Please try again later.');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await cart.removeFromCart(token!, itemId);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError('Failed to remove item. Please try again later.');
    }
  };

  const handleClearCart = async () => {
    try {
      await cart.clearCart(token!);
      setCartData(null);
    } catch (err) {
      setError('Failed to clear cart. Please try again later.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading cart...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded">
        Error: {error}
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8 text-gray-500">
          Your cart is empty. Start shopping!
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-4">
        {cartData.items.map((item) => (
          <div
            key={item.item_id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-grow">
              <h3 className="font-semibold">{item.product_name}</h3>
              <p className="text-sm text-gray-500">{item.sku_name}</p>
              <p className="mt-1">₹{item.unit_price}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item.item_id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.item_id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{item.total_price}</p>
                <button
                  onClick={() => handleRemoveItem(item.item_id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Total ({cartData.item_count} items):</span>
          <span className="text-lg font-semibold">₹{cartData.total_amount}</span>
        </div>

        <button
          onClick={() => {/* Implement checkout logic */}}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}