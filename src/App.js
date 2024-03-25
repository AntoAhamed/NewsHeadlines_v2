import './App.css'
import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <LoadingBar height={3} color='red' progress={progress} />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<News setProgress={setProgress} Key="general" category="general" />} />
            <Route exact path="business" element={<News setProgress={setProgress} Key="business" category="business" />} />
            <Route exact path="entertainment" element={<News setProgress={setProgress} Key="entertainment" category="entertainment" />} />
            <Route exact path="general" element={<News setProgress={setProgress} Key="general" category="general" />} />
            <Route exact path="health" element={<News setProgress={setProgress} Key="health" category="health" />} />
            <Route exact path="science" element={<News setProgress={setProgress} Key="science" category="science" />} />
            <Route exact path="sports" element={<News setProgress={setProgress} Key="sports" category="sports" />} />
            <Route exact path="technology" element={<News setProgress={setProgress} Key="technology" category="technology" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
