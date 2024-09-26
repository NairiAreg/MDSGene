import React from "react";
import {
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Divider,
} from "@chakra-ui/react";

const PersonList = ({ title, people }) => (
  <Box>
    <Heading as="h3" fontWeight={700} size="sm" mb={2}>
      {title}
    </Heading>
    {people.map((person, index) => (
      <Text fontSize="sm" key={index}>
        {person}
      </Text>
    ))}
  </Box>
);

const SectionGroup = ({ title, data }) => (
  <>
    {title && (
      <Heading as="h2" fontWeight={700} fontSize="lg" color="red.700">
        {title}
      </Heading>
    )}
    {data.map((group, groupIndex) => (
      <Grid
        key={groupIndex}
        templateColumns={group.fullWidth ? "1fr" : "repeat(2, 1fr)"}
        gap={6}
      >
        {group.sections.map((section, sectionIndex) => (
          <GridItem key={sectionIndex} colSpan={group.fullWidth ? 2 : 1}>
            <PersonList title={section.title} people={section.people} />
          </GridItem>
        ))}
      </Grid>
    ))}
    <Divider my={8} />
  </>
);

const administrationData = [
  {
    fullWidth: true,
    sections: [
      {
        title: "Principal Investigators",
        people: [
          "Christine Klein, MD, Institute of Neurogenetics, University of Lübeck, Lübeck, Germany",
          "Connie Marras, MD, PhD, Institute of Health Policy, Management and Evaluation, University of Toronto, Toronto, Canada",
          "Katja Lohmann, PhD, Institute of Neurogenetics, University of Lübeck, Lübeck, German",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Coordinators",
        people: [
          "Rajasumi Rajalingam, MD, Hon. BSc, Toronto Western Hospital, Ontario, Canada",
          "Jana Huang, BHS, Toronto Western Hospital, Ontario, Canada",
          "Alissa Buhrmann, University of Lübeck, Lübeck, Germany",
        ],
      },
      {
        title: "Programmer",
        people: ["Harutyun Madoev, MSc, University of Lübeck, Lübeck, Germany"],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Documentalist",
        people: [
          "Susen Schaake, BSc, University of Lübeck, Lübeck, Germany",
          "Vulinovic, Franca, PhD, University of Lübeck, Lübeck, Germany",
        ],
      },
      {
        title: "Statistician",
        people: [
          "König, Inke, PhD, University of Lübeck, Germany (PARK, Statistics)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Functional LRRK2 kinase pathway assessment",
        people: [
          "Dario Alessi, lead (Dundee, UK)",
          "Esther Sammler, lead (Dundee, UK)",
          "Alexia Kalogeropulou (Dundee, UK)",
          "Elena Purlyte (Dundee, UK)",
          "Francesca Tonelli (Dundee, UK)",
          "Gabriel Morel (Dundee, UK)",
        ],
      },
      {
        title: "Automated classification",
        people: ["Hans-Jürgen Huppertz (Zurich, Switzerland)"],
      },
    ],
  },
];

const dataAbstractionTeams = [
  {
    fullWidth: false,
    sections: [
      {
        title: "Parkinson's disease (PD) team",
        people: [
          "Christine Klein, lead PD (Lübeck, Germany)",
          "Connie Marras, lead PD (Toronto, Canada)",
          "Alexander Balck (Lübeck, Germany)",
          "Alissa Buhrmann (Lübeck, Germany)",
          "Amaal Al Dhakeel (Toronto, Canada)",
          "Ana Westenberger (Lübeck, Germany)",
          "Anne Grünewald (Belvaux, Luxembourg)",
          "Anthony E Lang (Toronto, Canada)",
          "Carolin Gabbert (Lübeck, Germany)",
          "Eva-Juliane Vollstedt (Lübeck, Germany)",
          "Fenja Fahrig (Lübeck, Germany)",
          "Jana Huang (Toronto, Canada)",
          "Joanne Trinh (Lübeck, Germany)",
          "Jon Rodriguez-Antigudedad Munoz (Donostia, Spain)",
          "Meike Kasten (Lübeck, Germany)",
          "Shen-Yang Lim (Kuala Lumpur, Malaysia)",
          "Susen Schaake (Lübeck, Germany)",
        ],
      },
      {
        title: "Atypical Parkinson's disease (APD) team",
        people: [
          "Christine Klein, lead APD (Lübeck, Germany)",
          "Vincenzo Bonifati (Rotterdam, The Netherlands)",
          "Günter Höglinger (Hanover, Germany)",
          "Meike Kasten (Lübeck Germany)",
          "Christina Lembeck (Lübeck Germany)",
          "Gesine Respondek (Munich, Germany)",
          "Maria Stamelou (Athens, Greece)",
          "Eva-Juliane Vollstedt (Lübeck Germany)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "GBA-Parkinson´s disease (GBA) team:",
        people: [
          "Roy Alcalay, lead GBA (New York, USA)",
          "Christine Klein, lead GBA (Lübeck, Germany)",
          "Meike Kasten (Lübeck, Germany)",
          "Katja Lohmann (Lübeck, Germany)",
          "Malco Rossi (Buenos Aires, Argentina)",
          "Nathalie Schell (Lübeck, Germany)",
          "Tatiana Usnich (Lübeck, Germany)",
        ],
      },
      {
        title: "Dystonia (DYT) team:",
        people: [
          "Christine Klein, lead DYT (Lübeck, Germany)",
          "Katja Lohmann, lead DYT (Lübeck, Germany)",
          "Sarah Camargos (Belo Horizonte, Brazil)",
          "Johanna Junker (Lübeck, Germany)",
          "Lara Lange (Lübeck, Germany)",
          "Sebastian Löns (Lübeck, Germany)",
          "Laurie J Ozelius (Boston, USA)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Dystonia-parkinsonism (DYT/PARK) team:",
        people: [
          "Sarah Camargos, lead DYT/PARK (Belo Horizonte, Brazil)",
          "Matthew Barrett (Richmond, USA)",
          "Christine Cooper (South Carolina, USA)",
          "Joseph Flanigan (Charlottesville, USA)",
          "Rabea Fuchshofen (Lübeck, Germany)",
          "Marta San Luciano (Los Angeles, USA)",
          "Jon Rodriguez-Antigudedad Munoz (Donostia, Spain)",
          "Odinachi Oguh (Cleveland, USA)",
          "Neepa Patel (Detroit, USA)",
          "Anne Weissbach (Lübeck, Germany)",
          "Merle Vater (Lübeck, Germany)",
        ],
      },
      {
        title: "Dopa-responsive dystonia (DRD) team:",
        people: [
          "Anne Weissbach, lead DYT/PARK (Lübeck, Germany)",
          "Beomseok Jeon (Seoul, Korea)",
          "Christina Bolte (Lübeck, Germany)",
          "Feline Hamami (Lübeck, Germany)",
          "Katja Lohmann (Lübeck, Germany)",
          "Lisa Hahn (Lübeck, Germany)",
          "Manju A. Kurian (London, United Kingdom)",
          "Martje Pauly (Lübeck, Germany)",
          "Norbert Brüggemann (Lübeck, Germany)",
          "Rebecca Herzog (Lübeck, Germany)",
          "Sarah Camargos (Belo Horizonte, Brazil)",
          "Sara Halmans (Lübeck, Germany)",
          "Thomas Opladen (Heidelberg, Germany)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "X-linked dystonia-parkinsonsim (XDP) team:",
        people: [
          "Aloysius Domingo, lead XDP (Boston, USA)",
          "Norbert Brüggemann (Lübeck, Germany)",
          "Christine Klein (Lübeck, Germany)",
          "Martje Pauly (Lübeck, Germany)",
          "Marta Ruiz Lopez (Barakaldo, Spain)",
          "Ana Westenberger (Lübeck, Germany)",
        ],
      },
      {
        title: "Rapid-onset dystonia-parkinsonims (RDP) team:",
        people: [
          "Hendrik Rosewich, lead RDP (Göttingen, Germany)",
          "Simone Schröder (Göttingen, Germany)",
          "Alison Brashear (Winston-Salem, USA)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Chorea (CHOR) team:",
        people: [
          "Ana Westenberger, lead CHOR (Lübeck, Germany)",
          "Alexander Balck (Lübeck, Germany)",
          "Leonora Kulikovskaja (Magdeburg, Germany)",
          "Marta Ruiz López (Barakaldo, Spain)",
          "Eva-Juliane Vollstedt (Lübeck, Germany)",
        ],
      },
      {
        title: "Hereditary spastic paraplegia (HSP) team:",
        people: [
          "Kishore Kumar, lead HSP (Sydney, Australia)",
          "Marianthi Breza (Athens, Greece)",
          "Franca Cambi (Pittsburgh, USA)",
          "Kevin Ce Kang (Sydney, Australia)",
          "Moath Hamed (Brooklyn, USA)",
          "Jason Massa (Pittsburgh, USA)",
          "Robyn Massa (Pittsburgh, USA)",
          "Karina Nabieva (Toronto, Canada)",
          "Oksana Suchowersky (Edmonton, Canada)",
          "Aakash Shetty (Edmonton, Canada)",
          "Zachary Walls (Sydney Australia)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Ataxia (ATX) team:",
        people: [
          "Malco Rossi, lead ATX (Buenos Aires, Argentina)",
          "Bart van de Warrenburg, lead ATX (Nijmegen, The Netherlands)",
          "Marianthi Breza (Athens, Greece)",
          "Mario Cornejo-Olivas (Lima, Peru)",
          "Natasa Dragasevic (Belgrade, Serbia)",
          "Moath Hamed (Brooklyn, USA)",
          "Jon Rodriguez-Antigudedad Munoz (Donostia, Spain)",
        ],
      },
      {
        title: "Episodic Ataxia (EA) team:",
        people: [
          "Aakash Setty, lead EA (Edmonton, Canada)",
          "Olga Waln, lead EA (Houston, USA)",
          "Rajasumi Rajalingam (Toronto, Canada)",
        ],
      },
    ],
  },
  {
    fullWidth: false,
    sections: [
      {
        title: "Paroxysmal Movement Disorders (PxMD) team:",
        people: [
          "Darius Ebrahimi-Fakhari, lead PxMD (Cincinnati, USA)",
          "Christine Klein (Lübeck, Germany)",
        ],
      },
      {
        title: "Primary Familial Brain Calcification (PFBC) team:",
        people: [
          "Ana Westenberger, lead PBFC (Lübeck, Germany)",
          "Alexander Balck (Lübeck, Germany)",
          "Aloysius Domingo (Boston, USA)",
          "Jason Margolesky (Toronto, Canada)",
          "Susen Schaake (Lübeck, Germany)",
        ],
      },
    ],
  },
  {
    fullWidth: true,
    sections: [
      {
        title: "Mitochondrial disorders (Mt) team:",
        people: [
          "N.N., lead Mt (Lübeck, Germany)",
          "Jannik Prasuhn (Lübeck, Germany)",
        ],
      },
    ],
  },
];

const sab = [
  {
    fullWidth: true,
    sections: [
      {
        people: [
          "Kailash P. Bhatia (London, UK)",
          "Vincenzo Bonifati (Rotterdam, The Netherlands)",
          "Susan B. Bressman (New York, USA)",
          "Matthew J. Farrer (Gainesville, USA)",
          "Marcelo Merello (Buenos Aires, Argentina)",
          "Laurie J. Ozelius (Boston, USA)",
          "Maria-Jesus Sobrido (Barcelona, Spain)",
          "Eng‐King Tan (Singapore)",
        ],
      },
    ],
  },
];
const pastMembers = [
  {
    fullWidth: true,
    sections: [
      {
        people: [
          "Shahad, Almuammar, MD (data extraction)",
          "Lars Bertram, MD (data extraction)",
          "Hauke Baumann (data extraction)",
          "Valerija Dobricic, PhD (data extraction)",
          "Marija Dulovic-Mahlow, MD, PhD (data extraction)",
          "Neele Kuhnke (graphics, programming assistant)",
          "Lisa Hahn (data extraction)",
          "Jennie Hampf, MD (data extraction)",
          "Corinna Hartmann, MD (data extraction)",
          "Alisa Li (coordination)",
          "Christina M. Lill, MD, MSc (coordination)",
          "Juri Linz, MD candidate (data extraction)",
          "Andriy Mashychev, MSc (programmer)",
          "Jason Massa (data extraction)",
          "Luisa Olschewski MD candidate (data extraction)",
          "Jan Poser, MD candidate (data extraction)",
          "Jenny Zhang (coordination)",
          "Ingo Zorn, MSc (programmer)",
          "Florentine Zeldenrust, MSc (data extraction)",
        ],
      },
    ],
  },
];

const AboutUs = () => {
  return (
    <VStack spacing={8} align="stretch" pt={5}>
      <SectionGroup title="Administration" data={administrationData} />

      <SectionGroup
        title="Data abstraction and interpretation teams"
        data={dataAbstractionTeams}
      />

      <SectionGroup title="Scientific Advisory Board (SAB)" data={sab} />

      <SectionGroup title="Past members" data={pastMembers} />
    </VStack>
  );
};

export default AboutUs;
