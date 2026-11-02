import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';

export default function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProfileProvider>
  );
}
