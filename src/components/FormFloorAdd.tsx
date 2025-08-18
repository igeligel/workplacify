import {
  Alert,
  Box,
  Button,
  CloseButton,
  Drawer,
  Field,
  HStack,
  Icon,
  IconButton,
  Input,
  Portal,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEventHandler, useRef, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useTranslations } from "use-intl";

import { useOfficeFloorFormStore } from "../stores/officeFloorFormStore";
import { DeskFormState } from "../stores/types";
import { toaster } from "./ui/toaster";

const getExtension = (filename: string) => {
  const parts = filename.split(".");
  return parts[parts.length - 1];
};

const isImage = (filename: string): boolean => {
  const ext = getExtension(filename);
  if (!ext) return false;
  switch (ext.toLowerCase()) {
    case "jpg":
    case "gif":
    case "bmp":
    case "png":
    case "jpeg":
      return true;
  }
  return false;
};

const validateSize = (file: File | undefined) => {
  if (!file) return;
  if (file.size > 5000000) {
    return true;
  } else {
    return false;
  }
};

// const mockedImageScale = 1.2459935897435896;
// const mockedDesks: Desk[] = [
//   {
//     x: 117.5 * mockedImageScale,
//     y: 95 * mockedImageScale,
//     width: 5,
//     height: 5,
//     id: "1",
//   },
// ];
// const mockedDesks: Desk[] = [];

