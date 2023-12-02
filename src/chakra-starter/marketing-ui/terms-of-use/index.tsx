import { Divider, Heading, Text } from "@chakra-ui/react";

type TermsOfUseProps = {
  companyName: string;
  companyEmail: string;
};

export const TermsOfUse = (props: TermsOfUseProps) => {
  const { companyName, companyEmail } = props;

  return (
    <>
      <Heading as="h1" fontSize="4xl" marginTop="1rem">
        Terms of Use
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Version 1.0 of this agreement was created on May 22, 2022
      </Text>
      <Divider marginTop="0.6rem" />
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        When using the {companyName} service (here in after “Service”), you
        agree to the following Terms of Use.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        If you are entering into this agreement on behalf of a company or
        another legal entity, you affirm that you have the authority to bind
        such entity, its affiliates and all users who access the Service through
        your account to these Terms of Use. In this case &quot;you&quot; or
        &quot;your&quot; shall refer to such entity, its affiliates and all
        users associated with it.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        {companyName} reserves the right to change the following Terms of Use at
        all times with or without notice. The latest version of the Terms of Use
        can be found at: https://
        {companyName}.com/terms-of-use.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        1. General
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. These conditions apply to all contracts between {companyName}
        and you concerning the Service, unless otherwise agreed in writing.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. The applicability of any general Terms of Use invoked by you is
        explicitly rejected, unless explicitly confirmed in writing by
        {companyName}.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. Failure to comply with these Terms of Use will result in immediate
        termination of your account.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        2. Account conditions
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. Any user of the Service must be a human; users registered by
        &quot;robots&quot; or other automated methods are not permitted.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. You must provide your legal full name, a valid email address, and any
        other information requested in order to complete the signup process.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. Your login details are strictly personal and may not be shared with
        other people.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        d. You are always solely responsible for maintaining the confidentiality
        of your login information, {companyName} can not be held liable.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        e. You are responsible for all activities and content that is placed
        under your account (also for users that are created under your account).
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        f. You may not use the Service for any illegal or unauthorized purpose.
        You must not, in the use of the Service, violate any laws in your
        jurisdiction.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        3. Payment terms
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. Payment is made in advance per calendar month or year by bank
        transfer or credit card and are non-refundable.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. All prices are exclusive of the current rate of VAT, if applicable.
        The VAT charged can differ on the VAT rate of the country the customer
        is located in.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. If payment is behind your account will be temporarily suspended. You
        will receive instructions by email on how to meet payment and when your
        account will be re-activated. d. In case of late payment, you, in
        addition to the amount owed, are responsible for complete compensation
        of both judicial and extrajudicial collection costs, including costs for
        lawyers, bailiffs and collection agencies.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        4. Termination
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. You are solely responsible for properly canceling your account, which
        you can do in the “Account” section of the Service only. Any other form
        of cancellation is not accepted and therefore not processed.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. If you cancel your account before the end of your current paid up
        month or year, your cancellation will take effect at the end of that
        period and you will not be charged again.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. All of your content will be immediately deleted from the Service upon
        cancellation. This information can not be recovered once your account is
        cancelled.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        d. You are at all times responsible for any legal obligation to keep
        your invoices, even after canceling your account.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        5. Modifications to the Service and Prices
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. {companyName} reserves the right at any time and from time to time to
        modify or discontinue, temporarily or permanently, the Service (or any
        part thereof) with or without notice.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. {companyName} reserves the right to change prices for the use of the
        Service. These price changes will be announced at least one (1) calendar
        month in advance on https://
        {companyName}.com.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        6. Licenses and ownership of content
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. All software that is supplied to you in connection with the Service
        is provided subject to the terms of a separate end-user license
        agreement that accompanies that software. You agree to abide by the
        terms of the end-user license agreement in your use of this software.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. {companyName} will never claim ownership over your content and/or
        materials posted to your account. In other words, your data is and
        remains your property.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        7. Liability
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. Your use of the Service is at your sole risk. {companyName}
        shall not be liable for any direct or indirect damages including but not
        limited to, consequential damages, lost profits, lost savings and damage
        due to business stagnation.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. You shall indemnify {companyName} against all claims for damages
        which third parties may claim in respect of damage caused by the use of
        the services or products supplied by {companyName}.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        8. Applicable law and disputes
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. This agreement is governed by German law.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. If any part of this Agreement is void, or declarable as such, for any
        reason, including due to rules of compulsory law, the remaining
        paragraphs of this agreement will remain in effect between
        {companyName}and you.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. Unless rules of compulsory law state otherwise, the court of
        Amsterdam has exclusive jurisdiction in any disputes between Parties
        arising from this Agreement.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        9. Other conditions
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        a. {companyName} strives to achieve the highest possible uptime. In the
        case of force majeure, {companyName} shall not be liable.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        b. {companyName} uses third party vendors and hosting partners to
        provide the necessary hardware, software, networking, storage, and
        related technology required to run the Service.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        c. You will not modify, adapt or hack the Service or modify another
        website so as to falsely imply that it is associated with the Service.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        d. You may not duplicate, copy, or reuse any portion of the HTML, CSS,
        JavaScript, or visual design elements or concepts of the Service without
        express written permission from {companyName}.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        e. You must not transmit any worms or viruses or any code of a
        destructive nature.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        f. {companyName} strives to achieve, but does not warrant, that: 1) The
        Service will meet your requirements, 2) the Service will be
        uninterrupted, timely, secure, and error-free.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        g. You are responsible for not submitting sensitive data to the Service,
        including but not limited to credit card information, medical files or
        anything deemed confidential.
      </Text>
      <Divider />
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Questions about the Terms of Use may be directed to the email address
        {": "}
        {companyEmail}.
      </Text>
    </>
  );
};
