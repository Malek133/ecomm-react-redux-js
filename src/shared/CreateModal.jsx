import React from 'react'

import {
    Button,Modal,ModalOverlay,ModalContent,
    ModalHeader,ModalCloseButton,ModalBody,ModalFooter
          
  } from '@chakra-ui/react'

const CreateModal = ({isOpen,onClose,onClick,
    title,add,cancel,children,isLoading}) => {
  return (
    <>
     <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter='blur(5px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>
            {title}
            
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3}
             onClick={onClick} isLoading={isLoading} >
              {add}
            </Button>
            <Button onClick={onClose}>{cancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateModal