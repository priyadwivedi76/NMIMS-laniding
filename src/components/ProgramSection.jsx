import { CheckCircle2, GraduationCap, Info,Clock,Award, BookOpen, Trophy } from "lucide-react";
import { useState } from "react";
const ProgramSection = () => {

  const [activeTab, setActiveTab] = useState("MBA");

  const programs = {
    MBA: {
      title: "Master of Business Administration",
      duration: "2 Years (4 Semesters)",
      description: "A premier program designed for working professionals to master strategic leadership and data-driven decision making.",
      highlights: ["Dual Specialization Options", "Global Alumni Network", "Masterclasses by CXOs"],
      subjects: ["Strategic Management", "Business Analytics", "Corporate Finance", "Digital Leadership"],
      color: "from-indigo-600 to-indigo-900",
      bgLight: "bg-indigo-400",
      eligibility: {
        title: "Bachelor's Degree",
        criteria: "Min. 50% Marks (45% for Reserved)",
        note: "UGC/AIU recognized University"
      },
    },
    BBA: {
      title: "Bachelor of Business Administration",
      duration: "3 Years (6 Semesters)",
      description: "Designed to create future business leaders with a focus on management, entrepreneurship, and strategy.",
      highlights: ["Industry-Integrated Curriculum", "Live Project Experience", "Global Business Insights"],
      subjects: ["Principles of Management", "Marketing Research", "Business Law", "HR Management"],
      color: "from-orange-500 to-rose-500",
      bgLight: "bg-orange-50",
      eligibility: {
        title: "10+2 / HSC Pass",
        criteria: "Min. 50% Marks (45% for Reserved)",
        note: "Recognized State/Central Board"
      },
    },
    BCOM: {
      title: "Bachelor of Commerce",
      duration: "3 Years (6 Semesters)",
      description: "A comprehensive program focused on financial literacy, accounting standards, and modern trade practices.",
      highlights: ["Advanced Excel Training", "GST & Taxation Focus", "Financial Modeling"],
      subjects: ["Corporate Accounting", "Financial Markets", "Business Economics", "Auditing"],
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      eligibility: {
        title: "10+2 / HSC Pass",
        criteria: "Commerce Stream Preferred",
        note: "Recognized State/Central Board"
      },
    }
  };

  // Logic to handle 3 tabs
  const current = programs[activeTab] || programs.MBA;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4 font-display">Our Flagship Programs</h2>
          <p className="text-slate-500">UGC-DEB entitled programs designed for the digital age.</p>
        </div>

        {/* Tab Switcher - Updated for 3 tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap justify-center gap-2">
            {["MBA", "BBA", "BCOM"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] ${
                  activeTab === tab 
                  ? `bg-white text-slate-900 shadow-md scale-[1.02]` 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {tab === "MBA" ? "Online MBA" : tab === "BBA" ? "Online BBA" : "Online B.Com"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Info Card */}
          <div className={`p-8 lg:p-12 flex flex-col gap-3 items-start justify-start rounded-[3rem] ${current.bgLight} border border-white transition-all duration-500`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white text-sm font-bold mb-6 shadow-sm border border-slate-100`}>
              <Clock size={16} className="text-slate-600" /> {current.duration}
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{current.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {current.description}
            </p>

            <div className="space-y-4 mb-10">
              {current.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`p-1 rounded-full bg-gradient-to-br ${current.color} text-white`}>
                    <CheckCircle2 size={16} />
                  </div> 
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}

              <div className="mt-24 text-center">
                    <button 
                    onClick={() => scrollTo("enquiry")}
                        className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200"
                    >
                        Download Brochure
                    </button>
                </div>
            </div>
          </div>

          {/* Right: Course Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-full mb-2">
              <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {/* <BookOpen className="text-slate-400" /> Key Subjects */}
              </h4>
            </div>
            {current.subjects.map((sub, idx) => (
              <div 
                key={idx} 
                className="group p-6 border-2 border-slate-50 rounded-2xl bg-red-300 hover:border-white hover:bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-800 group-hover:bg-slate-200 transition-colors mb-4">
                  <GraduationCap size={20} />
                </div>
                <p className="font-bold text-slate-800 leading-tight">{sub}</p>
                </div>
            ))}
            
            {/* Eligibility Badge */}
            <div className="col-span-full rounded-md mt-4 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group border border-white/10 shadow-2xl">
              {/* Background Icon */}
              {/* <GraduationCap className="absolute -right-4 -bottom-4 text-white/10 w-28 h-28 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700" /> */}
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-bold">Eligibility Criteria</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold mb-1">{current.eligibility.title}</p>
                    <p className="text-sm text-indigo-300 font-semibold">{current.eligibility.criteria}</p>
                  </div>
                  
                  <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
                    <p className="text-[11px] opacity-50 flex items-center gap-2 md:justify-end">
                      <Info size={12} /> {current.eligibility.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;