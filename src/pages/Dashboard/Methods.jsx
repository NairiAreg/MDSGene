import React from "react";
import {
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import TextBlock from "components/TextBlock";

const Methods = () => {
  return (
    <VStack spacing={6} align="stretch">
      <TextBlock title="Literature searches and data extraction">
        The content of MDSGene is based on genetic as well as phenotypic and
        clinical data extracted from the relevant literature following
        systematic screens of different resources (Lill et al., 2016; Kasten et
        al., 2018). Eligible articles need to be written in English and
        published in peer-reviewed journals. They are identified following
        systematic PubMed searches based on standardized search terms comprising
        the name of the genes (including aliases) and the disease/syndrome of
        interest. Demographic, clinical and genetic data are extracted adhering
        to a standardized data extraction protocol. Diagnoses displayed in
        MDSGene follow the recent recommendations of the International Parkinson
        disease and Movement Disorder (MDS) Task Force of Genetic Nomenclature
        in Movement Disorders (Marras et al., 2016). Whenever necessary,
        mutations are remapped to the human genome build 19, and mutation
        identifiers are renamed according to the Human Genome Variation Society
        (HGVS) nomenclature. Mutation carriers are only included if clinical
        data has been provided and indicated that he/she is affected by a
        movement disorder.
      </TextBlock>

      <TextBlock title="Pathogenicity scoring">
        Potential pathogenicity of reported variants is classified as
        "possible", "probable", or "definite" based on the following criteria:
        i) co-segregation with disease in the reported pedigrees and/or the
        number of reported mutation carriers, ii) frequency in ~120,000
        ethnically diverse individuals from the gnomAD (Genome Aggregation
        Database) browser (http://gnomad.broadinstitute.org/), iii) CADD
        ("Combined Annotation Dependent Depletion") score as an in-silico
        measure of deleteriousness of genetic variants (Kircher et al., 2014,
        Rentzsch et al., 2018), and iv) reported molecular evidence from in-vivo
        and/or in-vitro studies. Each evidence domain was divided into four
        categories each accumulating specific "points", weighted by category
        (see Table 1). Evidence domains "co-segregation with disease" and
        "presence of mutation-specific positive functional data" received the
        strongest weights in the pathogenicity grading. Finally, points were
        summed across categories and pathogenicity was graded as follows: benign
        ({"<"}5 points), possibly pathogenic (5-9 points), probably pathogenic
        (10-14 points), definitely pathogenic ({">"}14 points). Reported genetic
        variants that have been classified as benign using this scoring
        algorithm are not included in MDSGene.
      </TextBlock>

      <Box>
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Evidence</Th>
              <Th>Segregation</Th>
              <Th>Frequency (gnomAD)</Th>
              <Th>In-silico prediction (CADD score)</Th>
              <Th>Functional studies</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Least</Td>
              <Td>Only a single heterozygous patient (0 points)</Td>
              <Td>≥0.01 (0 points)</Td>
              <Td>{"<10 (0 points)"}</Td>
              <Td>Only negative reports or absence of studies (0 points)</Td>
            </Tr>
            <Tr>
              <Td>Suggestive</Td>
              <Td>
                ≥1 biallelic patient for recessive or ≥2 single heterozygous
                patients for dominant genes or 1 family (i.e. ≥2 affected
                mutation carriers) (2 points)
              </Td>
              <Td>0.001-0.009 (1 point)</Td>
              <Td>10 to {"<15 (1 point)"}</Td>
              <Td>1 positive study (2 points)</Td>
            </Tr>
            <Tr>
              <Td>Strong</Td>
              <Td>2 families (3 points)</Td>
              <Td>0.0001-0.0009 (2 points)</Td>
              <Td>15 to 20 (3 points)</Td>
              <Td>2 positive studies or null allele (4 points)</Td>
            </Tr>
            <Tr>
              <Td>Highest</Td>
              <Td>{">2 families or ≥1 de novo (6 points)"}</Td>
              <Td>{"<0.0001 (3 points)"}</Td>
              <Td>{">20 (5 points)"}</Td>
              <Td>{">2 positive studies (6 points)"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <TextBlock title="LRRK2 variant screen to assess LRRK2 kinase pathway activity">
        <Text>
          The Leucine rich repeat kinase (LRRK2) is a large multidomain protein
          harboring a tandem catalytic ROC-COR GTPase and kinase domains as well
          as an N-terminal armadillo, ankyrin and leucine-rich repeat and
          C-terminal WD-40 domains. Pathogenic LRRK2 variants result in LRRK2
          kinase activation with subsequent hyperphosphorylation of its
          endogenous substrates, a subgroup of RabGTPases including Rab10 (eLife
          2016;5:e12813). Measuring LRRK2 dependent phosphorylation of Rab10 at
          Threonine 73 correlates with LRRK2 kinase activity (eLife
          2016;5:e12813).
        </Text>
        <Text mt={4}>
          Here, we used a heterologous transient overexpression system of PD
          associated LRRK2 variants in HEK293 cells to measure their direct
          effect on phosphorylation levels of Rab10 at Threonine 73
          (pRab10Thr73) as a readout for LRRK2 kinase pathway activation status
          in comparison to LRRK2 wildtype (Alexia's paper). For each variant, at
          least 4 independent biological replicate experiments were performed
          for quantification. Additionally, the estimated conservation score for
          each LRRK2 variant is provided (PMID: 27166375).
        </Text>
      </TextBlock>

      <TextBlock title="Interpretation">
        <Text>
          The Leucine rich repeat kinase (LRRK2) is a large multidomain protein
          harboring a tandem catalytic ROC-COR GTPase and kinase domains as well
          as an N-terminal armadillo, ankyrin and leucine-rich repeat and
          C-terminal WD-40 domains. Pathogenic LRRK2 variants result in LRRK2
          kinase activation with subsequent hyperphosphorylation of its
          endogenous substrates, a subgroup of RabGTPases including Rab10 (eLife
          2016;5:e12813). Measuring LRRK2 dependent phosphorylation of Rab10 at
          Threonine 73 correlates with LRRK2 kinase activity (eLife
          2016;5:e12813).
        </Text>
        <Text mt={4}>
          <Text>
            LRRK2 variants with 1.5-fold activation of LRRK2 kinase pathway
            activity ({">"}50% higher levels of phosphorylated pRab10Thr73
            compared to LRRK2 wildtype) were considered "activating LRRK2
            variants in a cellular transient overexpression assay " with
          </Text>
          <UnorderedList mt={2}>
            <ListItem>
              pRab10Thr73 levels {'<1.5 and > 2-fold as "mildly activating"'}
            </ListItem>
            <ListItem>{'<2 and >3 as "moderately activating" and'}</ListItem>
            <ListItem>{'< 3 as "strongly activating".'}</ListItem>
          </UnorderedList>
          <Text mt={4}>
            Variants with pRab10Thr73 levels{" "}
            {
              '< 0.5 > 1.5 compared to wildtype were considered "not activating in a cellular assay" and those with'
            }
            pRab10Thr73 levels{" "}
            {'>0.5 as "reduced activity in a cellular assay".'}
          </Text>
          <Text mt={4}>
            LRRK2 dependent pRab10Thr73 phosphorylation can also be measured in
            human bio-samples such as neutrophils and monocytes isolated from
            fresh peripheral blood "in vivo" (PMID: 34125248, PMID: 29127255).
            For each variant, information on availability on patient data for
            LRRK2 dependent pRab10Thr73 phosphorylation is given and if
            applicable the interpretation thereof.
          </Text>
          <Text mt={4}>
            For example, the common G2019S variant results in "in vitro mild
            activation" ({">"}1.75-fold above LRRK2 wild type) of LRRK2 kinase
            pathway activity, but its effect is "not statistically significant
            in an unpaired t-test". Patient derived data exists, but LRRK2
            dependent pRab10Thr73 phosphorylation is "not significantly elevated
            in vivo" when compared to controls in human derived peripheral blood
            neutrophils (PMID: 34125248). On the other hand, the R1441G variants
            activates LRRK2 kinase pathway activity "in vitro strongly",
            3.9-fold and patient derived data confirms "significantly elevated"
            LRRK2 kinase pathway activity in human peripheral blood neutrophils
            "in vivo" as well when compared to healthy controls (PMID:
            34125248). Based on our current knowledge, we would expect that
            significant LRRK2 kinase pathway activation can be shown in any
            variant that activates LRRK2 kinase pathway activity in vitro
            strongly, above 3-fold compared to the LRRK2 wildtype protein.
          </Text>
        </Text>
      </TextBlock>

      <TextBlock title="Abbreviations/conventions used throughout MDSGene">
        <UnorderedList>
          <ListItem>AAO = age at onset</ListItem>
          <ListItem>comp. het. = compound heterozygous</ListItem>
          <ListItem>het = heterozygous</ListItem>
          <ListItem>hom = homozygous</ListItem>
          <ListItem>N = number</ListItem>
          <ListItem>n.a. = not applicable</ListItem>
          <ListItem>O = other/mixed (ethnicity)</ListItem>
          <ListItem>SD = standard deviation</ListItem>
        </UnorderedList>
        <Text mt={4}>
          Note that the full names of the official gene names can be found in
          the EntrezGene database. In addition, country names have been
          abbreviated according to the official 3-letter codes recommended by
          the International Organization for Standardization (ISO).
        </Text>
      </TextBlock>

      <TextBlock title="References">
        <UnorderedList>
          <ListItem>
            Kircher M, Witten DM, Jain P, O'Roak BJ, Cooper GM, Shendure J. A
            general framework for estimating the relative pathogenicity of human
            genetic variants. Nat Genet 2014;46:310-5
          </ListItem>
          <ListItem>
            Kasten M, Hartmann C, Hampf J, Schaake S, Westenberger A, Vollstedt
            EJ, Balck A, Domingo A, Vulinovic F, Dulovic M, Zorn I, Madoev H,
            Zehnle H, Lembeck CM, Schawe L, Reginold J, Huang J, König IR,
            Bertram L, Marras C, Lohmann K, Lill CM, Klein C. Genotype-Phenotype
            Relations for the Parkinson's Disease Genes Parkin, PINK1, DJ1:
            MDSGene Systematic Review. Mov Disord 2018;33:730-41.
          </ListItem>
          <ListItem>
            Lill CM, Mashychev A, Hartmann C, Lohmann K, Marras C,. Lang AE,
            Klein C, Bertram L . Launching the Movement Disorders Society
            Genetic Mutation Database (MDSGene). Mov Disord, 2016
            May;31(5):607-9
          </ListItem>
          <ListItem>
            Marras C, Lang A, van de Warrenburg BP, Sue CM, Tabrizi SJ, Bertram
            L, Mercimek-Mahmutoglu S, Ebrahimi-Fakhari D, Warner TT, Durr A,
            Assmann B, Lohmann K, Kostic V, Klein C. Nomenclature of genetic
            movement disorders: Recommendations of the International Parkinson
            and Movement Disorder Society Task Force on Nomenclature of Genetic
            Movement Disorders. Mov Disord 2016;31(4):436-57.
          </ListItem>
          <ListItem>
            Rentzsch P, Witten D, Cooper GM, Shendure J, Kircher M. CADD:
            predicting the deleteriousness of variants throughout the human
            genome.Nucleic Acids Res. 2018 Oct 29.
          </ListItem>
        </UnorderedList>
      </TextBlock>
    </VStack>
  );
};

export default Methods;
