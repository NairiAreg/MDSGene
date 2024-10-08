import { Box, Center } from "@chakra-ui/react";
import React from "react";
import {
  MagnifyingGlass,
  DNA,
  Bars,
  RotatingLines,
  Oval,
} from "react-loader-spinner";

const CustomSpinner = ({
  type = "Oval",
  color = "#00BFFF",
  size = 80,
  ...rest
}) => {
  const spinnerProps = { color, width: size, height: size };

  const spinnerMap = {
    MG: MagnifyingGlass,
    DNA: DNA,
    Bars: Bars,
    RotatingLines: RotatingLines,
    Oval: Oval,
  };

  const SpinnerComponent = spinnerMap[type] || Oval;

  return (
    <Center width="100%" height="100%" {...rest}>
      <SpinnerComponent {...spinnerProps} />
    </Center>
  );
};

export default CustomSpinner;
