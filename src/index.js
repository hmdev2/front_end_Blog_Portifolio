import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Templates/Home';
import { Header } from './Components/Header';
import { SobreMim } from './Templates/SobreMim';
import { Admin } from './Templates/Admin';
import { Page404 } from './Templates/Page404';
import { CreatePost } from './Templates/CreatePost';
import { ProjectPage } from './Templates/ProjectPage';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router basename='/front_end_Blog_Portifolio'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<SobreMim />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/createPost'
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
        <Route path='/postPage/:id' element={<ProjectPage />} />
        <Route path='/editePost/:id' 
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } 
        />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  </AuthProvider>
);
