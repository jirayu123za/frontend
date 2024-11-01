"use client";
import { Button, Input, Divider } from '@mantine/core';
import Nav from '../components/nav/Navbar';
import { useCart } from '../hook/useCart';
import { useFetchCartItems } from '../../app/hook/useFetchCartItems';
import { FooterCentered } from '../components/footer/FooterCentered';
import { useSession } from "next-auth/react";
import { CustomSession } from "../hook/useAuth";

const CartPage = () => {
  const { data: session } = useSession();
  const customSession = session as CustomSession | null;
  const token = customSession?.user?.token ?? '';

  const { items, updateQuantity, removeItem, total } = useCart();
  const { data: cartItems, isLoading, isError } = useFetchCartItems();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart items.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-start gap-4 p-4">
        {/* Cart Items Section */}
        <div className="flex-grow bg-white p-4 rounded shadow overflow-y-auto h-96 md:max-w-[50%]">
          <h2 className="text-xl font-semibold mb-4">My Cart</h2>
          {cartItems?.map((item) => (
            <div key={item?.CaI_id || 'default'} className="flex items-center mb-3 border-b pb-3">
              <img
                src={item?.imageUrl || 'default-image-url.jpg'}
                alt={item?.P_name || 'Unknown Product'}
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div className="flex-grow">
                <h3 className="text-md font-medium">{item?.P_name || 'Unknown Product'}</h3>
                <p className="text-gray-500 text-sm">{item?.P_description || 'N/A'}</p>
              </div>
              <div className="text-right mx-3">
                <p className="text-gray-500 text-sm">Each</p>
                <span className="text-md font-semibold">
                  ฿{item?.Unit_price?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="mx-3">
                <select
                  aria-label="Quantity"
                  value={item?.Quantity || 1}
                  onChange={(e) => updateQuantity(item?.CaI_id || '', parseInt(e.target.value, 10))}
                  className="border rounded px-1 py-0.5 text-sm text-center"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Total</p>
                <span className="text-md font-semibold">
                  ฿{(item?.Unit_price * item?.Quantity)?.toFixed(2) || '0.00'}
                </span>
              </div>
              <button
                onClick={() => removeItem(item?.CaI_id || '')}
                className="text-red-500 text-xs ml-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded shadow h-96">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="mb-3">
            <Input
              placeholder="Promo Code"
              rightSection={<Button variant="default">Submit</Button>}
            />
          </div>
          <div className="flex justify-between text-gray-600 text-sm mb-1">
            <span>Shipping cost</span>
            <span>TBD</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mb-1">
            <span>Discount</span>
            <span>฿0</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mb-1">
            <span>Tax</span>
            <span>TBD</span>
          </div>
          <Divider className="my-1" />
          <div className="flex justify-between text-md font-semibold mb-3">
            <span>Total cost</span>
            <span>฿{total.toFixed(2)}</span>
          </div>
          <Button fullWidth size="lg" color="yellow">
            Checkout
          </Button>
        </div>
      </div>

      <FooterCentered />
    </div>
  );
};

export default CartPage;
