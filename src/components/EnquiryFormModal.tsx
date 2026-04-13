import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

const Courses = ["Online BBA", "Online B.Com", "Online Executive MBA", "Diploma/Certification"];

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
];

const EnquiryFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courses: "",
    qualification: "",
    countryCode: "+91",
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // 🚀 SMART RECURRING POPUP LOGIC
  useEffect(() => {
    // Check if user has already submitted successfully in the past
    const hasSubmitted = localStorage.getItem("formSubmitted");
    
    if (hasSubmitted === "true") return; // Exit if info was already retrieved

    const interval = setInterval(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxLVJsKTH14NmIRaEwn1hyXjvJgCsCWklDvPsfTqQoxDB0q0m2oJ_QpjkptfNXBbup_IA/exec";

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          course: formData.courses,
          qualification: formData.qualification || "N/A",
          source: "Recurring Popup",
          timestamp: new Date().toLocaleString(),
        }),
      });

      // ✅ SUCCESS: SET STORAGE TO STOP FUTURE POPUPS
      localStorage.setItem("formSubmitted", "true");
      
      setIsOpen(false);
      alert("Enquiry submitted successfully!");
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative overflow-hidden animate-in fade-in zoom-in duration-300 text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 lg:p-8 pb-0">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="font-display text-2xl font-bold mb-1">Enquire with us</h2>
          <p className="text-sm text-gray-500 mb-6">Get 1-on-1 Career Counselling</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 lg:p-8 pt-0 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input 
              className={`border rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20 ${formErrors.name ? "border-red-500" : "border-gray-200"}`} 
              placeholder="Your name *" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
            <input 
              className={`border rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20 ${formErrors.email ? "border-red-500" : "border-gray-200"}`} 
              placeholder="Your email address *" 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>

          <div className="flex gap-3">
            <select 
              className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm bg-gray-50 text-gray-600 w-[90px] shrink-0 outline-none" 
              value={formData.countryCode} 
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
            >
              {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
            <input 
              className={`border rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20 ${formErrors.phone ? "border-red-500" : "border-gray-200"}`} 
              placeholder="Mobile number *" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })} 
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <select 
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-600 w-full outline-none" 
              value={formData.courses} 
              onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
              required
            >
              <option value="">Select Courses</option>
              {Courses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input 
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20" 
              placeholder="Any other (optional)" 
              value={formData.qualification} 
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} 
            />
          </div>

          <label className="flex items-start gap-2 text-[11px] text-gray-500 leading-tight">
            <input type="checkbox" className="mt-0.5 accent-rose-500 h-4 w-4" defaultChecked />
            <span>I authorize NMIMS University Online and its associates to contact me with updates via email, SMS, WhatsApp, and voice calls.</span>
          </label>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3.5 rounded-xl mt-2 hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
