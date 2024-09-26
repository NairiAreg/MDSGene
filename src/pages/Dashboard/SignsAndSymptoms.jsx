import React, { useRef } from "react";
import {
  VStack,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
} from "@chakra-ui/react";

const Introduction = () => {
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Alert status="warning" variant="subtle">
        <AlertIcon />
        <Box>
          <AlertTitle>Quality Control Notice</AlertTitle>
          <AlertDescription>
            Please note that the "signs & symptoms" function of MDSGene
            currently undergoes quality control. For a preview on how this
            function will work, please watch the video below:
          </AlertDescription>
        </Box>
      </Alert>

      <Box>
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          controls
          src="video.mp4"
        />
        <HStack mt={2} justifyContent="center">
          <Button onClick={handlePlayPause}>Play/Pause</Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Introduction;
