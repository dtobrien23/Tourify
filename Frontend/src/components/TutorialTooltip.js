import React, { useState, useEffect, useContext } from 'react';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { MapContext } from './MapContext';

const TutorialTooltip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = 4;
  // const tutorialShownKey = 'tutorialShown'; // Local storage key

  useEffect(() => {
    // const isTutorialShown = localStorage.getItem(tutorialShownKey);
    const isUserLoggedIn = localStorage.getItem('loggedInfo') === 'true';

    if (!isUserLoggedIn) {
      // Check if the tutorial has not been shown before
      onOpen();
    }
  }, [onOpen]);

  const { hasTouchScreen, setIsMobileDrawerOpen } = useContext(MapContext);

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(prevStep => {
      const newStep = prevStep - 1;
      return newStep < 1 ? 1 : newStep;
    });
  };

  const handleSkipTutorial = () => {
    onClose();

    // Set the flag in local storage to indicate that the tutorial has been shown
    // localStorage.setItem(tutorialShownKey, 'true');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleSkipTutorial}
        size={hasTouchScreen ? 'xs' : 'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Welcome to Tourify! </ModalHeader>
          <ModalCloseButton onClick={handleSkipTutorial} />
          <ModalBody>
            {/* Show different content based on the current step */}
            {currentStep === 1 && (
              <p>
                Welcome to Tourify! Collect experiences and enhance your journey
                with our amazing attractions.
              </p>
            )}
            {currentStep === 2 && (
              <p>
                You can collect your own unique NFTs badges on our website by
                visiting famous New York attractions!
              </p>
            )}
            {currentStep === 3 && (
              <p>
                To access all the fun features on our website please Log In
                through Google!
              </p>
            )}
            {currentStep === 4 && (
              <p>
                Press "Guide" to learn more about about the features on this
                website!
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            {currentStep > 1 && (
              <Button
                variant="ghost"
                // variant="solid"
                onClick={handleBackStep}
                mr={2}
              >
                Back
              </Button>
            )}
            {currentStep < maxSteps ? (
              <Button colorScheme="orange" mr={3} onClick={handleNextStep}>
                Next Step
              </Button>
            ) : (
              <Button colorScheme="orange" onClick={handleSkipTutorial}>
                Finish Tutorial
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TutorialTooltip;
