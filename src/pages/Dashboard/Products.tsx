import { Product } from "src/models/product.model";
import { addToCart } from "src/store/cart/cartSlice";
import { useAppDispatch } from "src/store/utilHooks";
import { currrencyFormatter } from "src/utils/formatters";
import { playBeep } from "src/utils/playBeep";

interface IProducts {
  products: Product[];
}

function Products({ products }: IProducts) {
  const dispatch = useAppDispatch();

  const NoItemsFound = () => (
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
        ""
      </p>
    </div>
  );
  const addItemToCart = (item: Product) => {
    dispatch(addToCart(item));
    playBeep("/sounds/beep.mp3");
  };

  const Items = () => (
    <div className="grid grid-cols-4 gap-4 pb-3">
      {products.map((product, index) => (
        <div key={`${product.id}-${index}`}>
          <div
            role="button"
            onClick={() => addItemToCart(product)}
            className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
          >
            {/* <div className="m-1">Add to Cart</div> */}
            <img src={`${product.image}`} alt={`${product.name}`} />
            <div className="flex pb-3 px-3 text-sm -mt-3">
              <p className="flex-grow truncate mr-1">{product.name}</p>
              <p className="nowrap font-semibold">{currrencyFormatter(product.itemPrice)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full overflow-hidden mt-4">
      <div className="h-full overflow-y-auto px-2">
        {products.length === 0 ? (
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
        ) : (
          <div className="select-none bg-blue-gray-50 rounded-3xl flex flex-wrap content-center justify-center h-full ">
            <NoItemsFound />
            <Items />
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
