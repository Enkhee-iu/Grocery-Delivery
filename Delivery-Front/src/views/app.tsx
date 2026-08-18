import AppLayout from '$/pages/AppLayout';
import Login from '$/pages/Login';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000,
         style: { background: '#1b3022', color: '#fff', 
         borderRadius: '12px', fontSize: '14px' } }}  />

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />} />
    </Routes>

    </>
  )
}

export default App;
