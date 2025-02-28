import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className='bg-[#040823] h-[75vh] text-white'>DashboardPage</div>
  )
}

export default DashboardPage