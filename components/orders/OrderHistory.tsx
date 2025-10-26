import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/EsamudaayAuthContext';
import { orders } from '@/lib/api-endpoints';
import { Order, OrderStatus } from '@/lib/types/api-types';

export default function OrderHistory() {
  const { token } = useAuth();
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await orders.getCustomerOrders(token!);
      setCustomerOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await orders.cancelOrder(token!, orderId, 'Customer cancelled order');
      await fetchOrders(); // Refresh orders list
    } catch (err) {
      setError('Failed to cancel order. Please try again later.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      {customerOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No orders found. Start shopping!
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map((order) => (
            <div
              key={order.order_id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.order_id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className={`
                    px-3 py-1 rounded-full text-sm
                    ${order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-800' :
                      order.status === OrderStatus.CANCELLED ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.item_id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₹{item.unit_price}
                      </p>
                    </div>
                    <p className="font-medium">₹{item.total_price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-semibold">₹{order.total_amount}</span>
                </div>
              </div>

              {order.status === OrderStatus.PENDING && (
                <button
                  onClick={() => handleCancelOrder(order.order_id)}
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}