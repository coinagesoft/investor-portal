import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import { saveUploadedFile } from "@/lib/uploads";
import Category from "@/models/Category";
import File from "@/models/Files";
import Folder from "@/models/Folder";

export const runtime = "nodejs";

void Category;

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();
        const folder = new Folder({
            name: formData.get("name"),
            categoryId: formData.get("categoryId")
        });

        await folder.save();

        const pdfs = formData
            .getAll("pdfs")
            .filter((file) => file && file.size > 0);

        if (pdfs.length > 0) {
            const savedFiles = await Promise.all(
                pdfs.map((file) => saveUploadedFile(file))
            );

            const filesData = savedFiles.map((file) => ({
                title: file.originalname,
                fileUrl: `${request.nextUrl.origin}/uploads/${file.filename}`,
                folderId: folder._id
            }));

            await File.insertMany(filesData);
        }

        return json({
            success: true,
            message: "Folder Added"
        });
    } catch (error) {
        return errorResponse(error);
    }
}

export async function GET() {
    try {
        await connectDB();

        const folders = await Folder.find().populate("categoryId");
        const finalData = await Promise.all(
            folders.map(async (folder) => {
                const files = await File.find({
                    folderId: folder._id
                });

                return {
                    ...folder._doc,
                    files
                };
            })
        );

        return json(finalData);
    } catch (error) {
        return errorResponse(error);
    }
}
