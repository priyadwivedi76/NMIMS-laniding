import { CheckCircle2, GraduationCap, Clock, BookOpen, Trophy } from "lucide-react";
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
      bgLight: "bg-indigo-400"
    },
    BBA: {
      title: "Bachelor of Business Administration",
      duration: "3 Years (6 Semesters)",
      description: "Designed to create future business leaders with a focus on management, entrepreneurship, and strategy.",
      highlights: ["Industry-Integrated Curriculum", "Live Project Experience", "Global Business Insights"],
      subjects: ["Principles of Management", "Marketing Research", "Business Law", "HR Management"],
      color: "from-orange-500 to-rose-500",
      bgLight: "bg-orange-50"
    },
    BCOM: {
      title: "Bachelor of Commerce",
      duration: "3 Years (6 Semesters)",
      description: "A comprehensive program focused on financial literacy, accounting standards, and modern trade practices.",
      highlights: ["Advanced Excel Training", "GST & Taxation Focus", "Financial Modeling"],
      subjects: ["Corporate Accounting", "Financial Markets", "Business Economics", "Auditing"],
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50"
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
          <div className={`p-8 lg:p-12 rounded-[3rem] ${current.bgLight} border border-white transition-all duration-500`}>
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
            </div>
          </div>

          {/* Right: Course Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-full mb-2">
              <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="text-slate-400" /> Key Subjects
              </h4>
            </div>
            {current.subjects.map((sub, idx) => (
              <div 
                key={idx} 
                className="group p-6 border-2 border-slate-50 rounded-2xl bg-red-300 hover:border-white hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-4">
                  <GraduationCap size={20} />
                </div>
                <p className="font-bold text-slate-800 leading-tight">{sub}</p>
              </div>
            ))}
            
            {/* Trust Badge */}
            <div className="col-span-full mt-6 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
               <Trophy className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
               <p className="text-sm opacity-70 mb-1 uppercase tracking-widest">Accreditation</p>
               <p className="text-xl font-bold">NAAC A+ Accredited University</p>
               <p className="text-xs opacity-60 mt-2 leading-relaxed">Recognized globally for excellence in distance and online education.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramSection;