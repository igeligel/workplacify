import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";

type FaqProps = {
  questionsAndAnswers: {
    question: string;
    answer: string;
  }[];
};

export const Faq = (props: FaqProps) => {
  return (
    <Box as="section">
      <Box maxW="3xl" mx="auto">
        <Heading textAlign="center" size="lg" fontWeight="extrabold" mb={8}>
          Frequently Asked Questions
        </Heading>
        <Accordion allowMultiple>
          {props.questionsAndAnswers.map((qa, index) => (
            <AccordionItem key={index}>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  {qa.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>{qa.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};
