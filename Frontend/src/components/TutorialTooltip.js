import React, { useState, useEffect } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const TutorialTooltip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = 3;
  const tutorialShownKey = 'tutorialShown'; // Local storage key

  useEffect(() => {
    // Check if the tutorial has been shown before
    const isTutorialShown = localStorage.getItem(tutorialShownKey);

    if (!isTutorialShown) {
      // If the tutorial hasn't been shown before, open it
      onOpen();
    }
  }, [onOpen]);

  const handleNextStep = () => {
    // Increment the currentStep and show the next step of the tutorial
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSkipTutorial = () => {
    // Close the tutorial
    onClose();

    // Set the flag in local storage to indicate that the tutorial has been shown
    localStorage.setItem(tutorialShownKey, 'true');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleSkipTutorial} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tutorial Tooltip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Show different content based on the current step */}
            {currentStep === 1 && <p>Step 1: Welcome to our website! This is the first step of the tutorial.</p>}
            {currentStep === 2 && <p>Step 2: Here's how you can use feature XYZ.</p>}
            {currentStep === 3 && <p>Step 3: And here's another feature ABC explained.</p>}
            {/* Add more steps as needed */}
          </ModalBody>
          <ModalFooter>
            {currentStep < maxSteps ? (
              <Button colorScheme="blue" mr={3} onClick={handleNextStep}>
                Next Step
              </Button>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={handleSkipTutorial}>
                Finish Tutorial
              </Button>
            )}
            <Button variant="ghost" onClick={handleSkipTutorial}>
              Skip Tutorial
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TutorialTooltip;
