import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Heading, Text, IconButton, Button, useToast } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from '../App';
import ViewMore from './ViewMore';

const ApplicationCard = ({application, setApplications}) => {
    const toast = useToast();
    const handleDeleteApplication = async () => {
        try {
            const res = await fetch(BASE_URL + "/applications/" + application.id, {
                method: "DELETE",
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }

            setApplications((prevApplications) => prevApplications.filter((app) => app.id !== application.id))
            toast({
                title: 'Application deleted.',
                description: "Application deleted sucessfully.",
                status: 'success',
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error occured.',
                description: "Sorry.. Error occured. " + error.message,
                status: 'error',
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
        }
        
    }
    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Box>
                            <Heading size='sm'>{application.companyName}</Heading>
                            <Text>{application.role} | {application.location} </Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal application={application} setApplications={setApplications} />
                        <IconButton
                            variant='ghost' 
                            colorScheme= 'red' 
                            size= {"sm"} 
                            aria-label='See menu' 
                            icon= {<BiTrash size={20} 
                            onClick={handleDeleteApplication}
                            />} 
                        />
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text noOfLines={5}>{application.description}</Text>
            </CardBody>
            <CardFooter>
                <ViewMore application={application}/>
            </CardFooter>
        </Card>
    );
};
export default ApplicationCard;