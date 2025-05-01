import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import PostPage from './pages/PostPage';
import Policy from './pages/Policy';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import PostsPage from './pages/PostsPage';


function App() {
  return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="post/:slug" element={<PostPage />} />
            <Route path="policy" element={<Policy />} />
            <Route path="posts" element={<PostsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
