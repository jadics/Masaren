"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Camera,
  Play,
  Pause,
  RotateCcw,
  Settings,
  LogOut,
  Activity,
  AlertTriangle,
  Eye,
  Save,
  Filter,
  MapPin,
  Clock,
  FileText,
  UserCheck,
  X,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Send,
  Plus,
  User,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  Download,
  Database,
  Zap,
  Mail,
  Smartphone,
  Webhook,
  Bell,
  Users,
  Target,
  Brain,
  Minus,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"

//Recharts
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip } from "recharts"

// Mock data for real-time monitoring
const mockDetections = [
  {
    id: "DET-9921",
    camera_id: "CAM-07",
    camera_name: "القطاع الغربي K-12",
    type: "حفر",
    score: 0.91,
    env_risk: 0.6,
    recurrence: 0.4,
    severity: 84,
    timestamp: "2025-08-15T10:22:05+03:00",
    image_url: "/road-pothole-detection.png",
    location: { lat: 27.52, lng: 41.7 },
  },
  {
    id: "DET-9930",
    camera_id: "CAM-01",
    camera_name: "جسر الملك فهد",
    type: "تشقق شبكي",
    score: 0.74,
    env_risk: 0.3,
    recurrence: 0.1,
    severity: 58,
    timestamp: "2025-08-15T10:31:12+03:00",
    image_url: "/road-network-crack-detection.png",
    location: { lat: 24.75, lng: 46.67 },
  },
  {
    id: "DET-9935",
    camera_id: "CAM-11",
    camera_name: "طريق الجامعة",
    type: "هبوط",
    score: 0.88,
    env_risk: 0.45,
    recurrence: 0.25,
    severity: 72,
    timestamp: "2025-08-15T10:45:30+03:00",
    image_url: "/road-subsidence-detection.png",
    location: { lat: 24.68, lng: 46.72 },
  },
]

const mockAlerts = [
  {
    id: "ALERT-001",
    type: "حفر خطير",
    severity: 88,
    camera: "CAM-07",
    location: "القطاع الغربي K-12",
    timestamp: "2025-08-15T10:22:05+03:00",
    status: "unread",
    level: "red",
  },
  {
    id: "ALERT-002",
    type: "تشقق متوسط",
    severity: 65,
    camera: "CAM-01",
    location: "جسر الملك فهد",
    timestamp: "2025-08-15T09:15:22+03:00",
    status: "read",
    level: "yellow",
  },
  {
    id: "ALERT-003",
    type: "تشوه طفيف",
    severity: 35,
    camera: "CAM-11",
    location: "طريق الجامعة",
    timestamp: "2025-08-15T08:45:10+03:00",
    status: "read",
    level: "green",
  },
]

// Mock incidents data
const mockIncidents = [
  {
    id: "INC-1207",
    type: "هبوط",
    severity: 88,
    status: "جديد",
    assignee: "فهد الأحمد",
    sector: "K-12",
    location: "القطاع الغربي - تقاطع الملك فهد",
    coordinates: { lat: 27.52, lng: 41.7 },
    last_update: "2025-08-15T10:35:00+03:00",
    created_at: "2025-08-15T10:22:05+03:00",
    description: "هبوط خطير في الطريق يتطلب تدخل فوري",
    priority: "عالية",
  },
  {
    id: "INC-1203",
    type: "حفر",
    severity: 73,
    status: "قيد المعالجة",
    assignee: "نورة السالم",
    sector: "R-5",
    location: "طريق الجامعة - أمام المجمع التجاري",
    coordinates: { lat: 24.75, lng: 46.67 },
    last_update: "2025-08-15T09:02:00+03:00",
    created_at: "2025-08-14T14:30:00+03:00",
    description: "حفر متوسطة الحجم تؤثر على حركة المرور",
    priority: "متوسطة",
  },
  {
    id: "INC-1195",
    type: "تشقق طولي",
    severity: 45,
    status: "مغلق",
    assignee: "أحمد المطيري",
    sector: "M-8",
    location: "شارع الأمير محمد بن سلمان",
    coordinates: { lat: 24.68, lng: 46.72 },
    last_update: "2025-08-14T16:45:00+03:00",
    created_at: "2025-08-13T11:15:00",
    description: "تشقق طولي تم إصلاحه بنجاح",
    priority: "منخفضة",
  },
]

