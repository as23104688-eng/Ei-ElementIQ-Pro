import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  FlaskConical, 
  MessageSquare, 
  History, 
  Search, 
  Send, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Beaker,
  Lightbulb,
  Award,
  Grid,
  RefreshCcw
} from 'lucide-react';
import * as gemini from '../geminiService';
import { ELEMENTS } from '../constants/elements';

type Mode = 'FLASHCARD' | 'QUIZ' | 'CHAT' | 'PYQ';

export default function ChemistryApp() {
  const [activeMode, setActiveMode] = useState<Mode>('FLASHCARD');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-chem-bg text-slate-100 font-sans flex flex-col overflow-hidden relative">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-chem-bg overflow-hidden"
          >
            {/* Geometric Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-alkali rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-transition rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 bg-transition rounded-2xl flex items-center justify-center font-extrabold text-4xl sm:text-6xl shadow-[0_0_50px_rgba(95,230,255,0.4)] text-white relative z-10"
              >
                Ei
                <motion.div 
                  className="absolute -inset-2 bg-transition rounded-2xl -z-10 opacity-30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 text-center"
              >
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-white">
                  ElementIQ <span className="text-transition">Pro</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="h-px w-8 bg-white/10" />
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.3em] font-bold">Inorganic Engine</p>
                  <span className="h-px w-8 bg-white/10" />
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-alkali to-transition"
                    />
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="mt-6 px-4 py-2 bg-noble/10 rounded-xl border border-noble/30 shadow-[0_0_15px_rgba(255,183,77,0.1)] flex items-center gap-2"
                  >
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Architected by</span>
                    <span className="text-xs font-mono text-noble font-black tracking-tighter bg-noble/5 px-2 py-0.5 rounded shadow-inner border border-noble/20">8(DEV)</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Micro Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 200 - 100 + '%', 
                    y: Math.random() * 200 - 100 + '%',
                    opacity: 0 
                  }}
                  animate={{ 
                    y: ['0%', '-20%', '0%'],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Animation */}
      <div className="floating-bg">
        {[...Array(20)].map((_, i) => {
          const types = ['alkali', 'transition', 'noble', 'actinide'];
          const type = types[Math.floor(Math.random() * types.length)];
          return (
            <div 
              key={i} 
              className={`molecule molecule-${type}`}
              style={{
                width: Math.random() * 60 + 20 + 'px',
                height: Math.random() * 60 + 20 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 10 + 's',
                animationDuration: Math.random() * 15 + 15 + 's',
                opacity: Math.random() * 0.05 + 0.02
              }}
            />
          );
        })}
      </div>

      {/* Top Navigation Bar */}
      <header className="gradient-header py-3 px-4 sm:py-5 sm:px-8 border-b border-white/5 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transition rounded-xl flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-lg text-white ring-1 ring-white/20 transition-transform hover:scale-105 cursor-default group relative">
            Ei
            <div className="absolute -inset-1 bg-white/10 rounded-xl -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-xl font-bold leading-tight tracking-tighter">ElementIQ <span className="text-transition opacity-80">Pro</span></h1>
              <div className="flex items-center">
                <span className="h-3 w-px bg-white/10 mx-1 hidden sm:block" />
                <span className="text-[8px] sm:text-[10px] px-2 py-0.5 bg-noble/10 text-noble rounded-lg border border-noble/30 font-black tracking-tighter shadow-[0_0_10px_rgba(255,183,77,0.15)] animate-pulse">8(DEV)</span>
              </div>
            </div>
            <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold leading-none">Inorganic Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-alkali animate-pulse" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Desktop Mode: High Intensity View</span>
          </div>
          <div className="lg:hidden flex items-center gap-2 px-2 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="w-1 h-1 rounded-full bg-transition animate-pulse" />
            <span className="text-[7px] xs:text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Try Desktop Mode for better Periodic Table view</span>
          </div>
          <div className="hidden xs:flex flex-col items-end">
            <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-bold">Streak</span>
            <span className="text-xs sm:text-sm font-mono text-alkali font-bold tracking-tight">🔥 14D</span>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/5"></div>
          <div className="flex gap-1.5 sm:gap-2">
            <button 
              onClick={() => setActiveMode('CHAT')}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-transition hover:bg-transition/80 rounded text-[10px] sm:text-xs font-semibold text-white transition-all shadow-lg"
            >
              Consult
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-alkali via-post to-noble rounded-full flex items-center justify-center border-2 border-white/20 text-white text-[10px] sm:text-sm font-extrabold shadow-lg">
              AI
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden sm:flex high-density-sidebar">
          <div className="label-micro px-2 mb-1 opacity-50">Operational Modes</div>
          <nav className="flex flex-col gap-1">
            <NavButton 
              active={activeMode === 'FLASHCARD'} 
              onClick={() => setActiveMode('FLASHCARD')}
              icon="📇"
              label="Flashcards"
              colorClass="bg-s-block shadow-s-block/20"
            />
            <NavButton 
              active={activeMode === 'QUIZ'} 
              onClick={() => setActiveMode('QUIZ')}
              icon="✏️"
              label="Interactive Quiz"
              colorClass="bg-p-block shadow-p-block/20"
            />
            <NavButton 
              active={activeMode === 'CHAT'} 
              onClick={() => setActiveMode('CHAT')}
              icon="💬"
              label="Theory Assistant"
              colorClass="bg-d-block shadow-d-block/20"
            />
            <NavButton 
              active={activeMode === 'PYQ'} 
              onClick={() => setActiveMode('PYQ')}
              icon="🎯"
              label="Pattern Drills"
              colorClass="bg-f-block shadow-f-block/20"
            />
          </nav>

          <div className="mt-auto p-4 bg-transition/10 rounded-xl border border-transition/20">
            <p className="text-xs font-bold text-transition mb-1">Inorganic Strategy</p>
            <p className="text-[10px] text-slate-400 leading-tight mb-2 italic">"Master s-block trends before JEE Shift 2."</p>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-transition h-full w-[82%]"></div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6 scientific-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              {activeMode === 'FLASHCARD' && <FlashcardView />}
              {activeMode === 'QUIZ' && <QuizView />}
              {activeMode === 'CHAT' && <ChatView />}
              {activeMode === 'PYQ' && <PYQView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation - Mobile only */}
      <nav className="sm:hidden grid grid-cols-4 bg-chem-surface border-t border-white/10 relative z-50">
        {[
          { mode: 'FLASHCARD', icon: '📇', label: 'Nodes' },
          { mode: 'QUIZ', icon: '✏️', label: 'Quiz' },
          { mode: 'CHAT', icon: '💬', label: 'AI' },
          { mode: 'PYQ', icon: '🎯', label: 'Tough' }
        ].map(item => (
          <button
            key={item.mode}
            onClick={() => setActiveMode(item.mode as Mode)}
            className={`flex flex-col items-center justify-center py-2.5 transition-all ${
              activeMode === item.mode 
                ? 'text-transition border-t-2 border-transition' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest mt-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Status Bar */}
      <footer className="high-density-footer">
        <div className="flex items-center gap-4 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-alkali rounded-full animate-pulse shadow-[0_0_8px_rgba(136,192,87,0.5)]"></span> AI System: Online</span>
          <span>NCERT Repository: Synced</span>
        </div>
        <div className="text-[10px] font-bold text-transition uppercase tracking-wider hidden sm:block">
          Focus Area: Diagonal Relationship between Li and Mg ⚗️
        </div>
      </footer>
    </div>
  );
}


function NavButton({ active, onClick, icon, label, colorClass }: { 
  active: boolean, 
  onClick: () => void, 
  icon: string | React.ReactNode, 
  label: string,
  colorClass: string
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
        active 
          ? `${colorClass} text-white shadow-xl` 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="text-lg flex items-center justify-center">{icon}</span>
      {label}
    </button>
  );
}


// --- Mode Components ---

function FlashcardView() {
  const [query, setQuery] = useState('');
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [dataMap, setDataMap] = useState<Record<string, gemini.ElementFlashcard>>({});
  const [colorMode, setColorMode] = useState<'CATEGORY' | 'BLOCK'>('CATEGORY');
  const [showTable, setShowTable] = useState(true);
  const [activeTrend, setActiveTrend] = useState<'NONE' | 'ELECTRONEGATIVITY' | 'RADIUS' | 'DENSITY'>('NONE');

  const getBondType = () => {
    if (selectedElements.length !== 2) return null;
    const e1 = ELEMENTS.find(e => e.symbol === selectedElements[0]);
    const e2 = ELEMENTS.find(e => e.symbol === selectedElements[1]);
    if (!e1?.electronegativity || !e2?.electronegativity) return null;

    const diff = Math.abs(e1.electronegativity - e2.electronegativity);
    let type = 'Covalent';
    let color = 'text-green-400';
    
    if (diff > 1.7) { type = 'Ionic'; color = 'text-red-400'; }
    else if (diff > 0.4) { type = 'Polar Covalent'; color = 'text-orange-400'; }
    else if (diff > 0) { type = 'Non-polar Covalent'; color = 'text-blue-400'; }
    else { type = 'Pure Covalent'; color = 'text-slate-400'; }

    return { diff: diff.toFixed(2), type, color };
  };

  const bondInfo = getBondType();

  const handleSearch = async (elementQuery: string) => {
    if (!elementQuery) return;
    const symbol = elementQuery.trim();
    
    // If already in list, don't re-fetch
    if (dataMap[symbol]) {
      if (!selectedElements.includes(symbol)) {
        if (selectedElements.length >= 3) {
          setSelectedElements(prev => [...prev.slice(1), symbol]);
        } else {
          setSelectedElements(prev => [...prev, symbol]);
        }
      }
      return;
    }

    setLoadingMap(prev => ({ ...prev, [symbol]: true }));
    
    // Add to selection list early to show loading state
    setSelectedElements(prev => {
      if (prev.includes(symbol)) return prev;
      if (prev.length >= 3) return [...prev.slice(1), symbol];
      return [...prev, symbol];
    });

    try {
      const res = await gemini.getElementFlashcard(symbol);
      setDataMap(prev => ({ ...prev, [res.symbol]: res }));
      // In case the returned symbol is different from query (e.g. searching "Carbon" -> "C")
      if (res.symbol !== symbol) {
        setSelectedElements(prev => prev.map(s => s === symbol ? res.symbol : s));
      }
    } catch (err) {
      console.error(err);
      setSelectedElements(prev => prev.filter(s => s !== symbol));
    } finally {
      setLoadingMap(prev => ({ ...prev, [symbol]: false }));
    }
  };

  const onCellClick = (symbol: string) => {
    if (selectedElements.includes(symbol)) {
      // Toggle off
      setSelectedElements(prev => prev.filter(s => s !== symbol));
    } else {
      handleSearch(symbol);
    }
  };

  const clearSelection = () => {
    setSelectedElements([]);
    setDataMap({});
    setLoadingMap({});
  };

  const LEGEND = [
    { label: 'Alkali metals', category: 'alkali-metal' },
    { label: 'Alkaline earth', category: 'alkaline-earth' },
    { label: 'Transition metals', category: 'transition-metal' },
    { label: 'Post-transition', category: 'post-transition-metal' },
    { label: 'Metalloids', category: 'metalloid' },
    { label: 'Reactive nonmetals', category: 'reactive-nonmetal' },
    { label: 'Noble gases', category: 'noble-gas' },
    { label: 'Lanthanides', category: 'lanthanide' },
    { label: 'Actinides', category: 'actinide' },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Periodic Flashcards</h2>
          <p className="text-[10px] sm:text-xs text-slate-400">Select up to 3 elements to compare trends side-by-side.</p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2">
          <div className="flex bg-chem-surface border border-white/10 rounded-lg p-0.5">
            {[
              { id: 'NONE', label: 'None', icon: '⚪', fullLabel: 'Standard View' },
              { id: 'ELECTRONEGATIVITY', label: 'χ', icon: '⚡', fullLabel: 'Electronegativity' },
              { id: 'RADIUS', label: 'R', icon: '📏', fullLabel: 'Atomic Radius' },
              { id: 'DENSITY', label: 'ρ', icon: '🧪', fullLabel: 'Nuclear Charge' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTrend(t.id as any)}
                className={`w-7 h-7 sm:w-auto sm:px-2 sm:py-1 rounded-md text-[9px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                  activeTrend === t.id ? 'bg-transition text-white shadow-lg' : 'text-slate-500 hover:text-white'
                }`}
                title={t.fullLabel}
              >
                <span className="text-[10px] sm:text-xs">{t.icon}</span>
                <span className="hidden md:inline">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-white/5 mx-1 hidden sm:block" />
          {selectedElements.length > 0 && (
            <button 
              onClick={clearSelection}
              className="px-2 py-1.5 rounded-lg text-[9px] font-bold bg-white/5 text-slate-400 border border-white/10 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          <button 
            onClick={() => setShowTable(!showTable)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
              showTable ? 'bg-transition text-white border-transition shadow-[0_0_10px_rgba(255,77,77,0.3)]' : 'bg-chem-surface text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Grid size={12} />
            <span className="hidden xs:inline">{showTable ? 'Hide' : 'Table'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTable && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-chem-surface/50 border border-white/5 p-2 sm:p-4 rounded-xl shadow-2xl overflow-x-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-chem-bg p-1 rounded-lg border border-white/10 flex gap-1">
                  <button 
                    onClick={() => setColorMode('CATEGORY')}
                    className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-all ${colorMode === 'CATEGORY' ? 'bg-white text-chem-bg' : 'text-slate-500 hover:text-white'}`}
                  >
                    Category
                  </button>
                  <button 
                    onClick={() => setColorMode('BLOCK')}
                    className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-all ${colorMode === 'BLOCK' ? 'bg-white text-chem-bg' : 'text-slate-500 hover:text-white'}`}
                  >
                    Block
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-4 sm:mb-6 px-1 sm:px-2 justify-center items-center">
                {activeTrend !== 'NONE' ? (
                  <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Intensity Map</span>
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px] text-slate-600">Low</span>
                      <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-white/5 to-transition" />
                      <span className="text-[8px] text-slate-600">High</span>
                    </div>
                  </div>
                ) : colorMode === 'CATEGORY' ? LEGEND.map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-sm bg-${item.category} shadow-sm border border-white/10`} />
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.label}</span>
                  </div>
                )) : [
                  { label: 's-block', color: 'bg-s-block' },
                  { label: 'p-block', color: 'bg-p-block' },
                  { label: 'd-block', color: 'bg-d-block' },
                  { label: 'f-block', color: 'bg-f-block' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-sm ${item.color} shadow-sm border border-white/10`} />
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="periodic-grid min-w-[900px] py-4">
                {ELEMENTS.map((el) => {
                  const isSelected = selectedElements.includes(el.symbol);
                  
                  // Category coloring
                  let bgColor = `bg-${el.category}`;
                  
                  // Block coloring
                  if (colorMode === 'BLOCK') {
                    const block = el.symbol === 'H' || el.symbol === 'He' ? 's' : 
                                 el.number <= 4 || (el.number >= 11 && el.number <= 12) || (el.number >= 19 && el.number <= 20) || (el.number >= 37 && el.number <= 38) || (el.number >= 55 && el.number <= 56) || (el.number >= 87 && el.number <= 88) ? 's' :
                                 (el.number >= 5 && el.number <= 10) || (el.number >= 13 && el.number <= 18) || (el.number >= 31 && el.number <= 36) || (el.number >= 49 && el.number <= 54) || (el.number >= 81 && el.number <= 86) || (el.number >= 113 && el.number <= 118) ? 'p' :
                                 (el.ypos >= 9) ? 'f' : 'd';
                    bgColor = `bg-${block}-block opacity-80`;
                  }

                  // Trend calculations
                  let trendStyle = {};
                  let trendValue = null;
                  
                  if (activeTrend === 'ELECTRONEGATIVITY') {
                    const val = el.electronegativity || 0;
                    const opacity = val / 4;
                    trendStyle = { 
                      backgroundColor: val > 0 ? `rgba(255, 77, 77, ${opacity})` : 'rgba(255,255,255,0.02)',
                      boxShadow: val > 0 ? `0 0 ${opacity * 15}px rgba(255, 77, 77, 0.3)` : 'none',
                      borderColor: val > 0 ? 'rgba(255, 77, 77, 0.4)' : 'rgba(255,255,255,0.05)'
                    };
                    trendValue = val > 0 ? val.toFixed(2) : '-';
                  } else if (activeTrend === 'RADIUS') {
                    const val = el.radius || 0;
                    const scale = val / 200;
                    const intensity = val / 250;
                    trendStyle = { 
                      transform: val > 0 ? `scale(${Math.min(1.1, Math.max(0.8, scale))})` : 'scale(0.9)',
                      backgroundColor: val > 0 ? `rgba(95, 230, 255, ${intensity * 0.6})` : 'rgba(255,255,255,0.02)',
                      boxShadow: val > 0 ? `0 0 ${intensity * 15}px rgba(95, 225, 255, 0.2)` : 'none',
                      borderColor: val > 0 ? 'rgba(95, 225, 255, 0.3)' : 'rgba(255,255,255,0.05)',
                      zIndex: val > 0 ? Math.floor(val) : 1
                    };
                    trendValue = val > 0 ? `${val}pm` : '-';
                  } else if (activeTrend === 'DENSITY') {
                    // Using nuclear charge / atomic number as a proxy for visual density mapping
                    const val = el.number;
                    const opacity = val / 118;
                    trendStyle = {
                      backgroundColor: `rgba(255, 255, 255, ${opacity * 0.4})`,
                      borderColor: `rgba(255, 255, 255, ${opacity * 0.5})`,
                    };
                    trendValue = `Z=${val}`;
                  }

                  return (
                    <div 
                      key={el.number}
                      className={`element-cell transition-all duration-500 ease-out ${bgColor} ${isSelected ? 'ring-2 ring-white scale-125 z-[100] shadow-[0_0_25px_rgba(255,255,255,0.5)] !opacity-100' : ''} ${activeTrend !== 'NONE' ? '!bg-none' : ''}`}
                      style={{ 
                        gridColumn: el.xpos, 
                        gridRow: el.ypos,
                        ...trendStyle
                      }}
                      onClick={() => onCellClick(el.symbol)}
                    >
                      <span className="num text-[6px] sm:text-[8px]">{el.number}</span>
                      <span className="sym text-[10px] sm:text-sm">{el.symbol}</span>
                      {activeTrend !== 'NONE' ? (
                        <span className="text-[6px] sm:text-[7px] font-mono font-bold mt-0.5 text-white/90 animate-in fade-in zoom-in duration-500">
                          {trendValue}
                        </span>
                      ) : (
                        <span className="name text-[6px] sm:text-[8px]">{el.name}</span>
                      )}
                      <span className="absolute bottom-0.5 right-0.5 text-[6.5px] opacity-40 font-mono hidden md:block">
                        {activeTrend === 'NONE' && el.mass}
                      </span>
                    </div>
                  );
                })}
                
                {/* Labels for bottom rows */}
                <div style={{ gridColumn: '1 / 4', gridRow: 9 }} className="flex items-center justify-end pr-4 text-[10px] font-bold text-lanthanide uppercase tracking-widest opacity-80">
                  Lanthanides
                </div>
                <div style={{ gridColumn: '1 / 4', gridRow: 10 }} className="flex items-center justify-end pr-4 text-[10px] font-bold text-actinide uppercase tracking-widest opacity-80">
                  Actinides
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); setQuery(''); }} className="flex gap-1.5 sm:gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Search symbol..." 
            className="w-full bg-chem-surface border border-white/10 rounded-lg py-2.5 sm:py-2.5 pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-transition/30"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          disabled={loadingMap[query.trim()]}
          className="bg-transition hover:bg-transition/80 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg text-[10px] sm:text-xs transition-all disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <AnimatePresence>
        {bondInfo && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-chem-surface border border-white/10 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-transition" />
            <div className="flex items-center gap-3 sm:gap-6 flex-1">
              <div className="shrink-0">
                <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Δχ</p>
                <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest leading-none">{bondInfo.diff}</p>
              </div>
              <div className="h-8 sm:h-10 w-[1px] bg-white/5" />
              <div className="flex-1">
                <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Bond Type</p>
                <p className={`text-sm sm:text-xl font-bold uppercase tracking-tighter leading-none ${bondInfo.color}`}>{bondInfo.type}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {selectedElements.map((symbol) => {
          const data = dataMap[symbol];
          const isLoading = loadingMap[symbol];

          if (isLoading) {
            return (
              <div key={symbol} className="bg-chem-surface rounded-2xl border border-white/5 h-[400px] flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-8 h-8 border-4 border-transition border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Synthesizing {symbol}...</p>
              </div>
            );
          }

          if (!data) return null;

          const elementInfo = ELEMENTS.find(e => e.symbol === data.symbol);
          const blockColorClass = data.block === 's' ? 'border-s-block shadow-s-block/10' : 
                                 data.block === 'p' ? 'border-p-block shadow-p-block/10' :
                                 data.block === 'd' ? 'border-d-block shadow-d-block/10' : 
                                 'border-f-block shadow-f-block/10';
          const categoryColorClass = elementInfo ? `bg-${elementInfo.category}` : 'bg-transition';
          const textContrast = (elementInfo?.category === 'reactive-nonmetal' || elementInfo?.category === 'metalloid') ? 'text-black' : 'text-white';
          
          return (
            <motion.div 
              key={symbol}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              <div className={`bg-chem-surface rounded-2xl border-2 ${blockColorClass} shadow-2xl p-6 flex flex-col gap-6 relative overflow-hidden group`}>
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedElements(prev => prev.filter(s => s !== symbol))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 text-slate-500 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors z-10"
                >
                  ×
                </button>

                <div className={`w-full aspect-video sm:aspect-[4/3] ${categoryColorClass} rounded-xl flex flex-col items-center justify-center ${textContrast} shrink-0 shadow-lg relative`}>
                  <span className="absolute top-2 left-3 sm:top-3 sm:left-4 text-base sm:text-xl font-mono opacity-80">{data.atomicNumber}</span>
                  <span className="text-5xl sm:text-7xl font-bold tracking-tighter">{data.symbol}</span>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-90">{data.name}</p>
                    <p className="text-[8px] sm:text-[10px] font-mono opacity-70">{data.atomicMass}</p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                    <span className="label-micro block mb-1 opacity-50">NCERT Configuration</span>
                    <p className={`text-[10px] sm:text-xs font-mono font-bold ${elementInfo ? `text-${elementInfo.category}` : 'text-transition'} break-all`}>
                      {data.electronConfiguration.shorthand}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                      <p className="label-micro mb-0.5 opacity-50">Valency</p>
                      <p className="text-xs sm:text-sm font-semibold">{data.valency}</p>
                    </div>
                    <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                      <p className="label-micro mb-0.5 opacity-50">Block</p>
                      <p className={`text-xs sm:text-sm font-bold ${elementInfo ? `text-${elementInfo.category}` : 'text-transition'}`}>{data.block}</p>
                    </div>
                  </div>

                  <div className={`${elementInfo ? `bg-${elementInfo.category}/5 border-${elementInfo.category}/20` : 'bg-alkali/5 border-alkali/20'} p-3 sm:p-4 rounded-xl border`}>
                    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                      <span className={`text-[10px] sm:text-xs font-bold ${elementInfo ? `text-${elementInfo.category}` : 'text-alkali'}`}>JEE TREND</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-200 leading-relaxed font-medium">
                      {data.jeeFact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Memory Trick Accordion (simplified for grid) */}
              <div className="bg-chem-surface/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-xs">💡</span>
                  <h3 className="font-bold text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Memory Trick</h3>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 italic">
                  {data.mnemonic}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


function QuizView() {
  const [question, setQuestion] = useState<gemini.QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean, message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState<string>('JEE Main');

  const fetchQuestion = async (selectedDiff = difficulty) => {
    setLoading(true);
    setQuestion(null);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    try {
      const res = await gemini.generateQuizQuestion(selectedDiff);
      setQuestion(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [difficulty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    const isCorrect = answer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Excellent analysis! You've mastered the concept. 🌟" : "Not quite! This concept requires standard NCERT review."
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 sm:gap-6 pb-20 p-2 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-chem-surface/30 p-3 sm:p-4 rounded-xl border border-white/5 backdrop-blur-sm shadow-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-none mb-1">Concept Quiz</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold">Standard Analysis</p>
        </div>
        <div className="flex bg-chem-bg p-1 rounded-xl border border-white/10 w-full sm:w-auto">
          {['Board', 'NEET', 'JEE Main', 'JEE Advanced'].map(diff => (
            <button 
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[9px] sm:text-xs font-bold uppercase transition-all whitespace-nowrap ${
                difficulty === diff ? 'bg-transition text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              {diff === 'Board' ? 'CBSE' : diff === 'JEE Main' ? 'Main' : diff === 'JEE Advanced' ? 'Adv' : diff}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-white/5 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-transition border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Synthesizing {difficulty} Challenge...</p>
        </div>
      ) : question && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="w-full flex-1 flex flex-col gap-4"
        >
          {/* Info Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-transition animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Standard: {question.difficulty}</span>
            </div>
            {feedback && (
              <button 
                onClick={() => fetchQuestion()}
                className="flex items-center gap-1.5 text-[10px] font-bold text-transition hover:text-white transition-colors uppercase tracking-tight"
              >
                <RefreshCcw size={10} />
                Refresh
              </button>
            )}
          </div>

          {/* Question Hub */}
          <div className="flex-1 bg-chem-surface rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 sm:p-10 border-b border-white/5 flex-1 flex items-center justify-center min-h-[160px] bg-gradient-to-b from-white/[0.02] to-transparent">
              <h3 className="text-base sm:text-xl text-white font-bold leading-relaxed text-center">
                {question.question}
              </h3>
            </div>
            
            <div className="p-4 sm:p-10 bg-chem-bg/30 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Analyze and type your answer..." 
                    className={`w-full bg-chem-surface border-2 rounded-2xl py-4 sm:py-5 px-6 sm:px-8 text-white text-base sm:text-lg shadow-inner focus:outline-none transition-all placeholder:text-slate-600 ${
                      feedback 
                        ? feedback.correct ? 'border-alkali shadow-alkali/10' : 'border-transition shadow-transition/10'
                        : 'border-white/5 focus:border-transition/50'
                    }`}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={!!feedback}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-40 transition-opacity">
                    <MessageSquare size={16} />
                  </div>
                </div>
                
                {!feedback ? (
                  <div className="flex gap-2.5">
                    <button 
                      type="submit"
                      disabled={!answer.trim()}
                      className="flex-1 bg-transition hover:bg-transition/80 text-white font-bold py-4 rounded-2xl text-xs sm:text-base transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-transition/10"
                    >
                      Authenticate Answer
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowHint(true)}
                      className={`px-6 rounded-2xl border border-white/10 transition-all active:scale-[0.95] ${
                        showHint ? 'bg-transition text-white border-transition shadow-lg shadow-transition/20' : 'bg-chem-surface text-slate-400 hover:text-white'
                      }`}
                    >
                      <Lightbulb size={22} className={showHint ? 'animate-pulse' : ''} />
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className={`p-5 rounded-2xl border flex gap-4 ${
                      feedback.correct ? 'bg-alkali/5 border-alkali/30 text-alkali' : 'bg-transition/5 border-transition/30 text-transition'
                    }`}>
                      {feedback.correct ? <CheckCircle2 className="shrink-0" size={20} /> : <XCircle className="shrink-0" size={20} />}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">{feedback.correct ? 'Verified' : 'Review Needed'}</p>
                        <p className="text-sm font-medium leading-relaxed">{feedback.message}</p>
                        <p className="mt-2 text-[10px] opacity-70">Correct: <span className="font-mono font-bold uppercase">{question.answer}</span></p>
                      </div>
                    </div>

                    <div className="bg-chem-surface/50 border border-white/5 p-5 rounded-2xl space-y-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Structural Insights</p>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic border-l-2 border-transition/30 pl-4">
                        {question.explanation}
                      </p>
                    </div>

                    <button 
                      onClick={() => fetchQuestion()}
                      className="w-full bg-white text-chem-bg font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2"
                    >
                      Analyze Next Challenge <RefreshCcw size={14} />
                    </button>
                  </motion.div>
                )}
              </form>

              <AnimatePresence>
                {showHint && !feedback && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-transition/5 rounded-2xl border border-transition/20 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-transition/20 flex items-center justify-center shrink-0">
                        <Lightbulb size={14} className="text-transition" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-transition uppercase tracking-widest mb-1">Tutor Insights</p>
                        <p className="text-xs sm:text-sm italic text-slate-400 leading-relaxed">
                          {question.hint}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}


function ChatMode() {
  // Simple Chat interface
  return <div>Chat Mode (Implement later)</div>
}

function ChatView() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Hello! I am your ElementIQ AI Tutor. Ask me anything about inorganic chemistry, periodic trends, or JEE/NEET patterns. 🧪' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await gemini.chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text || 'Thinking...' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to chemical brain. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full bg-chem-surface rounded-xl sm:rounded-2xl border border-white/10 sm:border-white/5 shadow-2xl overflow-hidden">
      <div className="bg-chem-bg/80 text-white px-4 sm:px-5 py-2 sm:py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-transition" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">AI Tutor Session</span>
        </div>
        <div className="text-[8px] sm:text-[9px] font-mono opacity-50 uppercase tracking-tighter">Sync Active</div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 scientific-grid">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-xl text-xs sm:text-sm leading-relaxed shadow-xl ${
              m.role === 'user' 
                ? 'bg-transition text-white rounded-tr-none' 
                : 'bg-chem-surface border border-white/5 text-slate-300 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-chem-surface p-3 rounded-xl rounded-tl-none border border-white/5 flex gap-1 shadow-xl">
              <span className="w-1 h-1 bg-transition rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-transition rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-transition rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-chem-bg/50 border-t border-white/5 flex gap-2">
        <input 
          type="text" 
          placeholder="Ask AI Tutor..." 
          className="flex-1 bg-chem-surface border border-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white shadow-inner focus:outline-none focus:ring-1 focus:ring-transition/40 focus:border-transition transition-all font-medium placeholder:text-slate-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit"
          disabled={loading}
          className="w-10 h-10 bg-transition hover:bg-transition/80 rounded-lg flex items-center justify-center text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}


function PYQView() {
  const [pyq, setPyq] = useState<gemini.QuizQuestion & { options: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const fetchPYQ = async () => {
    setLoading(true);
    setPyq(null);
    setSelected(null);
    setShowResult(false);
    try {
      const res = await gemini.generatePYQ();
      setPyq(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPYQ();
  }, []);

  const handleCheck = () => {
    if (selected) setShowResult(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 pb-8 p-1 sm:p-0">
      {loading ? (
         <div className="flex flex-col items-center gap-3 py-20">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-alkali border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest">Mining Database...</p>
        </div>
      ) : pyq && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-alkali/20 border border-alkali/30 text-alkali text-[8px] sm:text-[9px] font-bold rounded-sm uppercase tracking-tighter shadow-sm">
              {pyq.difficulty} Standard
            </span>
          </div>

          <div className="bg-chem-surface rounded-xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-8 border-b border-white/5">
               <h3 className="text-base sm:text-lg text-white leading-relaxed font-bold">
                {pyq.question}
              </h3>
            </div>

            <div className="p-3 sm:p-6 bg-chem-bg/30 flex flex-col gap-1.5 sm:gap-2">
              {pyq.options.map((opt, idx) => {
                const letter = String.fromCharCode(97 + idx); // a, b, c, d
                const isSelected = selected === letter;
                const isCorrect = pyq.answer.toLowerCase() === letter;
                
                let bgColor = 'bg-chem-surface hover:bg-white/5 text-slate-400 border-white/5';
                
                if (showResult) {
                  if (isCorrect) {
                     bgColor = 'bg-alkali/10 text-alkali border-alkali/50';
                  } else if (isSelected) {
                    bgColor = 'bg-transition/10 text-transition border-transition/50';
                  } else {
                    bgColor = 'bg-chem-surface border-white/5 text-slate-600 opacity-50';
                  }
                } else if (isSelected) {
                  bgColor = 'bg-transition/10 text-white border-transition/50';
                }

                return (
                  <button 
                    key={letter}
                    disabled={showResult}
                    onClick={() => setSelected(letter)}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all flex items-center justify-between group active:scale-[0.99] ${bgColor}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-colors ${
                        isSelected ? 'bg-transition text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'
                      }`}>
                        {letter.toUpperCase()}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">{opt}</span>
                    </div>
                    {showResult && isCorrect && <CheckCircle2 className="text-alkali shrink-0" size={16} />}
                  </button>
                );
              })}
            </div>

            {!showResult && (
              <div className="p-3 sm:p-6 pt-0">
                <button 
                  onClick={handleCheck}
                  disabled={!selected}
                  className="w-full bg-white text-chem-bg hover:bg-slate-200 font-bold py-2.5 sm:py-3.5 rounded-lg text-xs sm:text-base disabled:opacity-30 shadow-xl transition-all active:scale-95"
                >
                  Confirm Choice
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-chem-surface p-4 sm:p-6 rounded-xl text-slate-300 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <HelpCircle className="text-transition" size={12} />
                    <h4 className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Analysis</h4>
                  </div>
                  <p className="text-xs sm:text-sm border-l-2 border-transition pl-3 sm:pl-4 py-0.5 sm:py-1 italic mb-4 sm:mb-6 leading-relaxed">
                    {pyq.explanation}
                  </p>
                  
                  <div className="p-2.5 sm:p-3.5 bg-transition/5 rounded-lg flex items-start gap-2 sm:gap-3 border border-transition/20">
                    <Lightbulb size={14} className="text-transition mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[8px] sm:text-[9px] text-transition font-bold mb-0.5 sm:mb-1 tracking-widest uppercase">Exam Hint</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 leading-normal">{pyq.hint}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={fetchPYQ}
                  className="w-full bg-transition text-white font-bold py-2.5 sm:py-3.5 rounded-lg hover:bg-transition/80 text-xs sm:text-base transition-all active:scale-95"
                >
                  Next Pattern
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

