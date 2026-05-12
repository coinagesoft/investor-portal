import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import Folder from "@/models/Folder";

export const runtime = "nodejs";

export async function DELETE(_request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        await Folder.findByIdAndDelete(id);

        return json({
            success: true,
            message: "Folder Deleted"
        });
    } catch (error) {
        return errorResponse(error);
    }
}
