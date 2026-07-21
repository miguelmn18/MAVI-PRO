import { useState, useEffect, useRef } from "react";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body,#root{height:100%;background:#0C0C0C}
  body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;color:#F0EFE9}
  ::-webkit-scrollbar{width:2px}
  ::-webkit-scrollbar-thumb{background:#F5C518;border-radius:2px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
  @keyframes spin{to{transform:rotate(360deg)}}
`;

const Y="#F5C518",YD="#C9A014",YG="rgba(245,197,24,.13)";
const BK="#0C0C0C",BK2="#141414",BK3="#1C1C1C",BK4="#252525";
const BD="#2E2E2E",WT="#F0EFE9",WD="#888880",GR="#4CAF7D",RD="#E05252";
const HF="'Bebas Neue',sans-serif",BF="'DM Sans',sans-serif";



const MONTHS=["Jan","Fev","Mar","Abr","Mai","Jun"];
const REV_DATA=[3200,4100,3750,5200,4800,6100];
const EXP_DATA=[800,950,870,1100,990,1200];
const ATD_DATA=[120,145,132,180,165,210];
const AGD_DATA=[130,155,140,195,178,225];
const PROD_DATA=[18,24,20,31,28,35];


const PACKAGES=[
  {id:1,name:"Combo VIP",services:["Degradê","Barba","Hidratação"],price:75,saves:20},
  {id:2,name:"Básico",services:["Corte Simples","Barba"],price:40,saves:5},
  {id:3,name:"Premium",services:["Navalhado","Barba","Sobrancelha"],price:70,saves:15},
];
const AGENDA_DATA=[
  {id:1,client:"Mateus Costa",service:"Degradê",time:"09:00",prof:"Lucas",status:"confirmado"},
  {id:2,client:"Rodrigo Lima",service:"Navalhado",time:"10:30",prof:"Rafael",status:"confirmado"},
  {id:3,client:"Felipe Nunes",service:"Corte + Barba",time:"11:00",prof:"Diego",status:"pendente"},
  {id:4,client:"Carlos H.",service:"Corte Simples",time:"14:00",prof:"Lucas",status:"confirmado"},
  {id:5,client:"Bruno Alves",service:"Afro",time:"15:30",prof:"Diego",status:"pendente"},
];
const SALES=[
  {id:1,product:"Pomada Modeladora",qty:2,total:70,date:"05/05",prof:"Lucas"},
  {id:2,product:"Óleo de Barba",qty:1,total:42,date:"04/05",prof:"Rafael"},
  {id:3,product:"Shampoo Anticaspa",qty:3,total:84,date:"03/05",prof:"Diego"},
  {id:4,product:"Cera Capilar",qty:1,total:30,date:"02/05",prof:"Lucas"},
];
const INTEGRATIONS={
  principais:[
    {icon:"💬",name:"WhatsApp Business",desc:"Automação de fidelização e lembretes automáticos para clientes.",badge:"Diamante"},
    {icon:"⭐",name:"Google Meu Negócio",desc:"Envie o link do seu perfil Google para o cliente avaliar sua empresa diretamente.",badge:"Diamante"},
    {icon:"📅",name:"Google Calendar",desc:"Sincronize agendamentos com a agenda dos profissionais automaticamente.",badge:"Plano MV"},
  ],
  pagamentos:[
    {icon:"💳",name:"Mercado Pago",desc:"Envie link de pagamento Pix e cartão pelo app."},
    {icon:"🟩",name:"PagSeguro",desc:"Envie link de pagamento PagSeguro para o cliente."},
  ],
  gestao:[
    {icon:"📊",name:"Google Sheets",desc:"Exporte relatórios financeiros automaticamente."},
    {icon:"📦",name:"Bling ERP",desc:"Gestão de estoque integrada (Diamante)."},
  ],
  marketing:[
    {icon:"📸",name:"Instagram",desc:"Publique conteúdos sugeridos pela Social Mavi IA."},
    {icon:"🎵",name:"TikTok",desc:"Agende e publique Reels de tendências."},
  ],
};

// ── Atoms ──────────────────────────────────────────────────────────────────────
const Pill=({children,color=Y})=>(
  <span style={{display:"inline-flex",alignItems:"center",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700,background:color+"22",color,letterSpacing:.4}}>{children}</span>
);
const SLabel=({children})=>(
  <p style={{fontSize:10,fontWeight:700,color:WD,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>{children}</p>
);
const HBar=({pct,color=Y,h=5})=>(
  <div style={{height:h,background:BD,borderRadius:3,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:color,borderRadius:3,transition:"width 1s ease"}}/>
  </div>
);
function MiniStat({label,value,accent=WT,icon}){
  return(
    <div style={{background:BK3,border:`1px solid ${BD}`,borderRadius:11,padding:"13px 14px",flex:1,minWidth:90}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:10,color:WD,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{label}</span>
        <span style={{fontSize:15}}>{icon}</span>
      </div>
      <div style={{fontFamily:HF,fontSize:22,letterSpacing:1,color:accent,lineHeight:1}}>{value}</div>
    </div>
  );
}
function Ring({pts,size=62}){
  const r=(size-7)/2,c=2*Math.PI*r,fill=(Math.min(pts,100)/100)*c;
  const col=pts>=100?Y:pts>=60?GR:WD;
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)",position:"absolute"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={BD} strokeWidth={5}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={5}
          strokeDasharray={c} strokeDashoffset={c-fill} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s ease"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:HF,fontSize:13,color:col}}>{pts}</span>
      </div>
    </div>
  );
}
function Av({letter,size=36,color=Y}){
  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${color},${YD})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:HF,fontSize:size*0.44,color:BK,flexShrink:0}}>{letter}</div>
  );
}
function MiniChart({data,color=Y,h=70}){
  const max=Math.max(...data);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:5,height:h}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:"100%",background:i===data.length-1?color:color+"44",height:`${(v/max)*(h-14)}px`,borderRadius:"3px 3px 0 0",minHeight:3}}/>
          <span style={{fontSize:9,color:WD}}>{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}
function SHead({title,accent,sub}){
  return(
    <div style={{marginBottom:18}}>
      <h2 style={{fontFamily:HF,fontSize:26,letterSpacing:2}}>{title}{accent&&<span style={{color:Y}}> {accent}</span>}</h2>
      {sub&&<p style={{color:WD,fontSize:12,marginTop:2}}>{sub}</p>}
    </div>
  );
}
function Card({children,style={},glow=false}){
  return <div style={{background:BK3,border:`1px solid ${glow?Y:BD}`,borderRadius:12,padding:14,...style}}>{children}</div>;
}
function Locked({planNeeded,onUpgrade}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60vh",gap:14,padding:24,textAlign:"center",animation:"fadeIn .3s ease"}}>
      <div style={{fontSize:48}}>🔒</div>
      <h3 style={{fontFamily:HF,fontSize:22,letterSpacing:2}}>RECURSO BLOQUEADO</h3>
      <p style={{color:WD,fontSize:13,lineHeight:1.6}}>Disponível no <strong style={{color:Y}}>{planNeeded}</strong>.</p>
      <button onClick={onUpgrade} style={{marginTop:6,padding:"12px 26px",background:Y,border:"none",borderRadius:11,fontFamily:HF,fontSize:17,letterSpacing:2,color:BK,cursor:"pointer"}}>VER PLANOS</button>
    </div>
  );
}

// ── Screens ────────────────────────────────────────────────────────────────────



function Fidelizacao(){
  const [search,setSearch]=useState("");
  const [open,setOpen]=useState(null);
  const filtered=CLIENTS.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  const sc=s=>s==="resgate"?Y:s==="ativo"?GR:WD;
  const sl=s=>s==="resgate"?"🎉 Resgate":s==="ativo"?"✅ Ativo":"💤 Inativo";
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="SISTEMA DE" accent="FIDELIZAÇÃO" sub="3 pts/desafio · 5 pts/atendimento · Meta: 100 pts"/>
      <div style={{display:"flex",gap:8}}>
        <MiniStat label="Clientes" value={CLIENTS.length} icon="👥"/>
        <MiniStat label="P/ resgate" value={CLIENTS.filter(c=>c.points>=100).length} accent={Y} icon="🎉"/>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente..."
        style={{width:"100%",padding:"11px 14px",background:BK3,border:`1px solid ${BD}`,borderRadius:10,color:WT,fontFamily:BF,fontSize:13,outline:"none"}}
        onFocus={e=>e.target.style.borderColor=Y} onBlur={e=>e.target.style.borderColor=BD}/>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(c=>{
          const isOpen=open===c.id;
          return(
            <Card key={c.id} glow={c.points>=100} style={{cursor:"pointer",border:`1px solid ${isOpen?Y:c.points>=100?Y+"44":BD}`}}>
              <div onClick={()=>setOpen(isOpen?null:c.id)} style={{display:"flex",alignItems:"center",gap:12}}>
                <Ring pts={c.points}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4}}>
                    <span style={{fontWeight:600,fontSize:13}}>{c.name}</span>
                    <Pill color={sc(c.status)}>{sl(c.status)}</Pill>
                  </div>
                  <div style={{marginTop:7}}>
                    <HBar pct={c.points} color={c.points>=100?Y:GR}/>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                      <span style={{fontSize:10,color:WD}}>{c.points}/100 pts</span>
                      <span style={{fontSize:10,color:WD}}>✂️{c.cuts} · 🏆{c.challenges}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isOpen&&(
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${BD}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:c.points>=100?10:0}}>
                    {[{l:"Pts atend.",v:`${c.cuts*5}`},{l:"Pts desafios",v:`${c.challenges*3}`},{l:"Tel.",v:c.phone},{l:"Faltam",v:c.points>=100?"✅":`${100-c.points} pts`}].map(x=>(
                      <div key={x.l} style={{background:BK2,padding:"8px 10px",borderRadius:8}}>
                        <div style={{fontSize:10,color:WD}}>{x.l}</div>
                        <div style={{fontWeight:600,color:Y,fontSize:12,marginTop:1}}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  {c.points>=100&&<button style={{width:"100%",padding:11,background:Y,border:"none",borderRadius:10,fontFamily:HF,fontSize:15,letterSpacing:2,color:BK,cursor:"pointer"}}>APLICAR RESGATE</button>}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}



function Servicos(){
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="SERVIÇOS" accent="E PREÇOS"/>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {SERVICES.map(s=>(
          <Card key={s.id}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:9,background:YG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✂️</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{s.name}</div>
                <div style={{fontSize:11,color:WD,marginTop:1}}>⏱ {s.duration}</div>
              </div>
              <div style={{fontFamily:HF,fontSize:18,color:Y}}>R${s.price}</div>
              <span style={{color:WD,fontSize:13,marginLeft:4,cursor:"pointer"}}>✏️</span>
            </div>
          </Card>
        ))}
      </div>
      <button style={{width:"100%",padding:12,background:BK3,border:`1px solid ${BD}`,borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:Y,cursor:"pointer"}}>+ NOVO SERVIÇO</button>
    </div>
  );
}



function Vendas(){
  const total=SALES.reduce((a,b)=>a+b.total,0);
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="VENDAS DE" accent="PRODUTOS" sub="Integrado ao financeiro"/>
      <div style={{display:"flex",gap:8}}>
        <MiniStat label="Total" value={`R$${total}`} accent={Y} icon="🛍️"/>
        <MiniStat label="Qtd." value={SALES.length} icon="📦"/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {SALES.map(s=>(
          <Card key={s.id}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:9,background:YG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛍️</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{s.product}</div>
                <div style={{fontSize:11,color:WD,marginTop:1}}>{s.date} · {s.prof} · {s.qty}x</div>
              </div>
              <div style={{fontFamily:HF,fontSize:18,color:Y}}>R${s.total}</div>
            </div>
          </Card>
        ))}
      </div>
      <button style={{width:"100%",padding:12,background:Y,border:"none",borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:BK,cursor:"pointer"}}>+ REGISTRAR VENDA</button>
    </div>
  );
}


function Estabelecimento(){
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="MINHA" accent="EMPRESA"/>
      <Card glow>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
          <div style={{width:52,height:52,borderRadius:14,background:`linear-gradient(135deg,${Y},${YD})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:HF,fontSize:24,color:BK}}>✂</div>
          <div>
            <div style={{fontFamily:HF,fontSize:20,letterSpacing:1}}>Empresa Mavi</div>
            <Pill color={GR}>✅ Ativo</Pill>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {[
            {icon:"📍",label:"Endereço",value:"Rua das Flores, 123 — Centro, São Paulo/SP"},
            {icon:"📞",label:"Telefone",value:"(11) 3333-4444"},
            {icon:"🕐",label:"Seg-Sex",value:"09:00 às 20:00"},
            {icon:"🕐",label:"Sáb-Dom",value:"09:00 às 18:00"},
            {icon:"📸",label:"Instagram",value:"@empresamavi"},
          ].map(item=>(
            <div key={item.label} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${BD}`}}>
              <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
              <div>
                <div style={{fontSize:10,color:WD,fontWeight:600}}>{item.label}</div>
                <div style={{fontSize:13,marginTop:1}}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <button style={{width:"100%",marginTop:14,padding:11,background:Y,border:"none",borderRadius:10,fontFamily:HF,fontSize:15,letterSpacing:2,color:BK,cursor:"pointer"}}>EDITAR INFORMAÇÕES</button>
      </Card>
      <Card>
        <SLabel>Link do cliente</SLabel>
        <div style={{background:BK2,borderRadius:9,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:12,color:WD,flex:1,fontFamily:"monospace"}}>mavipro.app/empresa-mavi</span>
          <button style={{padding:"5px 10px",background:Y,border:"none",borderRadius:7,fontFamily:HF,fontSize:11,color:BK,cursor:"pointer"}}>COPIAR</button>
        </div>
        <p style={{fontSize:11,color:WD}}>Compartilhe este link com seus clientes para agendamento direto.</p>
      </Card>
    </div>
  );
}


function MenuGrid({onNavigate}){
  const items=[
    {id:"clientes",icon:"👥",label:"Clientes"},
    {id:"profissional",icon:"💈",label:"Profissionais"},
    {id:"servicos",icon:"✂️",label:"Serviços"},
    {id:"vendas",icon:"🛍️",label:"Vendas"},
    {id:"produtos",icon:"🧴",label:"Produtos"},
    {id:"pacotes",icon:"📦",label:"Pacotes"},
    {id:"relatorios",icon:"📊",label:"Relatórios"},
    {id:"estabelecimento",icon:"🏪",label:"Empresa"},
    {id:"configuracoes",icon:"⚙️",label:"Configurações"},
    {id:"suporte",icon:"💬",label:"Suporte"},
  ];
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:16}}>
      <SHead title="MENU" accent="PRINCIPAL"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {items.map(item=>(
          <div key={item.id} onClick={()=>onNavigate(item.id)}
            style={{background:BK3,border:`1px solid ${BD}`,borderRadius:13,padding:"18px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",textAlign:"center",transition:"border .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=Y}
            onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
            <span style={{fontSize:26}}>{item.icon}</span>
            <span style={{fontSize:12,fontWeight:600,color:WT}}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Suporte(){
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="SUPORTE" accent="MAVI PRO"/>
      <Card glow>
        <div style={{textAlign:"center",padding:"10px 0"}}>
          <div style={{fontSize:48,marginBottom:12}}>💬</div>
          <h3 style={{fontFamily:HF,fontSize:22,letterSpacing:1,marginBottom:8}}>FALE COM A GENTE</h3>
          <p style={{fontSize:13,color:WD,lineHeight:1.6,marginBottom:16}}>Nossa equipe está disponível via WhatsApp para te ajudar com qualquer dúvida sobre o MAVI PRO.</p>
          <button onClick={()=>window.open("https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20suporte%20com%20o%20MAVI%20PRO","_blank")}
            style={{width:"100%",padding:13,background:"#25D366",border:"none",borderRadius:11,fontFamily:HF,fontSize:17,letterSpacing:2,color:WT,cursor:"pointer"}}>
            📱 ABRIR WHATSAPP
          </button>
        </div>
      </Card>
      <Card>
        <SLabel>Horário de atendimento</SLabel>
        {[{d:"Segunda a Sexta",h:"08:00 às 20:00"},{d:"Sábado",h:"09:00 às 14:00"},{d:"Domingo",h:"Fechado"}].map(x=>(
          <div key={x.d} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
            <span style={{fontSize:13}}>{x.d}</span>
            <span style={{fontSize:13,color:WD}}>{x.h}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── Client View ────────────────────────────────────────────────────────────────
function ClientView(){
  const [step,setStep]=useState("servico");
  const [sel,setSel]=useState({service:null,prof:null,time:null,date:null});
  const [form,setForm]=useState({name:"",phone:""});
  const [botStep,setBotStep]=useState(0);
  const times=["09:00","10:00","10:30","11:00","14:00","15:00","15:30","16:00"];
  const dates=["Hoje, 07/05","Amanhã, 08/05","Sex, 09/05","Sáb, 10/05"];

  if(step==="confirmado"){
    const botMsgs=[
      {from:"bot",text:`Olá, ${form.name}! 👋 Seu agendamento foi recebido.`},
      {from:"bot",text:`✂️ Serviço: ${sel.service}\n👤 Profissional: ${sel.prof}\n📅 ${sel.date} às ${sel.time}`},
      {from:"bot",text:"Para confirmar seu agendamento, responda com SIM ✅"},
      {from:"user",text:"SIM"},
      {from:"bot",text:"✅ Agendamento confirmado! Te esperamos. Qualquer dúvida é só falar aqui. 💈"},
    ];
    const visible=botMsgs.slice(0,botStep+1);
    useEffect(()=>{
      if(botStep<botMsgs.length-1){const t=setTimeout(()=>setBotStep(s=>s+1),1200);return()=>clearTimeout(t);}
    },[botStep]);
    return(
      <div style={{animation:"slideUp .4s ease",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{textAlign:"center",padding:"10px 0 4px"}}>
          <div style={{fontSize:40,marginBottom:8}}>✅</div>
          <h2 style={{fontFamily:HF,fontSize:24,letterSpacing:2,color:GR}}>AGENDADO!</h2>
          <p style={{color:WD,fontSize:12,marginTop:4}}>Confirmação via WhatsApp</p>
        </div>
        <div style={{background:BK3,border:`1px solid ${BD}`,borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:GR,animation:"blink 1.5s ease infinite"}}/>
            <span style={{fontSize:11,color:WD,fontWeight:600}}>Bot WhatsApp · Simulação</span>
          </div>
          {visible.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start",animation:"fadeUp .3s ease"}}>
              <div style={{maxWidth:"80%",padding:"9px 12px",borderRadius:11,background:m.from==="user"?"#25D366":BK4,color:WT,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{m.text}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>{setStep("servico");setSel({});setForm({name:"",phone:""});setBotStep(0);}}
          style={{width:"100%",padding:12,background:BK3,border:`1px solid ${BD}`,borderRadius:11,fontFamily:BF,fontSize:13,color:WD,cursor:"pointer"}}>Fazer novo agendamento</button>
      </div>
    );
  }

  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{textAlign:"center",paddingBottom:4}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:26,height:26,background:Y,clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:HF,fontSize:11,color:BK}}>M</span>
          </div>
          <span style={{fontFamily:HF,fontSize:18,letterSpacing:3}}>MAVI <span style={{color:Y}}>PRO</span></span>
        </div>
        <h2 style={{fontFamily:HF,fontSize:22,letterSpacing:1}}>EMPRESA <span style={{color:Y}}>MAVI</span></h2>
        <p style={{color:WD,fontSize:12,marginTop:2}}>Rua das Flores, 123 — Centro, SP</p>
      </div>
      <div style={{display:"flex",gap:4}}>
        {["servico","profissional","horario","dados"].map((s,i)=>(
          <div key={s} style={{flex:1,height:3,borderRadius:2,background:["servico","profissional","horario","dados"].indexOf(step)>=i?Y:BD,transition:"background .3s"}}/>
        ))}
      </div>
      {step==="servico"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <SLabel>Escolha o serviço</SLabel>
          {SERVICES.map(s=>(
            <div key={s.id} onClick={()=>{setSel(v=>({...v,service:s.name}));setStep("profissional");}}
              style={{background:BK3,border:`1px solid ${BD}`,borderRadius:11,padding:"13px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
              <div>
                <div style={{fontWeight:600,fontSize:13}}>{s.name}</div>
                <div style={{fontSize:11,color:WD,marginTop:1}}>⏱ {s.duration}</div>
              </div>
              <div style={{fontFamily:HF,fontSize:18,color:Y}}>R${s.price}</div>
            </div>
          ))}
        </div>
      )}
      {step==="profissional"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setStep("servico")} style={{background:"transparent",border:"none",color:WD,cursor:"pointer",fontSize:18}}>←</button>
            <SLabel>Escolha o profissional</SLabel>
          </div>
          {[{avatar:"?",name:"Sem preferência",role:"Primeiro disponível",id:0},...PROFS].map(b=>(
            <div key={b.id} onClick={()=>{setSel(v=>({...v,prof:b.name}));setStep("horario");}}
              style={{background:BK3,border:`1px solid ${sel.prof===b.name?Y:BD}`,borderRadius:11,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
              <Av letter={b.avatar} size={38}/>
              <div>
                <div style={{fontWeight:600,fontSize:13}}>{b.name}</div>
                <div style={{fontSize:11,color:WD,marginTop:1}}>{b.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {step==="horario"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setStep("profissional")} style={{background:"transparent",border:"none",color:WD,cursor:"pointer",fontSize:18}}>←</button>
            <SLabel>Escolha data e horário</SLabel>
          </div>
          <div>
            <p style={{fontSize:11,color:WD,marginBottom:8}}>Data</p>
            <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
              {dates.map(d=>(
                <div key={d} onClick={()=>setSel(v=>({...v,date:d}))}
                  style={{flexShrink:0,padding:"8px 13px",borderRadius:9,background:sel.date===d?Y:BK3,border:`1px solid ${sel.date===d?Y:BD}`,cursor:"pointer"}}>
                  <div style={{fontSize:11,color:sel.date===d?BK:WD,fontWeight:600,whiteSpace:"nowrap"}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{fontSize:11,color:WD,marginBottom:8}}>Horário</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
              {times.map(t=>(
                <div key={t} onClick={()=>setSel(v=>({...v,time:t}))}
                  style={{padding:"9px 4px",borderRadius:9,background:sel.time===t?Y:BK3,border:`1px solid ${sel.time===t?Y:BD}`,cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:12,fontWeight:600,color:sel.time===t?BK:WT}}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={()=>sel.date&&sel.time&&setStep("dados")}
            style={{width:"100%",padding:12,background:sel.date&&sel.time?Y:BD,border:"none",borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:BK,cursor:sel.date&&sel.time?"pointer":"not-allowed"}}>
            CONTINUAR
          </button>
        </div>
      )}
      {step==="dados"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setStep("horario")} style={{background:"transparent",border:"none",color:WD,cursor:"pointer",fontSize:18}}>←</button>
            <SLabel>Confirme seus dados</SLabel>
          </div>
          <Card>
            {[{l:"Serviço",v:sel.service},{l:"Profissional",v:sel.prof},{l:"Data",v:sel.date},{l:"Horário",v:sel.time}].map(x=>(
              <div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${BD}`}}>
                <span style={{fontSize:12,color:WD}}>{x.l}</span>
                <span style={{fontSize:13,fontWeight:600}}>{x.v}</span>
              </div>
            ))}
          </Card>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{key:"name",label:"Nome completo",ph:"Seu nome"},{key:"phone",label:"Celular (WhatsApp)",ph:"(00) 00000-0000"}].map(f=>(
              <div key={f.key}>
                <p style={{fontSize:11,color:WD,marginBottom:5}}>{f.label}</p>
                <input value={form[f.key]} onChange={e=>setForm(v=>({...v,[f.key]:e.target.value}))}
                  placeholder={f.ph}
                  style={{width:"100%",padding:"11px 13px",background:BK3,border:`1px solid ${BD}`,borderRadius:10,color:WT,fontFamily:BF,fontSize:13,outline:"none"}}
                  onFocus={e=>e.target.style.borderColor=Y} onBlur={e=>e.target.style.borderColor=BD}/>
              </div>
            ))}
          </div>
          <button onClick={()=>form.name&&form.phone&&setStep("confirmado")}
            style={{width:"100%",padding:13,background:form.name&&form.phone?Y:BD,border:"none",borderRadius:11,fontFamily:HF,fontSize:17,letterSpacing:2,color:BK,cursor:form.name&&form.phone?"pointer":"not-allowed"}}>
            CONFIRMAR VIA WHATSAPP
          </button>
          <p style={{fontSize:11,color:WD,textAlign:"center"}}>Você receberá uma confirmação no WhatsApp informado</p>
        </div>
      )}
    </div>
  );
}

