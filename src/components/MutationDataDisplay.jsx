import React from "react";
import { Box, Text, VStack, HStack, Link } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { publicationDataQuery } from "api/api-service";

const MutationDataDisplay = ({ data: mutation }) => {
  const pubmedIds = mutation.positiveFunctionalEvidence
    ? mutation.positiveFunctionalEvidence[0].split(" ")
    : [];
  const { data: publicationData } = useQuery(publicationDataQuery(pubmedIds));

  const formatEvidence = (evidence) => {
    if (!evidence || evidence.length === 0) return "N/A";
    const pubmedIds = evidence[0].split(" ");
    return pubmedIds.map((id) => {
      const publication = publicationData?.[id];
      if (publication) {
        const author = publication.sortfirstauthor.split(" ")[0];
        const year = publication.pubdate.split(" ")[0];
        return (
          <Link
            key={id}
            href={`http://www.ncbi.nlm.nih.gov/pubmed/${id}`}
            color="blue.500"
            isExternal
            mr={2}
          >
            {`${author}, ${year}`}
          </Link>
        );
      }
      return null;
    });
  };

  const formatValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value).map(([key, val]) => (
        <Text key={key}>
          {key}: {val}
        </Text>
      ));
    }
    return value;
  };

  const mutationDetails = [
    {
      label: "Protein level identifier",
      value: mutation.proteinIdentifier,
      suffix: "(n.a.)",
      key: "proteinLevelIdentifier",
    },
    {
      label: "cDNA level identifier",
      value: mutation.cdnaIdentifier,
      suffix: "(n.a.)",
      key: "cdnaLevelIdentifier",
    },
    { label: "Gene level identifier", key: "gdnaLevelIdentifier" },
    {
      label: "Reference, alternative allele",
      key: "referenceAlternativeAllele",
    },
    { label: `Genomic location hg(${mutation.hg})`, key: "genomicLocation" },
    {
      label: "Gene name",
      key: "geneName",
      isLink: true,
      linkGenerator: (name) => mutation.geneLink,
    },
    { label: "Consequence", key: "consequence" },
    { label: "Pathogenicity scoring", key: "pathogenicityScoring" },
    { label: "CADD score", key: "caddScore" },
    {
      label: "Phosphorylation activity",
      key: "phosphorylationActivity",
      format: formatValue,
    },
    {
      label: "Positive functional evidence",
      key: "positiveFunctionalEvidence",
      format: formatEvidence,
    },
  ];

  return (
    <Box>
      <VStack align="stretch" spacing={2}>
        {mutationDetails.map((detail, index) => (
          <HStack key={index} align="flex-start">
            <Text fontWeight="bold" width="250px" flexShrink={0}>
              {detail.label}
              {detail.suffix && !mutation[detail.key] ? detail.suffix : ""}:
            </Text>
            {detail.isLink ? (
              <Link
                href={detail.linkGenerator(mutation[detail.key])}
                color="blue.500"
                isExternal
              >
                {mutation[detail.key]}
              </Link>
            ) : detail.format ? (
              <Box>{detail.format(mutation[detail.key])}</Box>
            ) : (
              <Text>{formatValue(mutation[detail.key]) || "N/A"}</Text>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default MutationDataDisplay;
