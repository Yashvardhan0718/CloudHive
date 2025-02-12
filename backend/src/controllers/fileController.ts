import { Response } from "express";
import {
  generatePreSignedUrl,
  Method,
  deleteObject,
  checkFileExists,
} from "../services/s3Service";
import {
  createPath,
  deleteFileData,
  createFileData,
  getAllFilesData,
  toggleStarService,
} from "../services/FileService";
import { AuthenticatedRequest } from "../middleware/authentication";
import { AppError } from "../middleware/errorHandling";

const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const userId = req.user?.id;
  const filePath = createPath(userId, fileName);

  const exists = await checkFileExists(filePath);

  if (!exists) {
    throw new AppError("File not found", 404);
  }
  const file = await createFileData(userId, fileName, fileType);
  res
    .status(200)
    .json({ success: true, message: "File uploaded successfully", file });
};
const getPreSignedUrl = async (req: AuthenticatedRequest, res: Response) => {
  const { fileName, fileType } = req.body;

  const filePath = createPath(req.user?.id, fileName);
  const s3PreSignedUrl = await generatePreSignedUrl(
    Method.putObject,
    filePath,
    fileType
  );

  res.status(200).json({
    success: true,
    message: "Generated pre-signed url successfully",
    s3PreSignedUrl,
  });
};

const getAllFiles = async (req: AuthenticatedRequest, res: Response) => {
  const files = await getAllFilesData(req.user?.id);
  res
    .status(200)
    .json({ success: true, message: "Files fetched successfully", files });
};

const getFile = async (req: AuthenticatedRequest, res: Response) => {
  const { fileName } = req.params;
  const filePath = createPath(req.user?.id, fileName);
  const url = await generatePreSignedUrl(Method.getObject, filePath);

  res.status(200).json({
    success: true,
    message: "File fetched successfully",
    url,
    fileName,
  });
};

const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  const { fileName } = req.params;
  const filePath = createPath(req.user?.id, fileName);
  await deleteObject(filePath);
  await deleteFileData(req.user?.id, fileName);
  res.status(200).json({ success: true, message: "File deleted successfully" });
};

const toggleStar = async (req: AuthenticatedRequest, res: Response) => {
  const { fileName } = req.params;
  await toggleStarService(req.user?.id, fileName);
  res
    .status(200)
    .json({ success: true, message: "File starred toggled successfully" });
};

export {
  uploadFile,
  getPreSignedUrl,
  getFile,
  getAllFiles,
  deleteFile,
  toggleStar,
};
