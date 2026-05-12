import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(file) {
    await mkdir(uploadsDir, { recursive: true });

    const extension = path.extname(file.name);
    const filename = `${Date.now()}${extension}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(path.join(uploadsDir, filename), buffer);

    return {
        filename,
        originalname: file.name
    };
}
