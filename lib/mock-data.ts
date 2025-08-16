export const mockCameras = [
  { id: "CAM-01", name: "جسر الملك فهد", status: "active" },
  { id: "CAM-07", name: "القطاع الغربي K-12", status: "active" },
  { id: "CAM-11", name: "طريق الجامعة", status: "inactive" },
]

export const mockDetections = [
  {
    id: "DET-9921",
    camera_id: "CAM-07",
    type: "حفر",
    score: 0.91,
    env_risk: 0.6,
    recurrence: 0.4,
    severity: 84,
    timestamp: "2025-08-15T10:22:05+03:00",
    image_url: "/mock/frames/cam07_102205.jpg",
    location: { lat: 27.52, lng: 41.7 },
  },
  {
    id: "DET-9930",
    camera_id: "CAM-01",
    type: "تشقق شبكي",
    score: 0.74,
    env_risk: 0.3,
    recurrence: 0.1,
    severity: 58,
    timestamp: "2025-08-15T10:31:12+03:00",
    image_url: "/mock/frames/cam01_103112.jpg",
    location: { lat: 24.75, lng: 46.67 },
  },
]

export const mockPredictions = [
  { sector: "K-12", predicted_incidents: 5, window: "2025-08-16..2025-08-22" },
  { sector: "R-5", predicted_incidents: 3, window: "2025-08-16..2025-08-22" },
]

export const mockIncidents = [
  {
    id: "INC-1207",
    type: "هبوط",
    severity: 88,
    status: "جديد",
    assignee: "فهد",
    sector: "K-12",
    last_update: "2025-08-15T10:35:00+03:00",
  },
  {
    id: "INC-1203",
    type: "حفر",
    severity: 73,
    status: "قيد المعالجة",
    assignee: "نورة",
    sector: "R-5",
    last_update: "2025-08-15T09:02:00+03:00",
  },
]

export const alertRules = {
  R1: "إذا severity ≥ 80 → إشعار أحمر + إنشاء Incident تلقائياً",
  R2: "إذا تعدّى نفس الموقع العتبة ≥ 3 مرات خلال 10 دقائق → تصعيد مستوى 2",
  R3: "أصفر مستمر > 24 ساعة دون معالجة → تحويله إلى حادث أولوية متوسطة",
  R4: "تغير مفاجئ في الانحدار (Δشدة ≥ 20 خلال ساعة) → تنبيه استباقي خطر تفاقم",
}

export const mockWebhookPayload = {
  event: "ROAD_DEFECT_ALERT",
  level: "RED",
  incident_id: "INC-1207",
  defect_type: "هبوط",
  severity: 88,
  location: { lat: 27.52, lng: 41.7 },
  recommended_action: "إغلاق المسار الأيمن مؤقتاً وإرسال فريق صيانة خلال 6 ساعات",
}