// ── Login ──────────────────────────────────────────────────────────────────────
function Login({onLogin}){
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [loading,setLoading]=useState(false);
  const handle=()=>{
    if(!email||!pw)return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);onLogin();},1200);
  };
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,padding:28,gap:24,animation:"fadeIn .4s ease"}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:56,height:56,background:Y,clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
          <span style={{fontFamily:HF,fontSize:24,color:BK}}>M</span>
        </div>
        <h1 style={{fontFamily:HF,fontSize:32,letterSpacing:3}}>MAVI <span style={{color:Y}}>PRO</span></h1>
        <p style={{color:WD,fontSize:13,marginTop:4}}>Painel do Profissional</p>
      </div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
        {[{label:"E-mail",val:email,set:setEmail,ph:"seu@email.com",type:"email"},{label:"Senha",val:pw,set:setPw,ph:"••••••••",type:"password"}].map(f=>(
          <div key={f.label}>
            <p style={{fontSize:11,color:WD,marginBottom:5,fontWeight:600}}>{f.label}</p>
            <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
              style={{width:"100%",padding:"12px 14px",background:BK3,border:`1px solid ${BD}`,borderRadius:11,color:WT,fontFamily:BF,fontSize:14,outline:"none"}}
              onFocus={e=>e.target.style.borderColor=Y} onBlur={e=>e.target.style.borderColor=BD}/>
          </div>
        ))}
        <button onClick={handle} style={{width:"100%",padding:14,marginTop:4,background:Y,border:"none",borderRadius:11,fontFamily:HF,fontSize:19,letterSpacing:2,color:BK,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {loading?<div style={{width:18,height:18,border:`2px solid ${BK}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>:"ENTRAR"}
        </button>
      </div>
      <p style={{fontSize:12,color:WD,textAlign:"center"}}>Demo: qualquer e-mail e senha</p>
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────────
const BOTTOM_NAV=[
  {id:"agenda",icon:"📅",label:"Agenda"},
  {id:"menu",icon:"☰",label:"Menu"},
  {id:"ia",icon:"🤖",label:"Mavi IA"},
  {id:"fidelizacao",icon:"⭐",label:"Fideliz."},
  {id:"financeiro",icon:"💰",label:"Finanças"},
];

export default function App(){
  const [mode,setMode]=useState("login");
  const [screen,setScreen]=useState("agenda");
  const [plan,setPlan]=useState("free");
  const p=PLANS[plan];

  const locked=(id)=>{
    if(id==="financeiro"&&!p.allowed.includes("financeiro"))return"Plano MV";
    if(id==="ia"&&!p.allowed.includes("ia"))return"Plano Diamante";
    if(id==="fidelizacao"&&!p.allowed.includes("fidelizacao"))return"Plano Diamante";
    return null;
  };

  const renderScreen=()=>{
    const upg=locked(screen);
    if(upg&&["financeiro","ia","fidelizacao"].includes(screen))
      return <Locked planNeeded={upg} onUpgrade={()=>setScreen("configuracoes")}/>;
    if(screen==="agenda")return <Agenda/>;
    if(screen==="financeiro")return <Financeiro/>;
    if(screen==="ia")return <SocialMaviIA/>;
    if(screen==="fidelizacao")return <Fidelizacao/>;
    if(screen==="menu")return <MenuGrid onNavigate={setScreen}/>;
    if(screen==="clientes")return <Clientes/>;
    if(screen==="profissional")return <Profissional/>;
    if(screen==="servicos")return <Servicos/>;
    if(screen==="produtos")return <Produtos/>;
    if(screen==="pacotes")return <Pacotes/>;
    if(screen==="vendas")return <Vendas/>;
    if(screen==="relatorios")return <Relatorios/>;
    if(screen==="estabelecimento")return <Estabelecimento/>;
    if(screen==="configuracoes")return <Configuracoes plan={plan} onSelectPlan={setPlan} onNavigate={setScreen}/>;
    if(screen==="suporte")return <Suporte/>;
    return <Agenda/>;
  };

  if(mode==="login"){
    return(
      <>
        <style>{G}</style>
        <div style={{maxWidth:430,margin:"0 auto",height:"100vh",background:BK2,display:"flex",flexDirection:"column"}}>
          <Login onLogin={()=>setMode("barber")}/>
          <div style={{padding:"0 28px 24px",textAlign:"center"}}>
            <button onClick={()=>setMode("client")}
              style={{background:"transparent",border:"none",color:WD,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
              Ver visão do cliente →
            </button>
          </div>
        </div>
      </>
    );
  }

  if(mode==="client"){
    return(
      <>
        <style>{G}</style>
        <div style={{maxWidth:430,margin:"0 auto",height:"100vh",background:BK,display:"flex",flexDirection:"column"}}>
          <div style={{flex:1,overflowY:"auto",padding:"20px 16px 16px"}}><ClientView/></div>
          <div style={{padding:"10px 16px",borderTop:`1px solid ${BD}`,textAlign:"center"}}>
            <button onClick={()=>setMode("login")} style={{background:"transparent",border:"none",color:WD,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
              ← Voltar para login do profissional
            </button>
          </div>
        </div>
      </>
    );
  }

  return(
    <>
      <style>{G}</style>
      <div style={{maxWidth:430,margin:"0 auto",height:"100vh",display:"flex",flexDirection:"column",background:BK}}>
        {/* Top bar */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 10px",background:BK2,borderBottom:`1px solid ${BD}`,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:26,height:26,background:Y,clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:HF,fontSize:11,color:BK}}>M</span>
            </div>
            <span style={{fontFamily:HF,fontSize:17,letterSpacing:3}}>MAVI <span style={{color:Y}}>PRO</span></span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setMode("client")}
              style={{padding:"4px 10px",background:BK3,border:`1px solid ${BD}`,borderRadius:7,color:WD,fontFamily:BF,fontSize:10,cursor:"pointer"}}>
              👤 Cliente
            </button>
            <button onClick={()=>setScreen("configuracoes")}
              style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:p.color+"20",border:`1px solid ${p.color}44`,cursor:"pointer"}}>
              <span style={{fontSize:10,fontWeight:700,color:p.color,fontFamily:BF}}>{plan==="free"?"FREE":plan==="mv"?"MV":"💎"}</span>
              <span style={{fontSize:9,color:WD}}>▼</span>
            </button>
          </div>
        </div>
        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 16px 8px"}}>{renderScreen()}</div>
        {/* Bottom nav */}
        <div style={{display:"flex",borderTop:`1px solid ${BD}`,background:BK2,flexShrink:0}}>
          {BOTTOM_NAV.map(n=>{
            const active=screen===n.id,upg=locked(n.id);
            return(
              <button key={n.id} onClick={()=>setScreen(n.id)}
                style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"9px 4px 10px",border:"none",cursor:"pointer",background:active?YG:"transparent",borderTop:active?`2px solid ${Y}`:"2px solid transparent",position:"relative"}}>
                <span style={{fontSize:17,opacity:upg?.4:1}}>{n.icon}</span>
                <span style={{fontSize:9,color:active?Y:upg?WD+"55":WD,fontWeight:active?700:400}}>{n.label}</span>
                {upg&&<span style={{position:"absolute",top:6,right:"50%",transform:"translateX(9px)",fontSize:8}}>🔒</span>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}