import { useState, useRef, useEffect } from "react";
import { FileText, CreditCard,TrendingUp, Users,UserCheck, Megaphone, Monitor, BarChart3, Database, Settings, Briefcase, Info, Clock, Star, ArrowRight} from "lucide-react";
import { Menu, X, ChevronDown, ChevronRight, Download,  ChevronLeft, Phone, MessageCircle, ArrowUp, Award, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import EnquiryFormModal from "@/components/EnquiryFormModal";
import heroImg from "@/assets/hero-student.png";
import nmimsLogo from "@/assets/nmims-logo.png";
import programBachelor from "@/assets/program-bachelor.png";
import programExecutive from "@/assets/program-executive.png";
import programOnline from "@/assets/program-online.png";
import sampleCertificate from "@/assets/sample-certificate.png";
import { submitEnquiry } from "@/lib/api";

const NAV_LINKS = ["Programs", "Sample Certificate", "Admission Process", "FAQ"];

const PROGRAMS = [
  { name: "Bachelor Programs", mode: "ONLINE", image: programBachelor, bg: "bg-rose-50" },
  { name: "MBA Working Executive", mode: "DEGREE IN ONLINE MODE", image: programExecutive, bg: "bg-purple/20" },
  // { name: "Online MBA", mode: "DEGREE IN ONLINE MODE", image: programOnline, bg: "bg-purple/30" },
];

const Courses = [
  "Online BBA", "Online B.Com", "Online Executive MBA", "Diploma/Certification"
];

const achievements = [
    { 
      icon: <Award className="text-orange-500" size={32} />, 
      title: "NAAC A++", 
      desc: "Accreditation (3.67) – 4th consecutive cycle 2025",
      badge: "Top Tier"
    },
    { 
      icon: <GraduationCap className="text-rose-500" size={32} />, 
      title: "UGC Category-1", 
      desc: "Autonomy granted since 2018 for excellence",
      badge: "National"
    },
    { 
      icon: <BookOpen className="text-orange-500" size={32} />, 
      title: "Top 100", 
      desc: "Consistently ranked among Universities by NIRF",
      badge: "Ranked"
    },
    { 
      icon: <Users className="text-rose-500" size={32} />, 
      title: "50+ Partners", 
      desc: "Hiring network of corporates, MNCs & startups",
      badge: "Global"
    },
  ];

const FAQS = [
  { q: "Is the NMIMS CDOE's Online MBA UGC-Entitled?", a: "Yes, NMIMS Online MBA is UGC-entitled and the degree holds the same value as an on-campus degree." },
  { q: "What specializations are offered in the NMIMS Online MBA?", a: "Marketing Management, Business Management, Financial Management, Human Resource Management, and Operations & Data Science Management." },
  { q: "What are the eligibility criteria for NMIMS Online MBA?", a: "Bachelor's degree in any discipline with minimum 50% marks (45% for SC/ST/OBC/PwD) from a recognized university." },
  // { q: "What are career prospects after NMIMS Online MBA?", a: "Graduates can pursue roles in management, consulting, marketing, finance, HR, and operations across industries." },
  // { q: "Do I need prior work experience to apply?", a: "No, prior work experience is not mandatory for admission to the NMIMS Online MBA program." },
];

const ADMISSION_STEPS = [
  { title: "Registration", icon: FileText, color: "from-orange-400 to-rose-500" },
  { title: "Fee Payment", icon: CreditCard, color: "from-indigo-500 to-indigo-600" },
  { title: "Verification", icon: UserCheck, color: "from-blue-400 to-cyan-500" },
  { title: "Admission", icon: GraduationCap, color: "from-emerald-400 to-teal-500" }
];

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+82", country: "South Korea" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+63", country: "Philippines" },
  { code: "+62", country: "Indonesia" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+92", country: "Pakistan" },
  { code: "+880", country: "Bangladesh" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+977", country: "Nepal" },
];

const features = [
    { 
      icon: <BookOpen className="text-white" size={24} />, 
      title: "Flexible Learning", 
      desc: "Access the Student Zone on portal and mobile app. Learn seamlessly across devices at your own pace.",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <GraduationCap className="text-white" size={24} />, 
      title: "Digital Ecosystem", 
      desc: "Comprehensive E-books, academic journals, and lecture transcripts available 24/7 for deep immersion.",
      gradient: "from-indigo-500 to-indigo-500"
    },
    { 
      icon: <Users className="text-white" size={24} />, 
      title: "Success Support", 
      desc: "Direct access to our Student Success Team via a high-priority ticketing tool and callback scheduling.",
      gradient: "from-rose-500 to-orange-500"
    },
    { 
      icon: <Award className="text-white" size={24} />, 
      title: "Elite Faculty", 
      desc: "Curriculum designed by industry practitioners and taught by veteran doctorates for real-world impact.",
      gradient: "from-emerald-500 to-teal-500"
    },
  ];

const Index = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalShownByScroll, setModalShownByScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    courses: "", 
    qualification: "", 
    countryCode: "+91" 
  });

  const SPECIALIZATIONS = [
  { 
    title: "Finance Management", 
    icon: <TrendingUp size={24} />, 
    color: "from-blue-500 to-cyan-600",
    desc: "Investment banking, corporate finance, and wealth management." 
  },
  { 
    title: "Human Resources", 
    icon: <Users size={24} />, 
    color: "from-orange-500 to-rose-600",
    desc: "Talent acquisition, employee engagement, and strategic HR." 
  },
  { 
    title: "Marketing Management", 
    icon: <Megaphone size={24} />, 
    color: "from-indigo-400 to-indigo-600",
    desc: "Digital marketing, brand management, and consumer behavior." 
  },
  { 
    title: "Information Technology", 
    icon: <Monitor size={24} />, 
    color: "from-emerald-500 to-teal-600",
    desc: "Cloud computing, IT infrastructure, and digital transformation." 
  },
  { 
    title: "Business Analytics", 
    icon: <BarChart3 size={24} />, 
    color: "from-amber-500 to-orange-600",
    desc: "Predictive modeling, data visualization, and decision science." 
  },
  { 
    title: "Data Science", 
    icon: <Database size={24} />, 
    color: "from-indigo-600 to-blue-700",
    desc: "Machine learning, big data, and statistical analysis." 
  },
  { 
    title: "Operations Management", 
    icon: <Settings size={24} />, 
    color: "from-slate-600 to-slate-800",
    desc: "Supply chain, logistics, and process optimization." 
  },
  { 
    title: "Business Management", 
    icon: <Briefcase size={24} />, 
    color: "from-rose-600 to-pink-600",
    desc: "Entrepreneurship, strategy, and global business leadership." 
  }
];

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const handleHeroSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // 🔗 REPLACE with your Apps Script Web App URL
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw_MLbkXmZoLqG4oTxgwX0Nm23VA2IGKpPxgc6UQ1dlgJhq3Ovf_Ps0XeL0IYMgS9s7_A/exec";

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", 
        source: "nmims"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          course: formData.courses,
          // qualification: formData.qualification || "N/A",
          source: "Hero Section", // Helps you track lead source in the sheet
          timestamp: new Date().toLocaleString(),
        }),
      });

      localStorage.setItem("formSubmitted", "true");
      console.log(formData.phone)
      alert("Enquiry submitted successfully!");
      
      // Reset form
      setFormData({
        name: "", email: "", phone: "", courses: "", qualification: "", countryCode: "+91"
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (modalShownByScroll) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.35) {
        setShowModal(true);
        setModalShownByScroll(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [modalShownByScroll]);

  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.phone.trim()) errors.phone = "Mobile number is required";
    else if (!/^\d{7,15}$/.test(formData.phone)) errors.phone = "Invalid number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <img src={nmimsLogo} alt="NMIMS Centre for Distance and Online Education" className="h-10 object-contain" />
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, "-"))} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo("enquiry")} className="gradient-coral text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Enquire Now
            </button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-card border-t p-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, "-"))} className="block w-full text-left text-sm text-muted-foreground">
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="enquiry" className="gradient-hero">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-coral leading-tight mb-8">
              Uplift Your Career with NMIMS Online MBA
            </h1>
            {/* Form */}
            <div className="bg-card rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Enquire with us</h2>
              <p className="text-sm text-muted-foreground mb-5">Get 1-on-1 Career Counselling</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <input className={`border rounded-lg px-4 py-2.5 text-sm bg-background w-full ${formErrors.name ? "border-destructive" : ""}`} placeholder="Your name *" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }); }} />
                  {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <input className={`border rounded-lg px-4 py-2.5 text-sm bg-background w-full ${formErrors.email ? "border-destructive" : ""}`} placeholder="Your email address *" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }); }} />
                  {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <select className="border rounded-lg px-2 py-2.5 text-sm bg-muted text-muted-foreground w-[90px] shrink-0" value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}>
                  {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}
                </select>
                <div className="flex-1">
                  <input maxLength={10} className={`border rounded-lg px-4 py-2.5 text-sm bg-background w-full ${formErrors.phone ? "border-destructive" : ""}`} placeholder="Mobile number *" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") }); setFormErrors({ ...formErrors, phone: undefined }); }} />
                  {formErrors.phone && <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <select className="border rounded-lg px-4 py-2.5 text-sm bg-background text-muted-foreground" value={formData.courses} onChange={(e) => setFormData({ ...formData, courses: e.target.value })}>
                  <option value="">Select Courses</option>
                  {Courses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input className="border rounded-lg px-4 py-2.5 text-sm bg-background" placeholder="Any other (optional)" maxLength={20} value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
              </div>
              <label className="flex items-start gap-2 mt-4 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5 accent-coral" defaultChecked />
                I authorize NMIMS University Online and its associates to contact me with updates via email, SMS, WhatsApp, and voice calls.
              </label>
              <button onClick={handleHeroSubmit} disabled={isSubmitting} className="w-full gradient-coral text-primary-foreground font-semibold py-3 rounded-lg mt-5 hover:opacity-90 transition-opacity">
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-lavender rounded-3xl overflow-hidden relative h-[500px]">
              <img src={heroImg} alt="NMIMS Online MBA Student" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[480px] object-contain" width={600} height={700} />
              <div className="absolute top-6 left-6 bg-card rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-display font-black text-purple">24×7</p>
                <p className="text-xs text-muted-foreground">access to all live &<br />recorded lectures</p>
              </div>
              <div className="absolute top-6 right-6 gradient-purple rounded-xl px-4 py-3 text-primary-foreground">
                <p className="text-xl font-display font-bold">Explore</p>
                <p className="text-xs opacity-90">world-class<br />study resources</p>
              </div>
              <div className="absolute bottom-24 right-6 bg-card rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-display font-black text-purple">30+</p>
                <p className="text-xs text-muted-foreground">Programs designed for<br />working professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approvals */}
      <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
            Approvals and Rankings
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Recognized by India's top accrediting bodies for maintaining the highest standards of academic excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <div 
              key={i} 
              className="group relative bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle Background Decoration */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-orange-50 transition-colors duration-300" />
              
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
                
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                  {item.badge}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  { item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Eligibility */}
      <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
            Eligibility Criteria
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-purple-600 to-rose-500 mx-auto rounded-full" />
        </div>

        {/* HOVER LOGIC: 
            1. Added 'group' to the parent.
            2. Added 'transition-all duration-500'.
            3. Added 'hover:bg-purple-50/50' and 'hover:border-purple-200'.
        */}
        <div className="group relative overflow-hidden bg-slate-50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 transition-all duration-500 hover:bg-purple-50/50 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5">
          
          {/* Subtle Background Icon that reacts to hover */}
          <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:text-purple-600 group-hover:opacity-10">
            <GraduationCap size={240} />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight transition-colors duration-500 group-hover:text-purple-900">
                Academic Foundation <br /> 
                <span className="text-purple-600">Bachelor's Degree</span>
              </h3>
              <p className="text-slate-600 leading-relaxed transition-colors duration-500 group-hover:text-slate-700">
                Candidates must hold a Bachelor's Degree (10+2+3) in any discipline from a recognized University or an equivalent degree recognized by the AIU.
              </p>
            </div>

            {/* Right Column: Key Stats Boxes */}
            <div className="space-y-4">
              {/* Box 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">General Category</p>
                  <p className="text-xl font-bold text-slate-900">Min. 50% Marks</p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reserved Category</p>
                  <p className="text-xl font-bold text-slate-900">45% (SC/ST/OBC/PwD)</p>
                </div>
              </div>

              <div className="flex items-start gap-2 px-2 mt-4 text-xs text-slate-400 italic">
                <Info size={14} className="mt-0.5 shrink-0" />
                <span>Degrees must be from a UGC/AIU recognized institution.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Learning Experience */}
      <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/3 text-left">
            <h2 className="font-display text-4xl font-bold text-slate-900 leading-tight">
              A Learning Experience <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-500">
                Beyond Boundaries
              </span>
            </h2>
            <p className="mt-6 text-slate-600 text-lg">
              We've combined technology with academic rigor to create a student-centric ecosystem that fits your lifestyle.
            </p>
            <button className="mt-8 flex items-center gap-2 font-bold text-purple-600 hover:text-purple-700 transition-colors group">
              Explore Student Portal 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Interactive Grid */}
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 relative">
            {/* Decorative Background Blur */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />

            {features.map((item, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      </section>

      {/* Specialization */}
      <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">MBA Specializations</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Choose a path that aligns with your career goals. Explore our industry-aligned specializations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALIZATIONS.map((spec, i) => (
            <div 
              key={i}
              // 2. Added cursor-pointer so the whole card feels clickable
              onClick={() => setShowModal(true)}
              className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${spec.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                {spec.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-900 transition-colors">
                {spec.title}
              </h3>
              <p className="text-sm text-slate-500 group-hover:text-slate-800 leading-relaxed mb-6">
                {spec.desc}
              </p>

              {/* 3. The link is now just a visual guide since the whole card is clickable */}
              <div className="flex items-center text-xs font-bold uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 text-indigo-600">
                View Curriculum <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200"
          >
            Download Full Brochure
          </button>
        </div>
      </div>
    </section>

      {/* Sample Certificate */}
      <section id="sample-certificate" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden">
          
          {/* Decorative Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl opacity-60" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Side: Content */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
                  Earn a Degree of <br />
                  <span className="text-orange-600">Global Recognition</span>
                </h2>
                <p className="text-slate-500 text-lg">
                  Your hard work culminates in a prestigious certification from NMIMS, opening doors to top-tier global opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Official certificate from NMIMS upon successful program completion.",
                  "Recognized by UGC-DEB for higher education and government roles.",
                  "WES accredited for international job opportunities (Canada/USA).",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-orange-100 hover:bg-orange-50/30 transition-all duration-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                    <p className="text-slate-700 font-medium">{text}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200"
              >
                <Download size={20} />
                Download Sample PDF
              </button>
            </div>

            {/* Right Side: 3D Certificate Mockup */}
           <div className="relative group perspective-1000">
              <div className="relative w-full max-w-[400px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)rotateX(5deg)]">
                
                {/* The "Frame" */}
                <div className="rounded-2xl p-3 bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                  <div className="rounded-xl overflow-hidden border-4 border-white bg-white">
                    <img 
                      src={sampleCertificate} 
                      alt="NMIMS Sample Certificate" 
                      className="w-full h-auto"
                      loading="lazy" 
                    />
                  </div>
                </div>

                {/* Floating Badge Label */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified</p>
                    <p className="text-sm font-bold text-slate-900">UGC Recognized</p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified</p>
                    <p className="text-sm font-bold text-slate-900">AICTE Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Modal for Enquiry Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><X /></button>
              <h2 className="text-2xl font-bold mb-2">View Certificate</h2>
              <p className="text-slate-500 mb-6 text-sm">Submit your details to view the full resolution sample certificate.</p>
              <div className="space-y-4">
                <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="Full Name" />
                <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="Mobile Number" />
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">Get Access Now</button>
              </div>
           </div>
        </div>
      )}
    </section>

      {/* Admission Process */}
      <section id="admission-process" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Simple 4-Step Admission Process
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Kickstart your career journey with our streamlined, completely digital onboarding experience.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {ADMISSION_STEPS.map((step, i) => {
                // 2. We extract the icon component here
                const IconComponent = step.icon;
                
                return (
                  <div key={i} className="group flex flex-col items-center">
                    <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 shadow-xl transition-transform duration-300 group-hover:-translate-y-2`}>
                      <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center relative overflow-hidden">
                        <span className="absolute top-1 left-2 text-[10px] font-black text-slate-100">0{i + 1}</span>
                        
                        {/* 3. Replaced the gradient text trick with a direct stroke color for better reliability */}
                        <div className="relative z-10">
                          <IconComponent size={28} className={`stroke-[1.5px] text-slate-800`} />
                          {/* Alternative for gradient icons: use a simple class if the clip-text fails */}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <div className="lg:hidden h-1 w-10 bg-slate-200 mx-auto rounded-full mb-2" />
                      <p className="text-xs text-slate-500 px-4 leading-relaxed uppercase tracking-widest font-semibold">
                        Step {i + 1}
                      </p>
                    </div>

                    {i < ADMISSION_STEPS.length - 1 && (
                      <div className="lg:hidden mt-4 text-slate-300">
                        <ChevronRight size={24} className="rotate-90 sm:rotate-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-slate-400 italic">
              * Documents required: 10th/12th Marksheet, Graduation Degree, & Govt ID.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-background rounded-xl border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} size={18} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-foreground/60 text-sm">© 2025 NMIMS Online MBA. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-12 h-12 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity">
          <ArrowUp size={20} />
        </button>
        <a href="https://wa.me/message/5NJ3AZLMHOTSE1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-emerald-500 text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity">
          <MessageCircle size={20} />
        </a>
        <a href="tel:9810453823" className="w-12 h-12 rounded-full gradient-coral text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity">
          <Phone size={20} />
        </a>
      </div>
      <EnquiryFormModal />
    </div>
  );
};

export default Index;
