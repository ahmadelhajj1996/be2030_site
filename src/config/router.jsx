import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
 
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const Posts = lazy(() => import("../pages/Posts"));
const Post = lazy(() => import("../pages/Post"));
const Part = lazy(() => import("../pages/Part"));
 

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/parts/:id" element={<Part />} />
   
       </Routes>
    </Suspense>
  );
};

export default AppRoutes;
