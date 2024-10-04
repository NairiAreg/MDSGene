import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Wrap,
  WrapItem,
  Collapse,
  Icon,
  HStack,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FaFileAlt } from "react-icons/fa";

const PublicationLinks = ({ publications }) => (
  <HStack spacing={1} ml={2}>
    {publications.map((url, index) => (
      <Link key={index} href={url} isExternal>
        <Icon
          as={FaFileAlt}
          color="blue.500"
          boxSize={4}
          _hover={{ color: "blue.600" }}
        />
      </Link>
    ))}
  </HStack>
);

const GeneButton = ({ gene, inProgress, disease }) => {
  let publications;
  if (typeof gene !== "string" && gene.publications) {
    publications = gene.publications;
  }

  return (
    <WrapItem>
      <Button
        as="a"
        href={`/gene/${disease.match(/\(([^)]+)\)/)[1]}-${gene?.name || gene}`}
        size="sm"
        variant="outline"
        position="relative"
      >
        {gene?.name || gene}
        {inProgress && (
          <Text
            position="absolute"
            bottom="-20px"
            left="50%"
            transform="translateX(-50%)"
            fontSize="xs"
            color="red.500"
            whiteSpace="nowrap"
          >
            in progress
          </Text>
        )}
      </Button>
      {publications?.map((url, index) => (
        <Link key={index} href={url} isExternal>
          <Icon
            as={FaFileAlt}
            color="blue.500"
            boxSize={4}
            _hover={{ color: "blue.600" }}
          />
        </Link>
      ))}
    </WrapItem>
  );
};

const SubIllnessSection = ({
  name,
  genes,
  publications,
  inProgress,
  disease,
}) => (
  <Box mb={4}>
    {name && (
      <HStack mb={2}>
        <Text fontWeight="bold">{name}</Text>
        {publications && <PublicationLinks publications={publications} />}
      </HStack>
    )}
    <Wrap spacing={2}>
      {genes.map((gene, index) => (
        <GeneButton
          key={index}
          disease={disease}
          gene={gene}
          inProgress={inProgress}
        />
      ))}
    </Wrap>
  </Box>
);

const DiseaseSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box bg="gray.100" p={4} borderRadius="md">
      <Flex
        justify="space-between"
        align="center"
        onClick={() => setIsOpen(!isOpen)}
        cursor="pointer"
      >
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
      </Flex>
      <Collapse in={isOpen}>
        <VStack align="stretch" mt={4} spacing={4}>
          {Array.isArray(content) ? (
            content.map((subIllness, index) => (
              <SubIllnessSection disease={title} key={index} {...subIllness} />
            ))
          ) : (
            <SubIllnessSection disease={title} {...content} />
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

const Genes = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold" color="red.500">
        Select a gene for your disease of interest:
      </Text>
      {Object.entries(data).map(([disease, content], index) => (
        <DiseaseSection key={index} title={disease} content={content} />
      ))}
    </VStack>
  );
};

export default Genes;

const data = {
  "Spinocerebellar ataxia (ATX)": {
    genes: [
      {
        name: "TBP",
        publications: ["https://pubmed.ncbi.nlm.nih.gov/example1/"],
      },
    ],
  },
  "(DBA)": {
    genes: ["GBA"],
  },
  "Chorea (CHOR)": {
    genes: ["ADCY5", "NKX2-1", "PDE10A"],
  },
  "Dystonia (DYT)": [
    {
      name: "Isolated dystonia",
      publications: [
        "https://pubmed.ncbi.nlm.nih.gov/example2/",
        "https://pubmed.ncbi.nlm.nih.gov/example2/",
      ],
      genes: [
        "ANO3",
        "AOPEP",
        "EIF2AK2",
        "GNAL",
        "HPCA",
        "KMT2B",
        "PRKRA",
        "THAP1",
        "TOR1A",
        "VPS16",
      ],
    },
    {
      name: "Combined dystonia (Myoclonus-dystonia)",
      genes: ["KCTD17", "SGCE"],
    },
  ],
  "Dystonia/Parkinsonism (DYT/PARK)": [
    {
      name: "Dopa-responsive dystonia",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example3/"],
      genes: ["GCH1", "PTS", "QDPR", "SPR", "TH"],
    },
    {
      name: "X-linked dystonia-parkinsonism",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example4/"],
      genes: ["TAF1"],
    },
    {
      name: "Other forms of dystonia-parkinsonism",
      genes: ["CP", "GLB1", "PLA2G6", "SLC30A10", "SLC6A3"],
    },
    {
      name: "Rapid-onset dystonia-parkinsonism",
      genes: ["ATP1A3"],
      inProgress: true,
    },
  ],
  "Hereditary spastic paraplegia (HSP)": {
    genes: ["ATL1", "REEP1", "SPAST"],
  },
  "Parkinsonism (PARK)": [
    {
      name: "Classical parkinsonism, dominant forms",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example5/"],
      genes: ["LRRK2", "SNCA", "VPS35"],
    },
    {
      name: "Early-onset parkinsonism, recessive forms",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example6/"],
      genes: ["PARK7", "PRKN", "PINK1"],
    },
    {
      name: "Atypical parkinsonism",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example7/"],
      genes: ["ATP13A2", "DCTN1", "DNAJC6", "FBXO7", "SYNJ1", "VPS13C"],
    },
  ],
  "Paroxysmal movement disorder (PxMD)": [
    {
      name: "Episodic ataxia",
      publications: ["https://pubmed.ncbi.nlm.nih.gov/example8/"],
      genes: ["CACNA1A", "KCNA1", "PDHA1", "SLC1A3"],
    },
    {
      name: "Paroxysmal dyskinesia",
      genes: ["PNKD", "PRRT2", "SLC2A1"],
    },
    {
      name: "Spinocerebellar ataxia",
      genes: ["ANO10"],
    },
  ],
  "Primary familial brain calcification (PFBC) - associated movement disorder":
    {
      genes: [
        "JAM2",
        "MYORG",
        "PDGFB",
        "PDGFRB",
        "SLC20A2",
        {
          name: "XPR1",
          publications: ["https://pubmed.ncbi.nlm.nih.gov/example10/"],
        },
      ],
    },
};
