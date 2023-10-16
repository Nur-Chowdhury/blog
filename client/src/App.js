import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminScreen from './screens/AdminScreen';
import BlogScreen from './screens/BlogScreen';
import BlogsScreens from './screens/BlogsScreens';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
              <main>
                <Routes>
                  <Route path='/blogs' element={<BlogsScreens />}></Route>
                  <Route path='/blogs/:id' element={<BlogScreen />}></Route>
                  <Route path='/@dmin-10gin' element={<LoginScreen />}></Route>
                  <Route path='/admin' element={<AdminScreen />}></Route>
                </Routes>
              </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
