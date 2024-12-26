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
  useToast,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
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
    if (shouldRenderDesks) {
      console.log("Desks are ready to be rendered");
    }
    if (!isImageLoaded) {
      console.log("Image is not loaded yet");
      return;
    }

    if (!imageRef?.complete) {
      console.log("Image is not complete yet");
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
    console.log({ deskWithPeriod });
    if (!deskWithPeriod.wholeDayFree) {
      return;
    }
    setSelectedDeskWithPeriods(deskWithPeriod);

    setIsBookingDrawerOpen(true);
  };

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
          <DrawerHeader>
            Book{" "}
            {selectedDeskWithPeriods?.desk.name ||
              "Desk #" + selectedDeskWithPeriods?.desk.publicDeskId}
          </DrawerHeader>

          <DrawerBody>Do you want to book it?</DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setIsBookingDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                if (!selectedDeskWithPeriods) {
                  return;
                }
                console.log({ selectedDeskWithPeriods });

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
                    title: "Error while booking a desk",
                    description:
                      "You have booked a desk already in this office for this day.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Book for the day
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
                        Zoom controls
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
                        console.log({ deskObject, day });
                      }
                      if (canCancelReservation) {
                        borderColor = "blue.500";
                      }

                      return (
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
                          transform={`translate(${desk.x / scale}px, ${
                            desk.y / scale
                          }px)`}
                          height={`20px`}
                          width={`20px`}
                          backgroundColor={"white.500"}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeskClick(deskObject);
                          }}
                        >
                          {desk.publicDeskId}
                        </Box>
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
