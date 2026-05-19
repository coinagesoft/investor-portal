import connectDB from "@/lib/db";

import File from "@/models/Files";

import Folder from "@/models/Folder";

import { json, errorResponse } from "@/lib/api-response";

export async function GET(request, { params }) {

    try {

        await connectDB();

        const files = await File.find({
            folderId: params.id
        });

        const folder = await Folder.findById(params.id);

        return json({
            success: true,
            data: files,
            folder
        });

    } catch (error) {

        return errorResponse(error);

    }

}