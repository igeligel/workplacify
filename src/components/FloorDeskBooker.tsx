import {
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
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { formatISO } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import {
  DeskWithPeriods,
  FreeDesksWithTime,
} from "../server/scheduling/getFreeDesksPerDay";
import { trpc } from "../utils/trpc";

type Floor = Prisma.FloorGetPayload<undefined>;

type FloorDeskBookerProps = {
  floor: Floor;
  deskSchedulesMapped: FreeDesksWithTime;
  userId: string;
  day: Date;
};

export const FloorDeskBooker = (props: FloorDeskBookerProps) => {
  const t = useTranslations("SchedulePages");
  const { floor, deskSchedulesMapped, userId, day } = props;
  const [selectedDeskWithPeriods, setSelectedDeskWithPeriods] =
    useState<DeskWithPeriods | null>(null);
  const bookDeskMutation = trpc.schedule.bookDeskForDay.useMutation({});
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const utils = trpc.useUtils();
  const toast = useToast();
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] =
    useState<boolean>(false);
  // const
  const [renderInitialDesks, setRenderInitialDesks] = useState<boolean>(false);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const formattedDate = formatISO(day, { representation: "date" });

  const [scale, setScale] = useState<number>(1);

  const desksForFloor = Object.values(deskSchedulesMapped).filter((e) => {
    return e.desk.floor.id === floor.id;
  });

  useEffect(() => {
    if (!floor.floorPlan) {
      return;
    }
    const shouldRenderDesks = imageRef && desksForFloor.length > 0;
    if (!shouldRenderDesks) {
      return;
    }
    if (!isImageLoaded) {
      return;
    }

    if (!imageRef?.complete) {
      return;
    }
    setTimeout(() => {
      setRenderInitialDesks(true);
    }, 500);
  }, [imageRef, desksForFloor, floor, scale, isImageLoaded]);

  if (!floor.floorPlan) {
    return null;
  }

  if (!desksForFloor) {
    return null;
  }

  if (!scale) {
    return;
  }

  const onDeskClick = (deskWithPeriod: DeskWithPeriods) => {
    if (!deskWithPeriod.wholeDayFree) {
      return;
    }
    setSelectedDeskWithPeriods(deskWithPeriod);

    setIsBookingDrawerOpen(true);
  };

  const deskName =
    selectedDeskWithPeriods?.desk.name ||
    t("deskName", {
      deskId: selectedDeskWithPeriods?.desk.publicDeskId,
    });

  return (
    <Box>
      <Drawer
        isOpen={isBookingDrawerOpen}
        placement="right"
        onClose={() => {
          setIsBookingDrawerOpen(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{t("bookDeskWithName", { deskName })}</DrawerHeader>

          <DrawerBody>{t("doYouWantToBookIt")}</DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setIsBookingDrawerOpen(false);
              }}
            >
              {t("close")}
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                if (!selectedDeskWithPeriods) {
                  return;
                }

                try {
                  await bookDeskMutation.mutateAsync({
                    deskId: selectedDeskWithPeriods.desk.id,
                    day: formattedDate,
                  });
                  utils.schedule.getDeskSchedulesForDay.invalidate();
                  setSelectedDeskWithPeriods(null);
                  setIsBookingDrawerOpen(false);
                } catch (e) {
                  toast({
                    title: t("errorTitleWhileBooking"),
                    description: t("errorDescriptionWhileBooking"),
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              {t("bookDeskForDay")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        onTransformed={(props) => {
          setScale(props.state.scale);
        }}
      >
        {(props) => {
          const { zoomIn, zoomOut, resetTransform } = props;

          return (
            <>
              <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <FormControl
                      display="flex"
                      alignItems="flex-start"
                      flexDirection={"column"}
                    >
                      <FormLabel htmlFor="zoom-controls" mb="0">
                        {t("zoomControls")}
                      </FormLabel>
                      <HStack id={"zoom-controls"} paddingTop={1}>
                        <IconButton
                          colorScheme="blue"
                          aria-label="zoom in"
                          icon={<Icon as={FiPlus} />}
                          onClick={() => {
                            zoomIn();
                          }}
                        />
                        <IconButton
                          colorScheme="blue"
                          aria-label="zoom out"
                          icon={<Icon as={FiMinus} />}
                          onClick={() => {
                            zoomOut();
                          }}
                        />
                        <IconButton
                          colorScheme="blue"
                          aria-label="reset zoom"
                          icon={<Icon as={FiX} />}
                          onClick={() => {
                            resetTransform();
                          }}
                        />
                      </HStack>
                    </FormControl>
                  </Box>
                </Box>
              </Box>

              <TransformComponent>
                <Box position={"relative"}>
                  {renderInitialDesks &&
                    imageRef &&
                    desksForFloor.map((deskObject) => {
                      const scale = imageRef.naturalWidth / imageRef.width;
                      const desk = deskObject.desk;

                      const canCancelReservation = deskObject.usedPeriods.some(
                        (period) => {
                          const isWithinSameDay =
                            period.start <= day && period.end >= day;

                          return isWithinSameDay && period.id === userId;
                        },
                      );

                      let borderColor = "green.500";
                      if (!deskObject.wholeDayFree) {
                        borderColor = "red.500";
                      }
                      if (canCancelReservation) {
                        borderColor = "blue.500";
                      }

                      const names = deskObject.usedPeriods
                        .map((period) => period.name)
                        .filter(Boolean);

                      const mappedNames = names
                        .map((fullName) => {
                          if (!fullName) {
                            return "";
                          }
                          const nameParts = fullName.split(" ");
                          let nameRepresentation = "";

                          // Get first the last namePart
                          const lastNamePart = nameParts[nameParts.length - 1];

                          // Get all others
                          const otherNameParts = nameParts.slice(
                            0,
                            nameParts.length - 1,
                          );

                          nameRepresentation += lastNamePart?.slice(0, 2);
                          nameRepresentation += otherNameParts
                            .map((part) => part.slice(0, 1))
                            .join("");
                          return nameRepresentation;
                        })
                        .join(";");

                      const transform = `translate(calc(${desk.x / scale}px - 2px), calc(${
                        desk.y / scale
                      }px - 2px))`;

                      const transformForMapped = `translate(calc(${desk.x / scale}px - 14px), calc(${
                        desk.y / scale
                      }px - 14px))`;

                      type WrapperProps = {
                        children: React.ReactNode;
                      };
                      const Wrapper = (props: WrapperProps) => {
                        if (!mappedNames) {
                          return <>{props.children}</>;
                        }
                        return (
                          <Tooltip label={names.join("; ")}>
                            {props.children}
                          </Tooltip>
                        );
                      };

                      return (
                        <Wrapper key={desk.publicDeskId}>
                          <Box
                            cursor={
                              deskObject.wholeDayFree ? "pointer" : "default"
                            }
                            key={desk.publicDeskId}
                            position={"absolute"}
                            borderRadius={"100%"}
                            display={"flex"}
                            borderWidth={3}
                            borderColor={borderColor}
                            justifyContent={"center"}
                            alignItems={"center"}
                            transform={
                              mappedNames ? transformForMapped : transform
                            }
                            height={mappedNames ? `40px` : `20px`}
                            width={mappedNames ? `40px` : `20px`}
                            backgroundColor={
                              deskObject.wholeDayFree ? "green.50" : "red.50"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeskClick(deskObject);
                            }}
                            fontWeight={mappedNames ? "bold" : "normal"}
                          >
                            {mappedNames || desk.publicDeskId}
                          </Box>
                        </Wrapper>
                      );
                    })}
                  {floor.floorPlan && (
                    <img
                      ref={(newRef) => {
                        if (newRef) {
                          setImageRef(newRef);
                        }
                      }}
                      onLoad={() => {
                        setIsImageLoaded(true);
                      }}
                      src={floor.floorPlan}
                      alt="test"
                    />
                  )}
                </Box>
              </TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
    </Box>
  );
};
