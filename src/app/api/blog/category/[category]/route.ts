import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BlogCategory } from "@prisma/client"; // ✅ นำเข้า Enum

export async function GET(req: Request, context: { params: { category: string } }) {
  try {
    const { category } = context.params;

    // ✅ แปลงค่า category เป็น Prisma Enum
    const categoryEnum = category.toUpperCase() as keyof typeof BlogCategory;

    // ✅ ตรวจสอบว่าหมวดหมู่ถูกต้องหรือไม่
    if (!(categoryEnum in BlogCategory)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // ✅ ใช้ Prisma Enum ในการค้นหา
    const blogs = await prisma.blog.findMany({
      where: { category: BlogCategory[categoryEnum] },
      select: {
        id: true,
        title: true,
        slug: true,
        picture: true,
        createdAt: true,
        author: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("🚨 Error fetching blogs by category:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
