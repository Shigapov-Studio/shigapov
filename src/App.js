import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { Layout } from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import PostPage from './pages/PostPage';
import Policy from './pages/Policy';
import './App.css';



function App() {
  const scrollbarRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);


  return (
      <BrowserRouter>
        <Header headerHeight={headerHeight} setHeight={setHeaderHeight} />
        <div ref={scrollbarRef} 
        // style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
        >
            <Routes>
              <Route path="/" element={<Layout headerHeight={headerHeight} />}>
                {/* Главная страница */}
                <Route index element={<Home headerHeight={headerHeight} />} />
                {/* Страница контактов */}
                <Route path="contacts" element={<Contacts headerHeight={headerHeight} />} />
                <Route path="post/:id" element={<PostPage headerHeight={headerHeight} />} /> 
                <Route path="policy" element={<Policy headerHeight={headerHeight} />} />
              </Route>
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
