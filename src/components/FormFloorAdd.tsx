import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { ChangeEventHandler, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useTransformEffect,
} from "react-zoom-pan-pinch";

import { useOfficeFloorFormStore } from "../stores/officeFloorFormStore";

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

type Desk = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
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
const mockedDesks: Desk[] = [];

export const FormFloorAdd = () => {
  const [isAddMarkerMode, setIsAddMarkerMode] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [desks, setDesks] = useState<Desk[]>(mockedDesks);
  const toast = useToast();
  const [image, setImage] = useState<null | File>(null);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const name = useOfficeFloorFormStore((state) => state.name);
  const setName = useOfficeFloorFormStore((state) => state.setName);
  const description = useOfficeFloorFormStore((state) => state.description);
  const setDescription = useOfficeFloorFormStore(
    (state) => state.setDescription,
  );

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

      console.log({ res });
    } catch (error) {
      toast({
        title: "Error uploading floor plan",
        description: "Please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (!res) return;
    const uploadUrl = ((await res.json()) as { url: string }).url;
    if (!uploadUrl) {
      toast({
        title: "Error uploading floor plan",
        description: "Please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setImageUrl(uploadUrl);

    // const options = {
    //   cloudName: "dpfc44mfl",
    //   apiKey: "645792244653174",
    //   uploadSignatureTimestamp: cloudinarySignatureQuery.data.timestamp,
    //   uploadSignature: cloudinarySignatureQuery.data.signature,
    //   cropping: false,
    //   folder: "signed_upload_floor_plans_uw",
    // };
    // options
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
      const error = "File type should be a image";
      alert(error);
      return;
    }
    const isImageLarge = validateSize(img);
    if (isImageLarge) {
      const error = "File must be less or equal to 5MB";
      alert(error);
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

  const mockImageUrl =
    "http://res.cloudinary.com/dpfc44mfl/image/upload/v1700824216/floor_plans/yrroo17bqj9lgcmqgp7u.png";

  return (
    <>
      <FormControl>
        <FormLabel>Floor Name</FormLabel>
        <Input
          value={name}
          placeholder={"BER-001"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText>Use a unique identifier like BER-001</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <FormHelperText>
          Helpful tip: Any special instructions for this floor?
        </FormHelperText>
      </FormControl>
      <Box>
        <input type="file" onChange={handleImageChange} className="block" />
      </Box>
      <Box>
        {isAddMarkerMode ? <Text>On</Text> : <Text>off</Text>}
        <Button
          onClick={() => {
            setIsAddMarkerMode(!isAddMarkerMode);
          }}
        >
          Toggle marker mode
        </Button>
      </Box>
      {mockImageUrl && (
        <Box>
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            disabled={isAddMarkerMode}
            onTransformed={(props) => {
              setPositionX(props.state.positionX);
              setPositionX(props.state.positionY);
              setScale(props.state.scale);
            }}
          >
            {(props) => {
              const { zoomIn, zoomOut, resetTransform, ...rest } = props;

              return (
                <>
                  <div className="tools">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                    <button onClick={() => resetTransform()}>x</button>
                  </div>
                  <TransformComponent>
                    <Box
                      position={"relative"}
                      onClick={(e) => {
                        if (!isAddMarkerMode) return;
                        const target = e.target as HTMLElement;
                        const rect = target.getBoundingClientRect();
                        const x = e.clientX - rect.left; //x position within the element.
                        const y = e.clientY - rect.top; //y position within the element.
                        console.log("Left? : " + x + " ; Top? : " + y + ".");
                        console.log(
                          "scaled x? : " +
                            x / scale +
                            "; Scaled y : " +
                            y / scale,
                        );
                        if (!imageRef?.current) return;

                        const imageScale =
                          imageRef.current.naturalWidth /
                          imageRef.current.width;
                        const maximumNumber = desks
                          .map((desk) => Number(desk.id))
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
                            width: 20,
                            height: 20,
                            id: newId.toString(),
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
                              key={desk.id}
                              position={"absolute"}
                              borderRadius={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              transform={`translate(${desk.x / scale}px, ${
                                desk.y / scale
                              }px)`}
                              height={`${desk.height}px`}
                              width={`${desk.width}px`}
                              backgroundColor={"red.500"}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              {desk.id}
                            </Box>
                          );
                        })}
                      <img ref={imageRef} src={mockImageUrl} alt="test" />
                    </Box>
                  </TransformComponent>
                </>
              );
            }}
          </TransformWrapper>
        </Box>
      )}
      {/* {imageUrl && <Image src={} />} */}
      <Button onClick={onUploadTrigger}>Upload floor plan</Button>
    </>
  );
};