const teamMembers = [
  { id: "1", name: "فهد الأحمد", role: "مهندس صيانة أول" },
  { id: "2", name: "نورة السالم", role: "مهندسة طرق" },
  { id: "3", name: "أحمد المطيري", role: "فني صيانة" },
  { id: "4", name: "سارة القحطاني", role: "مشرفة عمليات" },
]

// Mock data for predictive analytics
const mockForecastData = [
  { week: "الأسبوع 1", incidents: 8, predicted: 12 },
  { week: "الأسبوع 2", incidents: 15, predicted: 18 },
  { week: "الأسبوع 3", incidents: 22, predicted: 25 },
  { week: "الأسبوع 4", incidents: 18, predicted: 20 },
]

const mockRecommendations = [
  {
    id: "REC-001",
    type: "maintenance",
    priority: "عالية",
    title: "رفع فريق صيانة إلى القطاع الغربي",
    description: "يُنصح بإرسال فريق صيانة متخصص إلى القطاع الغربي K-12 خلال 48 ساعة لمعالجة التشوهات المتوقعة",
    timeline: "48 ساعة",
    impact: "منع 5-7 حوادث محتملة",
  },
  {
    id: "REC-002",
    type: "traffic",
    priority: "متوسطة",
    title: "خفض سرعة المركبات مؤقتاً",
    description: "تقليل الحد الأقصى للسرعة في مقطع K-12 إلى 60 كم/ساعة لمدة أسبوعين",
    timeline: "أسبوعين",
    impact: "تقليل شدة التشوهات بنسبة 30%",
  },
  {
    id: "REC-003",
    type: "monitoring",
    priority: "منخفضة",
    title: "زيادة تردد المراقبة",
    description: "رفع معدل المراقبة في طريق الجامعة من مرة كل ساعة إلى كل 30 دقيقة",
    timeline: "شهر واحد",
    impact: "اكتشاف مبكر للتشوهات الجديدة",
  },
]

