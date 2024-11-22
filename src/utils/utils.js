/* eslint-disable eqeqeq */
export const searchCountriesByAbbr = (searchTerm) => {
  const upperSearchTerm = searchTerm.toUpperCase();
  return Object.keys(countries)
    .filter((abbr) => abbr.startsWith(upperSearchTerm))
    .map((abbr) => countries[abbr]);
};

export const countries = {
  AFG: "Afghanistan",
  ALB: "Albania",
  DZA: "Algeria",
  AND: "Andorra",
  AGO: "Angola",
  ATG: "Antigua and Barbuda",
  ARG: "Argentina",
  ARM: "Armenia",
  AUS: "Australia",
  AUT: "Austria",
  AZE: "Azerbaijan",
  BHS: "Bahamas",
  BHR: "Bahrain",
  BGD: "Bangladesh",
  BRB: "Barbados",
  BLR: "Belarus",
  BEL: "Belgium",
  BLZ: "Belize",
  BEN: "Benin",
  BTN: "Bhutan",
  BOL: "Bolivia",
  BIH: "Bosnia and Herzegovina",
  BWA: "Botswana",
  BRA: "Brazil",
  BRN: "Brunei",
  BGR: "Bulgaria",
  BFA: "Burkina Faso",
  BDI: "Burundi",
  CPV: "Cabo Verde",
  KHM: "Cambodia",
  CMR: "Cameroon",
  CAN: "Canada",
  CAF: "Central African Republic",
  TCD: "Chad",
  CHL: "Chile",
  CHN: "China",
  COL: "Colombia",
  COM: "Comoros",
  COG: "Congo",
  CRI: "Costa Rica",
  HRV: "Croatia",
  CUB: "Cuba",
  CYP: "Cyprus",
  CZE: "Czech Republic",
  DNK: "Denmark",
  DJI: "Djibouti",
  DMA: "Dominica",
  DOM: "Dominican Republic",
  ECU: "Ecuador",
  EGY: "Egypt",
  SLV: "El Salvador",
  GNQ: "Equatorial Guinea",
  ERI: "Eritrea",
  EST: "Estonia",
  SWZ: "Eswatini",
  ETH: "Ethiopia",
  FJI: "Fiji",
  FIN: "Finland",
  FRA: "France",
  GAB: "Gabon",
  GMB: "Gambia",
  GEO: "Georgia",
  DEU: "Germany",
  GHA: "Ghana",
  GRC: "Greece",
  GRD: "Grenada",
  GTM: "Guatemala",
  GIN: "Guinea",
  GNB: "Guinea-Bissau",
  GUY: "Guyana",
  HTI: "Haiti",
  HND: "Honduras",
  HUN: "Hungary",
  ISL: "Iceland",
  IND: "India",
  IDN: "Indonesia",
  IRN: "Iran",
  IRQ: "Iraq",
  IRL: "Ireland",
  ISR: "Israel",
  ITA: "Italy",
  JAM: "Jamaica",
  JPN: "Japan",
  JOR: "Jordan",
  KAZ: "Kazakhstan",
  KEN: "Kenya",
  KIR: "Kiribati",
  KWT: "Kuwait",
  KGZ: "Kyrgyzstan",
  LAO: "Laos",
  LVA: "Latvia",
  LBN: "Lebanon",
  LSO: "Lesotho",
  LBR: "Liberia",
  LBY: "Libya",
  LIE: "Liechtenstein",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  MDG: "Madagascar",
  MWI: "Malawi",
  MYS: "Malaysia",
  MDV: "Maldives",
  MLI: "Mali",
  MLT: "Malta",
  MHL: "Marshall Islands",
  MRT: "Mauritania",
  MUS: "Mauritius",
  MEX: "Mexico",
  FSM: "Micronesia",
  MDA: "Moldova",
  MCO: "Monaco",
  MNG: "Mongolia",
  MNE: "Montenegro",
  MAR: "Morocco",
  MOZ: "Mozambique",
  MMR: "Myanmar",
  NAM: "Namibia",
  NRU: "Nauru",
  NPL: "Nepal",
  NLD: "Netherlands",
  NZL: "New Zealand",
  NIC: "Nicaragua",
  NER: "Niger",
  NGA: "Nigeria",
  PRK: "North Korea",
  MKD: "North Macedonia",
  NOR: "Norway",
  OMN: "Oman",
  PAK: "Pakistan",
  PLW: "Palau",
  PAN: "Panama",
  PNG: "Papua New Guinea",
  PRY: "Paraguay",
  PER: "Peru",
  PHL: "Philippines",
  POL: "Poland",
  PRT: "Portugal",
  QAT: "Qatar",
  KOR: "South Korea",
  SAU: "Saudi Arabia",
  SEN: "Senegal",
  SRB: "Serbia",
  SYC: "Seychelles",
  SLE: "Sierra Leone",
  SGP: "Singapore",
  SVK: "Slovakia",
  SVN: "Slovenia",
  SLB: "Solomon Islands",
  SOM: "Somalia",
  ZAF: "South Africa",
  ESP: "Spain",
  LKA: "Sri Lanka",
  SDN: "Sudan",
  SUR: "Suriname",
  SWE: "Sweden",
  CHE: "Switzerland",
  SYR: "Syria",
  TWN: "Taiwan",
  TJK: "Tajikistan",
  TZA: "Tanzania",
  THA: "Thailand",
  TLS: "Timor-Leste",
  TGO: "Togo",
  TON: "Tonga",
  TTO: "Trinidad and Tobago",
  TUN: "Tunisia",
  TUR: "Turkey",
  TKM: "Turkmenistan",
  TUV: "Tuvalu",
  UGA: "Uganda",
  UKR: "Ukraine",
  ARE: "United Arab Emirates",
  GBR: "United Kingdom",
  USA: "United States",
  URY: "Uruguay",
  UZB: "Uzbekistan",
  VUT: "Vanuatu",
  VAT: "Vatican City",
  VEN: "Venezuela",
  VNM: "Vietnam",
  YEM: "Yemen",
  ZMB: "Zambia",
  ZWE: "Zimbabwe",
};

