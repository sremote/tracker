import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

const ViewMore = ({application}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>View More</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Job Desctiption </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody> 
                        <Text>{application.description}</Text>
                    </ModalBody>  
                </ModalContent>
                
            </Modal>
            
        </>
        
    )
}

export default ViewMore;