import React from 'react';
import { Quote } from 'lucide-react';

const AlumniSection = () => {
  const alumni = [
    { 
      name: "Rahul Sharma", 
      company: "Google", 
      role: "Product Manager", 
      image: "https://i.pravatar.cc/150?u=1",
      quote: "The flexible curriculum allowed me to balance my job while gaining the strategic skills needed for a PM role at Google."
    },
    { 
      name: "Sneha Kapoor", 
      company: "Microsoft", 
      role: "Software Engineer", 
      image: "https://i.pravatar.cc/150?u=2",
      quote: "Practical assignments and industry-aligned subjects gave me the confidence to ace my technical interviews."
    },
    { 
      name: "Amit Verma", 
      company: "Amazon", 
      role: "Data Scientist", 
      image: "https://i.pravatar.cc/150?u=3",
      quote: "The Business Analytics specialization was a game-changer. I transitioned from sales to data science within 6 months."
    },
    { 
      name: "Priya Das", 
      company: "Deloitte", 
      role: "Financial Analyst", 
      image: "https://i.pravatar.cc/150?u=4",
      quote: "Highly recommend for working professionals. The global networking opportunities are truly unmatched."
    }
  ];

  const scrollAlumni = [...alumni, ...alumni, ...alumni]; // Increased repeat for smoother flow

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Voices of Success</h2>
        <p className="text-slate-500 max-w-xl mx-auto italic">
          "Join thousands of graduates who have redefined their career trajectory."
        </p>
      </div>

      {/* Infinite Scroll Wrapper */}
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap gap-8 py-10">
          {scrollAlumni.map((person, idx) => (
            <div 
              key={idx} 
              className="w-[350px] group flex-shrink-0 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:bg-indigo-600 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200 cursor-default"
            >
              {/* Quote Icon - Color flips on hover */}
              <Quote className="text-indigo-600 mb-6 group-hover:text-indigo-300 transition-colors duration-500" size={32} />
              
              {/* Testimonial Text */}
              <p className="text-slate-600 text-sm leading-relaxed mb-8 whitespace-normal group-hover:text-white transition-colors duration-500">
                "{person.quote}"
              </p>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-white/30 transition-all duration-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                    {person.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium group-hover:text-indigo-200 transition-colors duration-500">
                    {person.role}
                  </p>
                </div>
              </div>

              {/* Footer Placement */}
              <div className="mt-6 pt-6 border-t border-slate-200/60 group-hover:border-white/10 flex items-center justify-between transition-colors duration-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-indigo-300">
                  Career Move
                </span>
                <span className="font-black text-indigo-600 text-sm group-hover:text-white transition-colors duration-500 italic">
                  @{person.company}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Masking Gradients */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AlumniSection;