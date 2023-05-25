import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/utilHooks";
import {
  addQty,
  removeQty,
  clearCart,
  removeItem,
} from "src/store/cart/cartSlice";
import { createOrder } from "src/store/newOrder/newOrderSlice";
import { playBeep } from "src/utils/playBeep";
import { currrencyFormatter } from "src/utils/formatters";

function CartSummary() {
  const [cashValue, setCashValue] = useState(0);
  const cart = useAppSelector((state) => state.cart);
  const change = cashValue - cart.total;
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.total);
  const dispatch = useAppDispatch();

  const cash = [
    { label: "KWD 1/4", value: 0.25 },
    { label: "KWD 1/2", value: 0.5 },
    { label: "KWD 1", value: 1 },
    { label: "KWD 5", value: 5 },
    { label: "KWD 10", value: 10 },
    { label: "KWD 20", value: 20 },
  ];

  const addCash = (amount: number, wholeAmout?: boolean) => {
    if (amount || amount === 0) {
      wholeAmout ? setCashValue(amount) : setCashValue((pre) => pre + amount);
      playBeep("/sounds/beep.mp3");
    }
  };

  const addQtyToItem = (id: number) => {
    dispatch(addQty({ id }));
    playBeep("/sounds/beep.mp3");
  };
  const removeQtyFromItem = (id: number) => {
    dispatch(removeQty({ id }));
    playBeep("/sounds/beep.mp3");
  };
  const clearItemCart = () => {
    dispatch(clearCart());
    playBeep("/sounds/trash.mp3");
  };
  const removeItemFromCart = (id: number) => {
    dispatch(removeItem({ id }));
    playBeep("/sounds/trash.mp3");
  };

  const OnCreateOrder = () => {
    dispatch(createOrder({ cart, paid: cashValue }));
  };
  const isSubmittable = () => change > 0;

  const ItemsInCart = cartItems.map((item, index) => (
    <div
      key={`${item.id}-${index}`}
      className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center"
    >
      <img
        src={`${item.image}`}
        alt={`${item.image}`}
        className="rounded-lg h-10 w-10 bg-white shadow mr-2"
      />
      <div className="flex-grow">
        <h5 className="text-sm">{item.name}</h5>
        <p className="text-xs block">
          {" "}
          {currrencyFormatter(item.itemPrice)} x {item.qty} ={" "}
          {currrencyFormatter(item.price)}
        </p>
      </div>
      <div className="py-1">
        <div className="w-28 grid grid-cols-3 gap-2 ml-2">
          <button
            onClick={() =>
              item.qty <= 1
                ? removeItemFromCart(item.id)
                : removeQtyFromItem(item.id)
            }
            className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-3 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            type="text"
            readOnly
            value={item.qty}
            className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"
          />
          <button
            onClick={() => addQtyToItem(item.id)}
            className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-3 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="w-5/12 flex flex-col bg-blue-gray-50  h-full pr-4 pl-2 py-4">
      <div className="bg-white rounded-3xl flex flex-col h-full shadow">
        {/* empty cart */}
        {cartItems.length === 0 ? (
          <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p>CART EMPTY</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-auto">
            <div className="h-16 text-center flex justify-center">
              <div className="pl-8 text-left text-lg py-4 relative">
                {/* cart icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                    {cartItems.length}
                  </div>
                )}
              </div>
              <div className="flex-grow px-8 text-right text-lg py-4 relative">
                {/* trash button */}
                <button
                  onClick={() => clearItemCart()}
                  className="text-blue-gray-300 hover:text-pink-500 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">
              {ItemsInCart}
            </div>
          </div>
        )}

        {/* payment info */}
        <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
          <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
            <div>TOTAL</div>
            <div className="text-right w-full">
              {currrencyFormatter(cartTotal)}
            </div>
          </div>
          <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
            <div className="flex text-lg font-semibold">
              <div className="flex-grow text-left">CASH</div>
              <div className="flex text-right">
                <div className="mr-2">KWD</div>
                <input
                  value={cashValue}
                  type="number"
                  onChange={(e) => addCash(parseFloat(e.target.value), true)}
                  className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"
                />
              </div>
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {cash.map((amt, index) => (
                <button
                  key={`${amt.label}-${index}`}
                  onClick={() => addCash(amt.value)}
                  className="bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm"
                >
                  +<span x-text="numberFormat(money)">{amt.label}</span>
                </button>
              ))}
              <template x-for="money in moneys" />
            </div>
          </div>

          {change > 0 && (
            <div className="flex mb-3 text-lg font-semibold bg-cyan-50 text-blue-gray-700 rounded-lg py-2 px-3">
              <div className="text-cyan-800">CHANGE</div>
              <div className="text-right flex-grow text-cyan-600">
                {currrencyFormatter(change)}
              </div>
            </div>
          )}

          {change < 0 && (
            <div className="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3">
              <div className="text-right flex-grow text-pink-600">
                {currrencyFormatter(change)}
              </div>
            </div>
          )}

          {change === 0 && cartItems.length > 0 && (
            <div className="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-cyan-700 rounded-lg py-2 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
          )}

          <button
            className={`text-white rounded-2xl text-lg w-full py-3 focus:outline-none ${
              isSubmittable()
                ? "bg-cyan-500 hover:bg-cyan-600"
                : "bg-blue-gray-200"
            }`}
            disabled={!isSubmittable()}
            onClick={() => OnCreateOrder()}
          >
            SUBMIT
          </button>
        </div>
        {/* end of payment info */}
      </div>
    </div>
  );
}

export default CartSummary;
