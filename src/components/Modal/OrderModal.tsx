import { useRef } from "react";
import { clearOrder } from "src/store/newOrder/newOrderSlice";
import { saveOrder } from "src/store/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "src/store/utilHooks";
import { currrencyFormatter } from "src/utils/formatters";
import ReactToPrint from "react-to-print";
import { clearCart } from "src/store/cart/cartSlice";
import { TbFileInvoice} from "react-icons/tb";
function OrderModal() {
  const componentRef = useRef(null);
  const dispatch = useAppDispatch();
  const newOrder = useAppSelector((state) => state.newOrder);

  const confirmOrder = () => {
    dispatch(saveOrder(newOrder));
    dispatch(clearOrder());
    dispatch(clearCart());
  };

  const Invoice = () => (
    <div
      ref={componentRef}
      className="text-left w-full text-sm p-6 overflow-auto"
    >
      <div className="flex flex-col items-center">
        <TbFileInvoice className="mb-3 w-8 h-8 " />
        <h2 className="text-xl font-semibold">POS React</h2>
        <p>Order Summary</p>
      </div>
      <div className="flex flex-col mt-4 text-xs">
        <div className="flex-grow">
          Order No: <span>{newOrder.orderId}</span>
        </div>
        <div>
          Date: <span>{newOrder.date}</span>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="py-1 w-1/12 text-center">#</th>
              <th className="py-1 text-left">Item</th>
              <th className="py-1 w-2/12 text-center">Qty</th>
              <th className="py-1 w-3/12 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="">
            {newOrder.cart.items.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-left">
                  <span>{item.name}</span>
                  <br />
                  <small>{currrencyFormatter(item.itemPrice)}</small>
                </td>
                <td className="py-2 text-center">{item.qty}</td>
                <td className="py-2 text-right">
                  {currrencyFormatter(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-2" />
      <div>
        <div className="flex font-semibold">
          <div className="flex-grow">TOTAL</div>
          <div>{currrencyFormatter(newOrder.cart.total)}</div>
        </div>
        <div className="flex text-xs font-semibold">
          <div className="flex-grow">PAY AMOUNT</div>
          <div>{currrencyFormatter(newOrder.paid)}</div>
        </div>
        <hr className="my-2" />
        <div className="flex text-xs font-semibold">
          <div className="flex-grow">CHANGE</div>
          <div> {currrencyFormatter(newOrder.change)} </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {newOrder.orderId ? (
        <div className="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
          <div
            x-show="isShowModalReceipt"
            className="fixed glass w-full h-screen left-0 top-0 z-0"
            // x-transition:enter="transition ease-out duration-100"
            // x-transition:enter-start="opacity-0"
            // x-transition:enter-end="opacity-100"
            // x-transition:leave="transition ease-in duration-100"
            // x-transition:leave-start="opacity-100"
            // x-transition:leave-end="opacity-0"
          />
          <div
            x-show="isShowModalReceipt"
            className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
            //   x-transition:enter="transition ease-out duration-100"
            //   x-transition:enter-start="opacity-0 transform scale-90"
            //   x-transition:enter-end="opacity-100 transform scale-100"
            //   x-transition:leave="transition ease-in duration-100"
            //   x-transition:leave-start="opacity-100 transform scale-100"
            //   x-transition:leave-end="opacity-0 transform scale-90"
          >
            <Invoice />
            <div className="p-4 w-full">
              <ReactToPrint
                trigger={() => (
                  <button
                    className="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"
                    onClick={() => confirmOrder()}
                  >
                    PROCEED
                  </button>
                )}
                onAfterPrint={() => confirmOrder()}
                documentTitle={newOrder.orderId}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default OrderModal;
