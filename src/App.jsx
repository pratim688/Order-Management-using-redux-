import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegisterForm from "./auth/LoginRegisterForm";
import CreateOrder from "./views/createOrder";
import MenuItems from "./views/MenuItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegisterForm />} />
        <Route path="/create-order" element={<CreateOrder/>} />
        <Route path="/create-order/menu-itens" element={<MenuItems/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
