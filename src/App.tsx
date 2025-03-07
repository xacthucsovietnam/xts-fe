import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import UserProfile from './pages/User/UserProfile';
import CreateProfile from './pages/User/CreateProfile';
import UpdateProfile from './pages/User/UpdateProfile';
import BusinessList from './pages/Business/BusinessList';
import BusinessDetail from './pages/Business/BusinessDetail';
import CreateBusiness from './pages/Business/CreateBusiness';
import UpdateBusiness from './pages/Business/UpdateBusiness';
import ProductList from './pages/Product/ProductList';
import ProductDetail from './pages/Product/ProductDetail';
import CreateProduct from './pages/Product/CreateProduct';
import UpdateProduct from './pages/Product/UpdateProduct';
import StampTemplateList from './pages/Stamp/StampTemplateList';
import CreateStampTemplate from './pages/Stamp/CreateStampTemplate';
import CreateStamp from './pages/Stamp/CreateStamp';
import StampList from './pages/Stamp/StampList';
import CreateActivation from './pages/Activation/CreateActivation';
import ActivationList from './pages/Activation/ActivationList';
import CreateRetail from './pages/RetailDestruction/CreateRetail';
import CreateDestruction from './pages/RetailDestruction/CreateDestruction';
import RetailList from './pages/RetailDestruction/RetailList';
import DestructionList from './pages/RetailDestruction/DestructionList';
import { getEnv } from './utils/env';

function App() {
  const env = getEnv();
  console.log('Environment:', env);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/create-profile" element={<CreateProfile />} />
          <Route path="/user/update-profile" element={<UpdateProfile />} />
          <Route path="/business/list" element={<BusinessList />} />
          <Route path="/business/detail" element={<BusinessDetail />} />
          <Route path="/business/create" element={<CreateBusiness />} />
          <Route path="/business/update" element={<UpdateBusiness />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<UpdateProduct />} />
          <Route path="/stamp/template/list" element={<StampTemplateList />} />
          <Route path="/stamp/template/create" element={<CreateStampTemplate />} />
          <Route path="/stamp/create" element={<CreateStamp />} />
          <Route path="/stamp/list" element={<StampList />} />
          <Route path="/activation/create" element={<CreateActivation />} />
          <Route path="/activation/list" element={<ActivationList />} />
          <Route path="/retail/create" element={<CreateRetail />} />
          <Route path="/destruction/create" element={<CreateDestruction />} />
          <Route path="/retail/list" element={<RetailList />} />
          <Route path="/destruction/list" element={<DestructionList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;