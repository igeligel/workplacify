import DatauriParser from "datauri/parser";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import path from "path";

import { cloudinary } from "../../server/cloudinary";

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
