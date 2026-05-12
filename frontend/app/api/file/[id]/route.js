import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import File from "@/models/Files";

export const runtime = "nodejs";

export async function DELETE(_request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        await File.findByIdAndDelete(id);

        return json({
            success: true,
            message: "File Deleted"
        });
    } catch (error) {
        return errorResponse(error);
    }
}
