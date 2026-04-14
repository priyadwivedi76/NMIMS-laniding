import { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const Courses = ["Online BBA", "Online B.Com", "Online Executive MBA", "Diploma/Certification"];

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
];

const EnquiryFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    qualification: "",
    countryCode: "+91",
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    localStorage.removeItem("formSubmitted");
    
    const hasSubmitted = localStorage.getItem("formSubmitted");
  if (hasSubmitted === "true") {
    setSubmitted(true);
    return;
  }

  const interval = setInterval(() => {
    setIsOpen((prev) => {
      // Re-open only if closed AND not submitted via Hero or Popup
      if (!prev && !submitted) {
        return true;
      }
      return prev;
    });
    
    }, 30000);
    return () => clearInterval(interval);
  }, [submitted]);

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email";
    
    if (!formData.phone.trim()) errors.phone = "Mobile number is required";
    else if (formData.phone.length !== 10) errors.phone = "Must be 10 digits";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxKQOCUp5n1oWQnlTLlGGA92RWA487LTsUI_4d5t6jxjSt-o9HTdOP9dTC7hs06SNO1/exec";

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "nmims", 
          name: formData.name,
          email: formData.email,
          phone: formData.countryCode + formData.phone,
          course: formData.course,
          timestamp: new Date().toLocaleString(),
        }),
      });

      localStorage.setItem("formSubmitted", "true");
      setSubmitted(true); // Switch to success view
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative overflow-hidden animate-in fade-in zoom-in duration-300 text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-10"
        >
          <X size={24} />
        </button>

        {submitted ? (
          /* --- SUCCESSFUL MESSAGE VIEW --- */
          <div className="p-10 lg:p-16 text-center animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Enquiry Received!</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Thank you, <span className="font-semibold">{formData.name}</span>. We have received your request for 
              <span className="block font-semibold text-slate-800">{formData.course}</span>
              An academic counselor will reach out to you shortly.
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
            >
              Back to Website <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* --- ORIGINAL FORM VIEW --- */
          <>
            <div className="p-6 lg:p-8 pb-0">
              <h2 className="font-display text-2xl font-bold mb-1">Enquire with us</h2>
              <p className="text-sm text-gray-500 mb-6">Get 1-on-1 Career Counselling</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 lg:p-8 pt-0 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input 
                    className={`border rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20 ${formErrors.name ? "border-red-500" : "border-gray-200"}`} 
                    placeholder="Your name *" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                  {formErrors.name && <p className="text-[10px] text-red-500 ml-1">{formErrors.name}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    className={`border rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20 ${formErrors.email ? "border-red-500" : "border-gray-200"}`} 
                    placeholder="Your email address *" 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  />
                  {formErrors.email && <p className="text-[10px] text-red-500 ml-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1">
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
                    maxLength={10}
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })} 
                  />
                </div>
                {formErrors.phone && <p className="text-[10px] text-red-500 ml-1">{formErrors.phone}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <select 
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-600 w-full outline-none" 
                  value={formData.course} 
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                >
                  <option value="">Select Course</option>
                  {Courses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input 
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-orange-500/20" 
                  placeholder="Qualification" 
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
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3.5 rounded-xl mt-2 hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:grayscale"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : "Submit Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryFormModal;
