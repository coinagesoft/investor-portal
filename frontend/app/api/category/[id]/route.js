import connectDB from "@/lib/db";
import { errorResponse, json } from "@/lib/api-response";
import Category from "@/models/Category";

export const runtime = "nodejs";

export async function DELETE(_request, { params }) {

    try {

        await connectDB();

        const { id } = params;

        await Category.findByIdAndDelete(id);

        return json({
            success: true,
            message: "Category Deleted"
        });

    } catch (error) {

        return errorResponse(error);

    }

}