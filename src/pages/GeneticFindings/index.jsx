import React from "react";
import {Box, Flex, VStack} from "@chakra-ui/react";

const GeneticFindings = ({geneName}) => {
    const [, gene] = geneName.split("-");
    const image1 = `../genes/genetic-findings/${gene}-image1.png`;
    const image2 = `../genes/genetic-findings/${gene}-image2.png`;

    return (
        <Box maxW="100%" mx="auto" p={5}>
            <VStack spacing={8} align="stretch">
                <Flex gap={40} direction="column">
                    <img src={image1} alt={`${gene} finding 1`}/>
                    <img src={image2} alt={`${gene} finding 2`}/>
                </Flex>
            </VStack>
        </Box>
    );
};

export default GeneticFindings;