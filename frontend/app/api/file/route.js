import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import Category from "@/models/Category";
import File from "@/models/Files";
import Folder from "@/models/Folder";

export const runtime = "nodejs";

void Category;
void Folder;

export async function GET() {
    try {
        await connectDB();

        const files = await File.find().populate({
            path: "folderId",
            populate: {
                path: "categoryId"
            }
        });

        return json(files);
    } catch (error) {
        return errorResponse(error);
    }
}