export const FormFloorAdd = () => {
  const t = useTranslations("OfficePages");
  const [isAddMarkerMode, setIsAddMarkerMode] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  // const [desks, setDesks] = useState<Desk[]>(mockedDesks);
  const {
    desks,
    setDesks,
    imageUrl,
    setImageUrl,
    name,
    setName,
    description,
    setDescription,
  } = useOfficeFloorFormStore();

  const [image, setImage] = useState<null | File>(null);
  const [scale, setScale] = useState<number>(1);
  const [currentSelectedDesk, setCurrentSelectedDesk] =
    useState<null | DeskFormState>(null);

  const onUploadTrigger = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    let res = null;
    try {
      res = await fetch("/api/upload-floor", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      toaster.create({
        title: t("errorTitleUploadingFloorPlan"),
        description: t("errorDescriptionUploadingFloorPlan"),
        type: "error",
        duration: 9000,
        closable: true,
      });
    }
    if (!res) return;
    const uploadUrl = ((await res.json()) as { url: string }).url;
    if (!uploadUrl) {
      toaster.create({
        title: t("errorTitleUploadingFloorPlan"),
        description: t("errorDescriptionUploadingFloorPlan"),
        type: "error",
        duration: 9000,
        closable: true,
      });
      return;
    }

    setImageUrl(uploadUrl);
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      toaster.create({
        title: t("errorTitleFileShouldBeImage"),
        type: "error",
        duration: 9000,
        closable: true,
      });
      return;
    }
    const isImageLarge = validateSize(img);
    if (isImageLarge) {
      const error = t("errorFileMustBeLessOrEqual5MB");
      toaster.create({
        title: error,
        type: "error",
        duration: 9000,
        closable: true,
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      if (!reader.result) {
        return;
      }
      setImage(img);
    });
  };

  return (
    <>
      <Field.Root>
        <Field.Label>{t("labelFloorName")}</Field.Label>
        <Input
          value={name}
          placeholder={"BER-001"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Field.HelperText>
          {t("helperTextFloorNameUniqueIdentifier")}
        </Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("labelFloorDescription")}</Field.Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <Field.HelperText>
          {t("helperTextFloorDescriptionOptional")}
        </Field.HelperText>
      </Field.Root>
      {!imageUrl && (
        <>
          <Box>
            <input type="file" onChange={handleImageChange} className="block" />
          </Box>
          <Button onClick={onUploadTrigger}>
            {t("buttonUploadFloorPlan")}
          </Button>
        </>
      )}
      {imageUrl && (
        <Box>
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            disabled={isAddMarkerMode}
            onTransformed={(props) => {
              setScale(props.state.scale);
            }}
          >
            {(props) => {
              const { zoomIn, zoomOut, resetTransform } = props;

              return (
                <>
                  <Box display={"flex"} flexDirection={"column"}>
                    {isAddMarkerMode && (
                      <Alert.Root
                        status="info"
                        title={t("alertMarkerModeEnabled")}
                      >
                        <Alert.Indicator />
                        <Alert.Title>{t("alertMarkerModeEnabled")}</Alert.Title>
                      </Alert.Root>
                    )}
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box>
                        <Field.Root
                          display="flex"
                          alignItems="flex-start"
                          flexDirection={"column"}
                        >
                          <Field.Label htmlFor="zoom-controls" mb="0">
                            {t("labelZoomControls")}
                          </Field.Label>
                          <HStack id={"zoom-controls"} paddingTop={1}>
                            <IconButton
                              colorPalette="blue"
                              aria-label="zoom in"
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                zoomIn();
                              }}
                            >
                              <Icon as={FiPlus} />
                            </IconButton>
                            <IconButton
                              colorPalette="blue"
                              aria-label="zoom out"
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                zoomOut();
                              }}
                            >
                              <Icon as={FiMinus} />
                            </IconButton>
                            <IconButton
                              colorPalette="blue"
                              aria-label="reset zoom"
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                resetTransform();
                              }}
                            >
                              <Icon as={FiX} />
                            </IconButton>
                          </HStack>
                        </Field.Root>
                      </Box>
                      <Box>
                        <Box>
                          <Field.Root display="flex" alignItems="center">
                            <Switch.Root
                              id="toggle-marker-mode"
                              checked={isAddMarkerMode}
                              onCheckedChange={(details) => {
                                setIsAddMarkerMode(details.checked);
                              }}
                            >
                              <Switch.HiddenInput />
                              <Switch.Control />
                              <Switch.Label>
                                {t("labelToggleMarkerMode")}
                              </Switch.Label>
                            </Switch.Root>
                          </Field.Root>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <TransformComponent>
                    <Box
                      position={"relative"}
                      onClick={(e) => {
                        if (!isAddMarkerMode) return;
                        const target = e.target as HTMLElement;
                        const rect = target.getBoundingClientRect();
                        const x = e.clientX - rect.left; //x position within the element.
                        const y = e.clientY - rect.top; //y position within the element.
                        if (!imageRef?.current) return;

                        const imageScale =
                          imageRef.current.naturalWidth /
                          imageRef.current.width;
                        const maximumNumber = desks
                          .map((desk) => Number(desk.publicDeskId))
                          .sort((a, b) => {
                            return b - a;
                          })[0];
                        const newId = maximumNumber ? maximumNumber + 1 : 1;
                        const offsetOfMarker = 10 * imageScale;
                        setDesks([
                          ...desks,
                          {
                            x: (x * imageScale) / scale - offsetOfMarker,
                            y: (y * imageScale) / scale - offsetOfMarker,
                            publicDeskId: newId.toString(),
                          },
                        ]);
                      }}
                    >
                      {imageRef.current &&
                        desks.map((desk) => {
                          if (!imageRef.current) return;
                          const scale =
                            imageRef.current.naturalWidth /
                            imageRef.current.width;
                          return (
                            <Box
                              key={desk.publicDeskId}
                              position={"absolute"}
                              borderRadius={"100%"}
                              display={"flex"}
                              borderWidth={
                                currentSelectedDesk?.publicDeskId ===
                                desk.publicDeskId
                                  ? 2
                                  : 0
                              }
                              borderColor={
                                currentSelectedDesk?.publicDeskId ===
                                desk.publicDeskId
                                  ? "blue.500"
                                  : "transparent"
                              }
                              justifyContent={"center"}
                              alignItems={"center"}
                              transform={`translate(${desk.x / scale}px, ${
                                desk.y / scale
                              }px)`}
                              height={`20px`}
                              width={`20px`}
                              backgroundColor={"red.500"}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isAddMarkerMode) return;
                                const deskClickedOn = desks.find(
                                  (e) => e.publicDeskId === desk.publicDeskId,
                                );
                                if (!deskClickedOn) return;
                                if (
                                  deskClickedOn.publicDeskId ===
                                  currentSelectedDesk?.publicDeskId
                                ) {
                                  setCurrentSelectedDesk(null);
                                  return;
                                }

                                setCurrentSelectedDesk(deskClickedOn);
                              }}
                            >
                              {desk.publicDeskId}
                            </Box>
                          );
                        })}
                      <img ref={imageRef} src={imageUrl} alt="test" />
                    </Box>
                  </TransformComponent>
                </>
              );
            }}
          </TransformWrapper>
        </Box>
      )}
      <Drawer.Root
        open={!!currentSelectedDesk}
        placement="end"
        onOpenChange={(details) => {
          if (!details.open) {
            setCurrentSelectedDesk(null);
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>{t("HeaderDeskEdit")}</Drawer.Header>

              <Drawer.Body>
                {t("labelDeskNameWithId", {
                  id: currentSelectedDesk?.publicDeskId,
                })}
              </Drawer.Body>

              <Drawer.Footer>
                <Button
                  colorPalette="red"
                  mr={3}
                  onClick={() => {
                    if (!currentSelectedDesk) return;
                    const filteredDesks = desks.filter(
                      (desk) =>
                        desk.publicDeskId !== currentSelectedDesk.publicDeskId,
                    );
                    setDesks(filteredDesks);
                    setCurrentSelectedDesk(null);
                  }}
                >
                  {t("buttonRemoveDesk")}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  onClick={() => {
                    setCurrentSelectedDesk(null);
                  }}
                />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
