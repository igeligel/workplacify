import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

type PrivacyPolicyProps = {
  companyName: string;
  companyEmail: string;
};

export const PrivacyPolicy = (props: PrivacyPolicyProps) => {
  const { companyName, companyEmail } = props;
  return (
    <>
      <Heading maxWidth="768px" size="2xl" lineHeight="1.3" as={"h1"}>
        {companyName} Privacy Policy
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        This privacy policy will explain how our organization uses the personal
        data we collect from you when you use our website.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Topics:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>What data do we collect?</ListItem>
        <ListItem>How do we collect your data?</ListItem>
        <ListItem>How will we use your data?</ListItem>
        <ListItem>How do we store your data?</ListItem>
        <ListItem>Marketing</ListItem>
        <ListItem>What are your data protection rights?</ListItem>
        <ListItem>What are cookies?</ListItem>
        <ListItem>How do we use cookies?</ListItem>
        <ListItem>What types of cookies do we use?</ListItem>
        <ListItem>How to manage your cookies</ListItem>
        <ListItem>Privacy policies of other websites</ListItem>
        <ListItem>Changes to our privacy policy</ListItem>
        <ListItem>How to contact us</ListItem>
        <ListItem>How to contact the appropriate authorities</ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        What data do we collect?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} collects the following data:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>
          Personal identification information (Name, email address, phone
          number,etc.)
        </ListItem>
        <ListItem>All words entered into the tracking functionality</ListItem>
        <ListItem>Analytics data of Google Analytics</ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How do we collect your data?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        You directly provide {companyName} with most of the data we collect. We
        collect data and process data when you:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>
          Register online or subscribe to any of our products or services.
        </ListItem>
        <ListItem>
          Voluntarily complete a customer survey or provide feedback on any of
          our message boards or via email.
        </ListItem>
        <ListItem>Use or view our website via your browser’s cookies.</ListItem>
        <ListItem>Enter data into the application.</ListItem>
      </UnorderedList>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} may also receive your data indirectly from the following
        sources:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Google Analytics</ListItem>
        <ListItem>Github, through the login</ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How will we use your data?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} collects your data so that we can:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Process your order, manage your account.</ListItem>
        <ListItem>
          Email you with special offers on other products and services we think
          you mightlike.
        </ListItem>
        <ListItem>
          Analyze your tracked work achievements. This just happens throughout
          your account.
        </ListItem>
      </UnorderedList>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you agree, {companyName} will share your data with our partner
        companies so that they may offer you their products and services.
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Stripe - for payments and subscriptions</ListItem>
      </UnorderedList>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        When {companyName} processes your order, it may send your data to, and
        also use the resulting information from, credit reference agencies to
        prevent fraudulent purchases.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How do we store your data?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} securely stores your data at Frankfurt, Germany in a
        database of a droplet hosted by DigitalOcean. The database is fully
        secured with a password and access is just given to the server by the
        SSH keys of the developers.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} will keep your tracked work achievements forever. The user
        can always request to delete to their data.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Marketing
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} would like to send you information about products and
        services of ours that we think you might like, as well as those of our
        partner companies.
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Stripe</ListItem>
      </UnorderedList>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you have agreed to receive marketing, you may always opt out at a
        later date.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        You have the right at any time to stop {companyName} from contacting you
        for marketing purposes or giving your data to other members of the{" "}
        {companyName} Group.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you no longer wish to be contacted for marketing purposes, please
        contact us via email {companyEmail}.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        What are your data protection rights?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} would like to make sure you are fully aware ofall of your
        data protection rights. Every user is entitled to the following:
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to access - You have the right to request {companyName}
        for copies of your personal data. We may charge you a small fee for this
        service.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to rectification - You have the right to request that{" "}
        {companyName} correct any information you believe is inaccurate. You
        also have the right to request {companyName} to complete information you
        believe is incomplete.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to erasure — You have the right to request that
        {companyName} erase your personal data, under certain conditions.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to restrict processing - You have the right to request that
        {companyName} restrict the processing of your personal data, under
        certain conditions.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to object to processing - You have the right to object to
        {companyName}’s processing of your personal data, under certain
        conditions.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The right to data portability - You have the right to request that
        {companyName} transfer the data that we have collected to another
        organization, or directly to you, under certain conditions.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>at our email: {companyEmail}</ListItem>
        <ListItem>
          Or write to us: Kevin Peters, Sprengelstr. 12, 13353 Berlin, Germany
        </ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        What are cookies?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Cookies are text files placed on your computer to collect standard
        Internet log information and visitor behavior information. When you
        visit our websites, we may collect information from you automatically
        through cookiesor similar technology.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        For further information, visit allaboutcookies.org.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How do we use cookies?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} uses cookies in a range of ways to improve your experience
        on our website, including:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Keeping you signed in</ListItem>
        <ListItem>Understanding how you use our website</ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        What types of cookies do we use?
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        There are a numberof different types of cookies, however, our website
        uses:
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>
          Functionality - {companyName} uses these cookies so that we recognize
          you on our website and remember your previously selected preferences.
          These could include what language you prefer and location you are in.
          A mix of first-party and third-party cookies are used.
        </ListItem>
        <ListItem>
          Advertising — {companyName} uses these cookies to collect information
          about your visit to our website, the content you viewed, the links you
          followed and information about your browser, device, and your IP
          address. {companyName} sometimes shares some limited aspects of this
          data with third parties for advertising purposes. We may also share
          online data collected through cookies with our advertising partners.
          This means that when you visit another website, you may be shown
          advertising based on your browsing patterns on our website.
        </ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How to manage cookies
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        You can set your browser not to accept cookies, and the above website
        tells you how to remove cookies from your browser. However, in a few
        cases, some of our website features may not function as a result.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Privacy policies of other websites
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        The {companyName} website contains links to other websites. Our privacy
        policy applies only to our website, so if you click on a link to another
        website, you should read their privacy policy.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Changes to our privacy policy
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} keeps its privacy policy under regular review and places
        any updates on this web page. This privacy policy was last updated on 5
        May 2020.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How to contact us
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you have any questions about {companyName}’s privacypolicy, the data
        we hold on you, or you would like to exercise one of your data
        protection rights, please do not hesitate to contact us.
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Email us at: {companyEmail}</ListItem>
        <ListItem>
          Or write to us at: Kevin Peters, Sprengelstr. 12, 13353 Berlin,
          Germany
        </ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        How to contact the appropriate authority
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Should you wish to report a complaint or if you feel that
        {companyName} has not addressed your concern in a satisfactory manner,
        you may contact the Information Commissioner’s Office.
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>Email: {companyEmail}</ListItem>
        <ListItem>
          Kevin Peters, Sprengelstr. 12, 13353 Berlin, Germany
        </ListItem>
      </UnorderedList>
    </>
  );
};
