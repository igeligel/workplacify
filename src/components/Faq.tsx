import { Accordion, Box, Heading } from "@chakra-ui/react";

type FaqProps = {
  questionsAndAnswers: {
    question: React.ReactNode;
    questionId: string;
    answer: React.ReactNode;
  }[];
  withoutHeading?: boolean;
};

export const Faq = (props: FaqProps) => {
  return (
    <Box as="section">
      <Box maxW="3xl" mx="auto">
        {!props.withoutHeading && (
          <Heading textAlign="center" size="lg" fontWeight="extrabold" mb={8}>
            Frequently Asked Questions
          </Heading>
        )}
        <Accordion.Root multiple>
          {props.questionsAndAnswers.map((qa, index) => (
            <Accordion.Item key={index} value={qa.questionId}>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  {qa.question}
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>{qa.answer}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Box>
  );
};
