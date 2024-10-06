import { Box, useColorModeValue} from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { CreatePage } from "./components/CreatePage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./pages/Navbar";

function App() {
  return (
    <>
      <Box minH={"100vh"}  bg={useColorModeValue('gray.100', 'gray.900')}>
        {/* {navbar} */}
        <Navbar /> {/* Navbar component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
