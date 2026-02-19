// ============================================================
//  BLAZE — Fire-Themed Enrollment System
//  Paste this entire file into src/App.jsx
//  Zero extra npm installs required.
// ============================================================
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── INJECTED GLOBAL CSS ──────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  height: 100%; background: #040100;
  font-family: 'Rajdhani', sans-serif;
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #0d0200; }
::-webkit-scrollbar-thumb { background: linear-gradient(#ff4500, #ff8c00); border-radius: 4px; }

input, button, select, textarea { font-family: 'Rajdhani', sans-serif; }
button { outline: none; cursor: pointer; }
input, select, textarea { outline: none; }

@keyframes flicker {
  0%,100% { opacity:1; } 45% { opacity:.85; } 50% { opacity:1; } 80% { opacity:.9; }
}
@keyframes float-up {
  0%   { transform: translateY(0)   scale(1)   rotate(0deg);  opacity:.7; }
  100% { transform: translateY(-120vh) scale(.3) rotate(20deg); opacity:0; }
}
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 0 20px rgba(255,69,0,.3); }
  50%      { box-shadow: 0 0 45px rgba(255,100,0,.6), 0 0 80px rgba(255,69,0,.2); }
}
@keyframes ember-rise {
  0%   { transform: translateY(0) translateX(0) scale(1);    opacity:.8; }
  50%  { transform: translateY(-50vh) translateX(20px) scale(.7); opacity:.4; }
  100% { transform: translateY(-100vh) translateX(-10px) scale(.2); opacity:0; }
}
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes slide-in-left {
  from { transform: translateX(-40px); opacity:0; }
  to   { transform: translateX(0);     opacity:1; }
}
@keyframes slide-in-up {
  from { transform: translateY(30px); opacity:0; }
  to   { transform: translateY(0);    opacity:1; }
}
@keyframes fade-in { from { opacity:0; } to { opacity:1; } }
@keyframes shake {
  0%,100% { transform:translateX(0); }
  20%,60% { transform:translateX(-8px); }
  40%,80% { transform:translateX(8px); }
}
@keyframes logo-burn {
  0%,100% { filter: drop-shadow(0 0 12px #ff4500) drop-shadow(0 0 30px #ff6a00); }
  50%      { filter: drop-shadow(0 0 25px #ffb700) drop-shadow(0 0 60px #ff4500); }
}
@keyframes bar-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes count-up {
  from { opacity:0; transform:scale(.7); }
  to   { opacity:1; transform:scale(1); }
}
@keyframes draw-line {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}
@keyframes shimmer-bg {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
@keyframes tooltip-in {
  from { opacity:0; transform:translateY(6px) scale(.95); }
  to   { opacity:1; transform:translateY(0)   scale(1); }
}

.shake { animation: shake .5s ease; }
.slide-up { animation: slide-in-up .5s ease both; }
.fade-in  { animation: fade-in .4s ease both; }

.nav-btn {
  width:100%; display:flex; align-items:center; gap:12px;
  padding:12px 16px; border-radius:12px; border:1px solid transparent;
  background:transparent; color:rgba(255,180,100,.5);
  font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:500;
  letter-spacing:1px; text-align:left; transition:all .2s; white-space:nowrap; overflow:hidden;
}
.nav-btn:hover {
  background:rgba(255,69,0,.1); color:rgba(255,180,100,.85);
  border-color:rgba(255,100,0,.2);
}
.nav-btn.active {
  background:linear-gradient(135deg,rgba(255,69,0,.22),rgba(255,140,0,.1));
  border-color:rgba(255,100,0,.4); color:#ff8c00; font-weight:600;
  box-shadow:0 0 18px rgba(255,69,0,.18) inset, 0 0 18px rgba(255,69,0,.12);
}

.stat-card {
  background:linear-gradient(145deg,rgba(255,255,255,.03),rgba(255,60,0,.07));
  border:1px solid rgba(255,100,0,.18); border-radius:16px;
  padding:22px; position:relative; overflow:hidden;
  transition:transform .25s, box-shadow .25s;
  animation: slide-in-up .5s ease both;
}
.stat-card:hover {
  transform:translateY(-4px);
  box-shadow:0 16px 40px rgba(255,69,0,.22);
}

.fire-btn {
  padding:14px 32px; border:none; border-radius:12px;
  background:linear-gradient(135deg,#ff2800,#ff6a00,#ffb300);
  background-size:200% 200%; animation:shimmer-bg 3s linear infinite;
  color:#fff; font-family:'Cinzel',serif; font-weight:700;
  font-size:13px; letter-spacing:3px; cursor:pointer;
  box-shadow:0 0 30px rgba(255,69,0,.45), 0 4px 20px rgba(0,0,0,.4);
  transition:transform .15s, box-shadow .15s;
}
.fire-btn:hover {
  transform:scale(1.03);
  box-shadow:0 0 50px rgba(255,100,0,.6), 0 6px 30px rgba(0,0,0,.5);
}
.fire-btn:active { transform:scale(.98); }
.fire-btn:disabled {
  opacity:.55; cursor:not-allowed;
  animation:none; background:rgba(255,69,0,.25);
  box-shadow:none; transform:none;
}

.fire-input {
  width:100%; padding:13px 18px;
  background:rgba(255,40,0,.06);
  border:1px solid rgba(255,100,0,.2); border-radius:10px;
  color:#fff; font-size:14px; letter-spacing:.5px;
  transition:border-color .2s, box-shadow .2s;
}
.fire-input:focus {
  border-color:rgba(255,120,0,.55);
  box-shadow:0 0 22px rgba(255,69,0,.18);
}
.fire-input::placeholder { color:rgba(255,140,0,.25); }

.chart-tooltip {
  background:#1a0500; border:1px solid rgba(255,100,0,.4);
  border-radius:8px; padding:8px 14px;
  color:#ff8c00; font-family:'Rajdhani',sans-serif; font-size:13px;
  pointer-events:none; animation:tooltip-in .15s ease;
  box-shadow:0 4px 20px rgba(0,0,0,.5);
}

.table-row { transition:background .15s; }
.table-row:hover { background:rgba(255,69,0,.07) !important; }

.section-wrap { animation:fade-in .3s ease; }
`

// ─── MOCK DATA  (organised for Laravel REST API) ──────────────
// Future: replace fetch() calls with axios/fetch to your Laravel endpoints
const API_BASE = 'https://api.blaze-enrollment.test/api/v1' // Laravel endpoint

const MOCK = {
  stats: [
    { id:1, label:'Total Students', value:4821, icon:'👥', delta:'+12%', color:'#ff4500', sub:'vs last sem' },
    { id:2, label:'Active Courses', value:138,  icon:'📚', delta:'+5%',  color:'#ff6a00', sub:'this term' },
    { id:3, label:'Enrollments',    value:9204, icon:'✍️', delta:'+18%', color:'#ff8c00', sub:'this semester' },
    { id:4, label:'Pass Rate',      value:'91.4%', icon:'🏆', delta:'+2.1%', color:'#ffb300', sub:'overall' },
  ],
  enrollmentTrend: [
    { month:'AUG', count:620 }, { month:'SEP', count:980 }, { month:'OCT', count:750 },
    { month:'NOV', count:870 }, { month:'DEC', count:430 }, { month:'JAN', count:1100 },
    { month:'FEB', count:940 },
  ],
  coursePopularity: [
    { name:'CS',  label:'Comp. Science', students:312, color:'#ff4500' },
    { name:'BUS', label:'Business Adm.', students:276, color:'#ff6a00' },
    { name:'NUR', label:'Nursing',        students:254, color:'#ff8c00' },
    { name:'EDU', label:'Education',      students:198, color:'#ffb300' },
    { name:'ENG', label:'Engineering',    students:180, color:'#ffd000' },
  ],
  yearLevel: [
    { label:'Freshman',  pct:35, color:'#ff4500' },
    { label:'Sophomore', pct:28, color:'#ff6a00' },
    { label:'Junior',    pct:22, color:'#ff8c00' },
    { label:'Senior',    pct:15, color:'#ffb300' },
  ],
  students: [
    { id:'S-1041', name:'Alejandro Reyes',   course:'Computer Science', year:'3rd', gpa:'1.45', status:'Enrolled' },
    { id:'S-1042', name:'Maria Santos',       course:'Business Admin',   year:'2nd', gpa:'1.75', status:'Enrolled' },
    { id:'S-1043', name:'James Dela Cruz',    course:'Nursing',          year:'1st', gpa:'2.00', status:'Pending' },
    { id:'S-1044', name:'Sofia Lim',          course:'Engineering',      year:'4th', gpa:'1.25', status:'Enrolled' },
    { id:'S-1045', name:'Ryan Mendoza',       course:'Education',        year:'2nd', gpa:'2.50', status:'Dropped' },
    { id:'S-1046', name:'Clarisse Aquino',    course:'Computer Science', year:'1st', gpa:'1.50', status:'Enrolled' },
    { id:'S-1047', name:'Paolo Bautista',     course:'Nursing',          year:'3rd', gpa:'1.75', status:'Enrolled' },
    { id:'S-1048', name:'Ysabel Villanueva',  course:'Business Admin',   year:'4th', gpa:'1.50', status:'Enrolled' },
  ],
  courses: [
    { code:'CS101',  name:'Intro to Programming',   dept:'Computer Science', units:3, enrolled:42, capacity:50, sched:'MWF 7:30-9:00' },
    { code:'CS201',  name:'Data Structures',         dept:'Computer Science', units:3, enrolled:38, capacity:40, sched:'TTh 10:00-11:30' },
    { code:'BUS201', name:'Business Management',     dept:'Business',         units:3, enrolled:38, capacity:45, sched:'MWF 9:00-10:30' },
    { code:'NUR101', name:'Anatomy & Physiology',    dept:'Nursing',          units:4, enrolled:50, capacity:50, sched:'TTh 7:30-10:30' },
    { code:'ENG301', name:'Thermodynamics',          dept:'Engineering',      units:3, enrolled:29, capacity:40, sched:'MWF 1:00-2:30' },
    { code:'EDU201', name:'Educational Psychology',  dept:'Education',        units:3, enrolled:35, capacity:40, sched:'TTh 1:00-2:30' },
  ],
  notifications: [
    { msg:'New enrollment: S-1048 enrolled in CS101', time:'2m ago', type:'enroll' },
    { msg:'Course NUR101 is now at full capacity',     time:'15m ago', type:'warn' },
    { msg:'Grades uploaded for BUS201',                time:'1h ago', type:'info' },
    { msg:'Enrollment period ends in 3 days',          time:'2h ago', type:'warn' },
  ],
}

// API service stubs — swap mock returns for actual fetch() later
const ApiService = {
  getStudents:  () => Promise.resolve(MOCK.students),
  getCourses:   () => Promise.resolve(MOCK.courses),
  getStats:     () => Promise.resolve(MOCK.stats),
  enrollStudent:(data) => Promise.resolve({ success:true, id:`ENR-${Date.now()}`, ...data }),
  getWeather:   () => fetch('https://api.open-meteo.com/v1/forecast?latitude=14.6760&longitude=121.0437&current=temperature_2m,weathercode,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability&timezone=Asia/Manila').then(r=>r.json()),
}

// ─── FIRE PARTICLE CANVAS ──────────────────────────────────────
function FireCanvas({ intensity = 1 }) {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.offsetWidth, H = canvas.offsetHeight
    canvas.width = W; canvas.height = H

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize)

    const count = Math.floor(30 * intensity)
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * W,
      y: H + Math.random() * 40,
      vx: (Math.random() - .5) * .8,
      vy: -(1.2 + Math.random() * 2.5) * intensity,
      life: Math.random(),
      maxLife: .6 + Math.random() * .4,
      size: 3 + Math.random() * 18,
      hue: 10 + Math.random() * 35,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.life += .008
        if (p.life >= p.maxLife) {
          p.x = Math.random() * W; p.y = H + 10
          p.life = 0; p.size = 3 + Math.random() * 18
          p.hue = 10 + Math.random() * 35
        }
        const t   = p.life / p.maxLife
        const alpha = Math.sin(t * Math.PI) * .55
        const s   = p.size * (1 - t * .6)
        const g   = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s)
        g.addColorStop(0,  `hsla(${p.hue + 30},100%,90%,${alpha})`)
        g.addColorStop(.4, `hsla(${p.hue},100%,60%,${alpha * .8})`)
        g.addColorStop(1,  `hsla(${p.hue - 10},100%,30%,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        p.x += p.vx * (1 + t); p.y += p.vy * (1 + t * .5)
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [intensity])

  return (
    <canvas ref={canvasRef} style={{
      position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'
    }} />
  )
}

// ─── SVG LINE CHART ────────────────────────────────────────────
function LineChart({ data, width = '100%', height = 180, color = '#ff6a00' }) {
  const [tooltip, setTooltip] = useState(null)
  const svgRef = useRef(null)
  const W = 500, H = 160, PAD = 40

  const maxV = Math.max(...data.map(d => d.count)) * 1.1
  const pts  = data.map((d, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + (1 - d.count / maxV) * (H - PAD * 2),
    ...d,
  }))
  const linePath  = pts.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ')
  const areaPath  = `${linePath} L${pts[pts.length-1].x},${H-PAD} L${pts[0].x},${H-PAD} Z`
  const gradId    = `lgrad_${color.replace('#','')}`

  const handleMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const mx   = ((e.clientX - rect.left) / rect.width) * W
    let best = pts[0], bestD = Infinity
    pts.forEach(p => { const d = Math.abs(p.x - mx); if(d < bestD){ bestD = d; best = p } })
    if (bestD < 30) setTooltip(best)
    else setTooltip(null)
  }

  return (
    <div style={{ position:'relative', width, userSelect:'none' }}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height }}
        onMouseMove={handleMove} onMouseLeave={() => setTooltip(null)}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity=".45" />
            <stop offset="100%" stopColor={color} stopOpacity="0"   />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[.25,.5,.75,1].map(t => (
          <line key={t} x1={PAD} y1={PAD + (1-t)*(H-PAD*2)}
            x2={W-PAD} y2={PAD + (1-t)*(H-PAD*2)}
            stroke="rgba(255,100,0,.1)" strokeDasharray="4 4" />
        ))}
        {/* Area */}
        <path d={areaPath} fill={`url(#${gradId})`} />
        {/* Line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray:1000, animation:'draw-line 1.2s ease forwards' }} />
        {/* Labels */}
        {pts.map((p,i) => (
          <text key={i} x={p.x} y={H-8} textAnchor="middle"
            fill="rgba(255,140,0,.5)" fontSize="11" fontFamily="Rajdhani">
            {p.month}
          </text>
        ))}
        {/* Dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={tooltip?.month===p.month ? 6 : 4}
            fill={color} stroke="#040100" strokeWidth="2"
            style={{ transition:'r .15s' }} />
        ))}
        {/* Hover line */}
        {tooltip && (
          <line x1={tooltip.x} y1={PAD} x2={tooltip.x} y2={H-PAD}
            stroke={color} strokeOpacity=".35" strokeDasharray="4 3" />
        )}
      </svg>
      {tooltip && (
        <div className="chart-tooltip" style={{
          position:'absolute', left:Math.min(Math.max(0, (tooltip.x/W)*100 - 8), 70)+'%',
          top:'10%', zIndex:10,
        }}>
          <div style={{ fontSize:11, color:'rgba(255,140,0,.6)', letterSpacing:2 }}>{tooltip.month}</div>
          <div style={{ fontSize:20, fontWeight:700, fontFamily:'Cinzel,serif', color:'#ff6a00' }}>{tooltip.count}</div>
          <div style={{ fontSize:11, color:'rgba(255,140,0,.4)' }}>enrollments</div>
        </div>
      )}
    </div>
  )
}

