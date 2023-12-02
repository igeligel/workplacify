import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

type LegalProps = {
  companyName: string;
};

export const Legal = (props: LegalProps) => {
  const { companyName } = props;

  return (
    <>
      <Heading as="h1" fontSize="3xl" marginTop="1rem">
        Impressum von {companyName}
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        This imprint is published in german to comply with the german law.
      </Text>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Angaben gemäß § 5 TMG
      </Text>
      <UnorderedList marginLeft="1em" marginTop="0.6rem">
        <ListItem>
          <Text>Kevin Peters</Text>
          <Text>Sprengelstr. 12</Text>
          <Text>13353 Berlin</Text>
        </ListItem>
        <ListItem>
          <Text>Vertreten durch: </Text>
          <Text>Kevin Peters</Text>
          <Text>Kontakt:</Text>
          <Text>Telefon: -/-</Text>
          <Text>Fax: -/-</Text>
          <Text>E-Mail: kevinigeligeligel@gmail.com</Text>
        </ListItem>
        <ListItem>
          <Text>Umsatzsteuer-ID:</Text>
          <Text>
            Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
            -/-
          </Text>
        </ListItem>
        <ListItem>Wirtschafts-ID: -/-</ListItem>
        <ListItem>Aufsichtsbehörde: -/-</ListItem>
      </UnorderedList>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Haftungsausschluss
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Haftung für Inhalte Die Inhalte unserer Seiten wurden mit größter
        Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
        der Inhalte können wir jedoch keine Gewähr übernehmen. Als
        Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </Text>
      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Haftung für Links
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Urheberrecht
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
      </Text>

      <Heading as="h2" fontSize="3xl" marginTop="1rem">
        Datenschutz
      </Heading>
      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Die Nutzung unserer Webseite ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (beispielsweise Name, Anschrift oder
        eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
        freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
        Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass
        die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
        Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor
        dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen
        der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
        Übersendung von nicht ausdrücklich angeforderter Werbung und
        Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die
        Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
        Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
        Spam-Mails, vor.
      </Text>

      <Text as="p" fontSize="xl" marginTop="0.6rem">
        Website Impressum von {companyName}
      </Text>
    </>
  );
};
