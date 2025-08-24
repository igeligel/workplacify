import { Box, Image } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { domToPng } from "modern-screenshot";
import { useRef } from "react";
import { useDebounce } from "react-use";

import { useVisitorBadgeFormStore } from "./formDataStore";

type VisitorBadgeAvatarProps = {
  id?: string;
};

export const VisitorBadgeAvatar = (props: VisitorBadgeAvatarProps) => {
  const { id } = props;
  const { formData, photoPreview, setAvatarDataUrl } =
    useVisitorBadgeFormStore();

  const avatarRef = useRef<HTMLDivElement>(null);

  useDebounce(
    () => {
      const updateDataUrl = async () => {
        if (avatarRef.current) {
          const avatar = avatarRef.current;
          const dataUrl = await domToPng(avatar, { scale: 5, debug: true });
          console.log({ type: "update", dataUrl });
          if (props.id === "visitor-badge-preview-photo") {
            setAvatarDataUrl(dataUrl);
          }
        }
      };

      updateDataUrl();
    },
    400,
    [avatarRef, setAvatarDataUrl, formData],
  );

  return (
    <Box id={id} ref={avatarRef}>
      {photoPreview ? (
        <Image
          src={photoPreview}
          alt="Visitor photo"
          boxSize="100px"
          objectFit="cover"
        />
      ) : (
        <Avatar
          size={100}
          name={formData.name || "Visitor"}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      )}
    </Box>
  );
};
