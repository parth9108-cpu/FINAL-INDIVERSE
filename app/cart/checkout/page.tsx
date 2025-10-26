'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/contexts/CheckoutContext';
import { addresses, payments } from '@/lib/api-endpoints';
import { useAuth } from '@/contexts/EsamudaayAuthContext';
import { Address, PaymentGatewayEntity } from '@/lib/types/api-types';

export default function Checkout() {
  const router = useRouter();
  const { token } = useAuth();
  const { 
    cart,
    selectedAddress,
    paymentMethod,
    loading,
    error,
    setSelectedAddress,
    setPaymentMethod,
    placeOrder 
  } = useCheckout();

  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentGatewayEntity[]>([]);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/buyer/login?from=/cart/checkout');
      return;
    }

    // Fetch user addresses
    const fetchAddresses = async () => {
      try {
        const response = await addresses.getAddresses(token);
        setUserAddresses(response.data);
      } catch (err) {
        setCheckoutError('Failed to fetch addresses');
      }
    };

    // Fetch payment methods
    const fetchPaymentMethods = async () => {
      try {
        const response = await payments.getPaymentEntities(token);
        setPaymentMethods(response.data);
      } catch (err) {
        setCheckoutError('Failed to fetch payment methods');
      }
    };

    fetchAddresses();
    fetchPaymentMethods();
  }, [token, router]);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handlePaymentMethodSelect = (method: PaymentGatewayEntity) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      const { orderId, success } = await placeOrder();
      if (success) {
        router.push(`/buyer/orders/${orderId}`);
      }
    } catch (err) {
      setCheckoutError('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading checkout...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          Your cart is empty. Please add items before checkout.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {(error || checkoutError) && (
        <div className="mb-6 p-4 bg-red-100 text-red-600 rounded">
          {error || checkoutError}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {/* Delivery Address */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-4">
              {userAddresses.map((address) => (
                <div
                  key={address.address_id}
                  className={`p-4 border rounded cursor-pointer ${
                    selectedAddress?.address_id === address.address_id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <p className="font-medium">{address.address_name}</p>
                  <p className="text-gray-600">{address.pretty_address}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.entity_id}
                  className={`p-4 border rounded cursor-pointer ${
                    paymentMethod?.entity_id === method.entity_id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => handlePaymentMethodSelect(method)}
                >
                  <p className="font-medium">{method.entity_name}</p>
                  <p className="text-sm text-gray-500">{method.gateway}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.item_id} className="flex justify-between">
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

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{cart.total_amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cart.total_amount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddress || !paymentMethod}
              className={`w-full mt-6 py-3 rounded-lg text-white ${
                !selectedAddress || !paymentMethod
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}