import React from 'react'

import {
    Button,Modal,ModalOverlay,ModalContent,
    ModalHeader,ModalCloseButton,ModalBody,ModalFooter
          
  } from '@chakra-ui/react'

const CustomModal = ({isOpen,onClose,onClick,
    title,save,cancel,children}) => {
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
            <Button colorScheme='green' mr={3} onClick={onClick} >
              {save}
            </Button>
            <Button onClick={onClose}>{cancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal