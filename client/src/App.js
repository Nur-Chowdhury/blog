import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SubscriptionCard from './components/Sub';
import AdminScreen from './screens/AdminScreen';
import BlogScreen from './screens/BlogScreen';
import BlogsScreens from './screens/BlogsScreens';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
            <Flex marginY={"50px"}  >
              <Box flex="9">
              <main>
                <Routes>
                  <Route path='/blogs' element={<BlogsScreens />}></Route>
                  <Route path='/blogs/:id' element={<BlogScreen />}></Route>
                  <Route path='/@dmin-10gin' element={<LoginScreen />}></Route>
                  <Route path='/admin' element={<AdminScreen />}></Route>
                </Routes>
              </main>
              </Box>
              <Box flex="3" display={{base:"none", md:"block"}} marginRight={3}>
                <SubscriptionCard />
              </Box>
            </Flex>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
