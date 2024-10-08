import { Button, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useState } from "react";
import { BASE_URL } from "../App";


const ApplicationModel = ({setApplications}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        companyName:"",
        role:"",
        location:"",
        description:"",
        appliedDate:""
    });
    const toast = useToast();
    const handleCreateApplication = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),

            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }
            toast({
                title: 'Application saved.',
                description: "We've created your application for you to track.",
                status: 'success',
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
            onClose();
            setApplications((prevApplications) => [...prevApplications, data]);
        } catch (error) {
            toast({
                title: 'Error occured.',
                description: "Sorry.. Error occured. " + error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false);
            setInputs({
                companyName:"",
                role:"",
                location:"",
                appliedDate:"",
                description:"",
            });
        }

    };
    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20}/>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
                <ModalOverlay />
                <form onSubmit={handleCreateApplication}>
                    <ModalContent>
                        <ModalHeader>Application Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>
                                        Company Name
                                    </FormLabel>
                                    <Input placeholder="Company Name" 
                                        value={inputs.companyName}
                                        onChange={(e) => setInputs({...inputs, companyName: e.target.value})}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        Role
                                    </FormLabel>
                                    <Input placeholder="Role" 
                                        value={inputs.role}
                                        onChange={(e) => setInputs({...inputs, role: e.target.value})}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex alignItems={"center"} gap={4} mt={4}>
                                <FormControl>
                                    <FormLabel>
                                        Location
                                    </FormLabel>
                                    <RadioGroup mt={4}>
                                        <Flex gap={5}>
                                            <Radio value='Hybrid'
                                                onChange={(e) => setInputs({...inputs, location: e.target.value})}
                                            >Hybrid</Radio>
                                            <Radio value='Onsite'
                                                onChange={(e) => setInputs({...inputs, location: e.target.value})}
                                            >Onsite</Radio>
                                            <Radio value='Remote'
                                                onChange={(e) => setInputs({...inputs, location: e.target.value})}
                                            >Remote</Radio>
                                        </Flex>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        Applied Date
                                    </FormLabel>
                                    <Input placeholder="Applied Date" 
                                        value={inputs.appliedDate}
                                        onChange={(e) => setInputs({...inputs, appliedDate: e.target.value})}                                
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>
                                    Job Description
                                </FormLabel>
                                <Textarea 
                                    resize={"vertical"}
                                    overflowY={"hidden"}
                                    placeholder="Job Description" 
                                    value={inputs.description}
                                    onChange={(e) => setInputs({...inputs, description: e.target.value})}
                                    />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit"
                                isLoading={isLoading}
                            >Add</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default ApplicationModel;