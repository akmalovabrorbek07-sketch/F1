
/* ================= VELOCITY F1 — main.js ================= */
(function(){
  "use strict";

  /* ---------- theme ---------- */
  const root=document.documentElement;
  const saved=localStorage.getItem("f1-theme")||"dark";
  root.setAttribute("data-theme",saved);
  const icons={dark:"☀️",light:"🌙"};
  function syncBtn(){
    document.querySelectorAll(".theme-btn").forEach(b=>{
      b.textContent=icons[root.getAttribute("data-theme")]||"☀️";
      b.title=root.getAttribute("data-theme")==="dark"?"Light mode":"Dark mode";
    });
  }
  window.toggleTheme=function(){
    const next=root.getAttribute("data-theme")==="dark"?"light":"dark";
    root.setAttribute("data-theme",next);
    localStorage.setItem("f1-theme",next);
    syncBtn();
  };
  document.addEventListener("click",e=>{
    if(e.target.closest(".theme-btn")) toggleTheme();
  });
  syncBtn();

  /* ---------- preloader ---------- */
  window.addEventListener("load",()=>{
    setTimeout(()=>document.getElementById("preloader")?.classList.add("done"),450);
  });

  /* ---------- burger ---------- */
  const burger=document.querySelector(".burger");
  const menu=document.getElementById("navMenu");
  burger?.addEventListener("click",()=>menu.classList.toggle("open"));
  menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));

  /* ---------- reveal on scroll ---------- */
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){en.target.classList.add("show");io.unobserve(en.target);}
  }),{threshold:.12});
  document.querySelectorAll(".reveal,.t-item").forEach(el=>io.observe(el));

  /* ---------- stat bars ---------- */
  const bio=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){
      en.target.querySelectorAll(".fill").forEach(f=>f.style.width=f.dataset.w+"%");
      bio.unobserve(en.target);
    }
  }),{threshold:.3});
  document.querySelectorAll(".stat-bars,.tv-row,.teams-visual").forEach(el=>bio.observe(el));

  /* ---------- countdown ---------- */
  const cd=document.getElementById("cdTimer");
  if(cd){
    const target=new Date(cd.dataset.date).getTime();
    function tick(){
      let d=target-Date.now();
      if(d<0)d=0;
      const days=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5),
            m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
      const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,"0");};
      set("cdD",days);set("cdH",h);set("cdM",m);set("cdS",s);
    }
    tick();setInterval(tick,1000);
  }

  /* ---------- lightbox ---------- */
  const lb=document.getElementById("lightbox");
  if(lb){
    const img=lb.querySelector("img");
    document.querySelectorAll(".g-item img").forEach(g=>{
      g.parentElement.addEventListener("click",()=>{
        img.src=g.src;img.alt=g.alt;lb.classList.add("open");document.body.style.overflow="hidden";
      });
    });
    lb.addEventListener("click",e=>{
      if(e.target===lb||e.target.closest("button")){lb.classList.remove("open");document.body.style.overflow="";}
    });
    document.addEventListener("keydown",e=>{if(e.key==="Escape"){lb.classList.remove("open");document.body.style.overflow="";}});
  }

  /* ---------- back to top ---------- */
  const toTop=document.getElementById("toTop");
  window.addEventListener("scroll",()=>toTop?.classList.toggle("show",scrollY>500));
  toTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

  /* ---------- footer year ---------- */
  document.querySelectorAll(".year").forEach(y=>y.textContent=new Date().getFullYear());

  /* ---------- standings rendering ---------- */
  window.F1DATA={
    drivers:[
      {pos:1,name:"Maks Verstappen",team:"Red Bull Racing",num:1,pts:437,wins:9,podiums:14,teamColor:"#3671c6",country:"NLD"},
      {pos:2,name:"Lando Norris",team:"McLaren",num:4,pts:402,wins:6,podiums:15,teamColor:"#ff8000",country:"GBR"},
      {pos:3,name:"Charles Leclerc",team:"Ferrari",num:16,pts:386,wins:4,podiums:13,teamColor:"#e8002d",country:"MON"},
      {pos:4,name:"Oscar Piastri",team:"McLaren",num:81,pts:351,wins:3,podiums:11,teamColor:"#ff8000",country:"AUS"},
      {pos:5,name:"Andrea Kimi Antonelli",team:"Mercedes",num:12,pts:318,wins:3,podiums:10,teamColor:"#27f4d2",country:"ITA"},
      {pos:6,name:"George Russell",team:"Mercedes",num:63,pts:297,wins:1,podiums:9,teamColor:"#27f4d2",country:"GBR"},
      {pos:7,name:"Lewis Hamilton",team:"Ferrari",num:44,pts:245,wins:1,podiums:6,teamColor:"#e8002d",country:"GBR"},
      {pos:8,name:"Alexander Albon",team:"Williams",num:23,pts:142,wins:0,podiums:1,teamColor:"#64c4ff",country:"THA"},
      {pos:9,name:"Isack Hadjar",team:"Racing Bulls",num:6,pts:121,wins:0,podiums:1,teamColor:"#6692ff",country:"FRA"},
      {pos:10,name:"Fernando Alonso",team:"Aston Martin",num:14,pts:104,wins:0,podiums:0,teamColor:"#229971",country:"ESP"},
      {pos:11,name:"Pierre Gasly",team:"Alpine",num:10,pts:88,wins:0,podiums:0,teamColor:"#0093cc",country:"FRA"},
      {pos:12,name:"Liam Lawson",team:"Racing Bulls",num:30,pts:76,wins:0,podiums:0,teamColor:"#6692ff",country:"NZL"},
      {pos:13,name:"Carlos Sainz",team:"Williams",num:55,pts:71,wins:0,podiums:0,teamColor:"#64c4ff",country:"ESP"},
      {pos:14,name:"Nico Hülkenberg",team:"Sauber",num:27,pts:54,wins:0,podiums:0,teamColor:"#52e252",country:"GER"},
      {pos:15,name:"Yuki Tsunoda",team:"Red Bull Racing",num:22,pts:44,wins:0,podiums:0,teamColor:"#3671c6",country:"JPN"},
    ],
    constructors:[
      {pos:1,team:"McLaren",pts:753,wins:9,color:"#ff8000"},
      {pos:2,team:"Ferrari",pts:631,wins:5,color:"#e8002d"},
      {pos:3,team:"Red Bull Racing",pts:481,wins:9,color:"#3671c6"},
      {pos:4,team:"Mercedes",pts:615,wins:4,color:"#27f4d2"},
      {pos:5,team:"Williams",pts:213,wins:0,color:"#64c4ff"},
      {pos:6,team:"Racing Bulls",pts:197,wins:0,color:"#6692ff"},
      {pos:7,team:"Aston Martin",pts:136,wins:0,color:"#229971"},
      {pos:8,team:"Alpine",pts:104,wins:0,color:"#0093cc"},
      {pos:9,team:"Haas",pts:78,wins:0,color:"#b6babd"},
      {pos:10,team:"Sauber",pts:66,wins:0,color:"#52e252"},
    ],
    calendar:[
      {gp:"Avstraliya GP",track:"Albert Park",country:"Avstraliya",date:"Mart 8",laps:58,len:"5.278 km"},
      {gp:"Xitoy GP",track:"Shanxay",country:"Xitoy",date:"Mart 15",laps:56,len:"5.451 km"},
      {gp:"Yaponiya GP",track:"Suzuka",country:"Yaponiya",date:"Mart 29",laps:53,len:"5.807 km"},
      {gp:"Bahrain GP",track:"Saxir",country:"Bahrain",date:"Aprel 12",laps:57,len:"5.412 km"},
      {gp:"Saudiya Arabistoni GP",track:"Jidda Kornishi",country:"Saudiya Arabistoni",date:"Aprel 19",laps:50,len:"6.174 km"},
      {gp:"Miami GP",track:"Miami Xalqaro Avtodrom",country:"AQSH",date:"May 3",laps:57,len:"5.412 km"},
      {gp:"Kanada GP",track:"Jil Vilnev",country:"Kanada",date:"May 24",laps:70,len:"4.361 km"},
      {gp:"Monako GP",track:"Monte-Karlo",country:"Monako",date:"Iyun 7",laps:78,len:"3.337 km"},
      {gp:"Ispaniya GP",track:"Kataloniya",country:"Ispaniya",date:"Iyun 14",laps:66,len:"4.657 km"},
      {gp:"Avstriya GP",track:"Red Bull Ring",country:"Avstriya",date:"Iyun 28",laps:71,len:"4.318 km"},
      {gp:"Buyuk Britaniya GP",track:"Silverstoun",country:"Buyuk Britaniya",date:"Iyul 5",laps:52,len:"5.891 km"},
      {gp:"Belgiya GP",track:"Spa-Fransorkamp",country:"Belgiya",date:"Iyul 19",laps:44,len:"7.004 km"},
      {gp:"Vengriya GP",track:"Xungaroring",country:"Vengriya",date:"Iyul 26",laps:70,len:"4.381 km"},
      {gp:"Niderlandiya GP",track:"Zandvoort",country:"Niderlandiya",date:"Avgust 23",laps:72,len:"4.259 km"},
      {gp:"Italiya GP",track:"Monza",country:"Italiya",date:"Sentyabr 6",laps:53,len:"5.793 km"},
      {gp:"Ozarbayjon GP",track:"Boku Shossi",country:"Ozarbayjon",date:"Sentyabr 20",laps:51,len:"6.003 km"},
      {gp:"Singapur GP",track:"Marina Bay",country:"Singapur",date:"Oktabr 4",laps:61,len:"4.940 km"},
      {gp:"Buyuk Britaniya Qo'shma Shtatlar GP",track:"Kot",country:"AQSH",date:"Oktabr 18",laps:56,len:"5.513 km"},
      {gp:"Meksika GP",track:"Ermans Rodriges",country:"Meksika",date:"Oktabr 25",laps:71,len:"4.304 km"},
      {gp:"São Paulo GP",track:"Interlagos",country:"Braziliya",date:"Noyabr 8",laps:71,len:"4.309 km"},
      {gp:"Las-Vegas GP",track:"Las-Vegas Kornishi",country:"AQSH",date:"Noyabr 21",laps:50,len:"6.201 km"},
      {gp:"Qatar GP",track:"Losayl",country:"Qatar",date:"Noyabr 29",laps:57,len:"5.419 km"},
      {gp:"Abu-Dabi GP",track:"Yas Marina",country:"BAE",date:"Dekabr 6",laps:58,len:"5.281 km"},
    ],
    circuits:[
      {name:"Monako",country:"Monako",len:"3.337 km",turns:19,laps:78,record:"1:12.909",note:"F1 dagi eng qadimiy va prestijli shahar treki. Tor ko'chalar, tunnel va kasino maydoni — bu yerda har bir santimetr hal qiladi."},
      {name:"Silverstoun",country:"Buyuk Britaniya",len:"5.891 km",turns:18,laps:52,record:"1:25.093",note:"1950-yilda birinchi F1 gran-pri aynan shu yerda bo'lib o'tgan. Tez oqimli burilishlar va yoqimli ob-havo."},
      {name:"Spa-Fransorkamp",country:"Belgiya",len:"7.004 km",turns:19,laps:44,record:"1:46.286",note:"Mavsumdagi eng uzun trek. To'g'ri chiziqda 330 km/soat dan oshadi, Eau Rouge burilishi esa afsonaviy."},
      {name:"Monza",country:"Italiya",len:"5.793 km",turns:11,laps:53,record:"1:21.046",note:"'Tezlik ibodatxonasi' — Ferrari uyasi. Tomoshabinlar olovdagi tifo ko'rinishini shu yerda ko'radi."},
      {name:"Suzuka",country:"Yaponiya",len:"5.807 km",turns:18,laps:53,record:"1:36.422",note:"Yagona sakkiz shaklidagi 'figure-8' konfiguratsiya. Haydovchilar sevimlisi, eng texnik trek."},
      {name:"Marina Bay",country:"Singapur",len:"4.940 km",turns:19,laps:61,record:"1:34.486",note:"Osmonxokorlar fonida o'tadigan tungi shahar trek. Eng yuqori fizik yuklamali Grand Prix."},
      {name:"Yas Marina",country:"Abu-Dabi",len:"5.281 km",turns:16,laps:58,record:"1:26.103",note:"Mavsum finali an'anaviy manzili. Aloman chiroqlar ostida va trikun astidagi hotel — sayohat kulminatsiyasi."},
      {name:"Jidda Kornishi",country:"Saudiya Arabistoni",len:"6.174 km",turns:27,laps:50,record:"1:30.734",note:"F1 tarixidagi eng tez shahar trek. Qizil dengiz bo'yidagi burilishlar 250 km/soat dan tushmaydi."},
      {name:"Red Bull Ring",country:"Avstriya",len:"4.318 km",turns:10,laps:71,record:"1:05.619",note:"Atigi 10 burilish — eng qisqa, lekin eng ko'hna tezlik treklaridan biri. Alp tog'lari fonida."},
      {name:"Boku Shossi",country:"Ozarbayjon",len:"6.003 km",turns:20,laps:51,record:"1:43.009",note:"Ittifoq shossesi bo'ylab 2 km dan ortiq to'g'ri chiziq — eng uzun 'slipstream' maydoni."},
      {name:"Interlagos",country:"Braziliya",len:"4.309 km",turns:15,laps:71,record:"1:10.540",note:"Sens bilan qo'pol yaqinlik, Senna S burilishi. Janubiy Amerikaning yuragi."},
      {name:"Zandvoort",country:"Niderlandiya",len:"4.259 km",turns:14,laps:72,record:"1:11.097",note:"Sohil qumlari orasidagi banklangan burilishlar. Oranj armiya to'lqinida."},
    ]
  };

  /* render drivers table on standings page */
  const dTable=document.getElementById("driversTable");
  if(dTable){
    dTable.innerHTML=F1DATA.drivers.map(d=>`
      <tr>
        <td class="pos">${String(d.pos).padStart(2,"0")}</td>
        <td><b>${d.name}</b><br><small style="color:var(--muted)">${d.country}</small></td>
        <td class="team-name"><span class="team-dot" style="background:${d.teamColor}"></span>${d.team}</td>
        <td style="font-family:Orbitron;color:var(--muted)">${d.num}</td>
        <td class="wins">${d.wins}</td>
        <td>${d.podiums}</td>
        <td class="pts">${d.pts}</td>
      </tr>`).join("");
  }
  const cTable=document.getElementById("constructorsTable");
  if(cTable){
    cTable.innerHTML=F1DATA.constructors.map(c=>`
      <tr>
        <td class="pos">${String(c.pos).padStart(2,"0")}</td>
        <td class="team-name"><span class="team-dot" style="background:${c.color}"></span>${c.team}</td>
        <td class="wins">${c.wins}</td>
        <td class="pts">${c.pts}</td>
      </tr>`).join("");
  }
  const tv=document.getElementById("teamsVisual");
  if(tv){
    const max=Math.max(...F1DATA.constructors.map(c=>c.pts));
    tv.innerHTML=F1DATA.constructors.map(c=>`
      <div class="tv-row">
        <div class="tv-name"><span class="team-dot" style="background:${c.color}"></span>${c.team}</div>
        <div class="tv-track"><div class="tv-fill" style="width:${Math.round(c.pts/max*100)}%;background:linear-gradient(90deg,${c.color},${c.color}cc)"></div></div>
        <div class="tv-pts">${c.pts}</div>
      </div>`).join("");
    tv.querySelectorAll(".tv-row").forEach(el=>bio.observe(el));
  }
  const cal=document.getElementById("calendarGrid");
  if(cal){
    cal.innerHTML=F1DATA.calendar.map((c,i)=>`
      <div class="circuit-card reveal">
        <div class="country">R${String(i+1).padStart(2,"0")} · ${c.country}</div>
        <h3>${c.gp}</h3>
        <p style="color:var(--muted);font-size:.9rem;margin-top:6px">${c.track} — ${c.date}</p>
        <div class="circuit-stats">
          <div class="cs-item"><b>${c.laps}</b><span>Aylanish</span></div>
          <div class="cs-item"><b>${c.len}</b><span>Trek uzunligi</span></div>
        </div>
      </div>`).join("");
    cal.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
  const circ=document.getElementById("circuitsGrid");
  if(circ){
    circ.innerHTML=F1DATA.circuits.map((c,i)=>`
      <div class="circuit-card reveal ${i===0?'circuit-full':''}">
        <div class="country">${c.country}</div>
        <h3>${c.name}</h3>
        <p style="color:var(--muted);font-size:.92rem;line-height:1.65;margin-top:8px">${c.note}</p>
        <div class="circuit-stats">
          <div class="cs-item"><b>${c.len}</b><span>Uzunlik</span></div>
          <div class="cs-item"><b>${c.turns}</b><span>Burilishlar</span></div>
          <div class="cs-item"><b>${c.laps}</b><span>Aylanish</span></div>
          <div class="cs-item"><b>${c.record}</b><span>Rekord</span></div>
        </div>
      </div>`).join("");
    circ.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
})();
