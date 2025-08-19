import React from 'react';
import { Text } from '@chakra-ui/react';

type AnchorLinkProps = {
  id: string;
};

export const AnchorLink = (props: AnchorLinkProps) => {
  const { id } = props;
  return <Text as={'span'} id={id} position={'absolute'} top={'-60px'} />;
};
