import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChangeEventHandler, useRef, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useTranslations } from "use-intl";

import { useOfficeFloorFormStore } from "../stores/officeFloorFormStore";
import { DeskFormState } from "../stores/types";

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

  const toast = useToast();
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
      toast({
        title: t("errorTitleUploadingFloorPlan"),
        description: t("errorDescriptionUploadingFloorPlan"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (!res) return;
    const uploadUrl = ((await res.json()) as { url: string }).url;
    if (!uploadUrl) {
      toast({
        title: t("errorTitleUploadingFloorPlan"),
        description: t("errorDescriptionUploadingFloorPlan"),
        status: "error",
        duration: 9000,
        isClosable: true,
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
      toast({
        title: t("errorTitleFileShouldBeImage"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const isImageLarge = validateSize(img);
    if (isImageLarge) {
      const error = t("errorFileMustBeLessOrEqual5MB");
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
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
      <FormControl>
        <FormLabel>{t("labelFloorName")}</FormLabel>
        <Input
          value={name}
          placeholder={"BER-001"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText>
          {t("helperTextFloorNameUniqueIdentifier")}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>{t("labelFloorDescription")}</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <FormHelperText>
          {t("helperTextFloorDescriptionOptional")}
        </FormHelperText>
      </FormControl>
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
                      <Alert status="info" marginBottom={4}>
                        <AlertIcon />
                        {t("alertMarkerModeEnabled")}
                      </Alert>
                    )}
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box>
                        <FormControl
                          display="flex"
                          alignItems="flex-start"
                          flexDirection={"column"}
                        >
                          <FormLabel htmlFor="zoom-controls" mb="0">
                            {t("labelZoomControls")}
                          </FormLabel>
                          <HStack id={"zoom-controls"} paddingTop={1}>
                            <IconButton
                              colorScheme="blue"
                              aria-label="zoom in"
                              icon={<Icon as={FiPlus} />}
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                zoomIn();
                              }}
                            />
                            <IconButton
                              colorScheme="blue"
                              aria-label="zoom out"
                              icon={<Icon as={FiMinus} />}
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                zoomOut();
                              }}
                            />
                            <IconButton
                              colorScheme="blue"
                              aria-label="reset zoom"
                              icon={<Icon as={FiX} />}
                              onClick={() => {
                                setIsAddMarkerMode(false);
                                resetTransform();
                              }}
                            />
                          </HStack>
                        </FormControl>
                      </Box>
                      <Box>
                        <Box>
                          <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="toggle-marker-mode" mb="0">
                              {t("labelToggleMarkerMode")}
                            </FormLabel>
                            <Switch
                              id="toggle-marker-mode"
                              isChecked={isAddMarkerMode}
                              onChange={(e) => {
                                setIsAddMarkerMode(e.target.checked);
                              }}
                            />
                          </FormControl>
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
      <Drawer
        isOpen={!!currentSelectedDesk}
        placement="right"
        onClose={() => {
          setCurrentSelectedDesk(null);
        }}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setCurrentSelectedDesk(null);
            }}
          />
          <DrawerHeader>{t("HeaderDeskEdit")}</DrawerHeader>

          <DrawerBody>
            {t("labelDeskNameWithId", {
              id: currentSelectedDesk?.publicDeskId,
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
