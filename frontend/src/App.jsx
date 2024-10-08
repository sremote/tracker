// import { useState } from 'react'
import { Button, Container, Stack, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import ApplicationGrid from './components/ApplicationGrid';
import { useState } from 'react';

export const BASE_URL = "http://127.0.0.1:5000/api"
function App() {
  const [applications, setApplications] = useState([]) 
  return (
    <Stack minH={"100vh"}>
      <Navbar setApplications={setApplications}/>
      <Container maxW={"1200px"} my={4}>
        {/*}
        <Text 
          fontSize={{ base: "3xl", md: "50"}} 
          fontWeight={"bold"} 
          letterSpacing={"2px"} 
          textTransform={"uppercase"} 
          textAlign={"center"}
          mb={8}
        >
          <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}> Submissions </Text>

        </Text>
        */}
        <ApplicationGrid applications={applications} setApplications={setApplications} />
      </Container>
    </Stack>
  );
};

export default App;