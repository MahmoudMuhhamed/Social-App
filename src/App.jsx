// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './../components/home/Home';
import Register from './../components/register/Register';
import Login from './../components/login/Login';
import Layout from './../components/layout/Layout';
import AuthLayout from './../components/layout/AuthLayout';
import Notfound from './../components/notfound/Notfound';
import { HeroUIProvider } from '@heroui/react';
import Profile from './../components/profile/Profile';
import ProtectedRoute from './../components/ProtectedRoute/ProtectedRoute';
import Notification from './../components/notification/Notification';
import Setting from './../components/setting/Setting';
import SinglePost from './../components/singlePost/SinglePost';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { UserProvider } from '../components/UserContext/UserContext';


const queryClient = new QueryClient();


function App() {
  return (


    <QueryClientProvider client={queryClient}>
    <HeroUIProvider>
    <BrowserRouter>
        <UserProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<Layout />}>

          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home />} />
          <Route path="notification" element={<Notification />} />
          <Route path="Setting" element={<Setting />} />
          <Route path="singlePost/:id" element={<SinglePost />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
  
        </UserProvider>
    </BrowserRouter>
    </HeroUIProvider>
    </QueryClientProvider>

  );
}

export default App;