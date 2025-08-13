import cron from "node-cron";
import fetch from "node-fetch";

console.log("[CRON] Scheduled job to delete expired teams every minute.");

// ตั้ง Cron Job ให้รันทุก 1 นาที (* * * * *)
cron.schedule("* * * * *", async () => {  // เปลี่ยนจาก 0 * * * * → * * * * *
    console.log("[CRON] Running deleteExpiredTeams job...");
    try {
        const response = await fetch("http://localhost:3000/api/team");
        const data = await response.json();
        console.log("[CRON] Response:", data);
    } catch (error) {
        console.error("[CRON] Error:", error);
    }
});
