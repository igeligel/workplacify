import {
  Accordion,
  Box,
  Button,
  Center,
  Code,
  Container,
  HStack,
  Heading,
  Spinner,
  Table,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useCopyToClipboard } from "react-use";

import { toaster } from "../../../components/ui/toaster";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const OrganizationSettingsPage = () => {
  const organizationQuery = trpc.organization.get.useQuery();
  const userQuery = trpc.user.get.useQuery();
  const getMembersQuery = trpc.organization.getMembers.useQuery();
  const changeUserRoleMutation = trpc.organization.changeUserRole.useMutation();
  const [, copyToClipboard] = useCopyToClipboard();
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
      <Tabs.Root defaultValue="invitation-settings">
        <Tabs.List>
          <Tabs.Trigger value="invitation-settings">
            Invitation settings
          </Tabs.Trigger>
          <Tabs.Trigger value="manage-users">Manage users</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="invitation-settings">
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            flexDirection={"column"}
          >
            <HStack gap={4}>
              <HStack gap={1}>
                <Text>Invite code:</Text>
                <Text>
                  <Code>{organizationQuery.data?.inviteCode}</Code>
                </Text>
              </HStack>
              <Button
                size={"sm"}
                colorPalette="orange"
                onClick={() => {
                  if (!organizationQuery.data?.inviteCode) return;
                  copyToClipboard(organizationQuery.data?.inviteCode);
                  toaster.create({
                    title: "Invite code copied.",
                    description:
                      "Its in your clipboard. Share it with your colleagues.",
                    type: "success",
                    duration: 5000,
                    closable: true,
                  });
                }}
              >
                Copy to clipboard
              </Button>
            </HStack>
            <Box marginTop={4} width={"100%"} maxW={"container.sm"}>
              <Accordion.Root
                collapsible
                defaultValue={["slack-invitation-template"]}
                multiple
              >
                <Accordion.Item
                  value="slack-invitation-template"
                  key="slack-invitation-template"
                >
                  <Accordion.ItemTrigger>
                    <Heading as="h2" fontSize={"sm"} flex="1" textAlign="left">
                      Slack Invitation Template
                    </Heading>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody paddingBottom={4}>
                      <Text as={"p"}>
                        Hey team! 🚀 Join our workplace on Workplacify for
                        seamless desk booking and collaboration.
                        <br />
                      </Text>
                      <Text as={"p"}>
                        Use invite code: `{organizationQuery.data?.inviteCode}`
                      </Text>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="group-email-invitation-template"
                  key="group-email-invitation-template"
                >
                  <Accordion.ItemTrigger>
                    <Heading as="h2" fontSize={"sm"} flex="1" textAlign="left">
                      Group Email Invitation Template
                    </Heading>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody paddingBottom={4}>
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
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="private-slack-direct-message-template"
                  key="private-slack-direct-message-template"
                >
                  <Accordion.ItemTrigger>
                    <Heading as="h2" fontSize={"sm"} flex="1" textAlign="left">
                      Private Slack Direct Message Template
                    </Heading>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody paddingBottom={4}>
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
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="private-email-to-specific-colleague-template"
                  key="private-email-to-specific-colleague-template"
                >
                  <Accordion.ItemTrigger>
                    <Heading as="h2" fontSize={"sm"} flex="1" textAlign="left">
                      Private Email to Specific Colleague Template
                    </Heading>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody paddingBottom={4}>
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
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
            </Box>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="manage-users">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Role</Table.ColumnHeader>
                <Table.ColumnHeader>
                  Office stats{" "}
                  {new Date(new Date().getFullYear(), 0, 1).getFullYear()}
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                  Office stats{" "}
                  {new Date(new Date().getFullYear() - 1, 0, 1).getFullYear()}
                </Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {getMembersQuery?.data
                ?.sort((a, b) => {
                  return a.id.localeCompare(b.id);
                })
                .map((member) => {
                  const isActionsDisabled = member.id === userQuery.data?.id;
                  return (
                    <Table.Row key={member.id}>
                      <Table.Cell>{member.name}</Table.Cell>
                      <Table.Cell>{member.userRole}</Table.Cell>
                      <Table.Cell>
                        {member.deskSchedulesThisYear.length}
                      </Table.Cell>
                      <Table.Cell>
                        {member.deskSchedulesPreviousYear.length}
                      </Table.Cell>
                      <Table.Cell>
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
                          disabled={isActionsDisabled}
                        >
                          {member.userRole === "ADMIN"
                            ? "Remove Admin"
                            : "Make Admin"}
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>
      </Tabs.Root>
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
