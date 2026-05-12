import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import Category from "@/models/Category";
import File from "@/models/Files";
import Folder from "@/models/Folder";

export const runtime = "nodejs";

export async function GET() {
    try {
        await connectDB();

        const totalCategories = await Category.countDocuments();
        const totalFolders = await Folder.countDocuments();
        const totalFiles = await File.countDocuments();

        return json({
            totalCategories,
            totalFolders,
            totalFiles
        });
    } catch (error) {
        return errorResponse(error);
    }
}
