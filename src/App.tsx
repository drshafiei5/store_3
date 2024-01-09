import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import { Layout } from "./layouts/DashboardLayout";
import "./App.css";
import Home from "./views/Home";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import { useAppDispatch, useAppSelector } from "./utils/store";
import { loadProductsList } from "./store/productsSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductsList());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
