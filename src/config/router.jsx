import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../layouts/ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import Authenticated from "../layouts/authenticated";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Users = lazy(() => import("../pages/Users"));
const User = lazy(() => import("../pages/User"));
const Categories = lazy(() => import("../pages/Categories"));
const Category = lazy(() => import("../pages/Category"));
const Stores = lazy(() => import("../pages/Stores"));
const Sellers = lazy(() => import("../pages/Sellers"));
const Seller = lazy(() => import("../pages/Seller"));
const Settings = lazy(() => import("../pages/Settings"));
const Products = lazy(() => import("../pages/ads/Products"));
const Product = lazy(() => import("../pages/ads/Product"));
const Addetails = lazy(() => import("../pages/ads/Addetails"));
const Jobs = lazy(() => import("../pages/ads/Jobs"));
const Job = lazy(() => import("../pages/ads/Job"));
const Seekings = lazy(() => import("../pages/ads/Seekings"));
const Seeking = lazy(() => import("../pages/ads/Seeking"));
const Services = lazy(() => import("../pages/ads/Services"));
const Service = lazy(() => import("../pages/ads/Service"));
const Exchange = lazy(() => import("../pages/ads/Exchange"));
const Offers = lazy(() => import("../pages/ads/Offers"));
const Offer = lazy(() => import("../pages/ads/Offer"));

// Create a loading component
const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Authenticated />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/customers" element={<Users />} />
            <Route path="/customers/:id" element={<User />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/sellers/:id" element={<Seller />} />
            <Route path="/product-ads" element={<Products />} />
            <Route path="/product-ads/:id" element={<Product />} />
            <Route path="/product-details/:id" element={<Addetails />} />
            <Route path="/job-ads" element={<Jobs />} />
            <Route path="/job-ads/:id" element={<Job />} />
            <Route path="/job-seeking" element={<Seekings />} />
            <Route path="/job-seeking/:id" element={<Seeking />} />
            <Route path="/services-ads" element={<Services />} />
            <Route path="/services-ads/:id" element={<Service />} />
            <Route path="/exchange-ads" element={<Exchange />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offers/:id" element={<Offer />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
