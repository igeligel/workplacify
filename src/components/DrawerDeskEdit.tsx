import {
  Button,
  CloseButton,
  Drawer,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useOfficeFloorDeskFormStore } from "../stores/officeFloorDeskFormStore";
import { trpc } from "../utils/trpc";
import { toaster } from "./ui/toaster";

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
    toaster.create({
      title: "Desk updated",
      type: "success",
      duration: 5000,
      closable: true,
    });
    onCloseDrawer();
  };

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>{t("HeaderDeskEdit")}</Drawer.Header>
          <Drawer.Body>
            <Field.Root>
              <Field.Label>{t("labelDeskName")}</Field.Label>
              <Input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Field.Root>
          </Drawer.Body>

          <Drawer.Footer>
            <Button variant="outline" mr={3} onClick={onCloseDrawer}>
              {t("buttonClose")}
            </Button>
            <Button colorPalette="orange" onClick={onSave}>
              {t("buttonSave")}
            </Button>
          </Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
};
