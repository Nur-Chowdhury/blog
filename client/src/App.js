import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav1 from './components/nav1';
import BlogsScreen from './screens/blogsScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Nav1 />
        <main>
          <Flex w={'80%'}>
            <Routes>
              <Route path='/blogs' element={<BlogsScreen />}></Route>
            </Routes>
          </Flex>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
