"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    remember: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fillMockData = () => {
    setFormData({
      email: "admin@masarin.sa",
      password: "masarin2025",
      otp: "",
      remember: false,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول المطلوبة")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      setIsLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Success - redirect to admin dashboard
        router.push("/admin")
      } else {
        setError(data.message || "بيانات الدخول غير صحيحة")
      }
    } catch (error) {
      setError("حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-sm text-primary hover:underline flex items-center gap-1">
              ← العودة للصفحة الرئيسية
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qBZDK08yC9bRhwAGwD4UABiEgUIm91.png"
                  alt="مَسَارِن"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-primary font-space-grotesk">مَسَارِن</span>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">دخول المشرفين</h1>
          <p className="text-muted-foreground">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>أدخل بيانات الدخول الخاصة بك للمتابعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">بيانات تجريبية للاختبار</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillMockData}
                  className="text-xs bg-transparent"
                >
                  ملء البيانات
                </Button>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>البريد:</strong> admin@masarin.sa
                </p>
                <p>
                  <strong>كلمة المرور:</strong> masarin2025
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="text-left"
                  dir="ltr"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    minLength={8}
                    className="text-left pr-10"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* 2FA Code Field */}
              <div className="space-y-2">
                <Label htmlFor="otp">رمز التحقق (اختياري)</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={formData.otp}
                  onChange={(e) => handleInputChange("otp", e.target.value)}
                  maxLength={6}
                  className="text-left"
                  dir="ltr"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    تذكرني
                  </Label>
                </div>
                <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>© 2025 مَسَارِن. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  )
}
