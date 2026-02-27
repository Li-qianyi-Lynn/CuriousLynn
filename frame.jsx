// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInAnonymously, signInWithCustomToken
// } from 'firebase/auth';
// import {
//   addDoc,
//   collection,
//   getFirestore,
//   onSnapshot,
//   query,
//   serverTimestamp
// } from 'firebase/firestore';
// import {
//   ArrowLeft,
//   Brain,
//   Cat,
//   ChevronRight,
//   Code,
//   Database,
//   ExternalLink,
//   FileSearch,
//   Image as ImageIcon,
//   Layout,
//   PawPrint,
//   Send,
//   ShieldCheck,
//   Sparkles,
//   X
// } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// // Firebase 配置
// const firebaseConfig = JSON.parse(__firebase_config);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'curious-lynn-id';

// const App = () => {
//   // 核心状态：视觉模式 (empathy/logic)
//   const [viewMode, setViewMode] = useState('empathy');
//   const [scrolled, setScrolled] = useState(false);
//   const [isMeowing, setIsMeowing] = useState(false);
  
//   // 交互状态：模态框与展开详情
//   const [showPawModal, setShowPawModal] = useState(false);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [activeTab, setActiveTab] = useState('public'); 
//   const [user, setUser] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [userName, setUserName] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 匿名认证 (符合 Rule 3)
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
//           await signInWithCustomToken(auth, __initial_auth_token);
//         } else {
//           await signInAnonymously(auth);
//         }
//       } catch (error) {
//         console.error("Auth error:", error);
//       }
//     };
//     initAuth();
//     const unsubscribe = onAuthStateChanged(auth, setUser);
//     return () => unsubscribe();
//   }, []);

