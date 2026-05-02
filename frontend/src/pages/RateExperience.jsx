import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, MapPin, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../assets/bee-logo.png';

const ALL_TAGS = [
  { label: 'On Time',       emoji: '⏱️' },
  { label: 'Careful Goods', emoji: '📦' },
  { label: 'Polite',        emoji: '😊' },
  { label: 'Quick Route',   emoji: '🛣️' },
  { label: 'Clean Vehicle', emoji: '✨' },
  { label: 'Professional',  emoji: '👔' },
];

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

const RateExperience = () => {
  const navigate = useNavigate();
  const [rating, setRating]           = useState(0);
  const [hovered, setHovered]         = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedback, setFeedback]       = useState('');
  const [submitted, setSubmitted]     = useState(false);

  const active = hovered || rating;

  const toggleTag = (tag) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleSubmit = () => {
    if (!rating) { toast.error('Please select a star rating first'); return; }
    setSubmitted(true);
    setTimeout(() => navigate('/home'), 2000);
  };

  // ── Submitted state ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center font-sans px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-success/20 border-4 border-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CheckCircle size={44} className="text-success" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Thanks for rating!</h1>
          <p className="text-white/60 mb-1">Your feedback helps drivers improve.</p>
          <p className="text-white/30 text-sm">Redirecting to home…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col font-sans">

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 shrink-0">
        <button onClick={() => navigate('/trip-completion')} className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors">
          <ArrowLeft size={18} /> <span className="text-sm font-semibold">Back</span>
        </button>
        <div className="flex items-center gap-2 text-white/70">
          <img src={logo} alt="CargoBee" className="w-5 h-5 object-contain" />
          <span className="font-bold tracking-widest text-xs uppercase">CargoBee</span>
        </div>
        <button onClick={() => navigate('/home')} className="text-white/40 hover:text-white/70 text-xs font-semibold transition-colors">
          Skip
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-6 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col gap-6">

          {/* ── Driver card ── */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center text-center border border-white/10">
            <div className="relative mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Ayush Kumar"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-[0_0_24px_rgba(245,158,11,0.4)]"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-2 border-[#1a1a2e] flex items-center justify-center">
                <CheckCircle size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-xl font-black text-white mb-0.5">Ayush Kumar</h2>
            <p className="text-white/50 text-xs font-medium mb-3">MH-02-FJ-4821 • Verified Driver</p>
            <div className="bg-white/10 rounded-full px-3 py-1 text-white/60 text-xs font-semibold">
              Trip #BEE-992384
            </div>
          </div>

          {/* ── Stars ── */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Your Rating</div>
              <div className="text-lg font-black text-white h-6">
                {active > 0 ? LABELS[active] : <span className="text-white/30 font-medium text-sm">Tap a star</span>}
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    size={44}
                    strokeWidth={1.5}
                    className={`transition-all duration-150 ${
                      active >= star
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                        : 'text-white/20 fill-white/10'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Tags ── */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-4 text-center">What went well?</div>
            <div className="flex flex-wrap justify-center gap-2">
              {ALL_TAGS.map(({ label, emoji }) => {
                const isActive = selectedTags.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleTag(label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      isActive
                        ? 'bg-primary/90 text-white border-primary shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : 'bg-white/10 text-white/60 border-white/10 hover:border-white/30 hover:text-white/80'
                    }`}
                  >
                    <span>{emoji}</span> {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Feedback textarea ── */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/10">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">Additional Comments</div>
            <textarea
              rows={3}
              placeholder="Tell us more about your experience…"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/30 outline-none resize-none text-sm font-medium leading-relaxed"
            />
          </div>

          {/* ── Submit ── */}
          <button
            onClick={handleSubmit}
            className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base ${
              rating > 0
                ? 'bg-primary hover:bg-primaryDark text-white shadow-lg shadow-primary/30'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
            disabled={!rating}
          >
            <Star size={18} className={rating > 0 ? 'fill-white text-white' : ''} />
            Submit Rating
          </button>

          <p className="text-center text-white/20 text-xs pb-4">
            Your feedback is anonymous and helps improve driver quality.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RateExperience;
