import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogScreen from './screens/BlogScreen';
import BlogsScreens from './screens/BlogsScreens';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Box maxWidth={"80%"}>
            <Routes>
              <Route path='/blogs' element={<BlogsScreens />}></Route>
              <Route path='/blogs/:id' element={<BlogScreen />}></Route>
            </Routes>
          </Box>
          <Flex justify={'center'}>
            <Routes><Route path='/@dmin-10gin' element={<LoginScreen />}></Route></Routes>
          </Flex>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
