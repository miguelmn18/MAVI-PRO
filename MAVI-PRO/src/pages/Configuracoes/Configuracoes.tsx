function Configuracoes({plan,onSelectPlan,onNavigate}){
  const [section,setSection]=useState(null);
  const p=PLANS[plan];

  if(section==="planos"){
    return(
      <div style={{animation:"slideUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <button onClick={()=>setSection(null)} style={{background:BK3,border:`1px solid ${BD}`,borderRadius:8,padding:"5px 11px",color:WT,fontFamily:BF,fontSize:12,cursor:"pointer"}}>← Voltar</button>
          <h3 style={{fontFamily:HF,fontSize:20,letterSpacing:1}}>PLANOS MAVI PRO</h3>
        </div>
        {Object.values(PLANS).map(pl=>{
          const isCur=plan===pl.id;
          return(
            <div key={pl.id} style={{background:BK3,border:`2px solid ${isCur?pl.color:BD}`,borderRadius:14,padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <h3 style={{fontFamily:HF,fontSize:20,color:pl.color}}>{pl.label.toUpperCase()}</h3>
                    {isCur&&<Pill color={GR}>ATIVO</Pill>}
                  </div>
                  <div style={{fontFamily:HF,fontSize:24,color:WT}}>{pl.price}<span style={{fontSize:11,fontFamily:BF,color:WD}}>{pl.period}</span></div>
                  <p style={{fontSize:12,color:WD,marginTop:4}}>{pl.headline}</p>
                </div>
                <Pill color={pl.color}>{pl.badge}</Pill>
              </div>
              {/* separator before highlights */}
              {pl.id==="diamante"&&(
                <div style={{background:Y+"14",border:`1px solid ${Y}33`,borderRadius:9,padding:"10px 12px",marginBottom:10}}>
                  <div style={{fontSize:10,color:Y,fontWeight:700,letterSpacing:1,marginBottom:6}}>✨ DESTAQUES DO PLANO</div>
                  {pl.features.filter(f=>f.hl).map((f,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:4}}>
                      <span style={{fontSize:12,flexShrink:0}}>⭐</span>
                      <span style={{fontSize:12,color:Y,fontWeight:600}}>{f.t.replace("✨ ","")}{f.note&&<span style={{color:Y+"99",fontWeight:400}}> · {f.note}</span>}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                {pl.features.filter(f=>!f.hl).map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                    <span style={{fontSize:12,flexShrink:0}}>{f.ok?"✅":"❌"}</span>
                    <span style={{fontSize:12,color:f.ok?WT:WD}}>{f.t}{f.note&&<span style={{color:WD}}> · {f.note}</span>}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{onSelectPlan(pl.id);setSection(null);}} style={{flex:1,padding:10,background:pl.color,border:"none",borderRadius:10,fontFamily:HF,fontSize:14,letterSpacing:1.5,color:BK,cursor:"pointer"}}>{pl.cta}</button>
                <button onClick={()=>{onSelectPlan(pl.id);setSection(null);}} style={{padding:"10px 14px",background:"transparent",border:`1px solid ${BD}`,borderRadius:10,fontFamily:BF,fontSize:12,color:WD,cursor:"pointer"}}>Simular</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if(section==="integracoes"){
    const [openSec,setOpenSec]=useState(null);
    const secs=[{key:"pagamentos",label:"💳 Pagamentos"},{key:"gestao",label:"📊 Gestão"},{key:"marketing",label:"📸 Marketing"}];
    return(
      <div style={{animation:"slideUp .3s ease",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <button onClick={()=>setSection(null)} style={{background:BK3,border:`1px solid ${BD}`,borderRadius:8,padding:"5px 11px",color:WT,fontFamily:BF,fontSize:12,cursor:"pointer"}}>← Voltar</button>
          <h3 style={{fontFamily:HF,fontSize:20,letterSpacing:1}}>INTEGRAÇÕES</h3>
        </div>
        <SLabel>⚡ Destaques</SLabel>
        {INTEGRATIONS.principais.map(item=>(
          <Card key={item.name} style={{border:`1px solid ${Y}44`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>{item.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                  <span style={{fontWeight:600,fontSize:13}}>{item.name}</span>
                  <Pill>{item.badge}</Pill>
                </div>
                <p style={{fontSize:11,color:WD,marginTop:2}}>{item.desc}</p>
              </div>
              <button style={{padding:"5px 10px",background:Y,border:"none",borderRadius:7,fontFamily:HF,fontSize:11,color:BK,cursor:"pointer",flexShrink:0}}>ATIVAR</button>
            </div>
          </Card>
        ))}
        <SLabel>Todas</SLabel>
        {secs.map(s=>{
          const isOpen=openSec===s.key;
          return(
            <div key={s.key} style={{background:BK3,border:`1px solid ${BD}`,borderRadius:11,overflow:"hidden"}}>
              <div onClick={()=>setOpenSec(isOpen?null:s.key)} style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                <span style={{fontWeight:600,fontSize:13}}>{s.label}</span>
                <span style={{color:WD,fontSize:10}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div style={{borderTop:`1px solid ${BD}`,padding:10,display:"flex",flexDirection:"column",gap:7,animation:"fadeUp .2s ease"}}>
                  {INTEGRATIONS[s.key].map(item=>(
                    <div key={item.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:BK2,borderRadius:9}}>
                      <span style={{fontSize:17}}>{item.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:600,fontSize:12}}>{item.name}</div>
                        <div style={{fontSize:11,color:WD}}>{item.desc}</div>
                      </div>
                      <button style={{padding:"5px 9px",background:"transparent",border:`1px solid ${BD}`,borderRadius:7,color:WD,fontFamily:BF,fontSize:11,cursor:"pointer",flexShrink:0}}>Conectar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const menuItems=[
    {id:"planos",icon:"💎",label:"Planos Mavi Pro",sub:`Atual: ${p.label}`},
    {id:"integracoes",icon:"🔗",label:"Integrações",sub:"WhatsApp, Google, Pagamentos"},
    {id:"notif",icon:"🔔",label:"Notificações",sub:"Alertas e lembretes"},
    {id:"segurança",icon:"🔐",label:"Segurança",sub:"Senha e acesso"},
  ];
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="CONFIGURAÇÕES"/>
      <Card glow>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Av letter="E" size={46}/>
          <div>
            <div style={{fontWeight:600,fontSize:14}}>Empresa Mavi</div>
            <div style={{fontSize:12,color:WD,marginTop:1}}>empresa@mavi.com</div>
            <Pill color={p.color}>{p.badge}</Pill>
          </div>
        </div>
      </Card>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {menuItems.map(item=>(
          <div key={item.id} onClick={()=>setSection(item.id)}
            style={{background:BK3,border:`1px solid ${BD}`,borderRadius:11,padding:"13px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
            <span style={{fontSize:20}}>{item.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:13}}>{item.label}</div>
              <div style={{fontSize:11,color:WD,marginTop:1}}>{item.sub}</div>
            </div>
            <span style={{color:WD,fontSize:14}}>›</span>
          </div>
        ))}
      </div>
      <button style={{width:"100%",padding:12,background:"transparent",border:`1px solid ${RD}44`,borderRadius:11,fontFamily:BF,fontSize:13,color:RD,cursor:"pointer"}}>Sair do aplicativo</button>
    </div>
  );
}
