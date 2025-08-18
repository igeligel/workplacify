import { Accordion, Box, Heading } from "@chakra-ui/react";

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
        {/* <Accordion.Root collapsible defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>
            <Span flex="1">{item.title}</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root> */}
        <Accordion.Root multiple>
          {props.questionsAndAnswers.map((qa, index) => (
            <Accordion.Item key={index} value={qa.question}>
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
