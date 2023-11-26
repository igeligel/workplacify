import { Container, Heading } from "@chakra-ui/react";

import { MultiDatePicker } from "../../../components/MultiDatePicker";

const SchedulePage = () => {
  return (
    <Container maxW={"container.2xl"}>
      <Heading>Schedule</Heading>
      <MultiDatePicker />
    </Container>
  );
};

export default SchedulePage;
