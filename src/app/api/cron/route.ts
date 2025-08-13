import { NextResponse } from "next/server";
import "../../cron/deleteExpiredTeams"; // โหลด Cron Job

export async function GET() {
    console.log("[API] Cron Job API was hit!");
    return NextResponse.json({ message: "Cron Job is running" });
}
