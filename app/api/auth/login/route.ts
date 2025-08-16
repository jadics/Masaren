import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_USERS = [
  {
    id: "1",
    email: "admin@masarin.sa",
    password: "masarin2025", // In production, this would be hashed
    name: "مدير النظام",
    role: "admin",
  },
  {
    id: "2",
    email: "operator@masarin.sa",
    password: "operator123",
    name: "مراقب العمليات",
    role: "operator",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, otp, remember } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 })
    }

    // Find user
    const user = ADMIN_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "بيانات الدخول غير صحيحة" }, { status: 401 })
    }

    // In a real app, you would:
    // 1. Hash and compare passwords
    // 2. Verify 2FA if provided
    // 3. Generate JWT tokens
    // 4. Set secure HTTP-only cookies

    // Create session data
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString(),
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("masarin-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days if remember, else 1 day
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
