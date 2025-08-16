import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Brain, Shield, TrendingDown, Zap, Users, LogIn } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qBZDK08yC9bRhwAGwD4UABiEgUIm91.png"
                  alt="مَسَارِن - نظام رصد الطرق الذكي"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary font-space-grotesk tracking-wide">مَسَارِن</span>
                <span className="text-xs text-muted-foreground font-medium">نظام رصد الطرق الذكي</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                الميزات
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                آلية العمل
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                تواصل معنا
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <LogIn className="w-4 h-4" />
                  دخول الإدارة
                </Button>
              </Link>
              <a href="https://youtu.be/alQEIz5MCos?si=arVO4ojMtbbx66mf" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90">طلب عرض توضيحي</Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">تقنية الذكاء الاصطناعي المتقدمة</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground font-space-grotesk leading-tight">
              مَسَارِن – نظام موحّد لرصد وتشخيص وتشغيل الصيانة الوقائية للطرق
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              منصة ذكية تعتمد على الرؤية الحاسوبية والتنبؤ الاستباقي، لتحويل بيانات الطرق إلى قرارات عملية ترفع السلامة
              وتخفض تكاليف الصيانة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#how-it-works" className="scroll-smooth">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 w-full">
                  شاهد كيف يعمل
                </Button>
              </a>
              <a href="https://youtu.be/alQEIz5MCos?si=arVO4ojMtbbx66mf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  طلب عرض توضيحي
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">تحديات صيانة الطرق اليوم</h2>
            <p className="text-lg text-muted-foreground">المشاكل الحالية التي تواجه إدارة وصيانة الطرق في المنطقة</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ارتفاع تكاليف الصيانة الطارئة",
                description: "الصيانة التفاعلية تكلف أكثر من الوقائية بنسبة تصل إلى 300%",
              },
              {
                title: "صعوبة اكتشاف التشوهات مبكراً",
                description: "الفحص اليدوي بطيء وغير دقيق ولا يغطي جميع المناطق",
              },
              {
                title: "غياب التكامل بين الرصد والتنبؤ",
                description: "عدم وجود نظام موحد يربط بين البيانات الحالية والتوقعات المستقبلية",
              },
              {
                title: "التأثير على السلامة المرورية",
                description: "التأخير في اكتشاف المخاطر يؤدي إلى حوادث وإصابات",
              },
            ].map((problem, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{problem.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">حل ذكي وشامل – مَسَارِن</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "مَسَارِن" يوحّد بين الرصد الفوري عبر كاميرات صناعية مدعومة بنموذج YOLOv8-Seg والتنبؤ الذكي عبر XGBoost أو
              LSTM، لتقديم خريطة زمنية/مكانية للمخاطر، مما يتيح الصيانة الوقائية المخططة بدل الطارئة.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-4 items-center">
              {[
                { icon: Camera, title: "الرصد البصري", subtitle: "YOLOv8-Seg" },
                { icon: Brain, title: "دمج البيانات", subtitle: "البيئية والتاريخية" },
                { icon: Zap, title: "التحليل التنبؤي", subtitle: "XGBoost / LSTM" },
                { icon: Shield, title: "خريطة المخاطر", subtitle: "زمنية ومكانية" },
                { icon: Users, title: "خطة الصيانة", subtitle: "وقائية مخططة" },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  {index < 4 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border transform translate-x-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">لماذا مَسَارِن مختلف؟</h2>
            <p className="text-lg text-muted-foreground">الميزات التي تجعل نظامنا الخيار الأمثل لإدارة الطرق الذكية</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "رصد دقيق وفوري",
                description: "كشف التشققات والحفر والهبوطات بدقة عالية باستخدام تقنيات الرؤية الحاسوبية المتقدمة",
              },
              {
                icon: Brain,
                title: "تنبؤ استباقي",
                description:
                  "تحديد متى وأين تتفاقم المشاكل قبل وقوعها باستخدام خوارزميات التعلم الآلي ويكون رصد الى مؤتمت بالكامل",
              },
              {
                icon: TrendingDown,
                title: "تكاليف أقل",
                description: "خفض الصيانة الطارئة بنسبة 30–50% من خلال التخطيط المسبق والصيانة الوقائية",
              },
              {
                icon: Zap,
                title: "مرونة التركيب",
                description:
                  "يعمل النظام على الطرق الجديدة والقائمة، مع إمكانية دمجه في الكاميرات الجديدة والموجودة مسبقاً مما يقلل التكاليف ويُسرّع الانتشار",
              },
              {
                icon: Shield,
                title: "تكامل ذكي",
                description: "يعمل مع أنظمة المدن الذكية الحالية ويدعم التكامل مع الأنظمة الحكومية",
              },
              {
                icon: Users,
                title: "واجهة سهلة الاستخدام",
                description: "لوحة تحكم تفاعلية تقدم رؤى واضحة وتوصيات عملية للفرق التقنية",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">كيف يعمل مَسَارِن؟</h2>
            <p className="text-lg text-muted-foreground">خطوات بسيطة لتحويل بيانات الطرق إلى قرارات ذكية</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "الرصد البصري الفوري",
                  description: "باستخدام كاميرات صناعية على الحافة لالتقاط صور عالية الدقة للطرق",
                },
                {
                  step: "2",
                  title: "تحليل الصور",
                  description: "عبر نموذج YOLOv8-Seg مُعاد التدريب لاكتشاف وتصنيف التشوهات بدقة عالية",
                },
                {
                  step: "3",
                  title: "دمج البيانات",
                  description: "مع معلومات الطقس وحركة المرور وسجلات الصيانة لفهم شامل للوضع",
                },
                {
                  step: "4",
                  title: "التنبؤ بالمخاطر",
                  description: "عبر XGBoost أو LSTM لتوقع تطور المشاكل والمخاطر المستقبلية",
                },
                {
                  step: "5",
                  title: "التوصيات والصيانة الوقائية",
                  description: "عبر لوحة تحكم تفاعلية تقدم خطط صيانة مخصصة وتوصيات عملية",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">مرن لكل بيئة طريق</h2>
            <p className="text-lg text-muted-foreground">
              حلول ذكية مخصصة للطرق الجديدة والقائمة، تبدأ من الرصد وتنتهي بالإصلاح الاستباقي
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">الطرق الجديدة</CardTitle>
                <CardDescription className="text-lg">مؤتمت بالكامل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>رصد من اليوم الأول للتشغيل</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>تخطيط مسبق لدورة حياة الطريق</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">الطرق القائمة</CardTitle>
                <CardDescription className="text-lg">حلول مرنة للطرق الموجودة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>تحليل شامل للوضع الحالي</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>خطط صيانة مخصصة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>تحسين دورة حياة الطريق</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">القيمة التي يقدمها مَسَارِن</h2>
            <p className="text-lg text-muted-foreground">فوائد ملموسة لإدارة الطرق والمدن الذكية</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "رفع السلامة",
                description: "عبر الإنذار المبكر والتدخل السريع",
                metric: "↑85%",
              },
              {
                title: "خفض النفقات",
                description: "التشغيلية والصيانة الطارئة",
                metric: "↓50%",
              },
              {
                title: "تسهيل التخطيط",
                description: "المسبق والميزانيات المستقبلية",
                metric: "↑90%",
              },
              {
                title: "تعزيز الاستدامة",
                description: "البنية التحتية وعمرها الافتراضي",
                metric: "↑70%",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-primary">{value.metric}</div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-space-grotesk">هل تريد تجربة مَسَارِن في مدينتك؟</h2>
            <p className="text-lg text-muted-foreground">تواصل معنا لطلب عرض توضيحي أو شراكة</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم</label>
                    <Input placeholder="اسمك الكامل" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الجهة</label>
                  <Input placeholder="اسم المؤسسة أو الجهة" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الرسالة</label>
                  <Textarea placeholder="أخبرنا عن احتياجاتك ومتطلبات مشروعك..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-3">إرسال الطلب</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 font-space-grotesk">شركاؤنا في التطوير</h2>
            <p className="text-muted-foreground">بدعم من هيئة تطوير منطقة عسير وهاكثون عسير تبتكر</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Aseer Development Authority Logo */}
            <div className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4%5B1%5D-4E34Wu5cIdeKRwURaZKjXSPqM2DrsL.png"
                alt="هيئة تطوير منطقة عسير"
                className="h-16 lg:h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Aseer Innovates Hackathon Logo */}
            <div className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-4 bg-amber-600 rounded-sm transform rotate-45"></div>
                    <div className="w-4 h-4 bg-red-600 rounded-sm transform rotate-45"></div>
                    <div className="w-4 h-4 bg-green-600 rounded-sm transform rotate-45"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">عسير</div>
                    <div className="text-lg font-bold text-foreground border-b-2 border-foreground">تبتكر</div>
                    <div className="text-xs text-muted-foreground mt-1">جاهز للتحدي؟</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aseer Region Colorful Logo */}
            <div className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex gap-0.5">
                      <div className="w-3 h-3 bg-amber-500 transform rotate-45"></div>
                      <div className="w-3 h-3 bg-red-500 transform rotate-45"></div>
                      <div className="w-3 h-3 bg-green-500 transform rotate-45"></div>
                    </div>
                    <div className="flex gap-0.5 justify-center">
                      <div className="w-3 h-3 bg-blue-500 transform rotate-45"></div>
                      <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground">منطقة عسير</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">مشروع مَسَارِن تم تطويره ضمن هاكثون عسير تبتكر 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qBZDK08yC9bRhwAGwD4UABiEgUIm91.png"
                  alt="مَسَارِن"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold text-sidebar-primary font-space-grotesk">مَسَارِن</span>
              </div>
              <p className="text-sidebar-foreground/80 text-sm leading-relaxed">
                نظام ذكي لرصد وصيانة الطرق باستخدام الذكاء الاصطناعي والرؤية الحاسوبية
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-sidebar-foreground">المنتج</h3>
              <ul className="space-y-2 text-sm text-sidebar-foreground/80">
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    الميزات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    آلية العمل
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    الأسعار
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    دراسات الحالة
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-sidebar-foreground">الدعم</h3>
              <ul className="space-y-2 text-sm text-sidebar-foreground/80">
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    التوثيق
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    الدعم التقني
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    التدريب
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    المجتمع
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-sidebar-foreground">الشركة</h3>
              <ul className="space-y-2 text-sm text-sidebar-foreground/80">
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    الأخبار
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    الوظائف
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
            <p className="text-sm text-sidebar-foreground/60">© 2025 مَسَارِن. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
