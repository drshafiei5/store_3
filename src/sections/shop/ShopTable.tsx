import { useAppDispatch, useAppSelector } from "../../utils/store";
import { selectProducts } from "../../store/productsSlice";
import ProductsTable from "../../components/ui/Shop/ProductsTable";
import ProductShopHeader from "../../components/ui/Shop/ProductShopHeader";

const ShopTable = () => {
  const products = useAppSelector(selectProducts);
  return (
    <div>
      <ProductShopHeader />
      <ProductsTable products={products} />{" "}
    </div>
  );
};

export default ShopTable;
