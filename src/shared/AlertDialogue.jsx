import React from 'react'

import {
    Button,AlertDialog,AlertDialogOverlay,
    AlertDialogContent,AlertDialogHeader,
    AlertDialogBody,AlertDialogFooter
  } from '@chakra-ui/react'


function AlertDialogue({ isOpen, onClose,
    title,des,DeleteTxt,CancelTxt,onOkHandler,isLoading }) {
    
    const cancelRef = React.useRef()
  
    return (
      <>
        {/* <Button colorScheme='red' onClick={onOpen}>
          Delete Customer
        </Button> */}
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay bg="blackAlpha.500" backdropFilter='blur(5px) hue-rotate(90deg)' >
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {title}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {des}
                
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  {CancelTxt}
                </Button>
                <Button colorScheme='red' isLoading={isLoading}
                onClick={onOkHandler} ml={3}>
                  {DeleteTxt}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default AlertDialogue