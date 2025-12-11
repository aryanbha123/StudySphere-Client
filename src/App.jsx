import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import React from 'react';
import './index.css'
export default function App() {

  const Home = React.lazy(() => import('./pages/Home'));
  const Login = React.lazy(() => import('./pages/Login'));
  const Layout = React.lazy(() => import('./view/user/Layout/Layout'));
  const Dashboard = React.lazy(() => import('./view/user/Dashboard'));
  const Study = React.lazy(() => import('./view/user/Study'));
  const Meet = React.lazy(() => import('./view/user/Meet'));
  const Notes = React.lazy(() => import('./view/user/Notes'));
  const Playground = React.lazy(() => import('./view/user/Playground'));
  const Practice = React.lazy(() => import('./view/user/Practice'));
  const Signup = React.lazy(() => import('./pages/Signup'));
  const Attempt = React.lazy(() => import('./view/user/Attempt'));

  return (
    <Suspense fallback={<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><CircularProgress size={23} /></Box>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='meet' element={<Meet />} />
          <Route path='study' element={<Study />} />
          <Route path='notes' element={<Notes />} />
          <Route path='practice' element={<Practice />} />
          <Route path='playground' element={<Playground />} />
        </Route>
        <Route path='/dashboard/attempt/:id' element={<Attempt />} />
      </Routes>
    </Suspense>
  )
}
