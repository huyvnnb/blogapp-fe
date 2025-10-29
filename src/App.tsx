import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import { Slide, ToastContainer } from "react-toastify";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import UserPostPage from "./pages/UserPostPage";
import ProtectedRoute from "./layout/ProtectedRoute";
import EditorPage from "./pages/EditorPage";
import PostDetailPage from "./pages/PostDetailPage";
import ExplorePage from "./pages/ExplorePage";
import AdminRoute from "./layout/AdminRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPostManagement from "./pages/admin/AdminPostManagement";
import AdminLayout from "./layout/AdminLayout";
import PublicPostStats from "./pages/report/PublicPostStats";
import UserDashboardPage from "./pages/UserDashboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout/>}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/users/:id/posts" element={<UserPostPage />} />
            <Route path="/posts/new" element={<EditorPage />} />
            <Route path="/posts/:id/" element={<PostDetailPage />}/>
            <Route 
              path="/posts/edit/:id/" 
              element={
                  <EditorPage/>
              } 
            />
            <Route path="/explore" element={<ExplorePage />}/>
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/posts" element={<AdminPostManagement />} />
          </Route>
          
        </Route>
        
        {/* <Route path="/posts/:id" element={<PostDetailPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={1000}
        transition={Slide}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
