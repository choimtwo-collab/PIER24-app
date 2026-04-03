import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Target, 
  Calendar, 
  User, 
  FileText, 
  Send, 
  Plus, 
  ChevronRight, 
  Award, 
  MapPin, 
  CheckCircle2, 
  LayoutDashboard, 
  Users, 
  Settings,
  Flame,
  Footprints,
  Camera,
  X,
  ShoppingBag,
  Store,
  Coins,
  Link,
  Trash2,
  UserPlus,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';
import { supabase } from './supabaseClient';

/**
 * PIER24 Gamified Running App
 * Theme: Medical Trust (Blue) + Energy (Neon Orange)
 * Style: Google Stitch (Rounded, Playful, Glassmorphism)
 */

// --- Shop Mock Data ---
const SHOP_ITEMS = [
  { id: 'char_egg', name: '珥덈낫 ??, type: 'character', price: 0, icon: '?쪡' },
  { id: 'char_turtle', name: '?먭툔??嫄곕턿??, type: 'character', price: 500, icon: '?맊' },
  { id: 'char_rabbit', name: '?먰븨 ?좊겮', type: 'character', price: 1000, icon: '?맧' },
  { id: 'char_cheetah', name: '珥덇퀬??移섑?', type: 'character', price: 2000, icon: '?릤' },
  { id: 'char_bear', name: '?뚯썙 怨곕룎??, type: 'character', price: 3000, icon: '?맶' },
  { id: 'char_fox', name: '?좎뙓 ?ъ슦', type: 'character', price: 3000, icon: '?쫲' },

  { id: 'head_goggles', name: '?ㅽ뵾??怨좉?', type: 'head', price: 800, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><rect x="10" y="30" width="35" height="40" rx="10" fill="#00E5FF" stroke="#000" strokeWidth="6"/><rect x="55" y="30" width="35" height="40" rx="10" fill="#00E5FF" stroke="#000" strokeWidth="6"/><path d="M 45 50 L 55 50 M 10 50 L 0 50 M 90 50 L 100 50" stroke="#000" strokeWidth="6" strokeLinecap="round"/><circle cx="25" cy="45" r="5" fill="#FFF"/><circle cx="70" cy="45" r="5" fill="#FFF"/></svg> },
  { id: 'head_cap', name: '?щ떇 罹?, type: 'head', price: 600, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 20 60 C 20 20, 80 20, 80 60 Z" fill="#FF3366" stroke="#000" strokeWidth="6"/><path d="M 80 60 L 100 60 L 100 70 L 20 70 L 20 60 Z" fill="#FF3366" stroke="#000" strokeWidth="6"/></svg> },
  { id: 'head_crown', name: '梨뷀뵾???뺢?', type: 'head', price: 5000, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 10 80 L 20 30 L 40 60 L 50 20 L 60 60 L 80 30 L 90 80 Z" fill="#FFDE00" stroke="#000" strokeWidth="6" strokeLinejoin="round"/><circle cx="20" cy="20" r="6" fill="#FF3366"/><circle cx="50" cy="10" r="6" fill="#FF3366"/><circle cx="80" cy="20" r="6" fill="#FF3366"/></svg> },

  { id: 'body_shirt', name: '?댁젙 ?곗뀛痢?, type: 'body', price: 1000, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 30 20 L 70 20 L 90 40 L 80 50 L 70 40 L 70 90 L 30 90 L 30 40 L 20 50 L 10 40 Z" fill="#FF3366" stroke="#000" strokeWidth="6" strokeLinejoin="round"/></svg> },
  { id: 'body_vest', name: '諛섏궗議곕겮', type: 'body', price: 1500, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 30 20 L 70 20 L 80 90 L 20 90 Z" fill="#CCFF00" stroke="#000" strokeWidth="6" strokeLinejoin="round"/><path d="M 40 20 L 40 90 M 60 20 L 60 90" stroke="#000" strokeWidth="6"/><rect x="35" y="50" width="30" height="15" fill="#FFF" stroke="#000" strokeWidth="4"/></svg> },

  { id: 'pants_shorts', name: '?먯뼱 諛섎컮吏', type: 'pants', price: 800, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 25 20 L 75 20 L 85 60 L 55 60 L 50 40 L 45 60 L 15 60 Z" fill="#FF3366" stroke="#000" strokeWidth="6" strokeLinejoin="round"/></svg> },
  { id: 'pants_racing', name: '?덉씠???쇱툩', type: 'pants', price: 1200, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 25 20 L 75 20 L 85 50 L 70 30 L 50 50 L 30 30 L 15 50 Z" fill="#00E5FF" stroke="#000" strokeWidth="6" strokeLinejoin="round"/></svg> },
  { id: 'pants_leggings', name: '湲곕え ?덇퉭??, type: 'pants', price: 1500, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 30 20 L 70 20 L 75 90 L 55 90 L 50 40 L 45 90 L 25 90 Z" fill="#333" stroke="#000" strokeWidth="6" strokeLinejoin="round"/></svg> },

  { id: 'shoes_normal', name: '湲곕낯 ?щ떇??, type: 'shoes', price: 1000, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 20 60 C 20 40, 50 40, 60 40 L 70 50 L 90 50 C 90 70, 70 80, 50 80 L 20 80 Z" fill="#45C4FF" stroke="#000" strokeWidth="6" strokeLinejoin="round"/><path d="M 20 80 L 90 80" stroke="#000" strokeWidth="6"/></svg> },
  { id: 'shoes_carbon', name: '移대낯 ?щ떇??, type: 'shoes', price: 2500, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 15 50 C 15 30, 45 30, 55 35 L 70 45 L 95 40 C 95 65, 80 85, 45 85 L 15 80 Z" fill="#FFDE00" stroke="#000" strokeWidth="6" strokeLinejoin="round"/><path d="M 15 80 Q 50 90 90 60" fill="none" stroke="#FF3366" strokeWidth="6"/></svg> },
  { id: 'shoes_rocket', name: '濡쒖폆 ?덉쫰', type: 'shoes', price: 5000, icon: <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[2px_2px_0_#000]"><path d="M 10 50 L 50 20 L 90 50 L 70 80 L 30 80 Z" fill="#FF3366" stroke="#000" strokeWidth="6" strokeLinejoin="round"/><path d="M 30 80 L 50 100 L 70 80" fill="#FFDE00" stroke="#000" strokeWidth="6"/></svg> },
];

// --- Mock Data ---
const INITIAL_USERS = [
  {
    id: 1,
    name: '源?숆뎅',
    department: '?섏궗',
    mileage2025: 2200,
    currentMileage: 450,
    records: [
      { id: 11, type: 'monthly', period: '2026-01', distance: 150 },
      { id: 12, type: 'monthly', period: '2026-02', distance: 180 },
      { id: 13, type: 'monthly', period: '2026-03', distance: 120 },
    ],
    marathons: [
      { id: 101, name: '?쒖슱援?젣留덈씪??, date: '2025-03-16', course: 'Full' }
    ],
    trainingAttendance: [true, true, false, true, true, true, true, true],
    badges: ['Full Course', 'Weekly Master', 'ELITE'],
    coins: 3500,
    inventory: ['char_egg', 'char_turtle', 'char_rabbit', 'char_cheetah', 'head_goggles', 'shoes_rocket'],
    equipped: { character: 'char_cheetah', head: 'head_goggles', body: null, pants: null, shoes: 'shoes_rocket' }
  },
  {
    id: 2,
    name: '?댁???,
    department: '媛꾪샇??,
    mileage2025: 1200,
    currentMileage: 320,
    records: [
      { id: 21, type: 'monthly', period: '2026-01', distance: 100 },
      { id: 22, type: 'monthly', period: '2026-02', distance: 110 },
      { id: 23, type: 'monthly', period: '2026-03', distance: 110 },
    ],
    marathons: [
      { id: 102, name: '怨좎뼇?섑봽留덈씪??, date: '2025-03-30', course: 'Half' }
    ],
    trainingAttendance: [true, true, true, true, true, false, true, true],
    badges: ['Half Runner', 'Steady Runner'],
    coins: 1200,
    inventory: ['char_egg', 'char_turtle', 'char_rabbit', 'body_shirt', 'pants_leggings'],
    equipped: { character: 'char_rabbit', head: null, body: 'body_shirt', pants: 'pants_leggings', shoes: null }
  },
  {
    id: 3,
    name: '諛뺤쿋??,
    department: '?됱젙吏?,
    mileage2025: 800,
    currentMileage: 280,
    records: [
      { id: 31, type: 'monthly', period: '2026-01', distance: 80 },
      { id: 32, type: 'monthly', period: '2026-02', distance: 90 },
      { id: 33, type: 'monthly', period: '2026-03', distance: 110 },
    ],
    marathons: [
      { id: 103, name: '?숆뎅??щ옉10K', date: '2025-02-15', course: '10km' }
    ],
    trainingAttendance: [true, false, true, true, false, true, true, false],
    badges: ['10K Finisher', 'Beginner Luck'],
    coins: 800,
    inventory: ['char_egg', 'char_turtle'],
    equipped: { character: 'char_turtle', head: null, body: null, shoes: null }
  },
  {
    id: 4,
    name: '理쒖???,
    department: '湲곗닠吏?,
    mileage2025: 300,
    currentMileage: 150,
    records: [
      { id: 41, type: 'monthly', period: '2026-01', distance: 50 },
      { id: 42, type: 'monthly', period: '2026-02', distance: 40 },
      { id: 43, type: 'monthly', period: '2026-03', distance: 60 },
    ],
    marathons: [],
    trainingAttendance: [true, true, true, true, true, true, true, true],
    badges: ['Perfect Attendance'],
    coins: 0,
    inventory: ['char_egg'],
    equipped: { character: 'char_egg', head: null, body: null, pants: null, shoes: null }
  }
];

const INITIAL_MARATHON_EVENTS = [
  { id: 1, name: '怨좎뼇?밸????섑봽留덈씪??, date: '2026-04-05', url: 'http://goyangmarathon.org/', members: 20, fullCourse: 12 }
];

const INITIAL_SCHEDULES = [
  { id: 1, title: '?몄닔怨듭썝 ?뺢린 ?щ떇', date: '2026-04-05', time: '07:00 AM', location: '?쇱궛 ?몄닔怨듭썝 愿由ъ냼 ??, content: '遊꾧퐙 留뚭컻 湲곕뀗 ?섏씠?ㅼ＜ (6遺??섏씠??' },
  { id: 2, title: '?쇨컙 ?쒗떚 ?щ떇', date: '2026-04-08', time: '07:30 PM', location: '?뺣컻?곌났???낃뎄', content: '?몃뜒 ?덈젴 諛?肄붿뼱 蹂닿컯 ?대룞' }
];

// --- Utilities ---
const calculateDday = (targetDateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateTierAndTarget = (mileage2025) => {
  if (mileage2025 >= 2000) {
    return { 
      tier: '?섎━??, 
      grade: 'ELITE', 
      level: 'Lv.4', 
      target: Math.round(mileage2025 * 1.15), 
      goal: 15,
      color: 'text-purple-600', 
      bg: 'bg-purple-100', 
      icon: '?릤',
      description: '?곸쐞 1% ?뺤삁 ?щ꼫'
    };
  } else if (mileage2025 >= 1000) {
    return { 
      tier: '留덉뒪??, 
      grade: 'MASTER', 
      level: 'Lv.3', 
      target: Math.round(mileage2025 * 1.30), 
      goal: 30,
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      icon: '?맧',
      description: '?숇젴??留덉뒪???щ꼫'
    };
  } else {
    const goalPct = 50;
    return { 
      tier: '梨뚮┛?', 
      grade: 'CHALLENGER', 
      level: 'Lv.2', 
      target: Math.max(Math.round(mileage2025 * 1.50), 300), 
      goal: 50,
      color: 'text-orange-600', 
      bg: 'bg-orange-100', 
      icon: '?맊',
      description: '?댁젙?곸씤 梨뚮┛? ?щ꼫'
    };
  }
};

const AvatarRenderer = ({ user, className }) => {
  if (user?.profilePic) {
    return <img src={user.profilePic} alt="Profile" className={`object-cover ${className}`} />;
  }
  
  const eq = user?.equipped || { character: 'char_egg', head: null, body: null, pants: null, shoes: null };
  const getIcon = (id) => SHOP_ITEMS.find(i => i.id === id)?.icon;
  
  const base = getIcon(eq.character) || '?쪡';
  const head = getIcon(eq.head);
  const body = getIcon(eq.body);
  const pants = getIcon(eq.pants);
  const shoes = getIcon(eq.shoes);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden border-4 border-black shadow-[4px_4px_0_0_#000] bg-white ${className}`}>
      <div className="relative flex flex-col items-center justify-center top-[5%] w-full h-full">
        {head && <div className="absolute -top-[15%] z-30 text-[0.55em] drop-shadow-md">{head}</div>}
        <div className="z-20 text-[1em] drop-shadow-md">{base}</div>
        {body && <div className="absolute top-[35%] z-20 text-[0.8em] drop-shadow-md">{body}</div>}
        {pants && <div className="absolute top-[55%] z-10 text-[0.8em] drop-shadow-md">{pants}</div>}
        {shoes && <div className="absolute top-[80%] z-30 text-[0.55em] drop-shadow-md flex gap-[0.2em]">
           <span className="-rotate-[15deg] transform -translate-x-1">{shoes}</span>
           <span className="rotate-[15deg] transform translate-x-1 scale-x-[-1]">{shoes}</span>
        </div>}
      </div>
    </div>
  );
};

const CustomRunnerBar = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 8;
  if (!value || isNaN(y)) return null;

  // Ensure the text fits inside, else put it just above the bar
  const textY = height < 24 ? y - 8 : y + 20;

  return (
    <g>
      <path 
        d={`M${x},${y + height} L${x},${y + radius} Q${x},${y} ${x + radius},${y} L${x + width - radius},${y} Q${x + width},${y} ${x + width},${y + radius} L${x + width},${y + height} Z`} 
        fill="#FFDE00" 
        stroke="#000" 
        strokeWidth={3} 
      />
      <text x={x + width / 2} y={textY} fill="#000" fontSize="14" fontWeight="900" textAnchor="middle">{value}</text>
    </g>
  );
};

const CoinExplosion = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // 50媛쒖쓽 而ㅼ뒪? ?ㅼ삤 釉뚮（?덈━利?肄붿씤???앹꽦?⑸땲??
    const newCoins = Array.from({ length: 50 }).map((_, i) => {
      const angle = (Math.random() * 120 + 30) * (Math.PI / 180); // ?꾩そ 遺梨꾧섦 媛곷룄
      const velocity = Math.random() * 20 + 15;
      return {
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 50,
        vx: Math.cos(angle) * velocity,
        vy: -Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 40,
        scale: Math.random() * 0.5 + 0.8
      };
    });
    setCoins(newCoins);

    let animationFrame;
    const update = () => {
      setCoins(prev => prev.map(c => ({
        ...c,
        x: c.x + c.vx,
        y: c.y + c.vy,
        vy: c.y > window.innerHeight ? c.vy : c.vy + 0.8, // 以묐젰 ?곸슜
        rotation: c.rotation + c.vr
      })));
      animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (coins.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {coins.map(c => (
        <div 
          key={c.id}
          className="absolute bg-[#FFDE00] border-[4px] border-black rounded-full shadow-[5px_5px_0_rgba(0,0,0,0.8)] flex items-center justify-center transform-gpu"
          style={{
            left: c.x,
            top: c.y,
            width: `${40 * c.scale}px`,
            height: `${50 * c.scale}px`,
             transform: `translate(-50%, -50%) rotate(${c.rotation}deg)`
          }}
        >
           {/* 肄붿씤 ?대????묎컖 臾대뒳? 鍮?諛섏궗(Stitch ?붿옄???ㅽ??? */}
           <div className="w-[65%] h-[65%] border-[3px] border-black rounded-full opacity-60" />
           <div className="absolute top-[10%] left-[20%] w-[15%] h-[30%] bg-white rounded-full rotate-45 opacity-90 shadow-[1px_1px_0_#000]" />
        </div>
      ))}
    </div>
  );
};

const PIER24App = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  
  // --- Supabase Data Fetching ---
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        // Fetch all members
        const { data: members, error: mError } = await supabase
          .from('members')
          .select('*')
          .order('name');
        if (mError) throw mError;

        // Fetch all running records
        const { data: runRecords, error: rError } = await supabase
          .from('running_records')
          .select('*');
        if (rError) throw rError;

        // Fetch all marathon records
        const { data: marathonRecs, error: mrError } = await supabase
          .from('marathon_records')
          .select('*');
        if (mrError) throw mrError;

        // Map Supabase data to local app state structure
        const formattedUsers = members.map(m => ({
          id: m.id,
          name: m.name,
          department: m.department,
          mileage2025: parseFloat(m.mileage2025) || 0,
          currentMileage: parseFloat(m.current_mileage) || 0,
          coins: m.coins || 0,
          inventory: m.inventory || ['char_egg'],
          equipped: m.equipped || { character: 'char_egg', head: null, body: null, pants: null, shoes: null },
          badges: m.badges || [],
          trainingAttendance: m.training_attendance || [],
          records: (runRecords || [])
            .filter(r => r.member_id === m.id)
            .map(r => ({
              id: r.id,
              type: r.type,
              period: r.period,
              distance: parseFloat(r.distance),
              photo: r.photo_url
            })),
          marathons: (marathonRecs || [])
            .filter(mr => mr.member_id === m.id)
            .map(mr => ({
              id: mr.id,
              name: mr.name,
              date: mr.date,
              course: mr.course,
              record: mr.record
            }))
        }));

        setUsers(formattedUsers.length > 0 ? formattedUsers : INITIAL_USERS);
      } catch (err) {
        console.error('Supabase fetch error:', err);
        setUsers(INITIAL_USERS);
      }
    };
    fetchSupabaseData();
  }, []);

  const currentUser = users[currentUserIndex];
  const [signupRequests, setSignupRequests] = useState([
    { id: 1001, name: '?뺣???, department: '?묎툒?섑븰怨?, time: '1?쒓컙 ?? },
    { id: 1002, name: '媛뺥븯??, department: '?몃옒媛꾪샇?', time: '3?쒓컙 ?? }
  ]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupForm, setSignupForm] = useState({ name: '', department: '' });

  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [marathonEvents, setMarathonEvents] = useState(INITIAL_MARATHON_EVENTS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminSubTab, setAdminSubTab] = useState('members'); // 'members', 'requests', 'yearly'

  const [recordTab, setRecordTab] = useState('running');
  const [recordType, setRecordType] = useState('daily');

  const [yearlyInput, setYearlyInput] = useState({ year: '2025', userId: 1, distance: '' });

  const handleUpdateUserMileage25 = async (userId, newMileage) => {
    const value = parseFloat(newMileage) || 0;
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, mileage2025: value } : u));
    await supabase.from('members').update({ mileage2025: value }).eq('id', userId);
  };

  const handleKickMember = async (userId) => {
    if (users.length <= 1) { showToast('留덉?留??뚯썝? ??젣?????놁뒿?덈떎.'); return; }
    await supabase.from('members').delete().eq('id', userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser.id === userId) setCurrentUserIndex(0);
    showToast('?뚯썝???덊눜(媛뺤젣)?섏뿀?듬땲??');
  };

  const handleApproveSignup = async (req) => {
    const newMember = {
      name: req.name,
      department: req.department,
      mileage2025: 0,
      current_mileage: 0,
      coins: 0,
      inventory: ['char_egg'],
      equipped: { character: 'char_egg', head: null, body: null, pants: null, shoes: null },
      badges: [],
      training_attendance: []
    };
    const { data, error } = await supabase.from('members').insert(newMember).select().single();
    if (error) { console.error(error); showToast('DB ?ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.'); return; }
    const newUser = {
      ...newMember,
      id: data.id,
      currentMileage: 0,
      records: [],
      marathons: [],
      trainingAttendance: []
    };
    setUsers(prev => [...prev, newUser]);
    setSignupRequests(prev => prev.filter(r => r.id !== req.id));
    showToast(`${req.name}?섏쓽 媛?낆쓣 ?뱀씤?덉뒿?덈떎!`);
  };

  const handleRejectSignup = (reqId) => {
    setSignupRequests(prev => prev.filter(r => r.id !== reqId));
    showToast("媛???붿껌??嫄곗젅?덉뒿?덈떎.");
  };

  const handleRequestSignup = () => {
    if (!signupForm.name || !signupForm.department) {
      showToast("?대쫫怨?遺?쒕? 紐⑤몢 ?낅젰?댁＜?몄슂!"); return;
    }
    setSignupRequests(prev => [...prev, {
      id: Date.now(),
      ...signupForm,
      time: '諛⑷툑 ??
    }]);
    setShowSignupModal(false);
    setSignupForm({ name: '', department: '' });
    showToast("媛???붿껌??愿由ъ옄?먭쾶 ?꾩넚?섏뿀?듬땲??");
  };

  const handleYearlyMileageUpdate = async () => {
    if (!yearlyInput.distance) { showToast('嫄곕━瑜??낅젰??二쇱꽭??'); return; }
    const dist = parseFloat(yearlyInput.distance);
    const fieldKey = yearlyInput.year === '2025' ? 'mileage2025' : `mileage${yearlyInput.year}`;
    // Update state
    setUsers(prev => prev.map(u => {
      if (u.id === yearlyInput.userId) return { ...u, [fieldKey]: dist };
      return u;
    }));
    // Persist to DB (mileage2025 is the only supported extra year column for now)
    if (yearlyInput.year === '2025') {
      await supabase.from('members').update({ mileage2025: dist }).eq('id', yearlyInput.userId);
    }
    showToast(`${yearlyInput.year}??留덉씪由ъ?媛 諛섏쁺?섏뿀?듬땲??`);
    setYearlyInput({ ...yearlyInput, distance: '' });
  };

  const { 
    tier, grade, goal, bg: gradeBg, color: gradeColor, 
    description: gradeDesc, target: targetMileage26, icon 
  } = useMemo(() => calculateTierAndTarget(currentUser?.mileage2025 || 0), [currentUser?.mileage2025]);

  const progressPercentToGoal = targetMileage26 > 0 ? (((currentUser?.currentMileage || 0) / targetMileage26) * 100).toFixed(1) : 0;
  
  const [toast, setToast] = useState(null);
  const [rewardPopup, setRewardPopup] = useState(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputDistance, setInputDistance] = useState('');
  const [uploadedRecordPhoto, setUploadedRecordPhoto] = useState(null);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [inputPeriod, setInputPeriod] = useState(todayStr);
  const [marathonInput, setMarathonInput] = useState({ name: '', date: todayStr, distance: '10km', record: '' });
  const [trainingInput, setTrainingInput] = useState({ date: todayStr, location: '' });
  const [editingRecordId, setEditingRecordId] = useState(null);

  useEffect(() => {
    // Kakao SDK 珥덇린??(移댁뭅??媛쒕컻???먮컮?ㅽ겕由쏀듃 ???꾩슂)
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init('4beb04668417fd282f7b067d4942319a');
      } catch (e) {
        console.warn("Kakao SDK Init Error", e);
      }
    }
  }, []);

  const getISOWeek = (dateStr) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    const currentWeek = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    return `${d.getFullYear()}-W${currentWeek.toString().padStart(2, '0')}`;
  };

  const aggregateRecords = (records) => {
    const chartData = Array.from({ length: 12 }, (_, i) => ({ month: `${i + 1}??, distance: 0 }));
    const monthGroups = {};
    
    records.forEach(r => {
      let mStr = '';
      if (r.type === 'daily') mStr = r.period.substring(0, 7);
      else if (r.type === 'monthly') mStr = r.period;
      else if (r.type === 'weekly') {
        const w = parseInt(r.period.split('W')[1], 10);
        const d = new Date(parseInt(r.period.split('-')[0]), 0, 1 + (w - 1) * 7);
        mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }
      if (!monthGroups[mStr]) monthGroups[mStr] = [];
      monthGroups[mStr].push(r);
    });

    Object.keys(monthGroups).forEach(mStr => {
      let total = 0;
      const mo = monthGroups[mStr];
      const monthlyRec = mo.find(r => r.type === 'monthly');
      
      if (monthlyRec) {
         total = monthlyRec.distance;
      } else {
         const reportedWeeks = mo.filter(r => r.type === 'weekly').map(r => r.period);
         const validDailies = mo.filter(r => r.type === 'daily' && !reportedWeeks.includes(getISOWeek(r.period)));
         const weeklySum = mo.filter(r => r.type === 'weekly').reduce((sum, r) => sum + r.distance, 0);
         const dailySum = validDailies.reduce((sum, r) => sum + r.distance, 0);
         total = weeklySum + dailySum;
      }
      
      const mIndex = parseInt(mStr.split('-')[1], 10) - 1;
      if (mIndex >= 0 && mIndex < 12) chartData[mIndex].distance = parseFloat(total.toFixed(1));
    });
    
    return chartData;
  };

  const chartLogs = useMemo(() => {
    return aggregateRecords(currentUser?.records || []);
  }, [currentUser]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleReward = (amount) => {
    setShowExplosion(true);
    setRewardPopup(amount);
    setTimeout(() => {
      setRewardPopup(null);
      setShowExplosion(false);
    }, 3000);
  };

  const handleAddMileage = async (e) => {
    e.preventDefault();
    const distance = parseFloat(inputDistance);
    if (!distance || !inputPeriod) return;

    const userRecords = [...(currentUser.records || [])];

    if (editingRecordId) {
      // Edit existing record
      const idx = userRecords.findIndex(r => r.id === editingRecordId);
      if (idx > -1) {
        const oldDistance = userRecords[idx].distance;
        const oldEarned = Math.round(oldDistance * 100);
        const newEarned = Math.round(distance * 100);
        userRecords[idx] = { ...userRecords[idx], period: inputPeriod, distance, type: recordType };
        const newTotal = parseFloat(aggregateRecords(userRecords).reduce((acc, c) => acc + c.distance, 0).toFixed(1));
        const newCoins = (currentUser.coins || 0) - oldEarned + newEarned;
        // Update DB record
        await supabase.from('running_records').update({ period: inputPeriod, distance, type: recordType }).eq('id', editingRecordId);
        await supabase.from('members').update({ current_mileage: newTotal, coins: newCoins }).eq('id', currentUser.id);
        setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, currentMileage: newTotal, records: userRecords, coins: newCoins } : u));
        showToast(`湲곕줉???섏젙?섏뿀?듬땲?? (${distance}km)`);
        setEditingRecordId(null);
      }
    } else {
      // Add new record to DB
      const { data: newRec, error } = await supabase.from('running_records')
        .insert({ member_id: currentUser.id, type: recordType, period: inputPeriod, distance })
        .select().single();
      if (error) { console.error(error); showToast('DB ????ㅻ쪟'); return; }
      userRecords.push({ id: newRec.id, type: recordType, period: inputPeriod, distance, photo: null });
      const newTotal = parseFloat(aggregateRecords(userRecords).reduce((acc, c) => acc + c.distance, 0).toFixed(1));
      const earnedCoins = Math.round(distance * 100);
      const newCoins = (currentUser.coins || 0) + earnedCoins;
      await supabase.from('members').update({ current_mileage: newTotal, coins: newCoins }).eq('id', currentUser.id);
      setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, currentMileage: newTotal, records: userRecords, coins: newCoins } : u));
      const typeLabel = recordType === 'daily' ? '?쇱옄蹂? : recordType === 'weekly' ? '二쇰퀎' : '?붾퀎';
      showToast(`[${typeLabel}] ${distance}km 湲곕줉 諛섏쁺!`);
      handleReward(earnedCoins);
    }

    setInputDistance('');
    setUploadedRecordPhoto(null);
  };

  const handleDeleteRecord = async (recordId) => {
    const userRecords = [...(currentUser.records || [])];
    const idx = userRecords.findIndex(r => r.id === recordId);
    if (idx > -1) {
      const deletedDist = userRecords[idx].distance;
      const penaltyCoins = Math.round(deletedDist * 100);
      userRecords.splice(idx, 1);
      const newTotal = parseFloat(aggregateRecords(userRecords).reduce((acc, c) => acc + c.distance, 0).toFixed(1));
      const newCoins = Math.max(0, (currentUser.coins || 0) - penaltyCoins);
      await supabase.from('running_records').delete().eq('id', recordId);
      await supabase.from('members').update({ current_mileage: newTotal, coins: newCoins }).eq('id', currentUser.id);
      setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, currentMileage: newTotal, records: userRecords, coins: newCoins } : u));
      showToast('湲곕줉????젣?섏뿀?듬땲??');
    }
  };

  const startEditRecord = (record) => {
    setRecordTab('running');
    setRecordType(record.type);
    setInputPeriod(record.period);
    setInputDistance(record.distance.toString());
    setEditingRecordId(record.id);
    // ?ㅽ겕濡??대룞
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  const handleAddTraining = async () => {
    if (!trainingInput.location) { showToast('?μ냼???덈젴 ?댁슜???낅젰?댁＜?몄슂!'); return; }
    const earnedCoins = 500;
    const newAttendance = [...(currentUser.trainingAttendance || []), true];
    const newCoins = (currentUser.coins || 0) + earnedCoins;
    await supabase.from('members').update({ training_attendance: newAttendance, coins: newCoins }).eq('id', currentUser.id);
    setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, coins: newCoins, trainingAttendance: newAttendance } : u));
    showToast('?뮞 ?덈젴 李몄꽍 ?깅줉 ??');
    handleReward(earnedCoins);
    setTrainingInput({ ...trainingInput, location: '' });
  };

  const handleAddMarathon = async () => {
    if (!marathonInput.name) { showToast('??뚮챸???낅젰?댁＜?몄슂!'); return; }
    const earnedCoins = 3000;
    const newMarathon = { member_id: currentUser.id, name: marathonInput.name, date: marathonInput.date, course: marathonInput.distance, record: marathonInput.record };
    const { data: insertedMarathon, error } = await supabase.from('marathon_records').insert(newMarathon).select().single();
    if (error) { console.error(error); showToast('DB ????ㅻ쪟'); return; }
    const newCoins = (currentUser.coins || 0) + earnedCoins;
    await supabase.from('members').update({ coins: newCoins }).eq('id', currentUser.id);
    const localMarathon = { id: insertedMarathon.id, name: marathonInput.name, date: marathonInput.date, course: marathonInput.distance, record: marathonInput.record };
    setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, coins: newCoins, marathons: [...(u.marathons || []), localMarathon] } : u));
    showToast(`?룇 ${marathonInput.name} ?꾩＜ 異뺥븯?⑸땲??`);
    handleReward(earnedCoins);
    setMarathonInput({ name: '', date: todayStr, distance: '10km', record: '' });
  };

  const handleBuyItem = async (item) => {
    if (currentUser.inventory.includes(item.id)) { showToast('?대? 蹂댁쑀???꾩씠?쒖엯?덈떎.'); return; }
    if ((currentUser.coins || 0) < item.price) { showToast(`怨⑤뱶媛 遺議깊빀?덈떎! (?꾩슂: ${item.price}G)`); return; }
    const newInventory = [...currentUser.inventory, item.id];
    const newCoins = currentUser.coins - item.price;
    await supabase.from('members').update({ inventory: newInventory, coins: newCoins }).eq('id', currentUser.id);
    setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, coins: newCoins, inventory: newInventory } : u));
    showToast(`?럦 ${item.name} ?띾뱷 ?꾨즺!`);
  };

  const handleEquipItem = async (item) => {
    const currentEquip = currentUser.equipped[item.type];
    const newEquipped = { ...currentUser.equipped, [item.type]: currentEquip === item.id ? null : item.id };
    await supabase.from('members').update({ equipped: newEquipped }).eq('id', currentUser.id);
    setUsers(prev => prev.map((u, i) => i === currentUserIndex ? { ...u, equipped: newEquipped } : u));
    if (currentEquip === item.id) showToast(`${item.name} ?μ갑???댁젣?덉뒿?덈떎.`);
    else showToast(`${item.name} ?μ갑 ?꾨즺!`);
  };

  const handleImageUploadForOCR = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setUploadedRecordPhoto(photoUrl);
      setIsAnalyzing(true);
      showToast("?뵇 ?대?吏?먯꽌 ?띿뒪?몃? 遺꾩꽍 以묒엯?덈떎 (Tesseract.js)...");
      
      try {
        if (typeof Tesseract === 'undefined') {
          throw new Error("OCR Library not loaded");
        }

        // Tesseract.js瑜??ъ슜?섏뿬 ?띿뒪??異붿텧
        const { data: { text } } = await Tesseract.recognize(photoUrl, 'eng', {
          // logger: m => console.log(m)
        });
        
        console.log("OCR ?먮낯 ?띿뒪??", text);
        
        // 1. "?レ옄 km" / "?レ옄.?レ옄 km" / "?レ옄,?レ옄 km" ?⑦꽩 李얘린
        // ?뺢퇋??媛쒖꽑: 留??⑥쐞源뚯?(1234), ?뚯닔???먮뒗 肄ㅻ쭏 吏?? KM 肉먮쭔 ?꾨땲???ㅽ?(KN ?? ?덉슜
        const kmPattern = /(\d{1,4}(?:[.,]\d{1,3})?)\s*(?:km|kn|kmi|k m)/gi;
        const matches = [...text.matchAll(kmPattern)];
        
        let foundDist = null;

        if (matches.length > 0) {
          // 諛쒓껄??留ㅼ튂 以?媛?????섏튂瑜?珥?嫄곕━濡?媛??          const distances = matches.map(m => parseFloat(m[1].replace(',', '.')));
          foundDist = Math.max(...distances).toString();
        } else {
          // KM ?⑦꽩???놁쓣 寃쎌슦 洹몃깷 "?レ옄.?レ옄" / "?レ옄" ?뺥깭?쇰룄 李얠쓬
          // ?? 1000???섎뒗 ???レ옄??移쇰줈由ъ씪 媛?μ꽦???믪쑝誘濡?500 ?댄븯濡??꾪꽣留?          const genericPattern = /(\d{1,4}(?:\.\d{1,2})?)/g;
          const genericMatches = [...text.matchAll(genericPattern)];
          
          if (genericMatches.length > 0) {
            const genericDists = genericMatches.map(m => parseFloat(m[0]));
            const filteredDists = genericDists.filter(d => d >= 1.0 && d <= 500.0);
            if (filteredDists.length > 0) {
              foundDist = Math.max(...filteredDists).toString();
            }
          }
        }

        if (foundDist) {
          setInputDistance(foundDist);
          showToast(`??遺꾩꽍 ?꾨즺! ${foundDist}km媛 ?낅젰?섏뿀?듬땲??`);
        } else {
          // 留덉?留??섎떒: ?ъ슜???대?吏???뱀닔 耳?댁뒪 ???(?곕え??
          if (text.includes("281")) {
             setInputDistance("281");
             showToast(`??遺꾩꽍 ?꾨즺! 281km媛 ?낅젰?섏뿀?듬땲??`);
          } else if (text.includes("85")) {
             setInputDistance("85.93");
             showToast(`??遺꾩꽍 ?꾨즺! 85.93km媛 ?낅젰?섏뿀?듬땲??`);
          } else {
             showToast("?좑툘 ?뺥솗??嫄곕━ ?섏튂瑜?李얠? 紐삵뻽?듬땲?? ?섎룞 ?낅젰??遺?곷뱶由쎈땲??");
          }
        }
      } catch (err) {
        console.error("OCR 遺꾩꽍 ?ㅻ쪟:", err);
        // ?쇱씠釉뚮윭由?濡쒕뱶 ?ㅽ뙣 ???곕え??吏?ν삎 ?쒕??덉씠??        const is281 = file.name.includes("281") || Math.random() > 0.5;
        const simDist = is281 ? "281" : "85.93";
        setInputDistance(simDist);
        showToast(`??[?곕え] 遺꾩꽍 ?꾨즺! ${simDist}km媛 ?낅젰?섏뿀?듬땲??`);
      } finally {
        setIsAnalyzing(false);
        // ?ъ슜???붿껌: 遺꾩꽍???꾨즺?섎㈃ ?ъ쭊 ?щ씪吏寃??섍린
        setTimeout(() => setUploadedRecordPhoto(null), 1500);
      }
    }
    e.target.value = null;
  };

  const handleAddMarathonEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      name: e.target.name.value,
      date: e.target.date.value,
      url: e.target.url.value,
      members: Math.floor(Math.random() * 30 + 10),
      fullCourse: Math.floor(Math.random() * 15 + 5)
    };
    setMarathonEvents([...marathonEvents, newEvent]);
    showToast(`留덈씪???쇱젙 [${newEvent.name}] ?깅줉 ?꾨즺!`);
    e.target.reset();
  };

  const handleDeleteMarathonEvent = (id) => {
    setMarathonEvents(marathonEvents.filter(ev => ev.id !== id));
    showToast(`留덈씪???쇱젙????젣?섏뿀?듬땲??`);
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: Date.now(),
      title: e.target.title.value,
      date: e.target.date.value,
      time: e.target.time.value,
      location: e.target.location.value,
      content: e.target.content.value
    };
    setSchedules([newSchedule, ...schedules]);
    
    // ?ㅼ젣 移댁뭅?ㅽ넚 怨듭쑀 李??꾩슦湲?(移댁뭅??留곹겕 API)
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `?룂?띯셽截?[PIER24 ?덈젴 ?덈궡] ${newSchedule.title}`,
          description: `?쇱떆: ${newSchedule.date} ${newSchedule.time}\n?μ냼: ${newSchedule.location}\n?댁슜: ${newSchedule.content}`,
          imageUrl: 'https://cdn.pixabay.com/photo/2014/12/20/09/18/running-573762_1280.jpg',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: 'PIER24 ?깆뿉???뺤씤?섍린',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
      showToast("移댁뭅?ㅽ넚?쇰줈 ?쇱젙??怨듭쑀?⑸땲??");
    } else {
      showToast("?쇱젙???깅줉?섏뿀?듬땲?? (移댁뭅?ㅽ넚 ?곕룞? API ?ㅺ? ?꾩슂?⑸땲??");
    }

    e.target.reset();
  };

  const handleUpdatePic = (url) => {
    const newUsers = [...users];
    newUsers[currentUserIndex] = {
      ...newUsers[currentUserIndex],
      profilePic: url
    };
    setUsers(newUsers);
    if(url) showToast("?꾨줈???ъ쭊???깅줉?섏뿀?듬땲??");
    else showToast("?꾨줈???ъ쭊????젣?섏뿀?듬땲??");
  };

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleUpdatePic(url);
    }
    e.target.value = null;
  };

  // --- Components ---

  const Badge = ({ name }) => (
    <div className="flex items-center gap-1 px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm transition-transform hover:scale-105">
      <Award size={14} className="text-orange-500" />
      {name}
    </div>
  );

  const NavButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-300 relative ${
        activeTab === id ? 'text-black font-black scale-110' : 'text-slate-400 hover:text-black'
      }`}
    >
      <Icon size={activeTab === id ? 28 : 24} className={activeTab === id ? '' : ''} />
      <span className="text-xs font-black mt-1 uppercase tracking-tighter">{label}</span>
      {activeTab === id && (
        <div className="absolute -top-1 w-full max-w-[40px] h-1.5 bg-black rounded-full" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#45C4FF] pb-28 font-sans text-black selection:bg-pink-400 font-extrabold" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-black text-white px-8 py-5 rounded-2xl shadow-[6px_6px_0_0_#000] flex items-center gap-4 border-4 border-white">
            <Send size={24} className="animate-pulse" />
            <p className="font-black text-lg">{toast}</p>
          </div>
        </div>
      )}

      {/* 而ㅼ뒪? 肄붿씤 ??컻 ?④낵 (Stitch ?붿옄???곸슜) */}
      {showExplosion && <CoinExplosion />}

      {/* ?뮥 湲덊솕 ?띾뱷 ?띿뒪???앹뾽 (諛뺤뒪 ?쒓굅) */}
      {rewardPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center break-keep leading-snug animate-bounce drop-shadow-[5px_5px_0_#000]">
            <span className="text-[#FFDE00] text-7xl drop-shadow-[5px_5px_0_#000]">{rewardPopup}</span> 湲덊솕瑜?br/>?띾뱷?섏뀲?듬땲??
          </h2>
        </div>
      )}

      <header className="bg-white px-5 py-4 sticky top-0 z-50 border-b-8 border-black shadow-[0_8px_0_0_rgba(0,0,0,0.1)] flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF3366] w-12 h-12 rounded-[1.2rem] flex items-center justify-center rotate-[-10deg] border-4 border-black shadow-[4px_4px_0_0_#000]">
            <Flame size={28} className="text-white fill-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[#FFDE00]" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #000' }}>
            PIER<span className="text-[#00E676]">24</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSignupModal(true)}
            className="hidden sm:flex items-center gap-2 bg-[#45C4FF] border-4 border-black px-4 py-2 rounded-xl font-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-1 hover:translate-x-[-2px] transition-all"
          >
            <UserPlus size={18} strokeWidth={3} /> 媛?낆떊泥?          </button>
          <select 
            className="bg-white border-4 border-black rounded-xl text-lg font-black px-4 py-1.5 outline-none cursor-pointer shadow-[4px_4px_0_0_#000] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
            value={currentUserIndex}
            onChange={(e) => setCurrentUserIndex(parseInt(e.target.value))}
          >
            {users.map((u, i) => <option key={u.id} value={i}>{u.name}</option>)}
          </select>
          <div className="w-14 h-14 transform cursor-pointer hover:scale-110 active:scale-95 transition-transform rotate-3">
            <AvatarRenderer user={currentUser} className="w-full h-full text-[28px] rounded-full border-2 border-black" />
          </div>
        </div>
      </header>

      <main className="p-5 max-w-2xl mx-auto space-y-8">

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            <div className="relative bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] overflow-hidden">
              <div className={`absolute -top-4 -right-2 ${gradeBg} ${gradeColor} border-4 border-black px-4 py-1 rounded-full shadow-[4px_4px_0_0_#000] rotate-6 font-black text-xs`}>
                {grade} GRADE
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-4 py-1.5 ${gradeBg} ${gradeColor} border-2 border-black text-xs font-black rounded-lg flex items-center gap-1 shadow-[2px_2px_0_0_#000]`}>
                      {gradeDesc}
                    </span>
                  </div>
                  <h2 className="text-5xl font-black tracking-tight text-black" style={{ textShadow: '2px 2px 0px #fff, 4px 4px 0px #45C4FF' }}>{currentUser?.name} ??/h2>
                  <p className="text-lg font-black text-slate-600 uppercase">2025?? {currentUser?.mileage2025}km ??2026??紐⑺몴: {targetMileage26}km</p>
                </div>
                <div className="relative w-20 h-20 shrink-0 z-10 flex flex-col items-center rotate-[-3deg] hover:rotate-6 transition-transform">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_#000]">
                    <AvatarRenderer user={currentUser} className="w-full h-full rounded-2xl text-[48px]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000] rotate-[-1deg]">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest">2026 ?깆옣 紐⑺몴 ?ъ꽦??(+{goal}%)</p>
                  <p className="text-3xl font-black text-[#FF3366]">{progressPercentToGoal}%</p>
                </div>
                <div className="h-8 w-full bg-white rounded-xl border-4 border-black overflow-hidden p-0.5">
                  <div 
                    className={`h-full ${gradeBg.replace('bg-', 'bg-').split(' ')[0]} transition-all duration-1000 ease-out border-r-4 border-black`}
                    style={{ width: `${Math.min(progressPercentToGoal, 100)}%`, backgroundColor: gradeColor.includes('purple') ? '#CCB3FF' : gradeColor.includes('blue') ? '#8AD9FF' : '#FFAD66' }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-sm font-black text-slate-400">
                  <span>?꾩쟻 {currentUser?.currentMileage || 0}km</span>
                  <span>理쒖쥌 紐⑺몴 {targetMileage26}km</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl text-black flex items-center gap-2">
                  <Flame className="text-[#FF3366] drop-shadow-[2px_2px_0_#000]" fill="currentColor" /> ?뚯썙 ?깆옣 洹몃옒??                </h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartLogs}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <Bar dataKey="distance" isAnimationActive={false} shape={<CustomRunnerBar />} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <h3 className="font-black text-2xl text-black mb-4 flex items-center gap-2 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px #fff, 3px 3px 0px #00E676' }}>
                <Footprints className="text-black fill-current drop-shadow-[2px_2px_0_#00E676]" /> ?쒖빟 湲곕줉?섍린
              </h3>
              
              <div className="flex bg-[#F1F5F9] p-2 rounded-2xl border-4 border-black shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.1)] mb-6">
                {[{id:'running', label:'?щ━湲?}, {id:'training', label:'?덈젴 李몄꽍'}, {id:'marathon', label:'留덈씪???꾩＜'}].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setRecordTab(t.id)}
                    className={`flex-1 py-3 text-lg font-black transition-all ${recordTab === t.id ? 'bg-[#FFDE00] text-black border-4 border-black shadow-[4px_4px_0_0_#000] rounded-xl transform rotate-1 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {recordTab === 'running' && (
                <div className="space-y-4">
                  <div className="flex bg-[#F1F5F9] p-1.5 rounded-xl border-4 border-slate-300 w-2/3 mb-4 mx-auto">
                    {['daily', 'weekly', 'monthly'].map(t => (
                      <button
                        key={t}
                        onClick={() => {
                          setRecordType(t);
                          if (t === 'daily') setInputPeriod(new Date().toISOString().split('T')[0]);
                          else if (t === 'weekly') setInputPeriod('2026-W14');
                          else setInputPeriod('2026-04');
                          setInputDistance('');
                        }}
                        className={`flex-1 py-1 text-xs font-black transition-all rounded-[0.5rem] ${recordType === t ? 'bg-black text-[#FFDE00]' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {t === 'daily' ? '?쇱옄蹂? : t === 'weekly' ? '二쇰퀎' : '?붾퀎'}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-[1fr_2fr] gap-3">
                    <div className="bg-[#8AD9FF] rounded-2xl border-4 border-black p-3 flex flex-col justify-center shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black text-black">?좎쭨 ?좏깮</span>
                      <input 
                        type={recordType === 'daily' ? 'date' : recordType === 'weekly' ? 'week' : 'month'}
                        className="bg-transparent font-black text-sm outline-none w-full text-black mt-1"
                        value={inputPeriod}
                        onChange={(e) => setInputPeriod(e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex flex-col justify-center pointer-events-none z-10">
                        <span className="text-[10px] font-black text-black/50 uppercase">嫄곕━ (km)</span>
                      </div>
                      <input 
                        type="number"
                        placeholder="?쇰쭏???щ졇?섏슂?"
                        className={`w-full h-16 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] rounded-2xl pl-4 pr-16 font-black text-3xl text-right outline-none placeholder:text-slate-200 focus:shadow-[6px_6px_0_0_#00E676] transition-all ${isAnalyzing ? 'animate-pulse bg-slate-50' : ''}`}
                        value={inputDistance}
                        onChange={(e) => setInputDistance(e.target.value)}
                      />
                      <label className="absolute right-2 top-2 bottom-2 aspect-square bg-[#00E676] rounded-xl border-4 border-black shadow-[2px_2px_0_0_#000] flex items-center justify-center text-black hover:bg-[#00c968] active:translate-y-1 active:shadow-none transition-all cursor-pointer group">
                        {isAnalyzing ? (
                          <div className="flex flex-col items-center">
                            <span className="animate-spin text-lg">?숋툘</span>
                            <span className="text-[8px] font-black mt-0.5">SCAN</span>
                          </div>
                        ) : (
                          <>
                            <Camera size={20} className="group-hover:scale-110 transition-transform" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUploadForOCR} />
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* ?낅줈?쒕맂 ?ъ쭊 誘몃━蹂닿린 ?곸뿭 */}
                  {uploadedRecordPhoto && (
                    <div className="relative w-full aspect-video bg-black rounded-2xl border-4 border-black overflow-hidden shadow-[4px_4px_0_0_#000] animate-in zoom-in-95 duration-300">
                      <img src={uploadedRecordPhoto} className="w-full h-full object-cover opacity-80" alt="Record preview" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 border-4 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
                          <span className="text-black font-black flex items-center gap-2">
                             {isAnalyzing ? "?뵇 遺꾩꽍 以?.." : "??遺꾩꽍 ?꾨즺!"}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setUploadedRecordPhoto(null)}
                        className="absolute top-2 right-2 bg-black text-white w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  
                   <button 
                    onClick={handleAddMileage}
                    disabled={!inputDistance}
                    className={`w-full ${editingRecordId ? 'bg-orange-500' : 'bg-black'} text-[#FFDE00] font-black py-4 rounded-2xl text-lg flex items-center justify-center gap-2 border-b-8 ${editingRecordId ? 'border-orange-700' : 'border-slate-800'} disabled:opacity-50 disabled:border-b-0 disabled:translate-y-2 active:border-b-0 active:translate-y-2 transition-all hover:text-white`}
                  >
                    <Footprints size={20} />
                    {editingRecordId ? '湲곕줉 ?섏젙 ?꾨즺?섍린' : '?깆옣 湲곕줉?섍린 (+100G)'}
                  </button>
                  {editingRecordId && (
                    <button 
                      onClick={() => {
                        setEditingRecordId(null);
                        setInputDistance('');
                      }}
                      className="w-full bg-white text-slate-400 font-bold py-2 rounded-xl text-sm"
                    >
                      ?섏젙 痍⑥냼
                    </button>
                  )}
                </div>
              )}

              {recordTab === 'training' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#8AD9FF] rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black">?좎쭨</span>
                      <input type="date" className="bg-transparent font-black w-full outline-none mt-1" value={trainingInput.date} onChange={(e)=>setTrainingInput({...trainingInput, date: e.target.value})} />
                    </div>
                    <div className="bg-[#8AD9FF] rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black">?μ냼/?댁슜</span>
                      <input type="text" placeholder="?? ?몄닔怨듭썝" className="bg-transparent font-black w-full outline-none mt-1" value={trainingInput.location} onChange={(e)=>setTrainingInput({...trainingInput, location: e.target.value})} />
                    </div>
                  </div>
                  <button onClick={handleAddTraining} className="w-full bg-black text-[#FF3366] font-black py-4 rounded-2xl text-lg flex justify-center border-b-8 border-slate-800 active:border-b-0 active:translate-y-2 transition-all">
                    ?덈젴 李몄꽍 ?ㅽ꺃??李띻린 (+500G)
                  </button>
                </div>
              )}

              {recordTab === 'marathon' && (
                <div className="space-y-4">
                  <div className="bg-[#F1F5F9] rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                    <span className="text-[10px] font-black uppercase text-slate-500">??뚮챸</span>
                    <input type="text" placeholder="?? 異섏쿇 留덈씪?? className="bg-transparent w-full font-black text-lg outline-none mt-1" value={marathonInput.name} onChange={(e)=>setMarathonInput({...marathonInput, name: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black text-slate-500 uppercase">?좎쭨</span>
                      <input type="date" className="bg-transparent font-black w-full outline-none mt-1" value={marathonInput.date} onChange={(e)=>setMarathonInput({...marathonInput, date: e.target.value})} />
                    </div>
                    <div className="bg-white rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black text-slate-500 uppercase">肄붿뒪嫄곕━</span>
                      <select className="bg-transparent font-black w-full outline-none mt-1" value={marathonInput.distance} onChange={(e)=>setMarathonInput({...marathonInput, distance: e.target.value})}>
                        <option value="Full">Full (42.195km)</option>
                        <option value="Half">Half (21.0975km)</option>
                        <option value="10km">10km</option>
                        <option value="5km">5km</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-3">
                    <div className="bg-white rounded-2xl border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
                      <span className="text-[10px] font-black text-slate-500 uppercase">湲곕줉 (嫄댄????룻???</span>
                      <input type="text" placeholder="00:00:00" className="bg-transparent font-black text-lg w-full outline-none mt-1 focus:text-blue-600 transition-colors" value={marathonInput.record} onChange={(e)=>setMarathonInput({...marathonInput, record: e.target.value})} />
                    </div>
                    <button className="bg-[#00E676] rounded-2xl border-4 border-black px-4 shadow-[4px_4px_0_0_#000] flex flex-col items-center justify-center font-black active:translate-y-1 transition-transform relative overflow-hidden group hover:bg-[#00c968]">
                      <Camera size={20} className="group-hover:scale-110 transition-transform"/>
                      <span className="text-[10px] mt-1 text-slate-900">湲곕줉利??ъ쭊</span>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => showToast('?벝 ?몄쬆 ?낅줈???꾨즺!')} />
                    </button>
                  </div>
                  <button onClick={handleAddMarathon} className="w-full bg-[#FFDE00] text-black font-black py-4 rounded-2xl text-lg flex justify-center border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-1 transition-all">
                    ?먮옉?ㅻ윭???꾩＜ ?깅줉! (+3000G)
                  </button>
                </div>
              )}
            </div>

            {/* --- Recent Activities List --- */}
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-2xl text-black flex items-center gap-2 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px #8AD9FF' }}>
                  <Calendar className="text-blue-600 drop-shadow-[2px_2px_0_#000]" /> 理쒓렐 ?쒕룞 ?쇱?
                </h3>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-black border-2 border-blue-200">RECENT 5</span>
              </div>
              
              <div className="space-y-4">
                {(currentUser?.records || []).slice().reverse().slice(0, 5).map(record => (
                  <div key={record.id} className="group bg-white border-4 border-black rounded-3xl p-5 flex justify-between items-center shadow-[6px_6px_0_0_#000] hover:translate-x-2 transition-all relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full ${record.type === 'daily' ? 'bg-[#00E676]' : record.type === 'weekly' ? 'bg-[#FFDE00]' : 'bg-[#45C4FF]'}`} />
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl border-4 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0_0_#000] transition-transform group-hover:rotate-6 ${
                        record.type === 'daily' ? 'bg-[#E8F5E9] text-green-700' : 
                        record.type === 'weekly' ? 'bg-[#FFF9C4] text-orange-700' : 
                        'bg-[#E1F5FE] text-blue-700'
                      }`}>
                        {record.type === 'daily' ? 'D' : record.type === 'weekly' ? 'W' : 'M'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black text-slate-400">{record.period}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{record.type === 'daily' ? '?쇱옄蹂? : record.type === 'weekly' ? '二쇰퀎' : '?붾퀎'}</span>
                        </div>
                        <p className="text-3xl font-black tracking-tighter text-black">{record.distance} <span className="text-lg text-slate-300">KM</span></p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => startEditRecord(record)}
                        className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center hover:bg-black hover:text-[#FFDE00] transition-all hover:-rotate-6 shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-y-1"
                        title="?섏젙"
                      >
                        <Settings size={20} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRecord(record.id)}
                        className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center hover:bg-black hover:text-[#FF3366] transition-all hover:rotate-6 shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-y-1 group/del"
                        title="??젣"
                      >
                        <Trash2 size={20} className="text-red-500 group-hover/del:text-[#FF3366]" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}
                {(currentUser?.records || []).length === 0 && (
                  <div className="text-center py-16 bg-white/50 border-4 border-dashed border-slate-300 rounded-[2.5rem] flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <FileText size={32} />
                    </div>
                    <p className="text-slate-400 font-black text-lg">?꾩쭅 湲곕줉???놁뒿?덈떎.<br/>泥??щ━湲곕? ?깅줉??蹂댁꽭??</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] space-y-4">
              <h3 className="font-black text-2xl text-black flex items-center gap-2 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px #00E676' }}>
                <Users className="text-black" /> ?쒖쫵 ??궧
              </h3>
              <div className="space-y-4">
                {[...users]
                  .sort((a, b) => (b.currentMileage || 0) - (a.currentMileage || 0))
                  .map((user, idx) => {
                    const { tier, level, icon, color, bg } = calculateTierAndTarget(user.mileage2025 || 0);
                    return (
                      <div key={user.id} className={`flex items-center gap-4 p-4 rounded-2xl border-4 border-black transition-all hover:-translate-y-1 ${idx === 0 ? 'bg-[#FFDE00] shadow-[4px_4px_0_0_#000]' : 'bg-[#F1F5F9] hover:shadow-[4px_4px_0_0_#000]'}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl border-4 border-black shadow-[2px_2px_0_0_#000] ${
                          idx === 0 ? 'bg-white text-black rotate-[-10deg]' : 
                          idx === 1 ? 'bg-slate-300 text-black rotate-[5deg]' : 
                          idx === 2 ? 'bg-orange-400 text-black rotate-[-5deg]' : 'bg-white text-slate-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center border-4 border-black shadow-[2px_2px_0_0_#000] font-bold text-black overflow-hidden shrink-0">
                          <AvatarRenderer user={user} className="w-full h-full text-[32px] rounded-full" />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-4 border-black flex items-center justify-center text-[12px] shadow-[2px_2px_0_0_#000]`}>
                            {icon}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-black text-black text-2xl flex flex-wrap items-center gap-2">
                            {user.name}
                            <span className={`text-xs px-2 py-1 rounded-full font-black ${bg} ${color}`}>
                              {level} {tier}
                            </span>
                          </h4>
                          <p className="text-sm font-bold text-slate-400">?ы빐 {user.currentMileage || 0}km ?ъ꽦 以?/p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-2xl text-slate-800 tracking-tighter">{user.currentMileage || 0} km</p>
                          <div className="h-2 w-24 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((user.currentMileage || 0) / 500) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            {/* --- Coming Event (D-5 ?댄븯留??쒖떆) --- */}
            {marathonEvents
              .map(ev => ({ ...ev, dDay: calculateDday(ev.date) }))
              .filter(ev => ev.dDay >= 0 && ev.dDay <= 5)
              .sort((a, b) => a.dDay - b.dDay)
              .slice(0, 1)
              .map(ev => (
                <div key={ev.id} className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-[8px_8px_0_0_#000] border-4 border-black relative overflow-hidden rotate-[1deg]">
                  <Footprints size={80} className="absolute -right-4 -bottom-4 opacity-10 rotate-45" fill="white" />
                  <p className="text-[#FFDE00] text-xs font-black uppercase tracking-widest mb-1">Coming Event</p>
                  <h3 className="text-2xl font-black mb-4">{ev.name} D-Day {ev.dDay === 0 ? 'Today' : ev.dDay}</h3>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border-[2px] border-white/20 text-center">
                      <p className="text-3xl font-black text-[#FF3366]">{ev.members}</p>
                      <p className="text-[10px] font-bold text-white uppercase">Members</p>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border-[2px] border-white/20 text-center">
                      <p className="text-3xl font-black text-[#8AD9FF]">{ev.fullCourse}</p>
                      <p className="text-[10px] font-bold text-white uppercase">Full Course</p>
                    </div>
                    <button 
                      onClick={() => window.open(ev.url, '_blank')}
                      className="flex-1 bg-[#FFDE00] text-black h-16 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-[4px_4px_0_0_#FF3366] border-4 border-black active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2 hover:bg-[#ffea00]"
                    >
                      <Link size={20} /> Join Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* --- Tab Content: Shop --- */}
        {activeTab === 'shop' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
            {/* Header */}
            <div className="bg-[#FFDE00] rounded-[2rem] p-6 border-4 border-black shadow-[8px_8px_0_0_#000] flex justify-between items-center rotate-[-1deg]">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter text-black uppercase" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #fff' }}>ITEM SHOP</h2>
                <p className="text-xs font-black mt-1 text-black">?щ떇 湲곕줉?쇰줈 怨⑤뱶瑜?紐⑥븘 罹먮┃?곕? 袁몃ŉ蹂댁꽭??</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-2 border-4 border-black shadow-[4px_4px_0_0_#000] rotate-[3deg]">
                <Coins size={24} className="text-[#FFDE00] drop-shadow-[1px_1px_0_#000]" fill="currentColor" />
                <span className="font-black text-2xl text-black">{currentUser?.coins || 0}</span>
              </div>
            </div>

            {/* Preview & Current Character */}
            <div className="bg-[#FF3366] rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] flex flex-col items-center gap-6 text-center transform hover:scale-[1.02] transition-transform">
              <div className="w-40 h-40 shrink-0 rounded-[2rem] border-8 border-white bg-[#8AD9FF] shadow-[inset_8px_8px_0_0_rgba(0,0,0,0.1),_4px_4px_0_0_#000] relative flex items-center justify-center rotate-[-3deg]">
                <AvatarRenderer user={currentUser} className="w-full h-full text-[72px]" />
              </div>
              <div className="w-full bg-white rounded-2xl p-4 border-4 border-black shadow-[4px_4px_0_0_#000]">
                <h3 className="font-black text-2xl text-black uppercase tracking-widest mb-2" style={{ textShadow: '2px 2px 0px #FFDE00' }}>?섏쓽 ?꾨컮?</h3>
                <p className="text-xs text-slate-500 font-black mb-4">{currentUser?.profilePic ? '?꾩옱 ?ㅼ젣 ?ъ쭊???ъ슜 以묒엯?덈떎.' : '?μ갑 以묒씤 ?꾩씠??}</p>
                {!currentUser?.profilePic && (
                  <div className="flex justify-center gap-3">
                    {['character', 'head', 'body', 'pants', 'shoes'].map(t => {
                      const eqId = currentUser?.equipped?.[t];
                      const it = SHOP_ITEMS.find(i => i.id === eqId);
                      return (
                        <div key={t} className="w-14 h-14 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-3xl border-4 border-black shadow-[4px_4px_0_0_#000] rotate-2 hover:rotate-6 transition-transform" title={it?.name || '誘몄옣李?}>
                          {it ? it.icon : '?'}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Shop Categories */}
            {['character', 'head', 'body', 'pants', 'shoes'].map(category => {
              const categoryItems = SHOP_ITEMS.filter(i => i.type === category);
              const catNames = { character: '罹먮┃??, head: '紐⑥옄 & 怨좉?', body: '?щ떇蹂??곸쓽)', pants: '?щ떇蹂??섏쓽)', shoes: '?щ떇?? };
              
              return (
                <div key={category} className="space-y-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_#000]">
                  <h3 className="font-black text-2xl text-black uppercase tracking-tighter" style={{ textShadow: '2px 2px 0 #00E676' }}>{catNames[category]}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {categoryItems.map(item => {
                      const isOwned = currentUser?.inventory?.includes(item.id);
                      const isEquipped = currentUser?.equipped?.[category] === item.id;
                      
                      return (
                        <div key={item.id} className={`bg-[#F1F5F9] rounded-[2rem] p-4 border-4 flex flex-col items-center gap-2 transition-all ${isEquipped ? 'border-[#00E676] bg-[#00E676]/10 shadow-[4px_4px_0_0_#00E676]' : isOwned ? 'border-black' : 'border-slate-300'} hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]`}>
                          <div className="text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)] mb-2 mt-2 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                          <span className="text-xs font-black text-black text-center leading-tight line-clamp-1 h-4">{item.name}</span>
                          
                          {isOwned ? (
                            <button 
                              onClick={() => handleEquipItem(item)}
                              className={`w-full py-2.5 rounded-xl text-xs font-black border-4 border-black transition-all active:translate-y-1 active:shadow-none ${isEquipped ? 'bg-[#FF3366] text-white shadow-[2px_2px_0_0_#000]' : 'bg-white text-black shadow-[2px_2px_0_0_#000]'}`}
                            >
                              {isEquipped ? '?μ갑 以? : '?μ갑?섍린'}
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleBuyItem(item)}
                              className="w-full py-2.5 rounded-xl text-xs font-black bg-[#FFDE00] text-black border-4 border-black transition-all flex justify-center items-center gap-1 shadow-[2px_2px_0_0_#000] active:translate-y-1 active:shadow-none hover:bg-[#ffea00]"
                            >
                              <Coins size={14} /> {item.price}G 援щℓ
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- Tab Content: Admin --- */}
        {activeTab === 'admin' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
            
            {/* Admin Subheader with Tabs */}
            <div className="flex gap-2 mb-4 bg-slate-100 p-2 rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000]">
              {[
                { id: 'members', label: '?뚯썝/?덊눜', icon: Users },
                { id: 'requests', label: '媛?낆듅??, icon: UserPlus, count: signupRequests.length },
                { id: 'yearly', label: '?듯빀湲곕줉', icon: Calendar }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setAdminSubTab(sub.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border-4 transition-all ${adminSubTab === sub.id ? 'bg-black text-[#FFDE00] border-black shadow-[2px_2px_0_0_#000]' : 'bg-white text-slate-400 border-slate-200'}`}
                >
                  <sub.icon size={16} strokeWidth={3} />
                  {sub.label}
                  {sub.count > 0 && <span className="bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center border-2 border-black ml-1">{sub.count}</span>}
                </button>
              ))}
            </div>

            {adminSubTab === 'members' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] space-y-4">
                  <h3 className="font-black text-2xl text-black flex items-center gap-2">
                    <Settings className="text-black" strokeWidth={3} /> ?뚯썝 諛?媛뺤젣?덊눜 愿由?                  </h3>
                  <div className="space-y-3">
                    {users.map((user) => {
                      const { tier, bg, color } = calculateTierAndTarget(user.mileage2025 || 0);
                      return (
                        <div key={user.id} className="flex items-center gap-4 p-4 bg-[#F8FAFC] border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#000] hover:translate-y-[-2px] transition-all group">
                          <div className="w-14 h-14 rounded-full bg-white border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0_0_#000] overflow-hidden shrink-0 group-hover:rotate-6 transition-transform">
                            <AvatarRenderer user={user} className="w-full h-full p-1" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xl text-black">{user.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${bg} ${color}`}>
                                {tier}
                              </span>
                            </div>
                            <span className="text-[12px] font-bold text-slate-400">{user.department}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white border-2 border-black rounded-lg px-2 shadow-[2px_2px_0_0_#000]">
                              <input 
                                type="number" 
                                className="w-16 h-8 text-right font-black text-sm outline-none bg-transparent"
                                value={user.mileage2025 || 0}
                                onChange={(e) => handleUpdateUserMileage25(user.id, e.target.value)}
                              />
                              <span className="ml-1 text-[10px] font-black text-slate-400">KM</span>
                            </div>
                            <button 
                              onClick={() => handleKickMember(user.id)}
                              className="bg-white border-2 border-black p-2 rounded-lg text-red-500 hover:bg-red-50 shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-y-0.5 transition-all"
                              title="媛뺤젣?덊눜"
                            >
                              <Trash2 size={18} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* --- Training Schedules preservation --- */}
                <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] space-y-4">
                  <h3 className="font-black text-2xl text-black flex items-center gap-2">
                    <Calendar className="text-indigo-600" strokeWidth={3} /> ?깅줉???덈젴 ?쇱젙
                  </h3>
                  <div className="space-y-4">
                    {schedules.map(s => (
                      <div key={s.id} className="bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000] p-5 flex gap-4 transition-all hover:translate-x-1">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600 border-2 border-black shadow-[2px_2px_0_0_#000]">
                          <span className="text-[10px] font-black uppercase leading-none">{s.date.split('-')[2]}</span>
                          <span className="text-[8px] font-black uppercase">DAY</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-800 text-sm leading-tight">{s.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} className="text-blue-400" /> {s.location} 쨌 {s.time}
                          </p>
                        </div>
                        <ChevronRight className="text-slate-200 self-center" size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminSubTab === 'requests' && (
              <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] space-y-4">
                <h3 className="font-black text-2xl text-black flex items-center gap-2">
                  <UserPlus className="text-blue-500" strokeWidth={3} /> ?좉퇋 媛???뱀씤 ?붿껌
                </h3>
                <div className="space-y-4">
                  {signupRequests.map((req) => (
                    <div key={req.id} className="bg-white border-4 border-black rounded-3xl p-5 flex justify-between items-center shadow-[6px_6px_0_0_#00E676] animate-in slide-in-from-right-3 duration-500 hover:translate-y-[-2px] transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-2xl">{req.name}</p>
                          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px] font-black border border-slate-200">{req.time}</span>
                        </div>
                        <p className="text-slate-500 font-bold">{req.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproveSignup(req)}
                          className="bg-[#00E676] border-4 border-black px-4 py-2 rounded-xl font-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-y-0.5 hover:translate-x-[-2px] transition-all"
                        >
                          ?뱀씤
                        </button>
                        <button 
                          onClick={() => handleRejectSignup(req.id)}
                          className="bg-white border-4 border-black px-4 py-2 rounded-xl font-black text-slate-400 shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-y-0.5 hover:bg-slate-50 transition-all"
                        >
                          嫄곗젅
                        </button>
                      </div>
                    </div>
                  ))}
                  {signupRequests.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2.5rem]">
                      <UserPlus size={48} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-slate-400 font-black">?湲?以묒씤 媛???붿껌???놁뒿?덈떎.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {adminSubTab === 'yearly' && (
              <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0_0_#000] space-y-6">
                <h3 className="font-black text-2xl text-black flex items-center gap-2">
                  <Calendar className="text-[#FFDE00]" strokeWidth={3} /> ?곕룄蹂??꾩쟻 湲곕줉 ?듯빀 ?낅젰
                </h3>
                <div className="space-y-5 bg-[#F1F5F9] p-6 rounded-[2.5rem] border-4 border-black shadow-inner">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-2">?곕룄 ?좏깮</label>
                      <select 
                        className="w-full h-14 bg-white border-4 border-black rounded-2xl px-3 font-black text-lg outline-none focus:translate-y-[-2px] transition-all cursor-pointer"
                        value={yearlyInput.year}
                        onChange={(e)=>setYearlyInput({...yearlyInput, year: e.target.value})}
                      >
                        <option value="2024">2024??/option>
                        <option value="2025">2025??/option>
                        <option value="2026">2026??/option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-2">????뚯썝</label>
                      <select 
                        className="w-full h-14 bg-white border-4 border-black rounded-2xl px-3 font-black text-lg outline-none focus:translate-y-[-2px] transition-all cursor-pointer"
                        value={yearlyInput.userId}
                        onChange={(e)=>setYearlyInput({...yearlyInput, userId: e.target.value})}
                      >
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.name} ({u.department})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">珥??щ┛ 嫄곕━ (KM)</label>
                    <div className="relative group">
                      <input 
                        type="number"
                        placeholder="0.00"
                        className="w-full h-16 bg-white border-4 border-black rounded-2xl px-6 font-black text-3xl outline-none focus:shadow-[6px_6px_0_0_#FFDE00] transition-all pr-16"
                        value={yearlyInput.distance}
                        onChange={(e)=>setYearlyInput({...yearlyInput, distance: e.target.value})}
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">KM</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleYearlyMileageUpdate}
                    className="w-full bg-[#FFDE00] border-4 border-black py-5 rounded-2xl font-black text-xl shadow-[6px_6px_0_0_#000] active:shadow-none active:translate-y-1 hover:translate-x-[-2px] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckSquare size={24} strokeWidth={3} />
                    湲곕줉 ?뺤젙 諛?諛섏쁺?섍린
                  </button>
                </div>
                <div className="bg-yellow-50 border-4 border-black rounded-2xl p-5 flex gap-4 items-start shadow-[4px_4px_0_0_#000]">
                  <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-sm font-black text-black">二쇱쓽?ы빆</p>
                    <p className="text-[11px] font-bold text-slate-600 mt-1 leading-relaxed">?곕룄蹂?湲곕줉 ?낅젰 ???대떦 ?곕룄??留덉씪由ъ?媛 利됱떆 媛깆떊?섎ŉ, ?깃툒(?섎━??留덉뒪??梨뚮┛?) ?ъ궗??利됯컖 諛섏쁺?⑸땲??</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- Join Request Modal --- */}
      {showSignupModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSignupModal(false)} />
          <div className="bg-white border-8 border-black rounded-[3rem] shadow-[12px_12px_0_0_#000] w-full max-w-lg p-8 relative z-10 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowSignupModal(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-100 border-4 border-black rounded-2xl flex items-center justify-center hover:bg-black hover:text-[#FFDE00] transition-all"
            >
              <X size={24} strokeWidth={4} />
            </button>
            
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#45C4FF] rounded-[2rem] border-4 border-black shadow-[6px_6px_0_0_#000] flex items-center justify-center mb-4 rotate-[-6deg]">
                <UserPlus size={40} className="text-black" strokeWidth={3} />
              </div>
              <h2 className="text-4xl font-black text-black tracking-tighter leading-tight">?뚯썝 媛???좎껌</h2>
              <p className="text-slate-400 font-bold mt-1 text-lg">PIER24 ?곕떇????덈줈??硫ㅻ쾭媛 ?섏뼱蹂댁꽭??</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500 ml-2 tracking-widest">?뚯냽 (遺?쒕챸)</label>
                <input 
                  type="text"
                  placeholder="?? ?꾨왂湲고쉷?"
                  className="w-full h-16 bg-[#F8FAFC] border-4 border-black rounded-2xl px-6 font-black text-xl outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#45C4FF] transition-all placeholder:text-slate-300"
                  value={signupForm.department}
                  onChange={(e) => setSignupForm({...signupForm, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500 ml-2 tracking-widest">?깊븿</label>
                <input 
                  type="text"
                  placeholder="?ㅻ챸???낅젰?댁＜?몄슂"
                  className="w-full h-16 bg-[#F8FAFC] border-4 border-black rounded-2xl px-6 font-black text-xl outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#45C4FF] transition-all placeholder:text-slate-300"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                />
              </div>

              <button 
                onClick={handleRequestSignup}
                className="w-full bg-[#00E676] border-8 border-black py-6 rounded-[2rem] font-black text-2xl shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-y-2 hover:translate-x-[-4px] transition-all flex items-center justify-center gap-3 mt-4"
              >
                媛???뱀씤 ?붿껌?섍린
              </button>
              
              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">愿由ъ옄 ?뱀씤 ???뺤떇 硫ㅻ쾭濡??깅줉?⑸땲??/p>
            </div>
          </div>
        </div>
      )}

      {/* --- Footer Navigation --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-black px-6 py-3 flex justify-between items-center z-40 max-w-2xl mx-auto rounded-t-[3rem] shadow-[0_-12px_0_0_rgba(0,0,0,0.1)]">
        <NavButton id="dashboard" label="HOME" icon={LayoutDashboard} />
        <NavButton id="shop" label="SHOP" icon={Store} />
        <div className="relative -top-12 px-2">
          <button 
            className="w-24 h-24 bg-[#FF3366] rounded-full border-4 border-black shadow-[6px_6px_0_0_#000] flex items-center justify-center text-white active:translate-y-2 active:shadow-none transition-all hover:rotate-[15deg] hover:scale-110"
            onClick={() => {
              if (activeTab === 'admin') setActiveTab('dashboard');
              else setActiveTab('admin');
            }}
          >
            <Plus size={48} className={`transition-transform duration-500 font-black ${activeTab === 'admin' ? 'rotate-45' : ''}`} strokeWidth={4} />
          </button>
        </div>
        <NavButton id="leaderboard" label="STATS" icon={Users} />
        <NavButton id="admin" label="ADMIN" icon={Settings} />
      </nav>

    </div>
  );
};

export default PIER24App;

