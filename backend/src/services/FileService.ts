import { AppError } from "../middleware/errorHandling";
import { File } from "../models/File";

const validateUserId = (userId: string | undefined) => {
  if (userId === undefined) throw new AppError("User not found", 404);
};
const createPath = (userId: string | undefined, fileName: string) => {
  validateUserId(userId);
  return userId + "/" + fileName;
};

const deleteFileData = async (userId: string | undefined, fileName: string) => {
  validateUserId(userId);
  const file = await File.findOne({ where: { userId, fileName } });

  if (!file) throw new AppError("File not found", 404);
  await file.destroy();
};

const createFileData = async (
  userId: string | undefined,
  fileName: string,
  contentType: string
) => {
  validateUserId(userId);
  const { id, createdAt, starred, updatedAt } = await File.create({
    userId,
    fileName,
    contentType,
  });
  return { id, createdAt, fileName, starred, updatedAt };
};

const getAllFilesData = async (userId: string | undefined) => {
  validateUserId(userId);

  const files = await File.findAll({
    where: { userId },
    attributes: [
      "id",
      "fileName",
      "contentType",
      "starred",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
  });

  return files;
};

const toggleStarService = async (
  userId: string | undefined,
  fileName: string
) => {
  validateUserId(userId);
  const file = await File.findOne({ where: { userId, fileName } });
  console.log(file, fileName, userId);
  if (file) {
    file.starred = !file.starred;
    await file.save();
  } else {
    throw new AppError("File not found", 404);
  }
};

export {
  createPath,
  deleteFileData,
  createFileData,
  getAllFilesData,
  toggleStarService,
};
