import React, { useRef } from "react";
import {
  VStack,
  Text,
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
} from "@chakra-ui/react";
import TextBlock from "components/TextBlock";

const Introduction = () => (
  <TextBlock>
    Thomsen M, Lange LM, Klein C, Lohmann K. MDSGene: Extending the List of
    Isolated Dystonia Genes by VPS16, EIF2AK2, and AOPEP. Mov Disord. 2023 Jan
    20. doi: 10.1002/mds.29327. Online ahead of print. PMID: 36670070
    <br />
    <br />
    Rossi M, Hamed M, Rodríguez-Antigüedad J, Cornejo-Olivas M, Breza M, Lohmann
    K, Klein C, Rajalingam R, Marras C, van de Warrenburg BP. Genotype-Phenotype
    Correlations for ATX-TBP (SCA17): MDSGene Systematic Review. Mov Disord.
    2022 Nov 14. doi: 10.1002/mds.29278. Online ahead of print. PMID: 36374860
    <br />
    <br />
    Weissbach A, Pauly MG, Herzog R, Hahn L, Halmans S, Hamami F, Bolte C,
    Camargos S, Jeon B, Kurian MA, Opladen T, Brüggemann N, Huppertz HJ, König
    IR, Klein C, Lohmann K. Relationship of Genotype, Phenotype, and Treatment
    in Dopa-Responsive Dystonia: MDSGene Review. Mov Disord. 2022
    Feb;37(2):237-252. doi: 10.1002/mds.28874. Epub 2021 Dec 15. PMID: 34908184
    <br />
    <br />
    Wittke C, Petkovic S, Dobricic V, Schaake S, Respondek G, Weissbach A,
    Madoev H, Trinh J, Vollstedt E-J, Kuhnke N, Lohmann K, Dulovic Mahlow M,
    Marras C, König IR, Stamelou M, Bonifati V, Lill CM, Kasten M, Huppertz HJ,
    Höglinger G, Klein C. Genotype-Phenotype Relations for the Atypical
    Parkinsonism Genes: MDSGene Systematic Review. Mov Disord. 2021
    Jul;36(7):1499-1510. doi: 10.1002/mds.28517. Epub 2021 Mar 19. PMID:
    34396589
    <br />
    <br />
    Lange LM, Junker J, Loens S, Baumann H, Olschewski L, Schaake S, Madoev H,
    Petkovic S, Kuhnke N, Kasten M, Westenberger A, Domingo A, Marras C, König
    IR, Camargos S, Ozelius LJ, Klein C, Lohmann K. Genotype-Phenotype Relations
    for Isolated Dystonia Genes: MDSGene Systematic Review. Mov Disord 2021,
    epub ahead of print Jan 27. doi: 10.1002/mds.28485. PMID: 33502045
    <br />
    <br />
    Wasner K, Grünewald A, Klein C. Parkin-linked Parkinson's disease: From
    clinical insights to pathogenic mechanisms and novel therapeutic approaches.
    Neurosci Res 2020;159:34-39. doi: 10.1016/j.neures.2020.09.001. PMID:
    32949666
    <br />
    <br />
    Pauly MG, Ruiz López M, Westenberger A, Saranza G, Brüggemann N, Weissbach
    A, Rosales RL, Diesta CC, Jamora RDG, Reyes CJ, Madoev H, Petkovic S,
    Ozelius LJ, Klein C, Domingo A. Expanding Data Collection for the MDSGene
    Database: X-linked Dystonia-Parkinsonism as Use Case Example. Mov Disord
    2020;35:1933-1938. doi: 10.1002/mds.28289. PMID: 32949450
    <br />
    <br />
    Klein C, Hattori N, Marras C. MDSGene: Closing Data Gaps in
    Genotype-Phenotype Correlations of Monogenic Parkinson's Disease. J
    Parkinsons Dis 2018;8:S25-S30. doi: 10.3233/JPD-181505. PMID: 30584170
    <br />
    <br />
    Trinh J, Zeldenrust FMJ, Huang J, Kasten M, Schaake S, Petkovic S, Madoev H,
    Grünewald A, Almuammar S, König IR, Lill CM, Lohmann K, Klein C, Marras C.
    Genotype-phenotype relations for the Parkinson's disease genes SNCA, LRRK2,
    VPS35: MDSGene systematic review. Mov Disord 2018;33:1857-1870. doi:
    10.1002/mds.27527. PMID: 30357936
    <br />
    <br />
    Kasten M, Hartmann C, Hampf J, Schaake S, Westenberger A, Vollstedt EJ,
    Balck A, Domingo A, Vulinovic F, Dulovic M, Zorn I, Madoev H, Zehnle H,
    Lembeck CM, Schawe L, Reginold J, Huang J, König IR, Bertram L, Marras C,
    Lohmann K, Lill CM, Klein C. Genotype-phenotype relations for the
    Parkinson's Disease genes Parkin, PINK1, DJ1: MDSGene Systematic Review. Mov
    Disord 2018;33:730-741. PMID: 29644727
    <br />
    <br />
    Lill CM, Mashychev A, Hartmann C, Lohmann K, Marras C, Lang AE, Klein C,
    Bertram L. Launching the movement disorders society genetic mutation
    database (MDSGene). Mov Disord 2016;31:607-609.
  </TextBlock>
);

export default Introduction;
