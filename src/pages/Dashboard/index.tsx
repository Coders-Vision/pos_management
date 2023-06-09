import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Products from "./Products";
import CartSummary from "./CartSummary";
// import LoadItems from 'src/components/Modal/LoadItems'
import { useAppDispatch, useAppSelector } from "@store/utilHooks";
import { loadProducts } from "@services/loadItems";
import { setProducts } from "@store/products/productSlice";
import { Product } from "@models/product.model";
import OrderModal from "@components/Modal/OrderModal";

function index() {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.product.products);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");

  const fetchProducts = async () => {
    const items = await loadProducts();
    dispatch(setProducts(items.products));
  };
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const filter = (term: string) => {
    const filtered = productsList.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    return filtered;
  };

  useEffect(() => {
    if (searchVal.length === 0) {
      setSearchProducts(productsList);
    }
  }, [productsList]);

  useEffect(() => {
    const filteredProducts = filter(searchVal);
    setSearchProducts(filteredProducts);
  }, [searchVal]);

  return (
    <>
      <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
        <SearchBar searchVal={searchVal} setSearch={setSearchVal} />
        <Products products={searchProducts} productSearch={searchVal} />
      </div>
      <CartSummary />
      {/* <LoadItems/> */}
      <OrderModal />
    </>
  );
}

export default index;
