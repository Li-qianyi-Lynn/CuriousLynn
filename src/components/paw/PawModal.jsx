import React, { useEffect, useState } from 'react';
import { Mail, MessageSquare, PawPrint, Send, ShieldCheck, X } from 'lucide-react';
import { firebaseEnv } from '../../lib/firebase';

const PawModal = ({ isOpen, onClose, viewMode }) => {
  const [activeTab, setActiveTab] = useState('public');
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { auth, db, appId, addDoc, collection, onSnapshot, query, serverTimestamp, onAuthStateChanged, signInAnonymously, signInWithCustomToken } =
    firebaseEnv;

  const isEmpathy = viewMode === 'empathy';
  const firebaseReady = !!auth && !!db;

  // Auth
  useEffect(() => {
    if (!isOpen || !firebaseReady) return;

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [isOpen, firebaseReady, auth, onAuthStateChanged, signInAnonymously, signInWithCustomToken]);

  // Listen comments
  useEffect(() => {
    if (!isOpen || !firebaseReady || !user) return;

    const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'paws');
    const q = query(commentsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setComments(docs);
      },
      (error) => {
        console.error('Firestore error:', error);
      }
    );

    return () => unsubscribe();
  }, [isOpen, firebaseReady, user, db, collection, query, onSnapshot, appId]);

  const submitComment = async () => {
    if (!newComment.trim() || !user || !firebaseReady) return;
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
      console.error('Error adding document: ', e);
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 ${
          isEmpathy ? 'bg-white' : 'bg-[#0a0f14] border border-emerald-500/30'
        }`}
      >
        {/* Header */}
        <div
          className={`p-6 flex justify-between items-center border-b ${
            isEmpathy ? 'border-rose-50' : 'border-emerald-900/30'
          }`}
        >
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'public'
                  ? isEmpathy
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-emerald-500 text-slate-900'
                  : 'opacity-40'
              }`}
            >
              Guestbook
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'private'
                  ? isEmpathy
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-emerald-500 text-slate-900'
                  : 'opacity-40'
              }`}
            >
              Private Note
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:rotate-90 transition-transform"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'public' ? (
            firebaseReady ? (
              <div className="space-y-8">
                {/* Form */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 ${
                      isEmpathy
                        ? 'bg-rose-50/30 border-rose-100 focus:ring-rose-200'
                        : 'bg-black border-emerald-900 focus:ring-emerald-500 text-emerald-400'
                    }`}
                  />
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Share your thoughts with the world..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 resize-none ${
                        isEmpathy
                          ? 'bg-rose-50/30 border-rose-100 focus:ring-rose-200'
                          : 'bg-black border-emerald-900 focus:ring-emerald-500 text-emerald-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={submitComment}
                      disabled={isSubmitting || !newComment}
                      className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all ${
                        isSubmitting ? 'opacity-50' : 'hover:scale-110'
                      } ${
                        isEmpathy
                          ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0'
                      }`}
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
                    <div className="py-12 text-center opacity-30 italic">
                      No paws yet. Be the first one!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-5 rounded-2xl animate-in slide-in-from-top-2 duration-500 ${
                          isEmpathy
                            ? 'bg-rose-50/50'
                            : 'bg-white/5 border-l-2 border-emerald-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`font-bold text-sm ${
                              isEmpathy ? 'text-rose-600' : 'text-emerald-400'
                            }`}
                          >
                            @{comment.author}
                          </span>
                          <span className="text-[10px] opacity-40">
                            {comment.createdAt?.toDate().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed opacity-80">
                          {comment.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                <PawPrint size={40} className={isEmpathy ? 'text-rose-400' : 'text-emerald-400'} />
                <p className="text-sm opacity-70 max-w-xs">
                  Guestbook is temporarily offline in this local build, but will work once Firebase
                  config is wired in.
                </p>
              </div>
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isEmpathy ? 'bg-rose-100 text-rose-500' : 'bg-emerald-900/30 text-emerald-400'
                }`}
              >
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Encrypted Connection</h3>
                <p className="text-sm opacity-60 max-w-xs">
                  This message will be sent directly to Lynn&apos;s inbox. No one else can see this.
                </p>
              </div>
              <a
                href="mailto:lynn@example.com?subject=Private Paw from Website"
                className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-transform hover:scale-105 ${
                  isEmpathy
                    ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold border-b-4 border-emerald-700 active:border-b-0'
                }`}
              >
                <Mail size={20} /> Open Email Client
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PawModal;

