import "server-only";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { UPLOAD_DIR } from "@/lib/constants";

export async function saveFile(
  file: File,
  name: string,
  width?: number,
  height?: number
) {
  const uploadPath = path.join(UPLOAD_DIR, name) + ".webp";
  const buffer = Buffer.from(await file.arrayBuffer());
  await sharp(buffer)
    .resize(width, height, { fit: "cover" })
    .toFile(uploadPath);
  const normalizedPath = path.normalize(uploadPath);
  console.log("uploadPath", normalizedPath);
  const relativePath = normalizedPath
    .substring(normalizedPath.indexOf("uploads"))
    .replace(/\\/g, "/");

  // Construct the full URL
  const url = `${process.env.BASE_URL}/${relativePath}`;
  return url;
}

export async function deleteFile(url: string) {
  const fullPath = getFilePathFromUrl(url);
  try {
    await fs.promises.unlink(fullPath);
    console.log(`File deleted: ${fullPath}`);
  } catch (error) {
    console.error(`Error deleting file: ${fullPath}`, error);
    throw new Error("File deletion failed");
  }
  return true;
}

function getFilePathFromUrl(url: string) {
  // Parse the URL to extract the pathname
  const urlPath = new URL(url).pathname; // e.g., '/uploads/1745684291031-ooty.jpg'

  // Remove leading slash if present
  const relativePath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;

  // Construct the absolute file path
  const filePath = path.join(process.cwd(), "public", relativePath);

  return filePath;
}