const mockModelMetrics = {
  accuracy: 94.2,
  recall: 91.8,
  precision: 96.1,
  mAP: 89.5,
  lastTraining: "2025-08-03T14:30:00+03:00",
  datasetSize: "15,847 صورة",
  trainingTime: "3.2 ساعة",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [modelState, setModelState] = useState<"running" | "stopped" | "restarting">("running")
  const [executionMode, setExecutionMode] = useState("Edge")
  const [selectedCamera, setSelectedCamera] = useState("ALL")
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.35])
  const [segmentationEnabled, setSegmentationEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [alertFilter, setAlertFilter] = useState("all")
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [incidentDialogOpen, setIncidentDialogOpen] = useState(false)
  const [newIncidentData, setNewIncidentData] = useState({
    type: "",
    location: "",
    description: "",
    severity: 50,
    assignee: "",
  })

  const [severityThresholds, setSeverityThresholds] = useState({
    low: 49,
    medium: 79,
    high: 100,
  })
  const [alertChannels, setAlertChannels] = useState({
    email: true,
    sms: false,
    webhook: true,
    inSystem: true,
  })
  const [isRetraining, setIsRetraining] = useState(false)

  // Mock KPI data
  const kpiData = {
    activeCameras: 18,
    detectionsLast24h: 342,
    averageSeverity: 57,
    predictedIncidents: 12,
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")

        if (!response.ok) {
          router.push("/admin/login")
          return
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleGoHome = () => {
    router.push("/")
  }

  const handleModelAction = async (action: "start" | "stop" | "restart") => {
    setModelState(action === "start" ? "running" : action === "stop" ? "stopped" : "restarting")

    // Simulate API call
    setTimeout(() => {
      if (action === "restart") {
        setModelState("running")
      }
    }, 2000)
  }

  const handleSaveSettings = async () => {
    // Simulate saving settings
    console.log("Saving settings:", {
      executionMode,
      selectedCamera,
      confidenceThreshold: confidenceThreshold[0],
      segmentationEnabled,
    })
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (response.ok) {
        router.push("/admin/login")
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleUpdateIncidentStatus = async (incidentId: string, newStatus: string) => {
    // Simulate API call
    console.log(`Updating incident ${incidentId} status to ${newStatus}`)
  }

  const handleAssignIncident = async (incidentId: string, assigneeId: string) => {
    // Simulate API call
    console.log(`Assigning incident ${incidentId} to ${assigneeId}`)
  }

  const handleSendToAuthority = async (incidentId: string) => {
    // Simulate API call
    console.log(`Sending incident ${incidentId} to relevant authority`)
  }

  const handleCreateIncident = async () => {
    // Simulate API call
    console.log("Creating new incident:", newIncidentData)
    setIncidentDialogOpen(false)
    setNewIncidentData({
      type: "",
      location: "",
      description: "",
      severity: 50,
      assignee: "",
    })
  }

  const handleStartRetraining = async () => {
    setIsRetraining(true)
    // Simulate retraining process
    setTimeout(() => {
      setIsRetraining(false)
    }, 5000)
  }

  const handleGeneratePlan = async () => {
    // Simulate PDF generation
    console.log("Generating maintenance plan PDF...")
  }

  const handleImportData = async () => {
    // Simulate data import
    console.log("Importing new training data...")
  }

  const handleAutoOptimizeThreshold = async () => {
    // Simulate threshold optimization
    console.log("Auto-optimizing confidence threshold...")
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return "text-red-600 bg-red-50 border-red-200"
    if (severity >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getSeverityBadgeColor = (severity: number) => {
    if (severity >= 80) return "bg-red-600"
    if (severity >= 50) return "bg-yellow-600"
    return "bg-green-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "جديد":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "قيد المعالجة":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "مغلق":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "text-red-600 bg-red-50 border-red-200"
      case "متوسطة":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "منخفضة":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    })
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (alertFilter === "all") return true
    if (alertFilter === "unread") return alert.status === "unread"
    return alert.level === alertFilter
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Camera className="w-5 h-5 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qBZDK08yC9bRhwAGwD4UABiEgUIm91.png"
                    alt="مَسَارِن"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary font-space-grotesk">مَسَارِن – لوحة التحكم</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    modelState === "running"
                      ? "bg-green-500"
                      : modelState === "stopped"
                        ? "bg-red-500"
                        : "bg-yellow-500 animate-pulse"
                  }`}
                />
                <span className="text-sm text-muted-foreground">
                  {modelState === "running" ? "تشغيل" : modelState === "stopped" ? "متوقف" : "إعادة تشغيل"}
                </span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حساب المستخدم</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGoHome}>
                  <Home className="w-4 h-4 ml-2" />
                  العودة للصفحة الرئيسية
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 ml-2" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Model Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              عناصر التحكم بنموذج الذكاء الاصطناعي
            </CardTitle>
            <CardDescription>إدارة وتكوين نموذج الذكاء الاصطناعي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleModelAction("start")}
                disabled={modelState === "running"}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 ml-2" />
                تشغيل
              </Button>
              <Button onClick={() => handleModelAction("stop")} disabled={modelState === "stopped"} variant="outline">
                <Pause className="w-4 h-4 ml-2" />
                إيقاف مؤقت
              </Button>
              <Button
                onClick={() => handleModelAction("restart")}
                disabled={modelState === "restarting"}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                إعادة تشغيل
              </Button>
            </div>

            <Separator />

            {/* Configuration Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Execution Mode */}
              <div className="space-y-2">
                <label className="text-sm font-medium">وضع التنفيذ</label>
                <Select value={executionMode} onValueChange={setExecutionMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Edge">Edge</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Camera Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">الكاميرا الحالية</label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">جميع الكاميرات</SelectItem>
                    <SelectItem value="CAM-01">CAM-01 - جسر الملك فهد</SelectItem>
                    <SelectItem value="CAM-07">CAM-07 - القطاع الغربي</SelectItem>
                    <SelectItem value="CAM-11">CAM-11 - طريق الجامعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Confidence Threshold */}
              <div className="space-y-2">
                <label className="text-sm font-medium">عتبة الثقة: {confidenceThreshold[0].toFixed(2)}</label>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </div>

              {/* Segmentation Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Segmentation Mask</label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch checked={segmentationEnabled} onCheckedChange={setSegmentationEnabled} />
                  <span className="text-sm text-muted-foreground">{segmentationEnabled ? "مفعل" : "معطل"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                حفظ الإعدادات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الكاميرات النشطة</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{kpiData.activeCameras}</div>
              <p className="text-xs text-muted-foreground">من إجمالي 20 كاميرا</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاكتشافات آخر 24 ساعة</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{kpiData.detectionsLast24h}</div>
              <p className="text-xs text-muted-foreground">+12% من الأمس</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط شدة التشوه</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{kpiData.averageSeverity}/100</div>
              <p className="text-xs text-muted-foreground">مستوى متوسط</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">حوادث متوقعة (7 أيام)</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{kpiData.predictedIncidents}</div>
              <p className="text-xs text-muted-foreground">تحتاج تدخل سريع</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for upcoming sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                خريطة حرارية للمخاطر
              </CardTitle>
              <CardDescription>عرض مكاني للتشوهات والمخاطر المكتشفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Map Controls */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">الطبقات:</span>
                  <Badge variant="outline" className="text-xs">
                    تشوهات آنية
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    توقعات 7 أيام
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    صيانة مجدولة
                  </Badge>
                </div>

                <div className="h-64 bg-muted/30 rounded-lg relative overflow-hidden border">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
                    {/* Grid lines to simulate map */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={`v-${i}`}
                          className="absolute top-0 bottom-0 w-px bg-slate-400"
                          style={{ left: `${(i + 1) * 12.5}%` }}
                        />
                      ))}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={`h-${i}`}
                          className="absolute left-0 right-0 h-px bg-slate-400"
                          style={{ top: `${(i + 1) * 16.67}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Alert Markers */}
                  {mockAlerts.slice(0, 8).map((alert, index) => {
                    const positions = [
                      { top: "20%", right: "25%" },
                      { top: "35%", right: "40%" },
                      { top: "15%", right: "60%" },
                      { top: "50%", right: "20%" },
                      { top: "65%", right: "70%" },
                      { top: "40%", right: "80%" },
                      { top: "75%", right: "30%" },
                      { top: "25%", right: "85%" },
                    ]

                    const position = positions[index] || { top: "50%", right: "50%" }
                    const severityColor =
                      alert.severity >= 80 ? "bg-red-500" : alert.severity >= 50 ? "bg-yellow-500" : "bg-green-500"

                    return (
                      <div
                        key={alert.id}
                        className={`absolute w-4 h-4 ${severityColor} rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform shadow-lg border-2 border-white`}
                        style={{ top: position.top, right: position.right }}
                        title={`${alert.type} - شدة: ${alert.severity}% - ${alert.location}`}
                      >
                        {alert.severity >= 80 && (
                          <div
                            className={`absolute inset-0 ${severityColor} rounded-full animate-ping opacity-75`}
                          ></div>
                        )}
                      </div>
                    )
                  })}

                  {/* Map Controls */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Location Info */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded text-xs">
                    <div className="font-medium">منطقة عسير</div>
                    <div className="text-muted-foreground">أبها - خميس مشيط</div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded text-xs space-y-2">
                    <div className="font-medium mb-2">مستوى الخطر</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>عالي (80-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>متوسط (50-79)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>منخفض (0-49)</span>
                    </div>
                  </div>

                  {/* Statistics Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded text-xs">
                    <div className="font-medium mb-2">إحصائيات الخريطة</div>
                    <div className="space-y-1">
                      <div>التنبيهات النشطة: {mockAlerts.filter((a) => a.status === "جديد").length}</div>
                      <div>قيد المعالجة: {mockAlerts.filter((a) => a.status === "قيد المعالجة").length}</div>
                      <div>تم الحل: {mockAlerts.filter((a) => a.status === "مغلق").length}</div>
                    </div>
                  </div>
                </div>

                {/* Map Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4 ml-2" />
                      تحديث
                    </Button>
                    <Button size="sm" variant="outline">
                      <Filter className="w-4 h-4 ml-2" />
                      تصفية
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    آخر تحديث: منذ {Math.floor(Math.random() * 5) + 1} دقائق
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                البث المباشر والتنبيهات
              </CardTitle>
              <CardDescription>مراقبة فورية للاكتشافات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="live-feed" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="live-feed">البث المباشر</TabsTrigger>
                  <TabsTrigger value="alerts">مركز التنبيهات</TabsTrigger>
                </TabsList>

                <TabsContent value="live-feed" className="space-y-4">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {mockDetections.map((detection) => (
                        <div key={detection.id} className="border rounded-lg p-3 space-y-3">
                          <div className="flex items-start gap-3">
                            <img
                              src={detection.image_url || "/placeholder.svg"}
                              alt={`Detection ${detection.type}`}
                              className="w-20 h-15 object-cover rounded border"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge className={`text-xs ${getSeverityColor(detection.severity)}`}>
                                  {detection.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(detection.timestamp)}
                                </span>
                              </div>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <Camera className="w-3 h-3" />
                                  <span>{detection.camera_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${getSeverityBadgeColor(detection.severity)}`}
                                  ></div>
                                  <span>الشدة: {detection.severity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <FileText className="w-3 h-3 ml-1" />
                              إنشاء بلاغ
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <X className="w-3 h-3 ml-1" />
                              تجاهل
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <UserCheck className="w-3 h-3 ml-1" />
                              إسناد
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-4">
                  {/* Alert Filters */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={alertFilter} onValueChange={setAlertFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="red">أحمر</SelectItem>
                        <SelectItem value="yellow">أصفر</SelectItem>
                        <SelectItem value="green">أخضر</SelectItem>
                        <SelectItem value="unread">غير مقروء</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {filteredAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-3 rounded-lg border ${
                            alert.status === "unread" ? "bg-accent/10" : "bg-background"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${getSeverityBadgeColor(alert.severity)}`}
                              ></div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{alert.type}</span>
                                  {alert.status === "unread" && (
                                    <Badge variant="secondary" className="text-xs">
                                      جديد
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground space-y-1">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    <span>{alert.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTimestamp(alert.timestamp)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>{alert.severity}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Road Management System */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  إدارة الطرق
                </CardTitle>
                <CardDescription>متابعة وإدارة حوادث الطرق والتشوهات المكتشفة</CardDescription>
              </div>
              <Dialog open={incidentDialogOpen} onOpenChange={setIncidentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إنشاء حادث جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>إنشاء حادث جديد</DialogTitle>
                    <DialogDescription>أدخل تفاصيل الحادث الجديد</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="incident-type">نوع الحادث</Label>
                      <Select
                        value={newIncidentData.type}
                        onValueChange={(value) => setNewIncidentData({ ...newIncidentData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الحادث" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="حفر">حفر</SelectItem>
                          <SelectItem value="تشقق طولي">تشقق طولي</SelectItem>
                          <SelectItem value="تشقق شبكي">تشقق شبكي</SelectItem>
                          <SelectItem value="هبوط">هبوط</SelectItem>
                          <SelectItem value="تآكل">تآكل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incident-location">الموقع</Label>
                      <Input
                        id="incident-location"
                        value={newIncidentData.location}
                        onChange={(e) => setNewIncidentData({ ...newIncidentData, location: e.target.value })}
                        placeholder="أدخل موقع الحادث"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incident-severity">الشدة: {newIncidentData.severity}</Label>
                      <Slider
                        value={[newIncidentData.severity]}
                        onValueChange={(value) => setNewIncidentData({ ...newIncidentData, severity: value[0] })}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incident-assignee">المسؤول</Label>
                      <Select
                        value={newIncidentData.assignee}
                        onValueChange={(value) => setNewIncidentData({ ...newIncidentData, assignee: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المسؤول" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name} - {member.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incident-description">الوصف</Label>
                      <Textarea
                        id="incident-description"
                        value={newIncidentData.description}
                        onChange={(e) => setNewIncidentData({ ...newIncidentData, description: e.target.value })}
                        placeholder="أدخل وصف مفصل للحادث"
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIncidentDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleCreateIncident}>إنشاء الحادث</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Incident Statistics */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">حوادث جديدة</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">
                    {mockIncidents.filter((i) => i.status === "جديد").length}
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">قيد المعالجة</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mt-1">
                    {mockIncidents.filter((i) => i.status === "قيد المعالجة").length}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">مغلقة</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-1">
                    {mockIncidents.filter((i) => i.status === "مغلق").length}
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">عالية الأولوية</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mt-1">
                    {mockIncidents.filter((i) => i.severity >= 80).length}
                  </div>
                </div>
              </div>

              {/* Incidents Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الحادث</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>الشدة</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المسؤول</TableHead>
                      <TableHead>آخر تحديث</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {incident.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-48">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 mt-1 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{incident.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSeverityBadgeColor(incident.severity)}`}></div>
                            <span className="text-sm font-medium">{incident.severity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{incident.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(incident.last_update)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedIncident(incident)
                                  // Open incident details dialog
                                }}
                              >
                                <Eye className="w-4 h-4 ml-2" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateIncidentStatus(incident.id, "قيد المعالجة")}>
                                <Edit className="w-4 h-4 ml-2" />
                                تحديث الحالة
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAssignIncident(incident.id, "2")}>
                                <UserCheck className="w-4 h-4 ml-2" />
                                إعادة الإسناد
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleSendToAuthority(incident.id)}>
                                <Send className="w-4 h-4 ml-2" />
                                إرسال للجهة المختصة
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Incident Details Dialog */}
              {selectedIncident && (
                <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        تفاصيل الحادث {selectedIncident.id}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">نوع الحادث</Label>
                            <p className="text-sm font-medium">{selectedIncident.type}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">الشدة</Label>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${getSeverityBadgeColor(selectedIncident.severity)}`}
                              ></div>
                              <span className="text-sm font-medium">{selectedIncident.severity}/100</span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">الحالة</Label>
                            <Badge className={`text-xs ${getStatusColor(selectedIncident.status)}`}>
                              {selectedIncident.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">المسؤول</Label>
                            <p className="text-sm font-medium">{selectedIncident.assignee}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">تاريخ الإنشاء</Label>
                            <p className="text-sm">{formatTimestamp(selectedIncident.created_at)}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">آخر تحديث</Label>
                            <p className="text-sm">{formatTimestamp(selectedIncident.last_update)}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">الموقع</Label>
                        <p className="text-sm">{selectedIncident.location}</p>
                        <p className="text-xs text-muted-foreground">
                          الإحداثيات: {selectedIncident.coordinates.lat}, {selectedIncident.coordinates.lng}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">الوصف</Label>
                        <p className="text-sm leading-relaxed">{selectedIncident.description}</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedIncident(null)}>
                        إغلاق
                      </Button>
                      <Button onClick={() => handleSendToAuthority(selectedIncident.id)}>
                        <Send className="w-4 h-4 ml-2" />
                        إرسال للجهة المختصة
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics & Forecasting */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                التنبؤ والتخطيط
              </CardTitle>
              <CardDescription>تحليل الحوادث والتوصيات الاستباقية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">تحليل الحوادث - الفعلي مقابل المتوقع</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "الأحد", actual: 4, predicted: 3, name: "الأحد" },
                        { day: "الاثنين", actual: 6, predicted: 5, name: "الاثنين" },
                        { day: "الثلاثاء", actual: 2, predicted: 2, name: "الثلاثاء" },
                        { day: "الأربعاء", actual: 5, predicted: 4, name: "الأربعاء" },
                        { day: "الخميس", actual: 7, predicted: 6, name: "الخميس" },
                        { day: "الجمعة", actual: 1, predicted: 1, name: "الجمعة" },
                        { day: "السبت", actual: 3, predicted: 3, name: "السبت" },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-xs" />
                      <YAxis tick={{ fontSize: 12 }} className="text-xs" />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-lg p-3 shadow-lg">
                                <p className="font-medium">{label}</p>
                                <p className="text-sm text-blue-600">الفعلي: {payload[0]?.value} حوادث</p>
                                <p className="text-sm text-green-600">المتوقع: {payload[1]?.value} حوادث</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        name="الفعلي"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#10b981"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        name="المتوقع"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">الحوادث الفعلية</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mt-1">28</p>
                    <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 bg-green-500 rounded-full border-2 border-green-500"
                        style={{ borderStyle: "dashed" }}
                      ></div>
                      <span className="text-sm font-medium">التوقعات</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-1">24</p>
                    <p className="text-xs text-muted-foreground">متوقع</p>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-medium">التوصيات الاستباقية</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">تحذير: زيادة في الحوادث المتوقعة</p>
                        <p className="text-xs text-amber-700">الخميس والاثنين يظهران أعلى معدلات متوقعة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">توصية: زيادة دوريات الصيانة</p>
                        <p className="text-xs text-blue-700">في القطاع الغربي والشرقي خلال أيام الذروة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">تحسن: دقة التنبؤات 87%</p>
                        <p className="text-xs text-green-700">تطابق جيد بين الفعلي والمتوقع هذا الأسبوع</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Generate Plan Button */}
              <div className="flex justify-center">
                <Button onClick={handleGeneratePlan} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  توليد خطة صيانة (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                التوصيات الذكية
              </CardTitle>
              <CardDescription>إجراءات مقترحة مبنية على التنبؤات والبيانات</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-4">
                  {mockRecommendations.map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.type === "maintenance" ? "صيانة" : rec.type === "traffic" ? "مرور" : "مراقبة"}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{rec.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{rec.timeline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{rec.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          تطبيق
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          تأجيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Data & Model Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              إدارة البيانات والنموذج
            </CardTitle>
            <CardDescription>معلومات النموذج ومصادر البيانات وأداء التدريب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Model Performance Metrics */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">أداء النموذج</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>الدقة (Accuracy)</span>
                      <span className="font-medium">{mockModelMetrics.accuracy}%</span>
                    </div>
                    <Progress value={mockModelMetrics.accuracy} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>الاستدعاء (Recall)</span>
                      <span className="font-medium">{mockModelMetrics.recall}%</span>
                    </div>
                    <Progress value={mockModelMetrics.recall} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>الدقة (Precision)</span>
                      <span className="font-medium">{mockModelMetrics.precision}%</span>
                    </div>
                    <Progress value={mockModelMetrics.precision} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>mAP</span>
                      <span className="font-medium">{mockModelMetrics.mAP}%</span>
                    </div>
                    <Progress value={mockModelMetrics.mAP} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">مصادر البيانات</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-muted-foreground" />
                    <span>Crack500 Dataset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-muted-foreground" />
                    <span>GAPS Dataset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-muted-foreground" />
                    <span>عيّنات محلية</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">إجمالي: {mockModelMetrics.datasetSize}</div>
                </div>
              </div>

              {/* Training Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">معلومات التدريب</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">آخر إعادة تدريب:</span>
                    <div className="font-medium">
                      {new Date(mockModelMetrics.lastTraining).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">مدة التدريب:</span>
                    <div className="font-medium">{mockModelMetrics.trainingTime}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {isRetraining ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>جاري إعادة التدريب...</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        جاهز
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">الإجراءات</h3>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={handleStartRetraining}
                    disabled={isRetraining}
                  >
                    <RefreshCw className="w-3 h-3 ml-2" />
                    بدء إعادة تدريب
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={handleImportData}
                  >
                    <Database className="w-3 h-3 ml-2" />
                    استيراد بيانات
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={handleAutoOptimizeThreshold}
                  >
                    <Zap className="w-3 h-3 ml-2" />
                    تحسين العتبة تلقائياً
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings & Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              إعدادات التنبيه والتكامل
            </CardTitle>
            <CardDescription>تكوين عتبات التنبيه وقنوات الإشعارات والتكاملات الخارجية</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="thresholds" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="thresholds">عتبات الشدة</TabsTrigger>
                <TabsTrigger value="channels">قنوات التنبيه</TabsTrigger>
                <TabsTrigger value="integrations">التكاملات</TabsTrigger>
              </TabsList>

              <TabsContent value="thresholds" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h3 className="text-sm font-medium">منخفض (أخضر)</h3>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">0 - {severityThresholds.low}</Label>
                      <Slider
                        value={[severityThresholds.low]}
                        onValueChange={(value) => setSeverityThresholds({ ...severityThresholds, low: value[0] })}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">متابعة فقط - لا يتطلب إجراء فوري</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <h3 className="text-sm font-medium">متوسط (أصفر)</h3>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">
                        {severityThresholds.low + 1} - {severityThresholds.medium}
                      </Label>
                      <Slider
                        value={[severityThresholds.medium]}
                        onValueChange={(value) => setSeverityThresholds({ ...severityThresholds, medium: value[0] })}
                        max={100}
                        min={severityThresholds.low + 1}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">جدولة تفقد خلال 72 ساعة</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h3 className="text-sm font-medium">عالي (أحمر)</h3>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">{severityThresholds.medium + 1} - 100</Label>
                      <div className="h-6 bg-red-100 rounded flex items-center px-2">
                        <span className="text-xs text-red-800">تنبيه فوري + فتح حادث</span>
                      </div>
                      <p className="text-xs text-muted-foreground">تدخل فوري - احتمال إغلاق مسار</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">قنوات الإشعارات</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">البريد الإلكتروني</span>
                        </div>
                        <Switch
                          checked={alertChannels.email}
                          onCheckedChange={(checked) => setAlertChannels({ ...alertChannels, email: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">الرسائل النصية (SMS)</span>
                        </div>
                        <Switch
                          checked={alertChannels.sms}
                          onCheckedChange={(checked) => setAlertChannels({ ...alertChannels, sms: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Webhook className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Webhook</span>
                        </div>
                        <Switch
                          checked={alertChannels.webhook}
                          onCheckedChange={(checked) => setAlertChannels({ ...alertChannels, webhook: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">إشعار داخل النظام</span>
                        </div>
                        <Switch
                          checked={alertChannels.inSystem}
                          onCheckedChange={(checked) => setAlertChannels({ ...alertChannels, inSystem: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">مناوبات الفريق</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المستوى الأول:</span>
                        <span>فهد الأحمد</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المستوى الثاني:</span>
                        <span>نورة السالم</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المستوى الثالث:</span>
                        <span>سارة القحطاني</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                      <Users className="w-3 h-3 ml-2" />
                      تحديث جدول المناوبات
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">التكاملات الخارجية</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Webhook className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">البلدية</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          متصل
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        إرسال تلقائي للحوادث عالية الأولوية إلى نظام البلدية
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          اختبار
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          تكوين
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">الطوارئ</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          متصل
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        تنبيه فوري لخدمات الطوارئ في حالة الحوادث الخطيرة
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          اختبار
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          تكوين
                        </Button>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">مثال Webhook للجهة المختصة:</h4>
                    <div className="bg-muted/30 p-3 rounded text-xs font-mono">
                      <pre className="text-right" dir="ltr">
                        {JSON.stringify(
                          {
                            event: "ROAD_DEFECT_ALERT",
                            level: "RED",
                            incident_id: "INC-1207",
                            defect_type: "هبوط",
                            severity: 88,
                            location: { lat: 27.52, lng: 41.7 },
                            recommended_action: "إغلاق المسار الأيمن مؤقتاً وإرسال فريق صيانة خلال 6 ساعات",
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Status Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>آخر تحديث: {new Date().toLocaleString("ar-SA")}</span>
                <Badge variant="outline" className="text-xs">
                  الإصدار 1.0.0
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>النظام يعمل بشكل طبيعي</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
