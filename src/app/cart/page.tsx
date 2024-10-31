// src/pages/cart.tsx
"use client";
import { Button, Input, Divider } from '@mantine/core';
import Nav from '../components/nav/Navbar'; // นำเข้า Nav component
import { useCart } from '../hook/useCart';
import { useFetchCartItems } from '../../app/hook/useFetchCartItems';
import { FooterCentered } from '../components/footer/FooterCentered';

const CartPage = () => {
  const { items, updateQuantity, removeItem, total } = useCart();
  const { data: cartItems, isLoading, isError } = useFetchCartItems();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart items.</p>;

  return (
    <div>
      <Nav /> {/* เพิ่ม Nav component ไว้ด้านบน */}
      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* Cart Items Section */}
        <div className="flex-grow bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
          {cartItems?.map((item) => (
            <div key={item?.CaI_id || 'default'} className="flex items-center mb-4 border-b pb-4">
              <img
                src={item?.imageUrl || 'default-image-url.jpg'}
                alt={item?.P_name || 'Unknown Product'}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{item?.P_name || 'Unknown Product'}</h3>
                <p className="text-gray-500">Color: {item?.color || 'N/A'}</p>
                <p className="text-gray-500">Size: {item?.size || 'N/A'}</p>
                <p className="text-gray-500">In Stock</p>
              </div>
              <div className="flex flex-col items-end text-right">
                <p className="text-gray-500">Each</p>
                <span className="text-lg font-semibold">
                  ฿{item?.Unit_price?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex flex-col items-end text-right mx-4">
                <p className="text-gray-500">Quantity</p>
                <select
                  value={item?.Quantity || 1}
                  onChange={(e) => updateQuantity(item?.CaI_id || '', parseInt(e.target.value, 10))}
                  className="border rounded px-2 py-1 text-center"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-end text-right">
                <p className="text-gray-500">Total</p>
                <span className="text-lg font-semibold">
                  ฿{(item?.Unit_price * item?.Quantity)?.toFixed(2) || '0.00'}
                </span>
              </div>
              <button
                onClick={() => removeItem(item?.CaI_id || '')}
                className="text-red-500 text-sm ml-4"
              >
                Remove
              </button>
            </div>
          ))}
          <Divider />
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <Input
              placeholder="Promo Code"
              rightSection={<Button variant="default">Submit</Button>}
            />
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping cost</span>
            <span>TBD</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Discount</span>
            <span>฿0</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Tax</span>
            <span>TBD</span>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Estimated Total</span>
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