export const filterOptions = [
  "all included patients",
  "index patients only",
  "AAO < 50 (adjustable)",
  "AAO >= 50 (adjustable)",
  "females only",
  "males only",
  "homozygous only",
  "heterozygous only",
  "compound heterozygous only",
  "homozygous and compound heterozygous",
];

export const formatMutations = (mutations) => {
  const formattedMutations = [];
  for (let i = 1; i <= 3; i++) {
    ["c", "g", "p"].forEach((lt) => {
      if (mutations[`mut${i}_${lt}`] !== -99) {
        formattedMutations.push(
          `${mutations[`mut${i}_${lt}`]} (${mutations[`mut${i}_genotype`]})`
        );
      }
    });
  }
  return formattedMutations.length > 0 ? formattedMutations : ["N/A"];
};

export const mapperForGeneDiseaseAbbr = (str) => {
  const mapper = {
    "DBA-GBA": "PARK-GBA1: Dementia with Lewy bodies",
    "PD-GBA": "PARK-GBA1",
    "OTHER_GBA-GBA":
      "PARK-GBA1: Frontotemporal dementia + Posterior cortical atrophy",
    "PKS-GBA": "PARK-GBA1: Parkinsonism (unspecified type)",
    "GD_CBS-GBA": "PARK-GBA1: Gaucher disease + Corticobasal syndrome",
    "GD_DLB-GBA": "PARK-GBA1: Gaucher disease +  Dementia with Lewy bodies",
    "AD-GBA": "PARK-GBA1: Alzheimer's disease",
    "GD_PD_GBA-GBA": "PARK-GBA1: Gaucher disease + Parkinson’s disease",
    "DLB_AD_GBA-GBA":
      "PARK-GBA1: Dementia with Lewy bodies + Alzheimer's disease",
    "CBD-GBA": "PARK-GBA1: Corticobasal syndrome  ",
    "GBA_PSP-GBA": "PARK-GBA1: Progressive supranuclear palsy",
    "MSA-GBA": "PARK-GBA1: Multiple system atrophy",
  };

  return mapper?.[str.toUpperCase()] || str;
};
