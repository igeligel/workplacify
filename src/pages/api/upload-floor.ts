import DatauriParser from "datauri/parser";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import path from "path";

import { cloudinary } from "../../server/cloudinary";

// const handler = nc({
//   onError: (res) => {
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end("Page is not found");
//   },
// })
//   // uploading two files
//   .use(multer().any())
//   .post(async (req, res) => {
//     // get user's token
//     const token = await getToken({ req });

//     // if no token
//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "You are not signed in", data: null });
//     }
//     // get parsed image and video from multer
//     const image = req.files.filter((file) => file.fieldname === "image")[0];
//     const video = req.files.filter((file) => file.fieldname === "video")[0];
//     // create a neew Data URI parser
//     const parser = new DatauriParser();
//     try {
//       // create image
//       const createImage = async (img) => {
//         const base64Image = parser.format(
//           path.extname(img.originalname).toString(),
//           img.buffer,
//         );
//         const uploadedImageResponse = await cloudinary.uploader.upload(
//           base64Image.content,
//           "flashcards",
//           { resource_type: "image" },
//         );
//         return uploadedImageResponse;
//       };

//       // create video
//       const createVideo = async (vid) => {
//         const base64Video = parser.format(
//           path.extname(vid.originalname).toString(),
//           vid.buffer,
//         );
//         const uploadedVideoResponse = await cloudinary.uploader.upload(
//           base64Video.content,
//           "flashcards",
//           { resource_type: "video" },
//         );
//         return uploadedVideoResponse;
//       };

//       // saving information
//       const createdImage = await createImage(image);
//       const imageUrl = createdImage.url;
//       const image_id = createdImage.public_id;
//       const image_signature = createdImage.signature;
//       const createdVideo = video ? await createVideo(video) : null;
//       const videoUrl = createdVideo?.url;
//       const video_id = createdVideo?.public_id;
//       const video_signature = createVideo?.signature;

//       res.json({ error: null, data: card });
//     } catch (error) {
//       res.status(500).json({ error, data: null });
//     }
//   });

type ResponseData =
  | {
      url: string;
    }
  | {
      error: {
        code: string;
        message: string;
        target?: string;
      };
    };

type RequestData = {
  files: Express.Multer.File[];
};

const router = createRouter<
  NextApiRequest & RequestData,
  NextApiResponse<ResponseData>
>();

const createImage = async (img: Express.Multer.File) => {
  const parser = new DatauriParser();
  const base64Image = parser.format(
    path.extname(img.originalname).toString(),
    img.buffer,
  );

  const base64Content = base64Image.content;
  if (!base64Content) return;

  const uploadedImageResponse = await cloudinary.uploader.upload(
    base64Content,
    {
      resource_type: "image",
      folder: "floor_plans",
    },
  );
  return uploadedImageResponse;
};

router
  // @ts-expect-error No idea why this is failing.
  .use(multer().any())
  .post(async (req, res) => {
    const image = req.files.filter((file) => file.fieldname === "image")[0];
    if (!image) return;

    try {
      const createdImage = await createImage(image);
      if (!createdImage) {
        return res.status(500).json({
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Something went wrong, the administrator has been notified.",
          },
        });
      }
      return res.json({
        url: createdImage.url,
      });
    } catch (error) {}
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong, the administrator has been notified.",
      },
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler();
