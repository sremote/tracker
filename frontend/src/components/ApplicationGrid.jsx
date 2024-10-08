
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import ApplicationCard from "./ApplicationCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const ApplicationGrid = ({applications, setApplications}) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getApplications = async () => {
            try {
                const res = await fetch(BASE_URL + '/applications')
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setApplications(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getApplications();
    }, [setApplications]);
    console.log(applications);
    return (
        <>
            <Grid templateColumns={{base:"1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={4} autoFlow="row dense">
                {applications.map((application) => (
                    <ApplicationCard key={application.id} application={application} setApplications={setApplications}/>
                ))}  
            </Grid>
            {isLoading && (
                <Flex justifyContent={"center"} >
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && applications.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text as="span" fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                        Not yet applied to any Job..
                        </Text>
                        Apply and Track..
                    </Text>
                </Flex>
            )

            }
        </>
    );
};
export default ApplicationGrid;