//   // 实时获取留言板数据 (符合 Rule 1 & 2)
//   useEffect(() => {
//     if (!user) return;
//     const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'paws');
//     const q = query(commentsRef);
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const docs = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
//       setComments(docs);
//     }, (error) => {
//       console.error("Firestore error:", error);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   // 滚动监听
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleMeow = () => {
//     setIsMeowing(true);
//     setTimeout(() => setIsMeowing(false), 2000);
//   };

//   const submitComment = async () => {
//     if (!newComment.trim() || !user) return;
//     setIsSubmitting(true);
//     try {
//       await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'paws'), {
//         content: newComment,
//         author: userName || 'Anonymous Cat',
//         createdAt: serverTimestamp(),
//         mode: viewMode,
//         userId: user.uid
//       });
//       setNewComment('');
//       setUserName('');
//       setActiveTab('public');
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//     setIsSubmitting(false);
//   };

//   // 项目分类数据定义
//   const projectCategories = [
//     {
//       id: "ai-hci",
//       title: "AI + HCI Interaction",
//       tagline: "Bridging Silicon and Synapse",
//       desc: "Exploring how LLMs can enhance human cognition. Think of it as 'Purr-sonalized AI'.",
//       longDesc: "My work in AI+HCI focuses on making artificial intelligence feel more human and intuitive. By applying cognitive load theories and emotional design, I build interfaces that don't just process data, but understand human intent.",
//       icon: <Sparkles className="w-6 h-6" />,
//       projects: [
//         { name: "Emotional AI Companion", tech: ["Python", "OpenAI", "React"], detail: "An empathetic agent that adjusts its tone based on user sentiment analysis." },
//         { name: "Cognitive Load Monitor", tech: ["MediaPipe", "JS"], detail: "Tracking eye movement and pupil dilation to measure mental fatigue during task execution." }
//       ]
//     },
//     {
//       id: "frontend",
//       title: "Frontend Design",
//       tagline: "Pixels with Purpose",
//       desc: "Crafting pixel-perfect, psychologically intuitive UIs. Meow-velous user experiences.",
//       longDesc: "Design is more than aesthetics; it's about guiding attention and reducing friction. I use React and Framer Motion to create fluid, delightful interfaces that respect the user's mental model.",
//       icon: <Layout className="w-6 h-6" />,
//       projects: [
//         { name: "Narrative Storytelling Engine", tech: ["Three.js", "React"], detail: "A web-based framework for interactive digital exhibits with smooth spatial transitions." },
//         { name: "Accessibility First Dashboard", tech: ["Tailwind", "Aria"], detail: "A high-contrast, screen-reader optimized management system for diverse users." }
//       ]
//     },
//     {
//       id: "good-tools",
//       title: "Good Tools",
//       tagline: "Bridging Systems and Policy",
//       desc: "Practical tools for cleaning data, shortening links, and analyzing complex policy documents.",
//       icon: <FileSearch className="w-6 h-6" />,
//       longDesc: "I enjoy building practical, end-to-end tools that move messy data into structured insight—from CSV cleaning pipelines and URL utilities to NLP workflows for reading long policy PDFs.",
//       projects: [
//         { name: "Data Sweeper", tech: ["TypeScript", "Node.js"], detail: "An interactive pipeline for cleaning messy CSV exports and removing sensitive fields." },
//         { name: "Snappy Links", tech: ["React", "Serverless"], detail: "A lightweight URL shortener & QR generator designed for fast sharing in workshops." },
//         { name: "Policy Insight Lab", tech: ["Python", "LLM", "NLP"], detail: "Experiments with prompt engineering and PDF parsing for understanding energy policy documents." }
//       ]
//     }
//   ];

//   const themeClasses = viewMode === 'empathy' 
//     ? "bg-[#fffcf9] text-slate-800 font-sans cursor-default" 
//     : "bg-[#05080a] text-emerald-400 font-mono cursor-crosshair";

//   const buttonClasses = viewMode === 'empathy'
//     ? "bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200"
//     : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0";

//   return (
//     <div className={`min-h-screen transition-all duration-700 ease-in-out selection:bg-rose-200 ${themeClasses}`}>
      
//       {/* 导航栏 */}
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-5 flex justify-between items-center ${scrolled ? 'backdrop-blur-xl border-b border-opacity-10 ' + (viewMode === 'empathy' ? 'border-rose-200 bg-white/80' : 'border-emerald-500 bg-black/80') : ''}`}>
//         <div className="flex items-center gap-2 text-2xl font-black tracking-tighter group cursor-pointer" onClick={handleMeow}>
//           <Cat className={`transition-transform duration-300 group-hover:rotate-12 ${viewMode === 'empathy' ? 'text-rose-400' : 'text-emerald-500'}`} />
//           <span>CURIOUS<span className={viewMode === 'empathy' ? "text-rose-500" : "text-white"}>LYNN</span></span>
//           {isMeowing && <span className="absolute -right-12 -top-2 text-sm animate-bounce font-mono">"Meow!"</span>}
//         </div>
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setViewMode(viewMode === 'empathy' ? 'logic' : 'empathy')}
//             className={`px-5 py-2 rounded-full border-2 transition-all flex items-center gap-2 text-sm font-bold ${
//               viewMode === 'empathy' ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10'
//             }`}
//           >
//             {viewMode === 'empathy' ? <><Code size={16} /> Logic Mode</> : <><Brain size={16} /> Empathy Mode</>}
//           </button>
//         </div>
//       </nav>

//       {/* Hero 区域 */}
//       <section className="pt-40 pb-24 px-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
//         <div className="lg:col-span-7 space-y-8 relative">
//           <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-900/30 text-emerald-500'}`}>
//             {viewMode === 'empathy' ? "Human-Centered Developer" : "System Architect & Researcher"}
//           </div>
//           <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
//             {viewMode === 'empathy' ? "Pawsitive" : "Systematic"}
//             <br />
//             <span className={viewMode === 'empathy' ? "text-rose-500" : "text-white"}>
//               {viewMode === 'empathy' ? "Innovations." : "Execution."}
//             </span>
//           </h1>
//           <p className="text-xl max-w-xl leading-relaxed opacity-80">
//             I'm Lynn, a developer who thinks like a psychologist and acts like a cat—curious, precise, and always landing on my feet.
//           </p>
//           <div className="flex flex-wrap gap-4 pt-4">
//             <button className={`px-10 py-4 rounded-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 ${buttonClasses}`}>
//               View My Work <ChevronRight size={20} />
//             </button>
//             <a href="https://github.com/Li-qianyi-Lynn" target="_blank" className={`px-10 py-4 rounded-2xl border-2 transition-all inline-block ${
//               viewMode === 'empathy' ? 'border-slate-200 hover:bg-slate-100' : 'border-emerald-900 hover:bg-emerald-900/30'
//             }`}>
//               GitHub Profile
//             </a>
//           </div>
//         </div>
        
//         <div className="lg:col-span-5 relative">
//           <div className={`absolute -inset-10 rounded-full blur-3xl opacity-20 animate-pulse ${
//             viewMode === 'empathy' ? 'bg-rose-400' : 'bg-emerald-600'
//           }`}></div>
//           <div className={`relative z-10 aspect-square rounded-[3rem] overflow-hidden border-8 transition-all duration-500 ${
//             viewMode === 'empathy' ? 'border-white bg-rose-50/50 shadow-2xl' : 'border-emerald-500/20 bg-slate-900 shadow-2xl shadow-emerald-500/10'
//           }`}>
//              <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
//                 {viewMode === 'empathy' ? (
//                    <div className="space-y-4">
//                       <Cat size={60} className="mx-auto text-rose-400" />
//                       <p className="italic opacity-60">"Designing with the heart in mind."</p>
//                    </div>
//                 ) : (
//                   <div className="w-full text-left font-mono text-[10px] space-y-1">
//                     <div className="text-emerald-500">lynn@kali:~$ ./mind_map.sh</div>
//                     <div>{">"} LOADING_CS_ASSETS... [OK]</div>
//                     <div>{">"} LOADING_PSYCH_MODULES... [OK]</div>
//                     <div className="mt-4 flex gap-1">
//                         <div className="w-2 h-2 bg-emerald-500"></div>
//                         <div className="w-2 h-2 bg-emerald-500 animate-bounce"></div>
//                         <div className="w-2 h-2 bg-emerald-500"></div>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </section>

//       {/* 项目网格区域 */}
//       <section className={`py-32 px-8 transition-colors duration-500 ${viewMode === 'empathy' ? 'bg-white' : 'bg-[#030507]'}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-20 flex items-center gap-4">
//             <h2 className="text-4xl md:text-5xl font-black italic uppercase">Core Focus</h2>
//             <span className={`h-[2px] flex-1 ${viewMode === 'empathy' ? 'bg-rose-100' : 'bg-emerald-900'}`}></span>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {projectCategories.map((cat) => (
//               <div 
//                 key={cat.id} 
//                 onClick={() => setExpandedCategory(cat)}
//                 className={`group p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer hover:-translate-y-3 ${
//                   viewMode === 'empathy' ? 'bg-[#fffcf9] border-rose-100 hover:shadow-2xl' : 'bg-slate-900/40 border-emerald-900/30 hover:border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.05)]'
//                 }`}
//               >
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${viewMode === 'empathy' ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'}`}>
//                   {cat.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
//                 <p className="text-sm opacity-70 mb-8 line-clamp-3">{cat.desc}</p>
//                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
//                   Deep Dive <ChevronRight size={14} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 沉浸式项目详情页 (Expanded Interface) */}
//       {expandedCategory && (
//         <div className="fixed inset-0 z-[300] flex flex-col animate-in fade-in zoom-in-95 duration-500">
//             {/* 背景层 */}
//             <div className={`absolute inset-0 transition-colors duration-500 ${viewMode === 'empathy' ? 'bg-white' : 'bg-[#0a0f14]'}`}></div>
            
//             {/* 顶栏工具条 */}
//             <div className={`relative z-10 px-8 py-6 flex justify-between items-center border-b ${viewMode === 'empathy' ? 'border-rose-100' : 'border-emerald-900/30'}`}>
//                 <button 
//                   onClick={() => setExpandedCategory(null)}
//                   className="flex items-center gap-2 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
//                 >
//                   <ArrowLeft size={18} /> Back to Hub
//                 </button>
//                 <div className="flex items-center gap-3">
//                     <Cat className={viewMode === 'empathy' ? 'text-rose-400' : 'text-emerald-500'} />
//                     <span className="text-xs font-mono opacity-40">Section: {expandedCategory.id}.lx</span>
//                 </div>
//             </div>

//             {/* 可滚动内容区 */}
//             <div className="relative z-10 flex-1 overflow-y-auto px-8 py-16 custom-scrollbar">
//                 <div className="max-w-5xl mx-auto space-y-20">
//                     {/* 头部详情 */}
//                     <div className="grid md:grid-cols-2 gap-12 items-center">
//                         <div className="space-y-6">
//                             <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-900/40 text-emerald-500'}`}>
//                                 Domain Expertise
//                             </div>
//                             <h2 className="text-5xl md:text-7xl font-black leading-none">{expandedCategory.title}</h2>
//                             <p className="text-2xl font-serif italic opacity-60 leading-tight">"{expandedCategory.tagline}"</p>
//                             <p className="text-lg opacity-80 leading-relaxed">{expandedCategory.longDesc}</p>
//                         </div>
//                         {/* 视觉演示占位 */}
//                         <div className={`aspect-video rounded-3xl overflow-hidden flex items-center justify-center border-4 ${viewMode === 'empathy' ? 'bg-rose-50 border-white shadow-xl' : 'bg-slate-900 border-emerald-900/20'}`}>
//                              <div className="text-center space-y-3 opacity-30">
//                                 <ImageIcon size={64} className="mx-auto" />
//                                 <p className="text-xs uppercase font-bold tracking-[0.2em]">[Concept Visualization]</p>
//                              </div>
//                         </div>
//                     </div>

//                     {/* 具体项目列表 */}
//                     <div className="space-y-8">
//                         <h4 className="text-xs font-black uppercase tracking-[0.4em] opacity-40">Selected GitHub Projects</h4>
//                         <div className="grid md:grid-cols-2 gap-8">
//                             {expandedCategory.projects.map((p, idx) => (
//                                 <div 
//                                   key={idx}
//                                   className={`p-10 rounded-[2.5rem] border transition-all duration-500 group ${
//                                     viewMode === 'empathy' ? 'bg-[#fffcf9] border-rose-50 hover:bg-white hover:shadow-2xl' : 'bg-black/40 border-emerald-900/30 hover:border-emerald-500'
//                                   }`}
//                                 >
//                                     <div className="flex justify-between items-start mb-6">
//                                         <h5 className="text-2xl font-black">{p.name}</h5>
//                                         <a href="https://github.com/Li-qianyi-Lynn" target="_blank" className="p-2 rounded-full bg-slate-100/10 hover:scale-110 transition-transform"><ExternalLink size={18} /></a>
//                                     </div>
//                                     <p className="opacity-70 mb-8 leading-relaxed">{p.detail}</p>
//                                     <div className="flex flex-wrap gap-2">
//                                         {p.tech.map(t => (
//                                             <span key={t} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${viewMode === 'empathy' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-900/20 text-emerald-600 border border-emerald-900/40'}`}>
//                                                 {t}
//                                             </span>
//                                         ))}
//                                     </div>
                                    
//                                     {/* 项目缩略图占位 */}
//                                     <div className={`mt-8 aspect-video rounded-2xl overflow-hidden flex items-center justify-center border ${viewMode === 'empathy' ? 'bg-rose-100/20 border-rose-50' : 'bg-slate-900/50 border-emerald-900/20'}`}>
//                                         <div className="text-center space-y-2 opacity-20 group-hover:opacity-40 transition-opacity">
//                                             <ImageIcon size={32} className="mx-auto" />
//                                             <p className="text-[10px] uppercase font-bold tracking-widest">[Project Preview]</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* 跨学科见解 */}
//                     <div className={`p-12 rounded-[3rem] text-center space-y-6 ${viewMode === 'empathy' ? 'bg-rose-50 text-rose-800' : 'bg-emerald-900/10 text-emerald-400 border border-emerald-900/20'}`}>
//                         <Brain size={40} className="mx-auto opacity-50" />
//                         <h5 className="text-xl font-bold italic">Interdisciplinary Perspective</h5>
//                         <p className="max-w-2xl mx-auto opacity-80 leading-relaxed">
//                             {viewMode === 'empathy' 
//                              ? "In this field, my psychology background allows me to foresee potential user friction points before a single line of code is written." 
//                              : "Using computer science methodologies, I treat human behavior as complex but structured data streams that can be optimized for better well-being."}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       )}

//       {/* 留个爪 区域 */}
//       <section id="contact" className={`py-32 px-8 transition-colors duration-500 ${viewMode === 'empathy' ? 'bg-rose-50' : 'bg-black'}`}>
//         <div className="max-w-4xl mx-auto text-center space-y-12">
//           <div className="space-y-4">
//             <h2 className="text-5xl font-black italic uppercase tracking-tighter">
//               Leave a <span className={viewMode === 'empathy' ? 'text-rose-500' : 'text-emerald-400'}>Paw Print</span>
//             </h2>
//             <p className="opacity-60 max-w-lg mx-auto">Click the paw to share your thoughts publicly or send me a private note.</p>
//           </div>

//           <div className="relative inline-block">
//             <button
//               onClick={() => setShowPawModal(true)}
//               className={`p-12 rounded-full transition-all duration-500 transform hover:scale-110 relative z-10 ${
//                 viewMode === 'empathy' ? 'bg-white text-rose-400 shadow-2xl' : 'bg-slate-900 text-emerald-500 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
//               }`}
//             >
//               <PawPrint size={80} className="animate-pulse" />
//               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-widest opacity-40">Interact with Lynn</div>
//             </button>
//           </div>

//           {/* 互动面板弹出层 */}
//           {showPawModal && (
//             <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
//               <div className={`w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 ${
//                 viewMode === 'empathy' ? 'bg-white' : 'bg-[#0a0f14] border border-emerald-500/30'
//               }`}>
//                 {/* 面板顶栏 */}
//                 <div className={`p-6 flex justify-between items-center border-b ${viewMode === 'empathy' ? 'border-rose-50' : 'border-emerald-900/30'}`}>
//                   <div className="flex gap-4">
//                     <button onClick={() => setActiveTab('public')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'public' ? (viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-500 text-slate-900') : 'opacity-40'}`}>Guestbook</button>
//                     <button onClick={() => setActiveTab('private')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'private' ? (viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-500 text-slate-900') : 'opacity-40'}`}>Private Note</button>
//                   </div>
//                   <button onClick={() => setShowPawModal(false)} className="p-2 hover:rotate-90 transition-transform"><X /></button>
//                 </div>

//                 {/* 滚动区 */}
//                 <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
//                   {activeTab === 'public' ? (
//                     <div className="space-y-8">
//                       {/* 留言输入 */}
//                       <div className="space-y-4">
//                         <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full p-4 rounded-2xl border outline-none ${viewMode === 'empathy' ? 'bg-rose-50/30 border-rose-100' : 'bg-black border-emerald-900 text-emerald-400'}`} />
//                         <div className="relative">
//                           <textarea rows="3" placeholder="Leave a meow..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className={`w-full p-4 rounded-2xl border outline-none ${viewMode === 'empathy' ? 'bg-rose-50/30 border-rose-100' : 'bg-black border-emerald-900 text-emerald-400'}`}></textarea>
//                           <button onClick={submitComment} disabled={isSubmitting || !newComment} className={`absolute bottom-4 right-4 p-3 rounded-xl ${buttonClasses}`}><Send size={18} /></button>
//                         </div>
//                       </div>
//                       {/* 实时列表 */}
//                       <div className="space-y-4 pt-4 text-left">
//                         {comments.map((comment) => (
//                           <div key={comment.id} className={`p-5 rounded-2xl ${viewMode === 'empathy' ? 'bg-rose-50/50 text-slate-700' : 'bg-white/5 border-l-2 border-emerald-500 text-emerald-500/80'}`}>
//                             <div className="flex justify-between items-start mb-2">
//                                <span className="font-bold">@{comment.author}</span>
//                                <span className="text-[10px] opacity-40">{comment.createdAt?.toDate().toLocaleDateString()}</span>
//                             </div>
//                             <p className="text-sm">{comment.content}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="py-12 text-center space-y-6">
//                       <ShieldCheck size={48} className="mx-auto text-emerald-500" />
//                       <p className="opacity-60">Send an encrypted message directly to Lynn's inbox.</p>
//                       <a href="mailto:lynn@example.com" className={`px-10 py-4 rounded-2xl font-bold inline-block ${buttonClasses}`}>Open Mail Client</a>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="mt-32 text-center text-[10px] font-black opacity-30 tracking-[0.4em] uppercase">
//             CuriousLynn © {new Date().getFullYear()} — Built on Curiosity
//           </div>
//         </div>
//       </section>

//       {/* 侧边猫猫助手 */}
//       <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//         <div className={`group relative p-4 rounded-full shadow-2xl flex items-center justify-center ${
//           viewMode === 'empathy' ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'
//         }`}>
//           <Cat size={24} />
//           <div className={`absolute bottom-full mb-4 right-0 w-48 p-4 rounded-2xl text-[10px] font-bold transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 ${
//             viewMode === 'empathy' ? 'bg-white text-slate-800 shadow-xl' : 'bg-slate-800 text-emerald-400 border border-emerald-500'
//           }`}>
//              {viewMode === 'empathy' ? "Interested in Psych-driven design? Let's chat!" : "Systems status: PURRING. Ready for deployment."}
//              <div className={`absolute top-full right-6 border-8 border-transparent ${viewMode === 'empathy' ? 'border-t-white' : 'border-t-slate-800'}`}></div>
//           </div>
//         </div>
//       </div>

//       {/* 自定义滚动条样式 */}
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { 
//           background: ${viewMode === 'empathy' ? '#fda4af' : '#10b981'}; 
//           border-radius: 10px; 
//         }
//       `}</style>
//     </div>
//   );
// };

// export default App;