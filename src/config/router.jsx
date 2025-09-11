import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
 
const Home = lazy(() => import("../pages/Home"));
const Post = lazy(() => import("../pages/Post"));
 

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Post />} />

       </Routes>
    </Suspense>
  );
};

export default AppRoutes;
