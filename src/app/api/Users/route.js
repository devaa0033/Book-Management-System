import { NextResponse } from "next/server";
import { getUser } from "../../../../lib/queries/User.js";

export async function GET() {
    try {
        const users = await getUser();
        return NextResponse.json({ status: "success", data: users });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Connection failed", error }, { status: 500 });
    }
}