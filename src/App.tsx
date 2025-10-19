import React, { useState } from 'react';
import { ChevronRight, AlertCircle, Clock, MapPin, Upload, Menu, X, Home, FileText, BarChart3, LogOut, Bell, Search, Filter, CheckCircle, Zap, LogIn, User, Edit3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';



export default function CampusSupportSystem() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState<'it' | 'facilities' | 'student' | 'guild' | null>(null);
  const [selectedIssueType, setSelectedIssueType] = useState<string | null>(null);
  const [userRole, setUserRole] = useState('guest');
  const [staffDept, setStaffDept] = useState<'it' | 'facilities' | 'student' | 'guild'>('it');
  const [ticketCreated, setTicketCreated] = useState(false);
  const [newTicketId, setNewTicketId] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('Normal');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  // CMU Colors - Curated palette
  const colors = {
    cmuRed: '#c41230',
    gray: '#e0e0e0',
    darkGray: '#6d6e71',
    gold: '#fdb515',
    teal: '#008F91',
    blue: '#043673',
    green: '#009647',
    darkGreen: '#1f4c4c'
  };

  const bgClass = darkMode 
    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-850 text-white' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900';
  
  const cardClass = darkMode 
    ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50' 
    : 'bg-white/60 backdrop-blur-md border border-white/60 shadow-lg';

  const inputClass = darkMode 
    ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50' 
    : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/50';

  // Sample Tickets Data
  type Ticket = {
    id: string;
    dept: string;
    summary: string;
    room: string;
    urgency: string;
    status: string;
    submitted: string;
    progress: number;
    email: string;
  };

  const allTickets: Ticket[] = [
    { id: 'FX-2024-8847', dept: 'it', summary: 'Projector not working', room: '201', urgency: 'Critical', status: 'In Progress', submitted: '2 hours ago', progress: 65, email: 'student@cmu.edu' },
    { id: 'FX-2024-8846', dept: 'it', summary: 'WiFi connection issues', room: '305', urgency: 'Urgent', status: 'Open', submitted: '1 hour ago', progress: 20, email: 'student@cmu.edu' },
    { id: 'FX-2024-8845', dept: 'facilities', summary: 'Broken chair in study area', room: '150', urgency: 'Normal', status: 'Resolved', submitted: '3 hours ago', progress: 100, email: 'user@cmu.edu' },
    { id: 'FX-2024-8844', dept: 'facilities', summary: 'Power outlet damaged', room: '105', urgency: 'Critical', status: 'In Progress', submitted: '4 hours ago', progress: 45, email: 'faculty@cmu.edu' },
    { id: 'FX-2024-8843', dept: 'student', summary: 'Housing assignment issue', room: 'N/A', urgency: 'Urgent', status: 'Open', submitted: '30 mins ago', progress: 10, email: 'student@cmu.edu' },
    { id: 'FX-2024-8842', dept: 'guild', summary: 'Event funding request', room: 'N/A', urgency: 'Normal', status: 'Open', submitted: '1 day ago', progress: 30, email: 'student@cmu.edu' },
  ];

  const getTicketsByDept = (dept: string): Ticket[] => allTickets.filter(t => t.dept === dept);
  const getUserTickets = (): Ticket[] => isLoggedIn ? allTickets.filter(t => t.email === userEmail) : [];

  const requiresLogin = (page: string): boolean => {
    if (!isLoggedIn && (page === 'report-issue' || page === 'track-requests')) {
      setCurrentPage('login-prompt');
      return false;
    }
    return true;
  };

  // Landing Page
const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${bgClass} overflow-hidden relative flex flex-col`}>
      {/* Header */}
      <header className={`relative z-50 ${darkMode ? 'bg-slate-900/80' : 'bg-white/40'} backdrop-blur-lg border-b sticky top-0`} style={{borderColor: colors.gray + '40'}}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-xl" style={{backgroundColor: colors.cmuRed}}>
              🔧
            </div>
            <div>
              <span className="font-bold text-lg block leading-4">FixIT</span>
              <span className="text-xs font-semibold" style={{color: colors.cmuRed}}>Support Hub</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-lg transition-all ${darkMode ? 'bg-slate-700/50 hover:bg-slate-600/50' : 'bg-white/50 hover:bg-white/80'}`}>
              {darkMode ? '🌞' : '🌙'}
            </button>
            
            {/* Desktop View */}
            <div className="hidden sm:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{backgroundColor: colors.cmuRed + '20'}}>
                    <User size={18} style={{color: colors.cmuRed}} />
                    <span className="text-sm font-semibold">{userEmail.split('@')[0]}</span>
                  </div>
                  <button 
                    onClick={() => { setIsLoggedIn(false); setUserEmail(''); setCurrentPage('landing'); }}
                    className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
                    style={{borderColor: colors.cmuRed, color: colors.cmuRed}}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setCurrentPage('login')}
                    className="px-5 py-2.5 text-white rounded-lg font-semibold transition-all hover:shadow-lg flex items-center gap-2"
                    style={{backgroundColor: colors.cmuRed}}
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('staff-login'); }}
                    className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
                    style={{borderColor: colors.cmuRed, color: colors.cmuRed}}
                  >
                    Staff
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`sm:hidden p-2.5 rounded-lg transition-all ${darkMode ? 'bg-slate-700/50 hover:bg-slate-600/50' : 'bg-white/50 hover:bg-white/80'}`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`absolute top-full left-0 right-0 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg border-b sm:hidden`} style={{borderColor: colors.gray + '40'}}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{backgroundColor: colors.cmuRed + '20'}}>
                    <User size={18} style={{color: colors.cmuRed}} />
                    <span className="text-sm font-semibold">{userEmail.split('@')[0]}</span>
                  </div>
                  <button 
                    onClick={() => { setIsLoggedIn(false); setUserEmail(''); setCurrentPage('landing'); setMenuOpen(false); }}
                    className="w-full px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
                    style={{borderColor: colors.cmuRed, color: colors.cmuRed}}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setCurrentPage('login'); setMenuOpen(false); }}
                    className="w-full px-5 py-2.5 text-white rounded-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    style={{backgroundColor: colors.cmuRed}}
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('staff-login'); setMenuOpen(false); }}
                    className="w-full px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
                    style={{borderColor: colors.cmuRed, color: colors.cmuRed}}
                  >
                    Staff
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="text-sm font-bold px-4 py-2 rounded-full" style={{backgroundColor: colors.gold + '20', color: colors.darkGray}}>
                  ⚡ Campus Maintenance Made Simple
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                <span style={{color: colors.cmuRed}}>Campus Support</span>
              </h1>
              <p className={`text-xl max-w-2xl ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Report issues in seconds. Track progress in real-time. Keep your campus operations running seamlessly and efficiently.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    if (requiresLogin('report-issue')) setCurrentPage('report-issue');
                  }}
                  className="text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl transform hover:scale-105 active:scale-95"
                  style={{backgroundColor: colors.cmuRed}}
                >
                  Report an Issue
                  <ChevronRight className="inline ml-2" size={22} />
                </button>
                <button 
                  onClick={() => {
                    if (requiresLogin('track-requests')) setCurrentPage('track-requests');
                  }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all border-2`}
                  style={{borderColor: colors.cmuRed, color: colors.cmuRed, backgroundColor: darkMode ? 'transparent' : 'white'}}
                >
                  Track Requests
                </button>
              </div>
            </div>

           
          </div>

          {/* Quick Links */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Quick Report</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🖥️', issue: 'Projector Issue', color: colors.blue },
                { icon: '⚡', issue: 'Power Problem', color: colors.cmuRed },
                { icon: '📡', issue: 'WiFi Down', color: colors.teal },
                { icon: '🪑', issue: 'Equipment Broken', color: colors.darkGray }
              ].map((q) => (
                <button
                  key={q.issue}
                  onClick={() => {
                    if (requiresLogin('report-issue')) setCurrentPage('report-issue');
                  }}
                  className="p-4 rounded-xl text-white font-semibold transition-all transform hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{backgroundColor: q.color}}
                >
                  <span className="text-2xl block mb-2">{q.icon}</span>
                  <span className="text-sm">{q.issue}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4 mt-20">
            {[
              { stat: '4,200+', label: 'Issues Resolved' },
              { stat: '98%', label: 'Satisfaction Rate' },
              { stat: '24/7', label: 'Support Available' }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-xl ${cardClass} transform hover:scale-105 transition-all`}>
                <div>
                  <div className="text-2xl font-black" style={{color: colors.cmuRed}}>{item.stat}</div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`relative z-10 ${darkMode ? 'bg-slate-900/80' : 'bg-white/40'} backdrop-blur-lg border-t mt-12`} style={{borderColor: colors.gray + '40'}}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className={`text-center text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            <p>&copy; {new Date().getFullYear()} FixIT Support Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


  // Login Prompt
  const LoginPromptPage = () => (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
      <div className={`rounded-2xl p-8 max-w-md w-full text-center ${cardClass}`}>
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-3xl font-bold mb-3">Login Required</h2>
        <p className={`mb-6 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          Please log in with your CMU email to continue.
        </p>
        <button 
          onClick={() => setCurrentPage('login')}
          className="w-full text-white px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg mb-3"
          style={{backgroundColor: colors.cmuRed}}
        >
          Login
        </button>
        <button onClick={() => setCurrentPage('landing')} className="w-full px-6 py-3 rounded-lg font-bold transition-all border-2" style={{borderColor: colors.cmuRed, color: colors.cmuRed}}>
          Back
        </button>
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
      <div className={`rounded-2xl p-8 max-w-md w-full ${cardClass}`}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4" style={{backgroundColor: colors.cmuRed}}>
            👤
          </div>
          <h1 className="text-3xl font-bold">CMU Login</h1>
          <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Access with your CMU email</p>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="andrewID@andrew.cmu.edu" 
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${inputClass}`}
          />
          <button
            onClick={() => { 
              if (userEmail && userEmail.includes('@andrew.cmu.edu')) {
                setIsLoggedIn(true);
                setCurrentPage('landing');
              } else {
                alert('Please enter a valid email address');
              }
            }}
            className="w-full p-3 rounded-lg font-bold transition-all text-white hover:shadow-lg"
            style={{backgroundColor: colors.cmuRed}}
          >
            Login
          </button>
        </div>

        <button onClick={() => setCurrentPage('landing')} className="w-full mt-6 p-3 rounded-lg border transition-all" style={{borderColor: colors.cmuRed, color: colors.cmuRed}}>
          Back
        </button>
      </div>
    </div>
  );

  // Track Requests Page
  const TrackRequestsPage = () => {
    const userTickets = isLoggedIn ? allTickets.filter(t => t.email === userEmail) : [];
    
    return (
      <div className={`min-h-screen ${bgClass} p-4`}>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setCurrentPage('landing')} className="mb-8 font-bold flex items-center gap-2 group" style={{color: colors.cmuRed}}>
            <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Requests</h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{userTickets.length} ticket{userTickets.length !== 1 ? 's' : ''}</p>
          </div>

          {userTickets.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${cardClass}`}>
              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>No requests found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userTickets.map(ticket => (
                <div key={ticket.id} className={`rounded-xl p-6 ${cardClass}`}>
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div>
                      <div className="flex gap-3 items-center mb-2 flex-wrap">
                        <span className="font-mono font-bold text-lg" style={{color: colors.cmuRed}}>{ticket.id}</span>
                        <span className="text-xs px-3 py-1 rounded-full text-white font-bold" style={{backgroundColor: ticket.urgency === 'Critical' ? colors.cmuRed : ticket.urgency === 'Urgent' ? colors.gold : colors.darkGray}}>
                          {ticket.urgency}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full font-bold" style={{backgroundColor: ticket.status === 'Resolved' ? colors.green : ticket.status === 'In Progress' ? colors.teal : colors.darkGray, color: 'white'}}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="font-semibold text-lg mb-2">{ticket.summary}</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{ticket.room !== 'N/A' ? `Room ${ticket.room}` : 'Online'} • {ticket.submitted}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold">Progress</span>
                      <span className="text-sm font-bold" style={{color: colors.cmuRed}}>{ticket.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all" 
                        style={{width: `${ticket.progress}%`, backgroundColor: colors.cmuRed}}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Report Issue Form
  const ReportIssuePage = () => {
    const departments = [
      { id: 'it', name: 'IT Support', icon: '💻', color: colors.blue },
      { id: 'student', name: 'Student Support', icon: '👥', color: colors.teal },
      { id: 'facilities', name: 'Facilities', icon: '🔧', color: colors.cmuRed },
      { id: 'guild', name: 'Student Guild', icon: '🎓', color: colors.darkGreen }
    ];

    const issueTypes = {
      it: ['Network Issue', 'Hardware Problem', 'Software Issue', 'Account Access'],
      student: ['Counseling', 'Academic Issue', 'Housing', 'Financial Aid'],
      facilities: ['Broken Equipment', 'Cleaning', 'Maintenance', 'Safety Concern'],
      guild: ['Event Issue', 'Club Support', 'Budget Request', 'Other']
    };

    const noRoomDepts: Record<string, string[]> = {
      student: ['Counseling', 'Academic Issue', 'Housing', 'Financial Aid'],
      guild: ['Event Issue', 'Club Support', 'Budget Request']
    };

    const needsPhotoAndNoAnon: Record<string, string[]> = {
      student: ['Counseling', 'Academic Issue', 'Housing', 'Financial Aid']
    };

    const isNoRoom = selectedDept ? (noRoomDepts[selectedDept]?.includes(selectedIssueType ?? '') ?? false) : false;
    const needsPhoto = selectedDept ? (needsPhotoAndNoAnon[selectedDept]?.includes(selectedIssueType ?? '') ?? false) : false;

    if (ticketCreated) {
      return (
        <div className={`min-h-screen ${bgClass} flex items-center justify-center px-4 py-20`}>
          <div className={`rounded-2xl p-12 text-center max-w-md w-full border ${cardClass}`}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce" style={{backgroundColor: colors.cmuRed}}>
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-3">Submitted!</h2>
            <p className={`mb-8 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              We received your request and our team is on it.
            </p>
            <div className={`p-5 rounded-xl mb-4 border`} style={{backgroundColor: colors.gold + '20', borderColor: colors.gold}}>
              <div className="text-xs text-gray-500 mb-2">TICKET ID</div>
              <div className="font-mono text-2xl font-bold" style={{color: colors.cmuRed}}>{newTicketId}</div>
            </div>
            <p className={`text-sm mb-8 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Save this ID to track your request status anytime.
            </p>
            <button
              onClick={() => { setTicketCreated(false); setCurrentPage('landing'); setFormStep(1); setSelectedDept(null); setSelectedIssueType(null); }}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg" 
              style={{backgroundColor: colors.cmuRed, color: 'white'}}
            >
              Done
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${bgClass} p-4`}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setCurrentPage('landing')} className="mb-8 font-bold flex items-center gap-2 group" style={{color: colors.cmuRed}}>
            <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <h1 className="text-4xl font-black mb-2">Report an Issue</h1>
          <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Step {formStep} of 4</p>

          <div className="flex gap-2 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i <= formStep ? 'opacity-100' : 'opacity-40'}`} style={{backgroundColor: i <= formStep ? colors.cmuRed : '#ccc'}} />
            ))}
          </div>

          {formStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">What needs help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => { setSelectedDept(dept.id as 'it' | 'facilities' | 'student' | 'guild'); setFormStep(2); }}
                    className={`relative overflow-hidden p-8 rounded-xl text-left transition-all transform hover:scale-105 ${cardClass} group`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{backgroundColor: dept.color}} />
                    <div className="relative z-10">
                      <span className="text-4xl block mb-3">{dept.icon}</span>
                      <div className="font-bold text-lg">{dept.name}</div>
                    </div>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">What's the problem?</h2>
              <div className="space-y-3">
                    {(selectedDept ? issueTypes[selectedDept] : []).map((type: string) => (
                      <button
                        key={type}
                        onClick={() => { setSelectedIssueType(type); setFormStep(3); }}
                        className={`w-full p-4 rounded-xl text-left transition-all transform hover:translate-x-1 ${cardClass} group`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{type}</span>
                          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
              <button onClick={() => setFormStep(1)} className="font-bold flex items-center gap-2 group" style={{color: colors.cmuRed}}>
                <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tell us more</h2>
              
              <div>
                <label className="block text-sm font-bold mb-3">Describe the issue</label>
                <textarea 
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className={`w-full p-4 rounded-xl border resize-none transition-all ${inputClass}`}
                  rows={5}
                  placeholder="Be specific so we can help faster..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3">How urgent?</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Normal', 'Urgent', 'Critical'].map(u => (
                    <button 
                      key={u}
                      onClick={() => setSelectedUrgency(u)}
                      className="p-4 rounded-xl text-white font-bold transition-all transform hover:scale-105 border-2"
                      style={{
                        backgroundColor: selectedUrgency === u ? (u === 'Critical' ? colors.cmuRed : u === 'Urgent' ? colors.gold : colors.darkGray) : 'transparent',
                        borderColor: u === 'Critical' ? colors.cmuRed : u === 'Urgent' ? colors.gold : colors.darkGray,
                        color: selectedUrgency === u ? 'white' : (darkMode ? 'white' : colors.darkGray)
                      }}
                    >
                      {u === 'Critical' ? '🔴' : u === 'Urgent' ? '🟡' : '🟢'} {u}
                    </button>
                  ))}
                </div>
              </div>

              {!isNoRoom && (
                <div>
                  <label className="block text-sm font-bold mb-3">Room Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 201, A305" 
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className={`w-full p-3 rounded-lg border transition-all ${inputClass}`} 
                  />
                </div>
              )}

              {needsPhoto && (
                <div>
                  <label className="block text-sm font-bold mb-3">Add a photo (required)</label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${darkMode ? 'border-slate-600 hover:bg-slate-700/30' : 'border-gray-300 hover:bg-gray-50/30'}`} style={{borderColor: colors.cmuRed}}>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-semibold">Click to upload</p>
                  </div>
                </div>
              )}

              {!needsPhoto && (
                <div>
                  <label className="block text-sm font-bold mb-3">Add a photo (optional)</label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${darkMode ? 'border-slate-600 hover:bg-slate-700/30' : 'border-gray-300 hover:bg-gray-50/30'}`} style={{borderColor: colors.cmuRed}}>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-semibold">Click to upload</p>
                  </div>
                </div>
              )}

              {!needsPhoto && (
                <label className="flex items-center gap-3 p-4 rounded-lg hover:bg-white/20 cursor-pointer transition-all">
                  <input type="checkbox" className="w-5 h-5 rounded cursor-pointer" />
                  <span className="text-sm font-semibold">Report anonymously</span>
                </label>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={() => setFormStep(2)} className={`flex-1 px-6 py-3 rounded-lg border font-bold transition-all ${cardClass}`}>
                  Back
                </button>
                <button onClick={() => setFormStep(4)} className="flex-1 px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg transform active:scale-95 text-white" style={{backgroundColor: colors.cmuRed}}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {formStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Review & Submit</h2>
              
              <div className={`p-6 rounded-xl border ${cardClass} space-y-4`}>
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-1">DEPARTMENT</div>
                  <div className="font-semibold">{departments.find(d => d.id === selectedDept)?.name}</div>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-1">ISSUE TYPE</div>
                  <div className="font-semibold">{selectedIssueType}</div>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-1">DESCRIPTION</div>
                  <div className="font-semibold text-sm">{issueDescription || 'No description provided'}</div>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-1">URGENCY</div>
                  <div>{selectedUrgency === 'Critical' ? '🔴' : selectedUrgency === 'Urgent' ? '🟡' : '🟢'} {selectedUrgency}</div>
                </div>
                {!isNoRoom && (
                  <>
                    <div className="border-t border-white/20" />
                    <div>
                      <div className="text-xs font-bold text-gray-500 mb-1">ROOM NUMBER</div>
                      <div className="font-semibold">{roomNumber || 'Not specified'}</div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setFormStep(3)} className={`flex-1 px-6 py-3 rounded-lg border font-bold transition-all ${cardClass}`}>
                  Back
                </button>
                <button 
                  onClick={() => { 
                    setNewTicketId(`FX-2024-${Math.floor(Math.random() * 9000) + 1000}`);
                    setTicketCreated(true); 
                  }} 
                  className="flex-1 px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg transform active:scale-95 text-white"
                  style={{backgroundColor: colors.cmuRed}}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Staff Login Page
  const StaffLoginPage = () => (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
      <div className={`rounded-2xl p-8 max-w-md w-full ${cardClass}`}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4" style={{backgroundColor: colors.cmuRed}}>
            👔
          </div>
          <h1 className="text-3xl font-bold">Staff Portal</h1>
          <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Select your department</p>
        </div>

        <div className="space-y-3">
          {[
            { id: 'it', name: '💻 IT Support', color: colors.blue },
            { id: 'facilities', name: '🔧 Facilities', color: colors.cmuRed },
            { id: 'student', name: '👥 Student Support', color: colors.teal },
            { id: 'guild', name: '🎓 Student Guild', color: colors.darkGreen }
          ].map(dept => (
            <button
              key={dept.id}
              onClick={() => { setStaffDept(dept.id as 'it' | 'facilities' | 'student' | 'guild'); setUserRole('staff'); setCurrentPage('tech-dashboard'); setSidebarOpen(true); }}
              className={`w-full p-4 rounded-lg font-bold transition-all text-white hover:shadow-lg`}
              style={{backgroundColor: dept.color}}
            >
              {dept.name}
            </button>
          ))}
        </div>

        <button onClick={() => setCurrentPage('landing')} className="w-full mt-6 p-3 rounded-lg border transition-all" style={{borderColor: colors.cmuRed, color: colors.cmuRed}}>
          Back
        </button>
      </div>
    </div>
  );

  // Staff Dashboard
  const TechnicianDashboard = () => {
    const deptTickets = getTicketsByDept(staffDept);
    const deptNames = { it: 'IT Support', facilities: 'Facilities', student: 'Student Support', guild: 'Student Guild' };
    const deptColors = { it: colors.blue, facilities: colors.cmuRed, student: colors.teal, guild: colors.darkGreen };

    const getUrgencyColor = (urgency: string): string => {
      if (urgency === 'Critical') return colors.cmuRed;
      if (urgency === 'Urgent') return colors.gold;
      return colors.darkGray;
    };

    return (
      <div className={`min-h-screen ${bgClass}`}>
        {/* Top Navigation */}
        <div className={`${darkMode ? 'bg-slate-900/60 backdrop-blur-lg' : 'bg-white/40 backdrop-blur-lg'} border-b sticky top-0 z-40`} style={{borderColor: colors.gray + '40'}}>
          <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-white/50'}`}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-2xl font-black">{deptNames[staffDept]}</h1>
            </div>
            <div className="flex gap-3">
              <button className={`p-3 rounded-lg transition-all ${cardClass}`}>
                <Search size={20} />
              </button>
              <button className={`p-3 rounded-lg transition-all ${cardClass}`}>
                <Filter size={20} />
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-lg transition-all ${cardClass}`}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={() => { setCurrentPage('landing'); setUserRole('guest'); }} className={`px-4 py-2 rounded-lg font-bold transition-all text-white`} style={{backgroundColor: colors.cmuRed}}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{deptTickets.length} open tickets</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deptTickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => {}}
                className={`text-left p-5 rounded-xl transition-all transform hover:scale-[1.02] ${cardClass} border-l-4 flex flex-col h-full`}
                style={{borderColor: getUrgencyColor(ticket.urgency)}}
              >
                <div className="flex gap-3 items-center mb-3 flex-wrap">
                  <span className="font-bold text-sm">{ticket.id}</span>
                  <span className="text-xs px-2 py-1 rounded-full text-white font-bold" style={{backgroundColor: getUrgencyColor(ticket.urgency)}}>
                    {ticket.urgency}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded font-bold`} style={{backgroundColor: ticket.status === 'Resolved' ? colors.green : ticket.status === 'In Progress' ? colors.teal : colors.darkGray, color: 'white'}}>
                    {ticket.status}
                  </span>
                </div>
                <p className="font-semibold text-sm mb-2 flex-grow">{ticket.summary}</p>
                <div className={`flex items-center gap-4 text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-3`}>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {ticket.room !== 'N/A' ? `Room ${ticket.room}` : 'Online'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {ticket.submitted}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="font-semibold">Progress</span>
                    <span style={{color: colors.cmuRed}}>{ticket.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all" 
                      style={{width: `${ticket.progress}%`, backgroundColor: colors.cmuRed}}
                    />
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="mt-3 w-full text-white px-3 py-2 rounded-lg font-bold transition-all text-sm"
                  style={{backgroundColor: deptColors[staffDept]}}
                >
                  Claim
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={bgClass}>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'login-prompt' && <LoginPromptPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'staff-login' && <StaffLoginPage />}
      {currentPage === 'report-issue' && <ReportIssuePage />}
      {currentPage === 'track-requests' && <TrackRequestsPage />}
      {currentPage === 'tech-dashboard' && <TechnicianDashboard />}
    </div>
  );
}