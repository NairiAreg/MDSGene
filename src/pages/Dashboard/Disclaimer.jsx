import React from "react";
import { VStack } from "@chakra-ui/react";
import TextBlock from "components/TextBlock";

const Disclaimer = () => {
  const content = [
    {
      title: "About MDS",
      content: `The International Parkinson and Movement Disorder Society ("MDS") is a
        nonprofit, professional society of clinicians, scientists and other
        healthcare professionals dedicated to improving the care of patients
        with movement disorders through education and research. MDS is tax
        exempt under Section 501(c)(3) of the Internal Revenue Code. MDS
        undertakes its activities in accordance with its nonprofit and tax
        exempt status and all applicable laws.`,
    },
    {
      title: "Liability for contents of online information",
      content: `MDS makes every effort to provide timely and accurate information on the
        MDSGene Web site. Nevertheless, errors and inaccuracies cannot be
        completely ruled out. The Movement Disorder Society Genetic mutation
        database ("MDSGene") is provided "as is" and MDS does not assume any
        liability for the relevance, accuracy, completeness or quality of the
        information provided. MDS, its officers, directors, members, employees
        and agents, make no warranties or representations, express or implied,
        oral or in writing, with respect to MDSGene, including its fitness for a
        particular purpose, merchantability, quality or its non-infringement.
        MDS, its officers, directors, members, employees and agents, will not be
        liable for any damages, including indirect, special, incidental,
        consequential or punitive damages (including lost profits and lost data)
        arising out of the use or failure to use the information offered and/or
        through the use of faulty or incomplete information. MDS reserves the
        right to modify, supplement, or delete any or all of the information
        offered on its MDSGene Internet site, or to temporarily or permanently
        cease publication thereof without prior and separate notification.`,
    },
    {
      title: "Links to internet sites of third parties",
      content: `This MDSGene Internet site includes links to external pages. The
        respective provider shall be responsible for the contents of any linked
        external pages. In establishing the initial link, MDS has reviewed the
        respective external content in order to determine whether such link
        entailed possible civil or criminal responsibility. However, a constant
        review of linked external pages is unreasonable without concrete reason
        to believe that a violation of the law may be involved. If MDS
        determines such or it is pointed out by others that an external offer to
        which it is connected via a link entails civil or criminal
        responsibility, then MDS will immediately eliminate any link to this
        offer. MDS expressly dissociates itself from such contents.`,
    },
    {
      title: "Pop-up advertisements",
      content: `When visiting this Web site, some Web browsers may produce pop-up advertisements. These advertisements were most likely produced by other Web sites previously visited or by third party software installed on the respective computer. MDS does not endorse or recommend products or services for which a pop-up advertisement may appear on the respective computer screen while visiting this site.`,
    },
    {
      title: "Medical information",
      content: `It is not the intention of this Web site to provide specific medical advice for patients but rather to provide researchers and physicians with information to better understand the phenotypic spectrum associated with specific genetic mutations. MDS does not give medical advice or engage in the practice of medicine. MDS under no circumstances recommends particular treatment for specific individuals and in all cases recommends consulting a qualified physician for diagnosis and prior to pursuing any course of treatment.`,
    },
    {
      title: "Copyright",
      content: `All materials on this Website, including MDSGene, are owned or licensed by MDS and are protected under the copyright laws of the United States, the laws of other countries, and applicable international treaties and conventions. Any reproduction, retransmission, or republication of all or part of any materials on this site without the prior written consent of MDS is expressly prohibited.
      Copyright, 2016, International Parkinson and Movement Disorder Society. All rights reserved.`,
    },
    {
      title: "Data protection",
      content: `When you visit MDSGene, our web server automatically records the IP address of your internet service provider, the website from which you visit us, the web pages on MDSGene you visit and the date and duration of your visit. This is done for the purpose of optimizing our website to meet your needs and to increase its user friendliness.`,
    },
    {
      title:
        "Clinical Interpretation of in vitro effect of mutations on LRRK2 kinase pathway activity",
      content: `The extrapolation of clinical significance with regards to the results of the functional in vitro LRRK2 screen on LRRK2 kinase pathway activity performed at the University of Dundee is at the MDSGene database user’s own discretion. With evolving tools and technologies, it may be possible to extract additional and more sensitive data from each LRRK2 mutant screen. Upon request, we would be happy to consider screening additional LRRK2 variants of unknown clinical significance that MDSGene database users might be interested in.`,
    },
  ];
  return (
    <VStack spacing={6} align="stretch">
      {content.map(({ title, content }) => (
        <TextBlock title={title}>{content}</TextBlock>
      ))}
    </VStack>
  );
};

export default Disclaimer;