// ─── SVG BAR CHART ─────────────────────────────────────────────
function BarChart({ data }) {
  const [hov, setHov] = useState(null)
  const W = 500, H = 160, PAD = 40
  const maxV = Math.max(...data.map(d => d.students)) * 1.15
  const barW = (W - PAD * 2) / data.length * .55

  return (
    <div style={{ position:'relative', userSelect:'none' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:180 }}>
        {data.map((d, i) => {
          const x = PAD + (i / data.length) * (W - PAD * 2) + (W - PAD*2)/data.length * .25
          const bH = (d.students / maxV) * (H - PAD * 2)
          const y  = H - PAD - bH
          return (
            <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <defs>
                <linearGradient id={`bg_${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={d.color} stopOpacity={hov===i ? 1 : .8} />
                  <stop offset="100%" stopColor={d.color} stopOpacity=".3" />
                </linearGradient>
              </defs>
              <rect x={x - barW/2} y={y} width={barW} height={bH}
                fill={`url(#bg_${i})`} rx="4"
                style={{ transformOrigin:`${x}px ${H-PAD}px`,
                  animation:'bar-grow .8s ease both', animationDelay:`${i*0.1}s` }} />
              {hov===i && (
                <text x={x} y={y-8} textAnchor="middle"
                  fill="#ffb300" fontSize="13" fontFamily="Cinzel" fontWeight="600">
                  {d.students}
                </text>
              )}
              <text x={x} y={H-8} textAnchor="middle"
                fill="rgba(255,140,0,.55)" fontSize="11" fontFamily="Rajdhani">
                {d.name}
              </text>
            </g>
          )
        })}
        {/* Y grid */}
        {[.25,.5,.75,1].map(t => (
          <line key={t} x1={PAD} y1={PAD+(1-t)*(H-PAD*2)}
            x2={W-PAD} y2={PAD+(1-t)*(H-PAD*2)}
            stroke="rgba(255,100,0,.08)" strokeDasharray="4 4" />
        ))}
      </svg>
    </div>
  )
}

// ─── DONUT CHART ───────────────────────────────────────────────
function DonutChart({ data }) {
  const [hov, setHov] = useState(null)
  const R = 60, r = 36, CX = 80, CY = 80
  let angle = -Math.PI / 2
  const total = data.reduce((s,d) => s + d.pct, 0)

  const arcs = data.map((d, i) => {
    const sweep = (d.pct / total) * Math.PI * 2
    const x1 = CX + R * Math.cos(angle), y1 = CY + R * Math.sin(angle)
    angle += sweep
    const x2 = CX + R * Math.cos(angle), y2 = CY + R * Math.sin(angle)
    const xi  = CX + r * Math.cos(angle - sweep), yi  = CY + r * Math.sin(angle - sweep)
    const xi2 = CX + r * Math.cos(angle),          yi2 = CY + r * Math.sin(angle)
    const large = sweep > Math.PI ? 1 : 0
    const path = `M${x1},${y1} A${R},${R},0,${large},1,${x2},${y2} L${xi2},${yi2} A${r},${r},0,${large},0,${xi},${yi} Z`
    return { ...d, path, i }
  })

  return (
    <div style={{ display:'flex', alignItems:'center', gap:20 }}>
      <svg viewBox="0 0 160 160" style={{ width:130, flexShrink:0 }}>
        {arcs.map(a => (
          <path key={a.i} d={a.path} fill={a.color}
            opacity={hov===null || hov===a.i ? 1 : .45}
            style={{ transition:'opacity .2s, transform .2s', cursor:'pointer',
              transform: hov===a.i ? `scale(1.06)` : 'scale(1)',
              transformOrigin:`${CX}px ${CY}px` }}
            onMouseEnter={() => setHov(a.i)}
            onMouseLeave={() => setHov(null)} />
        ))}
        <text x={CX} y={CY-6}  textAnchor="middle" fill="#ff8c00"
          fontSize="18" fontFamily="Cinzel" fontWeight="700">
          {hov !== null ? data[hov].pct+'%' : ''}
        </text>
        <text x={CX} y={CY+12} textAnchor="middle" fill="rgba(255,180,100,.6)"
          fontSize="9" fontFamily="Rajdhani">
          {hov !== null ? data[hov].label.toUpperCase() : 'YEAR'}
        </text>
      </svg>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {data.map((d,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8,
            opacity: hov===null||hov===i ? 1 : .45, transition:'opacity .2s' }}>
            <div style={{ width:10, height:10, borderRadius:'50%', background:d.color, flexShrink:0 }} />
            <div style={{ fontSize:12, color:'rgba(255,200,120,.7)', fontFamily:'Rajdhani' }}>
              {d.label}
            </div>
            <div style={{ fontSize:13, color:d.color, fontWeight:600, marginLeft:'auto' }}>
              {d.pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── WEATHER WIDGET ────────────────────────────────────────────
function WeatherWidget() {
  const [wx, setWx]       = useState(null)
  const [loading, setL]   = useState(true)
  const [err, setErr]     = useState(false)

  useEffect(() => {
    ApiService.getWeather()
      .then(data => {
        const c = data.current
        const WC = {
          0:['☀️','Clear'],1:['🌤️','Mostly Clear'],2:['⛅','Partly Cloudy'],
          3:['☁️','Overcast'],45:['🌫️','Foggy'],51:['🌦️','Light Drizzle'],
          61:['🌧️','Rainy'],80:['🌩️','Showers'],95:['⛈️','Thunderstorm'],
        }
        const [icon, desc] = WC[c.weathercode] || ['🌡️','Variable']
        setWx({ temp:Math.round(c.temperature_2m), feels:Math.round(c.apparent_temperature),
          hum:c.relative_humidity_2m, wind:Math.round(c.wind_speed_10m),
          rain:c.precipitation_probability, icon, desc })
        setL(false)
      })
      .catch(() => { setErr(true); setL(false) })
  }, [])

  const Row = ({ icon, label, val }) => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'7px 0', borderBottom:'1px solid rgba(255,80,0,.1)' }}>
      <span style={{ fontSize:12, color:'rgba(255,180,100,.5)' }}>{icon} {label}</span>
      <span style={{ fontSize:13, fontWeight:600, color:'rgba(255,200,120,.85)' }}>{val}</span>
    </div>
  )

  return (
    <div style={{ background:'linear-gradient(145deg,rgba(255,40,0,.08),rgba(255,140,0,.05))',
      border:'1px solid rgba(255,100,0,.18)', borderRadius:16, padding:22, height:'100%' }}>
      <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
        marginBottom:16, fontFamily:'Rajdhani' }}>🌡️ LIVE WEATHER · QUEZON CITY</div>

      {loading && <div style={{ color:'rgba(255,140,0,.4)', fontFamily:'Rajdhani', fontSize:14 }}>
        Fetching live data…
      </div>}
      {err && <div style={{ color:'rgba(255,100,0,.5)', fontSize:13 }}>Weather unavailable</div>}
      {wx && (<>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
          <div style={{ fontSize:52, lineHeight:1,
            filter:'drop-shadow(0 0 14px rgba(255,160,0,.6))' }}>{wx.icon}</div>
          <div>
            <div style={{ fontSize:42, fontWeight:900, lineHeight:1,
              fontFamily:'Cinzel',
              background:'linear-gradient(135deg,#ff8c00,#ffb300)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>{wx.temp}°C</div>
            <div style={{ fontSize:13, color:'rgba(255,200,100,.6)' }}>{wx.desc}</div>
          </div>
        </div>
        <Row icon="🌡️" label="Feels like" val={`${wx.feels}°C`} />
        <Row icon="💧" label="Humidity"   val={`${wx.hum}%`} />
        <Row icon="💨" label="Wind"       val={`${wx.wind} km/h`} />
        <Row icon="🌧️" label="Rain prob." val={`${wx.rain ?? '--'}%`} />
      </>)}
    </div>
  )
}

// ─── CHATBOT ───────────────────────────────────────────────────
const EMBER_KB = {
  enroll:   ['enroll','enrollment','sign up','register','add subject'],
  students: ['student','pupils','learner'],
  courses:  ['course','subject','class','unit'],
  report:   ['report','analytics','grade','stat'],
  help:     ['help','what can','guide','assist'],
  hi:       ['hi','hello','hey','good morning','good afternoon','sup','yo'],
  logout:   ['logout','sign out','exit'],
  capacity: ['full','capacity','slot','available'],
}
const EMBER_REPLIES = {
  hi:       '🔥 Hello! I\'m Ember, your Blaze AI assistant. What do you need help with today?',
  enroll:   '✍️ To enroll a student, go to **Enrollment** in the sidebar. Fill in the Student ID, select a course and semester, then hit Submit. The record is created immediately and will sync with Laravel on integration.',
  students: '👥 The **Students** section shows all registered students with their GPA, year level, and status. You can search and filter by course or status.',
  courses:  '📚 All active courses are listed under **Courses**. Each card shows the schedule, capacity bar, and enrolled count. Full courses appear in red.',
  report:   '📊 The **Reports** section contains enrollment trends, course popularity charts, and year-level distribution — all exportable for admin use.',
  capacity: '⚠️ When a course hits 100% capacity, new enrollments are blocked. An admin can increase the seat limit under **Settings → Course Management**.',
  help:     '💡 I can help with: Enrollment, Students, Courses, Reports, and System Settings. Try asking me about any of these!',
  logout:   '🚪 You can log out using the **LOGOUT** button in the top-right corner of the dashboard.',
  fallback: '🤔 I\'m not sure about that yet — my knowledge is growing! Try asking about students, enrollment, courses, or reports.',
}

function matchIntent(msg) {
  const m = msg.toLowerCase()
  for (const [intent, kws] of Object.entries(EMBER_KB)) {
    if (kws.some(k => m.includes(k))) return intent
  }
  return 'fallback'
}

function Chatbot() {
  const [msgs,   setMsgs]   = useState([{ from:'bot', text:EMBER_REPLIES.hi, id:0 }])
  const [input,  setInput]  = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  let idRef = useRef(1)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, typing])

  const send = useCallback(() => {
    const txt = input.trim()
    if (!txt) return
    const uid = idRef.current++
    setMsgs(m => [...m, { from:'user', text:txt, id:uid }])
    setInput('')
    setTyping(true)
    const delay = 600 + Math.random() * 500
    setTimeout(() => {
      const intent = matchIntent(txt)
      setTyping(false)
      setMsgs(m => [...m, { from:'bot', text:EMBER_REPLIES[intent] || EMBER_REPLIES.fallback, id:idRef.current++ }])
    }, delay)
  }, [input])

  return (
    <div style={{ background:'linear-gradient(145deg,rgba(30,5,0,.6),rgba(255,60,0,.06))',
      border:'1px solid rgba(255,100,0,.18)', borderRadius:16, padding:20,
      display:'flex', flexDirection:'column', height:340 }}>

      <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
        marginBottom:14, fontFamily:'Rajdhani', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:'#ff4500',
          animation:'flicker 1.5s infinite' }} />
        EMBER AI ASSISTANT
      </div>

      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column',
        gap:10, marginBottom:12, paddingRight:4 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ display:'flex',
            justifyContent:m.from==='user' ? 'flex-end' : 'flex-start',
            animation:'fade-in .25s ease' }}>
            {m.from==='bot' && (
              <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0,
                background:'linear-gradient(135deg,#ff4500,#ff8c00)', marginRight:8, marginTop:2,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🔥</div>
            )}
            <div style={{
              maxWidth:'78%', padding:'10px 14px', lineHeight:1.55,
              borderRadius: m.from==='user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.from==='user' ? 'linear-gradient(135deg,#c43000,#ff6a00)' : 'rgba(255,255,255,.05)',
              border: m.from==='bot' ? '1px solid rgba(255,100,0,.18)' : 'none',
              color:'rgba(255,230,200,.9)', fontSize:13, fontFamily:'Rajdhani',
              boxShadow: m.from==='user' ? '0 4px 16px rgba(255,69,0,.25)' : 'none',
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <div style={{ width:28, height:28, borderRadius:'50%',
              background:'linear-gradient(135deg,#ff4500,#ff8c00)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🔥</div>
            <div style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,100,0,.18)',
              borderRadius:'16px 16px 16px 4px', padding:'12px 16px', display:'flex', gap:5 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#ff6a00',
                  animation:`flicker 1s infinite`, animationDelay:`${i*.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display:'flex', gap:8 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && send()}
          placeholder="Ask Ember about enrollment…"
          className="fire-input" style={{ fontSize:13, padding:'10px 14px' }} />
        <button onClick={send}
          style={{ padding:'10px 18px', background:'linear-gradient(135deg,#ff4500,#ff8c00)',
            border:'none', borderRadius:10, color:'#fff', fontSize:16,
            boxShadow:'0 0 16px rgba(255,69,0,.35)' }}>➤</button>
      </div>
    </div>
  )
}

// ─── LOGIN PAGE ────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [shaking,  setShaking]  = useState(false)
  const [showPw,   setShowPw]   = useState(false)

  const submit = () => {
    if (!email || !password) {
      setShaking(true); setTimeout(() => setShaking(false), 600); return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1800)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 55% 75%, #3d0800 0%, #1c0200 40%, #040100 100%)',
      position:'relative', overflow:'hidden' }}>

      <FireCanvas intensity={.7} />

      {/* Ambient glow blobs */}
      {[['-5%','15%',400,400,.12],[null,'5%',300,300,.08,'right']]
        .map(([l,t,w,h,o,r],i) => (
        <div key={i} style={{ position:'absolute', top:t, left:l, right:r,
          width:w, height:h, borderRadius:'50%', filter:'blur(80px)',
          background:`radial-gradient(circle,rgba(255,80,0,${o}),transparent 70%)`,
          pointerEvents:'none' }} />
      ))}

      <div className={shaking ? 'shake' : ''} style={{
        position:'relative', zIndex:2, width:'100%', maxWidth:430,
        background:'linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,50,0,.07))',
        border:'1px solid rgba(255,100,0,.22)', borderRadius:24,
        padding:'52px 44px', backdropFilter:'blur(24px)',
        boxShadow:'0 0 80px rgba(255,69,0,.12), 0 30px 70px rgba(0,0,0,.6)',
        animation:'slide-in-up .7s ease both',
      }}>
        {/* Logo area */}
        <div style={{ textAlign:'center', marginBottom:38 }}>
          <div style={{ fontSize:56, lineHeight:1, animation:'logo-burn 2s ease-in-out infinite' }}>🔥</div>
          <h1 style={{ margin:'14px 0 4px', fontSize:32, fontFamily:'Cinzel,serif',
            fontWeight:900, letterSpacing:5,
            background:'linear-gradient(135deg,#ff8c00 0%,#ff4500 50%,#ffb700 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>BLAZE</h1>
          <p style={{ fontSize:10, letterSpacing:7, color:'rgba(255,140,0,.5)',
            fontFamily:'Share Tech Mono,monospace' }}>ENROLLMENT SYSTEM</p>
        </div>

        {/* Fields */}
        {[
          { label:'EMAIL ADDRESS', val:email, set:setEmail, type:'email', ph:'admin@blaze.edu.ph' },
          { label:'PASSWORD', val:password, set:setPassword,
            type: showPw ? 'text' : 'password', ph:'••••••••', isPass:true },
        ].map(({ label, val, set, type, ph, isPass }) => (
          <div key={label} style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:10, letterSpacing:3,
              color:'rgba(255,140,0,.6)', marginBottom:8 }}>{label}</label>
            <div style={{ position:'relative' }}>
              <input type={type} value={val} onChange={e => set(e.target.value)}
                placeholder={ph} className="fire-input"
                onKeyDown={e => e.key==='Enter' && submit()} />
              {isPass && (
                <button onClick={() => setShowPw(s=>!s)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', color:'rgba(255,140,0,.4)', fontSize:16 }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              )}
            </div>
          </div>
        ))}

        <button onClick={submit} disabled={loading} className="fire-btn"
          style={{ width:'100%', marginTop:8 }}>
          {loading ? '🔥 IGNITING…' : 'IGNITE ACCESS'}
        </button>

        <div style={{ textAlign:'center', marginTop:22, fontSize:11,
          color:'rgba(255,255,255,.2)', fontFamily:'Share Tech Mono,monospace',
          letterSpacing:1 }}>
          Any credentials · Demo mode
        </div>

        {/* Bottom decorative line */}
        <div style={{ position:'absolute', bottom:0, left:'15%', right:'15%', height:1,
          background:'linear-gradient(90deg,transparent,rgba(255,100,0,.5),transparent)' }} />
      </div>
    </div>
  )
}

// ─── STAT CARD ─────────────────────────────────────────────────
function StatCard({ stat, delay=0 }) {
  const { label, value, icon, delta, color, sub } = stat
  return (
    <div className="stat-card" style={{ animationDelay:`${delay}s` }}>
      {/* Bg glow */}
      <div style={{ position:'absolute', top:-30, right:-20, width:100, height:100,
        borderRadius:'50%', background:`radial-gradient(circle,${color}25,transparent 70%)`,
        pointerEvents:'none' }} />
      <div style={{ fontSize:26, marginBottom:8, filter:`drop-shadow(0 0 8px ${color}80)` }}>{icon}</div>
      <div style={{ fontSize:32, fontWeight:900, fontFamily:'Cinzel,serif', color, lineHeight:1,
        animation:'count-up .6s ease both' }}>{value}</div>
      <div style={{ fontSize:12, color:'rgba(255,200,150,.55)', marginTop:5,
        letterSpacing:1, textTransform:'uppercase' }}>{label}</div>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10 }}>
        <span style={{ fontSize:11, color:'#4cff9a', fontWeight:600 }}>▲ {delta}</span>
        <span style={{ fontSize:10, color:'rgba(255,255,255,.2)' }}>{sub}</span>
      </div>
    </div>
  )
}

// ─── SECTION: DASHBOARD HOME ───────────────────────────────────
function DashboardHome() {
  return (
    <div className="section-wrap" style={{ display:'flex', flexDirection:'column', gap:24 }}>
      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16 }}>
        {MOCK.stats.map((s,i) => <StatCard key={s.id} stat={s} delay={i*.08} />)}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
        {/* Line chart */}
        <div style={{ background:'rgba(255,40,0,.05)', border:'1px solid rgba(255,100,0,.14)',
          borderRadius:16, padding:22 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
            marginBottom:16, fontFamily:'Rajdhani' }}>📈 ENROLLMENT TREND</div>
          <LineChart data={MOCK.enrollmentTrend} height={170} />
        </div>

        {/* Bar chart */}
        <div style={{ background:'rgba(255,40,0,.05)', border:'1px solid rgba(255,100,0,.14)',
          borderRadius:16, padding:22 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
            marginBottom:16, fontFamily:'Rajdhani' }}>🏆 TOP COURSES</div>
          <BarChart data={MOCK.coursePopularity} />
        </div>

        {/* Donut */}
        <div style={{ background:'rgba(255,40,0,.05)', border:'1px solid rgba(255,100,0,.14)',
          borderRadius:16, padding:22 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
            marginBottom:16, fontFamily:'Rajdhani' }}>🎓 YEAR LEVEL DIST.</div>
          <DonutChart data={MOCK.yearLevel} />
        </div>
      </div>

      {/* Weather + Chatbot */}
      <div style={{ display:'grid', gridTemplateColumns:'minmax(220px,300px) 1fr', gap:20 }}>
        <WeatherWidget />
        <Chatbot />
      </div>
    </div>
  )
}

// ─── SECTION: STUDENTS ─────────────────────────────────────────
function StudentsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const filtered = MOCK.students.filter(s =>
    (filter==='All' || s.status===filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.id.toLowerCase().includes(search.toLowerCase()))
  )
  const STATUS_COLOR = { Enrolled:'#ff8c00', Pending:'#ffd700', Dropped:'#ff4444' }

  return (
    <div className="section-wrap">
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:22, alignItems:'center' }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Search name or ID…"
          className="fire-input" style={{ maxWidth:280, flex:'1 1 auto' }} />
        {['All','Enrolled','Pending','Dropped'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding:'9px 18px', borderRadius:10, border:'1px solid',
              borderColor:filter===f ? 'rgba(255,100,0,.5)' : 'rgba(255,100,0,.15)',
              background:filter===f ? 'rgba(255,69,0,.18)' : 'transparent',
              color:filter===f ? '#ff8c00' : 'rgba(255,180,100,.45)',
              fontSize:12, letterSpacing:1, transition:'all .2s' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid rgba(255,100,0,.2)' }}>
              {['Student ID','Full Name','Course','Year','GPA','Status'].map(h => (
                <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:10,
                  letterSpacing:2, color:'rgba(255,140,0,.55)', fontWeight:500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s,i) => (
              <tr key={s.id} className="table-row"
                style={{ borderBottom:'1px solid rgba(255,60,0,.07)',
                  animation:`slide-in-up .35s ease both`, animationDelay:`${i*.05}s` }}>
                <td style={{ padding:'14px 16px', fontSize:13, color:'rgba(255,140,0,.7)',
                  fontFamily:'Share Tech Mono,monospace' }}>{s.id}</td>
                <td style={{ padding:'14px 16px', fontSize:14, color:'#fff', fontWeight:500 }}>{s.name}</td>
                <td style={{ padding:'14px 16px', fontSize:12, color:'rgba(255,200,150,.6)' }}>{s.course}</td>
                <td style={{ padding:'14px 16px', fontSize:12, color:'rgba(255,200,150,.55)' }}>{s.year}</td>
                <td style={{ padding:'14px 16px', fontSize:13, fontFamily:'Share Tech Mono,monospace',
                  color: s.gpa<='1.50' ? '#4cff9a' : s.gpa<='2.00' ? '#ffb300' : '#ff6a6a' }}>{s.gpa}</td>
                <td style={{ padding:'14px 16px' }}>
                  <span style={{ padding:'4px 14px', borderRadius:20, fontSize:11, letterSpacing:1,
                    background:`${STATUS_COLOR[s.status]}18`,
                    color:STATUS_COLOR[s.status],
                    border:`1px solid ${STATUS_COLOR[s.status]}35` }}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && (
          <div style={{ textAlign:'center', padding:'40px 0', color:'rgba(255,140,0,.3)',
            fontSize:14, fontFamily:'Rajdhani' }}>No students match the filter.</div>
        )}
      </div>
    </div>
  )
}

// ─── SECTION: COURSES ──────────────────────────────────────────
function CoursesPage() {
  return (
    <div className="section-wrap"
      style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18 }}>
      {MOCK.courses.map((c, i) => {
        const pct  = Math.round((c.enrolled / c.capacity) * 100)
        const full = pct >= 100
        return (
          <div key={c.code} style={{ background:'rgba(255,40,0,.05)',
            border:`1px solid ${full ? 'rgba(255,0,0,.3)' : 'rgba(255,100,0,.14)'}`,
            borderRadius:16, padding:22, position:'relative', overflow:'hidden',
            animation:`slide-in-up .4s ease both`, animationDelay:`${i*.07}s`,
            transition:'transform .2s, box-shadow .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 35px rgba(255,69,0,.18)' }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>

            {full && <div style={{ position:'absolute', top:14, right:14, fontSize:10,
              letterSpacing:2, color:'#ff4444', background:'rgba(255,0,0,.12)',
              border:'1px solid rgba(255,0,0,.25)', borderRadius:20, padding:'3px 10px' }}>FULL</div>}

            <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,140,0,.55)',
              marginBottom:4 }}>{c.code} · {c.units} UNITS</div>
            <div style={{ fontSize:17, fontWeight:700, color:'#fff', marginBottom:4 }}>{c.name}</div>
            <div style={{ fontSize:12, color:'rgba(255,180,100,.45)', marginBottom:16 }}>
              📚 {c.dept} &nbsp;·&nbsp; 🕐 {c.sched}
            </div>

            {/* Capacity bar */}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontSize:11, color:'rgba(255,140,0,.45)', letterSpacing:1 }}>CAPACITY</span>
              <span style={{ fontSize:12, fontFamily:'Share Tech Mono,monospace',
                color: full?'#ff4444':'#ff8c00' }}>{c.enrolled}/{c.capacity}</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,.07)', borderRadius:6 }}>
              <div style={{ height:'100%', borderRadius:6, transformOrigin:'left',
                width:`${pct}%`,
                background: full
                  ? 'linear-gradient(90deg,#ff1100,#ff4444)'
                  : pct>75
                    ? 'linear-gradient(90deg,#ff4500,#ffb300)'
                    : 'linear-gradient(90deg,#ff4500,#ff8c00)',
                animation:'bar-grow .8s ease both', animationDelay:`${i*.08}s` }} />
            </div>
            <div style={{ marginTop:8, fontSize:11, color:'rgba(255,140,0,.35)',
              textAlign:'right' }}>{pct}% full</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── SECTION: ENROLLMENT ───────────────────────────────────────
function EnrollmentPage() {
  const INIT = { studentId:'', studentName:'', course:'', semester:'1st Semester 2025-2026', units:'' }
  const [form,    setForm]    = useState(INIT)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState({})

  const validate = () => {
    const e = {}
    if (!form.studentId.trim())   e.studentId   = 'Required'
    if (!form.studentName.trim()) e.studentName = 'Required'
    if (!form.course)             e.course      = 'Required'
    if (!form.units.trim())       e.units       = 'Required'
    return e
  }

  const submit = () => {
    const e = validate(); setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    ApiService.enrollStudent(form).then(res => {
      setLoading(false); setSuccess(res); setForm(INIT)
      setTimeout(() => setSuccess(null), 5000)
    })
  }

  const Field = ({ label, fkey, type='text', children }) => (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <label style={{ fontSize:10, letterSpacing:2.5, color:'rgba(255,140,0,.6)' }}>{label}</label>
      {children || (
        <input type={type} value={form[fkey]}
          onChange={e => setForm(f=>({...f,[fkey]:e.target.value}))}
          className="fire-input"
          style={{ borderColor: errors[fkey] ? 'rgba(255,50,50,.5)' : undefined }} />
      )}
      {errors[fkey] && <span style={{ fontSize:11, color:'#ff5555' }}>⚠ {errors[fkey]}</span>}
    </div>
  )

  return (
    <div className="section-wrap" style={{ maxWidth:700 }}>
      {success && (
        <div style={{ marginBottom:22, padding:'16px 22px', borderRadius:12,
          background:'rgba(76,255,154,.08)', border:'1px solid rgba(76,255,154,.25)',
          color:'#4cff9a', fontFamily:'Rajdhani', fontSize:14,
          animation:'slide-in-up .3s ease' }}>
          ✅ Enrollment successful! &nbsp;
          <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:12 }}>
            REF# {success.id}
          </span>
        </div>
      )}

      <div style={{ background:'rgba(255,40,0,.04)', border:'1px solid rgba(255,100,0,.15)',
        borderRadius:20, padding:32, display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:22 }}>

        <Field label="STUDENT ID" fkey="studentId" />
        <Field label="FULL NAME"  fkey="studentName" />
        <Field label="COURSE">
          <select value={form.course}
            onChange={e => setForm(f=>({...f,course:e.target.value}))}
            className="fire-input" style={{ appearance:'none', cursor:'pointer' }}>
            <option value="">— Select course —</option>
            {MOCK.courses.map(c => (
              <option key={c.code} value={c.name}>{c.code} · {c.name}</option>
            ))}
          </select>
          {errors.course && <span style={{ fontSize:11, color:'#ff5555' }}>⚠ {errors.course}</span>}
        </Field>
        <Field label="SEMESTER">
          <select value={form.semester}
            onChange={e => setForm(f=>({...f,semester:e.target.value}))}
            className="fire-input" style={{ appearance:'none', cursor:'pointer' }}>
            {['1st Semester 2025-2026','2nd Semester 2025-2026','Summer 2026'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="TOTAL UNITS" fkey="units" />

        <div style={{ gridColumn:'1/-1', paddingTop:8 }}>
          <button onClick={submit} disabled={loading} className="fire-btn">
            {loading ? '🔥 PROCESSING…' : '✍️ SUBMIT ENROLLMENT'}
          </button>
        </div>
      </div>

      {/* Recent enrollments table */}
      <div style={{ marginTop:28 }}>
        <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
          marginBottom:16 }}>📋 RECENT ENROLLMENTS</div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid rgba(255,100,0,.18)' }}>
              {['Student ID','Name','Course','Semester'].map(h => (
                <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:10,
                  letterSpacing:2, color:'rgba(255,140,0,.5)', fontWeight:400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK.students.slice(0,4).map(s => (
              <tr key={s.id} className="table-row"
                style={{ borderBottom:'1px solid rgba(255,60,0,.07)' }}>
                <td style={{ padding:'12px 14px', fontSize:12,
                  color:'rgba(255,140,0,.65)', fontFamily:'Share Tech Mono,monospace' }}>{s.id}</td>
                <td style={{ padding:'12px 14px', fontSize:13, color:'rgba(255,230,200,.8)' }}>{s.name}</td>
                <td style={{ padding:'12px 14px', fontSize:12, color:'rgba(255,200,150,.55)' }}>{s.course}</td>
                <td style={{ padding:'12px 14px', fontSize:11,
                  color:'rgba(255,180,100,.45)' }}>1st Sem 2025–26</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── SECTION: REPORTS ──────────────────────────────────────────
function ReportsPage() {
  return (
    <div className="section-wrap" style={{ display:'flex', flexDirection:'column', gap:24 }}>
      {/* Summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16 }}>
        {[
          { label:'Total Enrolled',   val:'9,204', icon:'📊', color:'#ff4500' },
          { label:'Dropped / LOA',    val:'312',   icon:'📉', color:'#ff6a00' },
          { label:'Graduates (YTD)',  val:'1,048', icon:'🎓', color:'#ff8c00' },
          { label:'Avg Units/Student',val:'18.4',  icon:'📐', color:'#ffb300' },
        ].map((c,i) => (
          <div key={i} style={{ background:'rgba(255,40,0,.05)',
            border:'1px solid rgba(255,100,0,.15)', borderRadius:14, padding:20,
            animation:`slide-in-up .4s ease both`, animationDelay:`${i*.08}s` }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
            <div style={{ fontSize:26, fontWeight:800, fontFamily:'Cinzel,serif', color:c.color }}>{c.val}</div>
            <div style={{ fontSize:11, color:'rgba(255,200,150,.45)', letterSpacing:1, marginTop:4 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
        <div style={{ background:'rgba(255,40,0,.05)', border:'1px solid rgba(255,100,0,.14)',
          borderRadius:16, padding:22 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
            marginBottom:16 }}>MONTHLY ENROLLMENT TREND</div>
          <LineChart data={MOCK.enrollmentTrend} height={180} color="#ffb300" />
        </div>
        <div style={{ background:'rgba(255,40,0,.05)', border:'1px solid rgba(255,100,0,.14)',
          borderRadius:16, padding:22 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
            marginBottom:16 }}>COURSE POPULARITY</div>
          <BarChart data={MOCK.coursePopularity} />
        </div>
      </div>

      {/* Export note */}
      <div style={{ padding:'16px 22px', background:'rgba(255,100,0,.05)',
        border:'1px solid rgba(255,100,0,.12)', borderRadius:12,
        color:'rgba(255,180,100,.45)', fontSize:12, fontFamily:'Share Tech Mono,monospace',
        letterSpacing:.5 }}>
        ℹ️ Export buttons (PDF / CSV) will be connected to Laravel's PDF generator and
        data export routes on API integration.
      </div>
    </div>
  )
}

// ─── SECTION: SETTINGS ─────────────────────────────────────────
function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2500) }

  const Section = ({ title, children }) => (
    <div style={{ background:'rgba(255,40,0,.04)', border:'1px solid rgba(255,100,0,.13)',
      borderRadius:16, padding:26, marginBottom:20 }}>
      <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,140,0,.55)',
        marginBottom:20, paddingBottom:12,
        borderBottom:'1px solid rgba(255,100,0,.1)' }}>{title}</div>
      {children}
    </div>
  )

  const Row = ({ label, value, editable=false }) => (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'12px 0', borderBottom:'1px solid rgba(255,60,0,.08)', gap:16, flexWrap:'wrap' }}>
      <span style={{ fontSize:13, color:'rgba(255,200,150,.6)' }}>{label}</span>
      {editable
        ? <input defaultValue={value} className="fire-input"
            style={{ maxWidth:260, padding:'8px 14px', fontSize:13 }} />
        : <span style={{ fontSize:13, fontFamily:'Share Tech Mono,monospace',
            color:'rgba(255,180,100,.75)' }}>{value}</span>
      }
    </div>
  )

  return (
    <div className="section-wrap" style={{ maxWidth:740 }}>
      {saved && (
        <div style={{ marginBottom:16, padding:'12px 20px', borderRadius:10,
          background:'rgba(76,255,154,.08)', border:'1px solid rgba(76,255,154,.22)',
          color:'#4cff9a', fontSize:13, animation:'fade-in .3s ease' }}>
          ✅ Settings saved successfully.
        </div>
      )}

      <Section title="🏫 ACADEMIC CONFIGURATION">
        <Row label="Academic Year"      value="2025–2026"            editable />
        <Row label="Enrollment Period"  value="Feb 10 – Mar 15, 2026" editable />
        <Row label="Max Units / Student" value="24 units"            editable />
        <Row label="Minimum GPA"        value="1.00 (Highest Honor)" />
      </Section>

      <Section title="🔌 API INTEGRATION (LARAVEL)">
        <Row label="API Base URL"      value={`${API_BASE}`} editable />
        <Row label="Auth Method"       value="Laravel Sanctum (Bearer Token)" />
        <Row label="Axios Timeout"     value="10 000 ms" editable />
        <Row label="CORS Origin"       value="http://localhost:5173" editable />
      </Section>

      <Section title="🎨 THEME & APPEARANCE">
        <Row label="Color Theme"   value="Inferno (Fire Dark)" />
        <Row label="Font Family"   value="Cinzel / Rajdhani / Share Tech Mono" />
        <Row label="Sidebar Width" value="240 px (expanded) · 68 px (collapsed)" />
      </Section>

      <button onClick={save} className="fire-btn">💾 SAVE SETTINGS</button>
    </div>
  )
}

// ─── NAVIGATION CONFIG ─────────────────────────────────────────
const NAV = [
  { id:'dashboard',  icon:'🔥', label:'Dashboard'  },
  { id:'students',   icon:'👥', label:'Students'   },
  { id:'courses',    icon:'📚', label:'Courses'    },
  { id:'enrollment', icon:'✍️', label:'Enrollment' },
  { id:'reports',    icon:'📊', label:'Reports'    },
  { id:'settings',   icon:'⚙️', label:'Settings'   },
]

// ─── DASHBOARD SHELL ───────────────────────────────────────────
function DashboardShell({ onLogout }) {
  const [section,  setSection]  = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(true)
  const [time,     setTime]     = useState(new Date())
  const [notifOpen,setNotifOpen]= useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const PAGES = {
    dashboard:  <DashboardHome />,
    students:   <StudentsPage />,
    courses:    <CoursesPage />,
    enrollment: <EnrollmentPage />,
    reports:    <ReportsPage />,
    settings:   <SettingsPage />,
  }

  const activeLabel = NAV.find(n => n.id === section)?.label || 'Dashboard'

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden',
      background:'radial-gradient(ellipse at 25% 0%, #240600 0%, #0d0200 50%, #040100 100%)',
      position:'relative' }}>

      {/* Background fire (subtle) */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, opacity:.4 }}>
        <FireCanvas intensity={0.35} />
      </div>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: sideOpen ? 240 : 68, flexShrink:0, zIndex:20,
        display:'flex', flexDirection:'column', transition:'width .28s ease',
        background:'linear-gradient(180deg,rgba(255,50,0,.1),rgba(0,0,0,.55))',
        borderRight:'1px solid rgba(255,100,0,.15)', backdropFilter:'blur(24px)',
        position:'relative', overflow:'hidden' }}>

        {/* Brand */}
        <div style={{ padding:'26px 18px 22px', borderBottom:'1px solid rgba(255,100,0,.12)',
          display:'flex', alignItems:'center', gap:12, overflow:'hidden', flexShrink:0 }}>
          <div style={{ fontSize:26, flexShrink:0, animation:'logo-burn 3s ease-in-out infinite' }}>🔥</div>
          {sideOpen && (
            <div style={{ animation:'fade-in .25s ease', overflow:'hidden' }}>
              <div style={{ fontSize:20, fontFamily:'Cinzel,serif', fontWeight:900, letterSpacing:3,
                background:'linear-gradient(135deg,#ff8c00,#ff4500)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1 }}>
                BLAZE
              </div>
              <div style={{ fontSize:8, letterSpacing:5, color:'rgba(255,140,0,.4)',
                fontFamily:'Share Tech Mono,monospace', marginTop:2 }}>ENROLLMENT</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'14px 8px', overflowY:'auto' }}>
          {NAV.map(item => (
            <button key={item.id} className={`nav-btn${section===item.id ? ' active' : ''}`}
              onClick={() => setSection(item.id)}>
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              {sideOpen && <span style={{ animation:'fade-in .2s ease' }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle collapse */}
        <div style={{ padding:'14px 8px', borderTop:'1px solid rgba(255,100,0,.1)', flexShrink:0 }}>
          <button onClick={() => setSideOpen(o => !o)}
            style={{ width:'100%', padding:'10px', borderRadius:10, border:'1px solid rgba(255,100,0,.15)',
              background:'rgba(255,60,0,.07)', color:'rgba(255,140,0,.5)',
              fontSize:14, transition:'all .2s', cursor:'pointer' }}>
            {sideOpen ? '◀ Collapse' : '▶'}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', zIndex:1 }}>

        {/* Topbar */}
        <header style={{ padding:'0 28px', height:66, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'rgba(10,2,0,.55)', backdropFilter:'blur(16px)',
          borderBottom:'1px solid rgba(255,100,0,.12)' }}>

          <div>
            <div style={{ fontSize:18, fontWeight:700, color:'#fff', letterSpacing:1.5 }}>
              {activeLabel}
            </div>
            <div style={{ fontSize:11, color:'rgba(255,140,0,.4)', letterSpacing:.5,
              fontFamily:'Share Tech Mono,monospace' }}>
              {time.toLocaleString('en-PH',{
                weekday:'short', month:'short', day:'2-digit',
                hour:'2-digit', minute:'2-digit', second:'2-digit'
              })}
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            {/* Notif bell */}
            <div style={{ position:'relative' }}>
              <button onClick={()=>setNotifOpen(o=>!o)}
                style={{ background:'rgba(255,60,0,.1)', border:'1px solid rgba(255,100,0,.2)',
                  borderRadius:10, padding:'8px 12px', color:'rgba(255,180,100,.7)',
                  fontSize:16, cursor:'pointer', transition:'all .2s' }}>
                🔔
                <span style={{ position:'absolute', top:4, right:4, width:8, height:8,
                  borderRadius:'50%', background:'#ff4500',
                  animation:'pulse-glow 1.5s infinite' }} />
              </button>
              {notifOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:300,
                  background:'#120200', border:'1px solid rgba(255,100,0,.25)', borderRadius:14,
                  padding:16, zIndex:100, boxShadow:'0 20px 50px rgba(0,0,0,.7)',
                  animation:'tooltip-in .15s ease' }}>
                  <div style={{ fontSize:10, letterSpacing:3, color:'rgba(255,140,0,.5)',
                    marginBottom:12 }}>NOTIFICATIONS</div>
                  {MOCK.notifications.map((n,i) => (
                    <div key={i} style={{ padding:'10px 0', borderBottom:'1px solid rgba(255,60,0,.1)',
                      fontSize:12, color:'rgba(255,220,180,.7)', lineHeight:1.5 }}>
                      <div>{n.msg}</div>
                      <div style={{ fontSize:10, color:'rgba(255,140,0,.35)',
                        marginTop:3 }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User chip */}
            <div style={{ display:'flex', alignItems:'center', gap:10,
              padding:'7px 14px', borderRadius:12,
              background:'rgba(255,60,0,.1)', border:'1px solid rgba(255,100,0,.18)' }}>
              <div style={{ width:32, height:32, borderRadius:'50%',
                background:'linear-gradient(135deg,#ff4500,#ff8c00)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>👤</div>
              <div style={{ lineHeight:1.3 }}>
                <div style={{ fontSize:13, color:'#ff8c00', fontWeight:600 }}>Registrar Admin</div>
                <div style={{ fontSize:10, color:'rgba(255,140,0,.4)' }}>Super Admin</div>
              </div>
            </div>

            <button onClick={onLogout}
              style={{ padding:'9px 18px', borderRadius:10,
                background:'rgba(255,30,0,.1)', border:'1px solid rgba(255,80,0,.2)',
                color:'rgba(255,140,0,.65)', fontSize:11, letterSpacing:2, cursor:'pointer',
                transition:'all .2s' }}>
              LOGOUT
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:'auto', padding:28 }}
          onClick={() => notifOpen && setNotifOpen(false)}>
          {PAGES[section]}
        </main>
      </div>

      <style>{GLOBAL_CSS}</style>
    </div>
  )
}

// ─── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return loggedIn
    ? <DashboardShell onLogout={() => setLoggedIn(false)} />
    : <LoginPage      onLogin={()  => setLoggedIn(true)}  />
}