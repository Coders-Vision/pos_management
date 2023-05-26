import { Product } from "src/models/product.model";
import { addToCart, cart } from "src/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "src/store/utilHooks";
import { currrencyFormatter } from "src/utils/formatters";
import { playBeep } from "src/utils/playBeep";

interface IProducts {
  products: Product[];
  productSearch?: string;
}

function Products({ products, productSearch }: IProducts) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const findItem = (itemId: number) =>
    cartItems.some((item) => item.id === itemId);

  const addItemToCart = (item: Product) => {
    dispatch(addToCart(item));
    playBeep("/sounds/beep.mp3");
  };

  const NoItemsToShow = () => (
    <div className="select-none bg-blue-gray-50 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
      <div className="w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
        <p className="text-xl">
          YOU DON'T HAVE
          <br />
          ANY PRODUCTS TO SHOW
        </p>
      </div>
    </div>
  );
  const NoItemsFound = () => (
    <div className="select-none bg-blue-gray-50 rounded-3xl flex flex-wrap content-center justify-center h-full ">
      <div className="w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-xl">
          EMPTY SEARCH RESULT
          <br />
          {`"${productSearch}"`}
        </p>
      </div>
    </div>
  );
  const Items = () => (
    <div className="grid grid-cols-4 gap-4 pb-3">
      {products.map((product, index) => (
        <div key={`${product.id}-${index}`}>
          <div
            role="button"
            onClick={() => addItemToCart(product)}
            className="relative select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
          >
            {findItem(product.id) ? (
              <div className="w-auto absolute top-2 right-3 bg-cyan-500 text-white rounded-md  py-1 text-center text-xs px-2">
                In Cart
              </div>
            ) : (
              <></>
            )}

            <img src={`${product.image}`} alt={`${product.name}`} />
            <div className="flex pb-3 px-3 text-sm -mt-3">
              <p className="flex-grow truncate mr-1">{product.name}</p>
              <p className="nowrap font-semibold">
                {currrencyFormatter(product.itemPrice)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full overflow-hidden mt-4">
      <div className="h-full overflow-y-auto px-2">
        {!productSearch && products.length === 0 ? (
          <NoItemsToShow />
        ) : (
          <>
            {productSearch && products.length === 0 ? (
              <NoItemsFound />
            ) : (
              <Items />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
