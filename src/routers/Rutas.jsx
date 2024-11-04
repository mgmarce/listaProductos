import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import NotFound from '../components/NotFound'; 

export default function Rutas() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/ListProducts' element={<ListProducts />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
