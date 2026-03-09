import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import FunctionPage from "./pages/FunctionPage";
import PurchasedPage from "./pages/PurchasedPage";
import { Toaster } from "react-hot-toast";
import ProductDetailPage from "./pages/ProductDetailPage";
const App = () => {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/function" element={<FunctionPage />} />
        <Route path="/purchased" element={<PurchasedPage />} />
        <Route path="/electronics/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
