import { NextResponse } from "next/server";
import { mkdir, appendFile, access } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, message: "請輸入 Email" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Email 格式不正確" },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "waitlist.csv");

    await mkdir(dataDir, { recursive: true });

    try {
      await access(filePath);
    } catch {
      await appendFile(filePath, "email,createdAt\n", "utf8");
    }

    const createdAt = new Date().toISOString();
    await appendFile(filePath, `${email},${createdAt}\n`, "utf8");

    return NextResponse.json({
      ok: true,
      message: "已成功加入等候名單",
    });
  } catch (error) {
    console.error("waitlist error:", error);

    return NextResponse.json(
      { ok: false, message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}