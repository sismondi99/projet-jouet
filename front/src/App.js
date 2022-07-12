import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider} from "./auth";
import {ProtecedRoute} from "./auth/protecedRoute";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import BuyerHome from "./pages/buyer-home";
import GoodsList from "./pages/buyer-home/goods-list";
import GoodsDetail from "./pages/buyer-home/goods-detail";
import Carts from "./pages/buyer-home/carts";
import Orders from "./pages/buyer-home/orders";
import SellerHome from "./pages/seller-home";
import GoodsManage from "./pages/seller-home/goods-manage";
import OrdersManage from "./pages/seller-home/orders-manage";

function App() {
  const role = localStorage.getItem('role');
  const homePath = role === 'seller' ? '/seller' : '/home';
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route exact path="/" element={<ProtecedRoute><BuyerHome /></ProtecedRoute>}>
                <Route index element={<Navigate to={homePath}/>}/>
                <Route path={"home"} element={<GoodsList/>}/>
                <Route path={"goods/:id"} element={<GoodsDetail/>}/>
                <Route path={"cart"} element={<Carts/>}/>
                <Route path={"orders"} element={<Orders/>}/>
            </Route>
            <Route path={"/seller"} element={<ProtecedRoute><SellerHome/></ProtecedRoute>}>
                <Route index element={<Navigate to={"goods-manage"}/>}/>
                <Route path={"goods-manage"} element={<GoodsManage/>}/>
                <Route path={"orders-manage"} element={<OrdersManage/>}/>
            </Route>
            <Route path={"/signin"} element={<Signin/>}/>
            <Route path={"/signup"} element={<Signup/>}/>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
