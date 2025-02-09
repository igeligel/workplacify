import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Code,
  Container,
  HStack,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useCopyToClipboard } from "react-use";

import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const OrganizationSettingsPage = () => {
  const organizationQuery = trpc.organization.get.useQuery();
  const userQuery = trpc.user.get.useQuery();
  const getMembersQuery = trpc.organization.getMembers.useQuery();
  const changeUserRoleMutation = trpc.organization.changeUserRole.useMutation();
  const [, copyToClipboard] = useCopyToClipboard();
  const toast = useToast();
  const utils = trpc.useUtils();

  return (
    <Container maxW={"container.2xl"}>
      <Heading fontSize={"lg"} color={"gray.700"}>
        Organization Settings
      </Heading>
      {organizationQuery.isLoading && (
        <Center flex={1}>
          <Spinner />
        </Center>
      )}
      <Tabs>
        <TabList>
          <Tab>Invitation settings</Tab>
          <Tab>Manage users</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box
              display={"flex"}
              alignItems={"flex-start"}
              flexDirection={"column"}
            >
              <HStack spacing={4}>
                <HStack spacing={1}>
                  <Text>Invite code:</Text>
                  <Text>
                    <Code>{organizationQuery.data?.inviteCode}</Code>
                  </Text>
                </HStack>
                <Button
                  size={"sm"}
                  colorScheme="orange"
                  onClick={() => {
                    if (!organizationQuery.data?.inviteCode) return;
                    copyToClipboard(organizationQuery.data?.inviteCode);
                    toast({
                      title: "Invite code copied.",
                      description:
                        "Its in your clipboard. Share it with your colleagues.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                >
                  Copy to clipboard
                </Button>
              </HStack>
              <Box marginTop={4} width={"100%"} maxW={"container.sm"}>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading
                            as="h2"
                            fontSize={"sm"}
                            flex="1"
                            textAlign="left"
                          >
                            Slack Invitation Template
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text as={"p"}>
                        Hey team! 🚀 Join our workplace on Workplacify for
                        seamless desk booking and collaboration.
                        <br />
                      </Text>
                      <Text as={"p"}>
                        Use invite code: `{organizationQuery.data?.inviteCode}`
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Heading
                          as="h2"
                          fontSize={"sm"}
                          flex="1"
                          textAlign="left"
                        >
                          Group Email Invitation Template
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>
                        Subject: Join us on Workplacify for Efficient Desk
                        Booking
                        <br />
                        Dear Team,
                        <br />
                        <br />
                        We&apos;re excited to invite you to join Workplacify -
                        our new platform for easy desk booking and
                        collaboration. Simply follow the link below and use the
                        provided invite code to get started.
                        <br />
                        <br />
                        Invite code: `{organizationQuery.data?.inviteCode}`
                        <br />
                        <br />
                        Best regards,
                        <br />
                        {userQuery.data?.name
                          ? userQuery.data?.name
                          : "[Your Name]"}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Heading
                          as="h2"
                          fontSize={"sm"}
                          flex="1"
                          textAlign="left"
                        >
                          Private Slack Direct Message Template
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>
                        Hey [Colleague&apos;s Name] 👋,
                        <br />
                        <br />
                        I&apos;ve started using Workplacify for desk bookings
                        and it&apos;s been really helpful. Thought you might
                        find it useful too. Here&apos;s an invite for you:
                        <br />
                        <br />
                        Invite code: `{organizationQuery.data?.inviteCode}`
                        <br />
                        <br />
                        Let me know if you need any help!
                        <br />
                        <br />
                        Best,
                        <br />
                        {userQuery.data?.name
                          ? userQuery.data?.name
                          : "[Your Name]"}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Heading
                          as="h2"
                          fontSize={"sm"}
                          flex="1"
                          textAlign="left"
                        >
                          Private Email to Specific Colleague Template
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>
                        Subject: Exclusive Invitation to Join Workplacify
                        <br />
                        <br />
                        Hi [Colleague&apos;s Name],
                        <br />
                        <br />
                        I&apos;ve recently started using Workplacify for desk
                        bookings and it&apos;s been fantastic. I wanted to
                        extend an exclusive invite to you:
                        <br />
                        <br />
                        Invite code: `{organizationQuery.data?.inviteCode}`
                        <br />
                        <br />
                        Feel free to reach out if you have any questions!
                        <br />
                        <br />
                        Best regards,
                        <br />
                        {userQuery.data?.name
                          ? userQuery.data?.name
                          : "[Your Name]"}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>
                      Office stats{" "}
                      {new Date(new Date().getFullYear(), 0, 1).getFullYear()}
                    </Th>
                    <Th>
                      Office stats{" "}
                      {new Date(
                        new Date().getFullYear() - 1,
                        0,
                        1,
                      ).getFullYear()}
                    </Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getMembersQuery?.data
                    ?.sort((a, b) => {
                      return a.id.localeCompare(b.id);
                    })
                    .map((member) => {
                      const isActionsDisabled =
                        member.id === userQuery.data?.id;
                      return (
                        <Tr key={member.id}>
                          <Td>{member.name}</Td>
                          <Td>{member.userRole}</Td>
                          <Td>{member.deskSchedulesThisYear.length}</Td>
                          <Td>{member.deskSchedulesPreviousYear.length}</Td>
                          <Td>
                            <Button
                              onClick={async () => {
                                await changeUserRoleMutation.mutateAsync({
                                  type:
                                    member.userRole === "ADMIN"
                                      ? "DEMOTE_FROM_ADMIN"
                                      : "PROMOTE_TO_ADMIN",
                                  userId: member.id,
                                });
                                utils.organization.invalidate();
                              }}
                              isDisabled={isActionsDisabled}
                            >
                              {member.userRole === "ADMIN"
                                ? "Remove Admin"
                                : "Make Admin"}
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default OrganizationSettingsPage;
