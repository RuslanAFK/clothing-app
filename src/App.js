import { GlobalStyle } from "./global.styles";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { checkUserSession } from "./store/user/user.actions";
import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routes/home/home.components"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() => import("./routes/auth/auth.compontent"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch])

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;
