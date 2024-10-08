import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import ApplicationModel from './ApplicationModel';


const Navbar = ({setApplications}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200","gray.700")}>

                <Flex h="16" gap={5}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    {/* Left Box */}

                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                        display={{base:"none", sm:"flex"}}>
                        { /* 
                        <img src='/react.png' alt='React Logo' width={50} height={50} />
                        <Text fontSize={"40px"}> + </Text>
                        <img src='/python.png' alt='Python Logo' width={50} height={40} />
                        <Text fontSize={"40px"}> = </Text>
                        <img src='/explode.png' alt='Explode Head' width={45} height={45} />
                        */ }
                        <Text 
                        fontSize={{ base: "3xl", md: "50"}} 
                        fontWeight={"bold"} 
                        letterSpacing={"2px"} 
                        textTransform={"uppercase"} 
                        textAlign={"center"}
                     
                        >
                        <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>  Submissions </Text>

                        </Text>
                    </Flex>
                    {/* Right Box */}
                    <Flex gap={3} alignItems={"center"}>
                        { /* <Text fontSize={"lg"} fontWeight={500} display={{base:"none", md:"block" }}>Submissions</Text> */ }
                        <Button onClick={toggleColorMode}> {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />} </Button>
                        <ApplicationModel setApplications={setApplications}/>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};

export default Navbar;