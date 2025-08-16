import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Clear session cookie
    const cookieStore = await cookies()
    cookieStore.delete("masarin-session")

    return NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
