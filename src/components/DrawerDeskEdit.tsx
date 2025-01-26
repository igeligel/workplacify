import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useOfficeFloorDeskFormStore } from "../stores/officeFloorDeskFormStore";
import { trpc } from "../utils/trpc";

type Desk = Prisma.FloorGetPayload<{
  include: {
    desks: true;
  };
}>["desks"][0];

type DrawerDeskEditProps = {
  onCloseDrawer: () => void;
  selectedDesk: Desk;
};

export const DrawerDeskEdit = (props: DrawerDeskEditProps) => {
  const t = useTranslations("OfficePages");
  const { onCloseDrawer, selectedDesk } = props;
  const router = useRouter();
  const toast = useToast();
  const utils = trpc.useUtils();
  const updateFloorDeskMutation = trpc.floorDesk.updateFloorDesk.useMutation();
  const officeId = router.query.officeId;
  const floorId = router.query.floorId;

  const { id, setId, name, setName } = useOfficeFloorDeskFormStore();

  useEffect(() => {
    if (!selectedDesk) {
      return;
    }
    if (selectedDesk.id === id) {
      return;
    }
    setId(selectedDesk.id);
    setName(selectedDesk.name);
  }, [selectedDesk, setId, id, setName]);

  const onSave = async () => {
    if (typeof officeId !== "string") {
      return;
    }
    if (typeof floorId !== "string") {
      return;
    }
    await updateFloorDeskMutation.mutateAsync({
      officeId: officeId,
      name: name,
      floorId: floorId,
      deskId: id,
    });
    utils.floor.getFloor.invalidate();
    utils.office.invalidate();
    toast({
      title: "Desk updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onCloseDrawer();
  };

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{t("HeaderDeskEdit")}</DrawerHeader>

      <DrawerBody>
        <FormControl>
          <FormLabel>{t("labelDeskName")}</FormLabel>
          <Input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </FormControl>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onCloseDrawer}>
          {t("buttonClose")}
        </Button>
        <Button colorScheme="orange" onClick={onSave}>
          {t("buttonSave")}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};
