import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav1 from './components/nav1';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Nav1 />
        <Routes>
          <Route></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
