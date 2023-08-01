import React, { useState, useEffect } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const TutorialTooltip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = 3;
  const tutorialShownKey = 'tutorialShown'; // Local storage key

  useEffect(() => {
    const isTutorialShown = localStorage.getItem(tutorialShownKey);

    if (isTutorialShown) {
      onOpen();
    }
  }, [onOpen]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSkipTutorial = () => {
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
            {currentStep === 1 && (
              <p>
                Step 1: Welcome to Tourify! Collect experiences and enhance your journey with our amazing attractions.
              </p>
            )}
            {currentStep === 2 && (
              <p>
                Step 2: You can enjoy various activities on this website, including x, y, and z.
              </p>
            )}
            {currentStep === 3 && (
              <p>
                Step 3: Press "About Us" to learn more about our team and mission!
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            {currentStep < maxSteps ? (
              <Button colorScheme="orange" mr={3} onClick={handleNextStep}>
                Next Step
              </Button>
            ) : (
              <Button colorScheme="orange" mr={3} onClick={handleSkipTutorial}>
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
