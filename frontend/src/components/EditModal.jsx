import { Button, Flex, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react";

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
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({ application, setApplications }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const [inputs, setInputs] = useState({
		companyName: application.companyName,
		role: application.role,
		location: application.location,
		appliedDate: application.appliedDate,
		description: application.description,
	});
	const toast = useToast();
	const handleUpdateApplication = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + '/applications/' + application.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error)
			}
			setApplications((prevApplications) => prevApplications.map((app) => (app.id === application.id ? data : app)));

			toast({
                title: 'Application updated.',
                description: "Application updated sucessfully.",
                status: 'success',
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
			onClose()
		} catch (error) {
			toast({
                title: 'Error occured.',
                description: "Sorry.. Error occured. " + error.message,
                status: 'error',
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
				<ModalOverlay />
				<form onSubmit={handleUpdateApplication}>
					<ModalContent>
						<ModalHeader>Application</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>Company Name</FormLabel>
									<Input placeholder='Tesla' 
										value={inputs.companyName}
										onChange={(e) => setInputs((prev) => ({...prev, companyName: e.target.value}))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Role</FormLabel>
									<Input placeholder='Software Engineer' 
										value={inputs.role}
										onChange={(e) => setInputs((prev) => ({...prev, role: e.target.value}))}
									/>
								</FormControl>
							</Flex>
							<Flex alignItems={"center"} gap={4} mt={4}>
								<FormControl>
									<FormLabel> Location </FormLabel>
									<RadioGroup mt={4} defaultValue={inputs.location}>
										<Flex gap={5}>
											<Radio value='Hybrid'
												onChange={(e) => setInputs((prev) => ({...prev, location: e.target.value}))}
											>Hybrid</Radio>
											<Radio value='Onsite'
												onChange={(e) => setInputs((prev) => ({...prev, location: e.target.value}))}
											>Onsite</Radio>
											<Radio value='Remote'
												onChange={(e) => setInputs((prev) => ({...prev, location: e.target.value}))}
											>Remote</Radio>
										</Flex>
									</RadioGroup>
								</FormControl>
								<FormControl>
									<FormLabel> Applied Date </FormLabel>
									<Input placeholder="Applied Date" 
										value={inputs.appliedDate}
										onChange={(e) => setInputs((prev) => ({...prev, appliedDate: e.target.value}))}
									/>
								</FormControl>
							</Flex>
							<FormControl mt={4}>
								<FormLabel>Job Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="He's a software engineer who loves to code and build things."
									value={inputs.description}
									onChange={(e) => setInputs((prev) => ({...prev, description: e.target.value}))}									
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type="submit" isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditModal;