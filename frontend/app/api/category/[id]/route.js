import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {

    try {

        await connectDB();

        const { id } = params;

        await Category.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Category deleted"
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        });

    }

}