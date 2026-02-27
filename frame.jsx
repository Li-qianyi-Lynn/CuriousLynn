import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously, signInWithCustomToken
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp
} from 'firebase/firestore';
import {
  Brain,
  Cat,
  ChevronRight,
  Code,
  Database, FileSearch,
  Github,
  Layout,
  Linkedin,
  Mail,
  MessageSquare,
  PawPrint,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Firebase configuration from environment
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'curious-lynn-id';

const App = () => {
  const [viewMode, setViewMode] = useState('empathy');
  const [scrolled, setScrolled] = useState(false);
  const [isMeowing, setIsMeowing] = useState(false);
  
  // Interaction States
  const [showPawModal, setShowPawModal] = useState(false);
  const [activeTab, setActiveTab] = useState('public'); // 'public' or 'private'
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authentication Setup (Rule 3)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Fetch Public Comments (Rule 1 & 2)
  useEffect(() => {
    if (!user) return;

    const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'paws');
    const q = query(commentsRef); // Note: Simple query as per Rule 2
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)); // Sort in memory
      setComments(docs);
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMeow = () => {
    setIsMeowing(true);
    setTimeout(() => setIsMeowing(false), 2000);
  };

  const submitComment = async () => {
    if (!newComment.trim() || !user) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'paws'), {
        content: newComment,
        author: userName || 'Anonymous Cat',
        createdAt: serverTimestamp(),
        mode: viewMode,
        userId: user.uid
      });
      setNewComment('');
      setUserName('');
      setActiveTab('public');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsSubmitting(false);
  };

  const projectCategories = [
    {
      id: "ai-hci",
      title: "AI + HCI Interaction",
      desc: "Exploring how LLMs can enhance human cognition. Think of it as 'Purr-sonalized AI'.",
      icon: <Sparkles className="w-6 h-6" />,
      projects: ["Intelligent Emotional Support Agents", "Multimodal Feedback Systems"]
    },
    {
      id: "frontend",
      title: "Frontend Design",
      desc: "Crafting pixel-perfect, psychologically intuitive UIs. Meow-velous user experiences.",
      icon: <Layout className="w-6 h-6" />,
      projects: ["Interactive Visual Storytelling", "High-Performance React Dashboards"]
    },
    {
      id: "fullstack",
      title: "Full-stack Systems",
      desc: "Building scalable architectures. The backbone of every digital 'Kitty Kingdom'.",
      icon: <Database className="w-6 h-6" />,
      projects: ["Real-time Collaborative Platforms", "Distributed Data Management"]
    },
    {
      id: "policy",
      title: "Policy Analyzer Tools",
      desc: "Interdisciplinary tools for governance. Tracking 'Paws & Policies' with NLP.",
      icon: <FileSearch className="w-6 h-6" />,
      projects: ["Interdisciplinary Policy Scraper", "Semantic Analysis for Governance"]
    }
  ];

  const themeClasses = viewMode === 'empathy' 
    ? "bg-[#fffcf9] text-slate-800 font-sans cursor-default" 
    : "bg-[#05080a] text-emerald-400 font-mono cursor-crosshair";

  const buttonClasses = viewMode === 'empathy'
    ? "bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200"
    : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0";

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out selection:bg-rose-200 ${themeClasses}`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-5 flex justify-between items-center ${scrolled ? 'backdrop-blur-xl border-b border-opacity-10 ' + (viewMode === 'empathy' ? 'border-rose-200 bg-white/80' : 'border-emerald-500 bg-black/80') : ''}`}>
        <div className="flex items-center gap-2 text-2xl font-black tracking-tighter group cursor-pointer" onClick={handleMeow}>
          <Cat className={`transition-transform duration-300 group-hover:rotate-12 ${viewMode === 'empathy' ? 'text-rose-400' : 'text-emerald-500'}`} />
          <span>CURIOUS<span className={viewMode === 'empathy' ? "text-rose-500" : "text-white"}>LYNN</span></span>
          {isMeowing && <span className="absolute -right-12 -top-2 text-sm animate-bounce font-mono">"Meow!"</span>}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewMode(viewMode === 'empathy' ? 'logic' : 'empathy')}
            className={`px-5 py-2 rounded-full border-2 transition-all flex items-center gap-2 text-sm font-bold ${
              viewMode === 'empathy' ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            {viewMode === 'empathy' ? <><Code size={16} /> Switch to Logic Mode</> : <><Brain size={16} /> Switch to Empathy Mode</>}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-8 relative">
          <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-900/30 text-emerald-500'}`}>
            {viewMode === 'empathy' ? "Human-Centered Developer" : "System Architect & Researcher"}
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
            {viewMode === 'empathy' ? "Pawsitive" : "Systematic"}
            <br />
            <span className={viewMode === 'empathy' ? "text-rose-500" : "text-white"}>
              {viewMode === 'empathy' ? "Innovations." : "Execution."}
            </span>
          </h1>
          <p className="text-xl max-w-xl leading-relaxed opacity-80">
            I'm Lynn, a developer who thinks like a psychologist and acts like a cat—curious, precise, and always landing on my feet.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className={`px-10 py-4 rounded-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 ${buttonClasses}`}>
              View My Work <ChevronRight size={20} />
            </button>
            <a href="https://github.com/Li-qianyi-Lynn" target="_blank" className={`px-10 py-4 rounded-2xl border-2 transition-all inline-block ${
              viewMode === 'empathy' ? 'border-slate-200 hover:bg-slate-100' : 'border-emerald-900 hover:bg-emerald-900/30'
            }`}>
              GitHub Profile
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative">
          <div className={`absolute -inset-10 rounded-full blur-3xl opacity-20 animate-pulse ${
            viewMode === 'empathy' ? 'bg-rose-400' : 'bg-emerald-600'
          }`}></div>
          <div className={`relative z-10 aspect-square rounded-[3rem] overflow-hidden border-8 transition-all duration-500 ${
            viewMode === 'empathy' ? 'border-white bg-rose-50/50 shadow-2xl' : 'border-emerald-500/20 bg-slate-900 shadow-2xl shadow-emerald-500/10'
          }`}>
             <div className="w-full h-full flex flex-col items-center justify-center p-10">
                {viewMode === 'empathy' ? (
                  <div className="text-center space-y-6">
                    <Cat className="w-24 h-24 text-rose-400 mx-auto" />
                    <p className="text-lg font-serif italic text-rose-700/60">"Curiosity is the engine of empathy."</p>
                  </div>
                ) : (
                  <div className="w-full font-mono text-[10px] md:text-xs space-y-2 opacity-80">
                    <div className="text-emerald-500">lynn@cat-os:~$ system_diagnostic</div>
                    <div>{">"} MOOD: CURIOUS_LOGIC</div>
                    <div>{">"} STATUS: PURRING_OPTIMIZED</div>
                    <div className="py-2 border-y border-emerald-900/50 my-2">
                        {`for cat in world:`}<br/>
                        {`  if cat.curious:`}<br/>
                        {`    cat.explore(code)`}<br/>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Skipped detailed update for brevity, keeps existing logic) */}
      <section className={`py-32 px-8 transition-colors duration-500 ${viewMode === 'empathy' ? 'bg-white' : 'bg-[#030507]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase">Core Focus</h2>
            <span className={`h-[2px] flex-1 ${viewMode === 'empathy' ? 'bg-rose-100' : 'bg-emerald-900'}`}></span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectCategories.map((cat) => (
              <div key={cat.id} className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${viewMode === 'empathy' ? 'bg-[#fffcf9] border-rose-100 hover:shadow-2xl' : 'bg-slate-900/40 border-emerald-900/30 hover:border-emerald-500'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${viewMode === 'empathy' ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'}`}>{cat.icon}</div>
                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                <p className="text-sm opacity-70 mb-8">{cat.desc}</p>
                <div className="space-y-2">
                  {cat.projects.map((p, i) => (
                    <div key={i} className={`text-xs flex items-center gap-2 p-2 rounded-xl border ${viewMode === 'empathy' ? 'bg-white border-rose-50' : 'bg-black/30 border-emerald-900'}`}>
                      <PawPrint size={10} /> {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Paw Section */}
      <section id="contact" className={`py-32 px-8 transition-colors duration-500 ${viewMode === 'empathy' ? 'bg-rose-50' : 'bg-black'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">
              Leave a <span className={viewMode === 'empathy' ? 'text-rose-500' : 'text-emerald-400'}>Paw Print</span>
            </h2>
            <p className="opacity-60 max-w-lg mx-auto">Click the paw to share your thoughts publicly or send me a private note.</p>
          </div>

          <div className="relative inline-block">
            <button
              onClick={() => setShowPawModal(true)}
              className={`p-12 rounded-full transition-all duration-500 transform hover:scale-110 relative z-10 ${
                viewMode === 'empathy' ? 'bg-white text-rose-400 shadow-2xl' : 'bg-slate-900 text-emerald-500 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
              }`}
            >
              <PawPrint size={80} className="animate-pulse" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-widest opacity-40">Click to Interact</div>
            </button>
          </div>

          {/* Modal / Interaction Panel */}
          {showPawModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
              <div className={`w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 ${
                viewMode === 'empathy' ? 'bg-white' : 'bg-[#0a0f14] border border-emerald-500/30'
              }`}>
                {/* Header */}
                <div className={`p-6 flex justify-between items-center border-b ${viewMode === 'empathy' ? 'border-rose-50' : 'border-emerald-900/30'}`}>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveTab('public')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'public' ? (viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-500 text-slate-900') : 'opacity-40'}`}
                    >
                      Guestbook
                    </button>
                    <button 
                      onClick={() => setActiveTab('private')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'private' ? (viewMode === 'empathy' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-500 text-slate-900') : 'opacity-40'}`}
                    >
                      Private Note
                    </button>
                  </div>
                  <button onClick={() => setShowPawModal(false)} className="p-2 hover:rotate-90 transition-transform"><X /></button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  {activeTab === 'public' ? (
                    <div className="space-y-8">
                      {/* Form */}
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Your Name (Optional)"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 ${viewMode === 'empathy' ? 'bg-rose-50/30 border-rose-100 focus:ring-rose-200' : 'bg-black border-emerald-900 focus:ring-emerald-500 text-emerald-400'}`}
                        />
                        <div className="relative">
                          <textarea 
                            rows="3"
                            placeholder="Share your thoughts with the world..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 resize-none ${viewMode === 'empathy' ? 'bg-rose-50/30 border-rose-100 focus:ring-rose-200' : 'bg-black border-emerald-900 focus:ring-emerald-500 text-emerald-400'}`}
                          ></textarea>
                          <button 
                            onClick={submitComment}
                            disabled={isSubmitting || !newComment}
                            className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all ${isSubmitting ? 'opacity-50' : 'hover:scale-110'} ${buttonClasses}`}
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </div>

                      {/* List */}
                      <div className="space-y-4 pt-4">
                        <h4 className="text-xs font-black uppercase opacity-40 tracking-widest flex items-center gap-2">
                          <MessageSquare size={12} /> Recent Paws ({comments.length})
                        </h4>
                        {comments.length === 0 ? (
                          <div className="py-12 text-center opacity-30 italic">No paws yet. Be the first one!</div>
                        ) : (
                          comments.map((comment) => (
                            <div key={comment.id} className={`p-5 rounded-2xl animate-in slide-in-from-top-2 duration-500 ${viewMode === 'empathy' ? 'bg-rose-50/50' : 'bg-white/5 border-l-2 border-emerald-500'}`}>
                              <div className="flex justify-between items-start mb-2">
                                <span className={`font-bold text-sm ${viewMode === 'empathy' ? 'text-rose-600' : 'text-emerald-400'}`}>@{comment.author}</span>
                                <span className="text-[10px] opacity-40">{comment.createdAt?.toDate().toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm leading-relaxed opacity-80">{comment.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${viewMode === 'empathy' ? 'bg-rose-100 text-rose-500' : 'bg-emerald-900/30 text-emerald-400'}`}>
                        <ShieldCheck size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">Encrypted Connection</h3>
                        <p className="text-sm opacity-60 max-w-xs">This message will be sent directly to Lynn's inbox. No one else can see this.</p>
                      </div>
                      <a 
                        href={`mailto:lynn@example.com?subject=Private Paw from Website`}
                        className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-transform hover:scale-105 ${buttonClasses}`}
                      >
                        <Mail size={20} /> Open Email Client
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-8 pt-12 opacity-30 hover:opacity-100 transition-opacity">
            <a href="https://github.com/Li-qianyi-Lynn" target="_blank" className="hover:scale-125 transition-transform"><Github /></a>
            <a href="#" className="hover:scale-125 transition-transform"><Linkedin /></a>
          </div>
          
          <p className="text-xs font-black opacity-30 tracking-[0.4em] uppercase pt-10">
            Hand-crafted by Lynn • Measured by Psychology • Powered by Logic
          </p>
        </div>
      </section>

      {/* Floating Assistant */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className={`group relative p-4 rounded-full shadow-2xl flex items-center justify-center ${
          viewMode === 'empathy' ? 'bg-rose-400 text-white' : 'bg-emerald-500 text-slate-900'
        }`}>
          <Cat size={24} />
          <div className={`absolute bottom-full mb-4 right-0 w-48 p-4 rounded-2xl text-[10px] font-bold transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 ${
            viewMode === 'empathy' ? 'bg-white text-slate-800 shadow-xl' : 'bg-slate-800 text-emerald-400 border border-emerald-500'
          }`}>
             {viewMode === 'empathy' ? "Thinking about UX psychology? Leave a paw below!" : "System status: Optimizing kitty.v2... All good!"}
             <div className={`absolute top-full right-6 border-8 border-transparent ${viewMode === 'empathy' ? 'border-t-white' : 'border-t-slate-800'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;