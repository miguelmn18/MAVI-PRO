function SocialMaviIA(){
  const [msgs,setMsgs]=useState([{role:"assistant",content:"Oi! Sou a Social Mavi IA 💈\n\nMe conta seu estilo e o que quer postar. Vou sugerir conteúdos virais pra sua empresa crescer nas redes."}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[msgs,loading]);
  const send=async()=>{
    if(!input.trim()||loading)return;
    const txt=input.trim();setInput("");
    const next=[...msgs,{role:"user",content:txt}];
    setMsgs(next);setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`Você é Social Mavi IA, especialista em crescimento de empresas do setor de beleza e estética nas redes sociais (barbearias, cabeleireiros, manicures). Conhece profundamente tendências virais do Instagram, TikTok e YouTube para o nicho de beleza. Quando o profissional descrever seu estilo, sugira: 3 ideias de conteúdo viral com títulos chamativos, melhor formato (Reels/Carrossel/Stories), hook para os primeiros 3 segundos, hashtags estratégicas, melhor horário para postar. Seja direto, prático e empolgante. Responda em português.`,messages:next.map(m=>({role:m.role,content:m.content}))})});
      const d=await res.json();
      setMsgs([...next,{role:"assistant",content:d.content?.map(b=>b.text||"").join("")||"Erro."}]);
    }catch{setMsgs([...next,{role:"assistant",content:"Erro de conexão. Tente novamente."}]);}
    setLoading(false);
  };
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14,height:"100%"}}>
      <SHead title="SOCIAL" accent="MAVI IA" sub="Especialista em conteúdo · Plano Diamante"/>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:10,background:BK3,border:`1px solid ${BD}`,borderRadius:12,padding:12,overflowY:"auto",minHeight:260,maxHeight:370}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"fadeUp .2s ease"}}>
            {m.role==="assistant"&&<div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${Y},${YD})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:HF,fontSize:11,color:BK,marginRight:6,flexShrink:0,marginTop:2}}>M</div>}
            <div style={{maxWidth:"78%",padding:"9px 12px",borderRadius:11,background:m.role==="user"?Y:BK2,color:m.role==="user"?BK:WT,fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap",borderBottomRightRadius:m.role==="user"?2:11,borderBottomLeftRadius:m.role==="assistant"?2:11}}>{m.content}</div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${Y},${YD})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:HF,fontSize:11,color:BK}}>M</div>
            <div style={{display:"flex",gap:4,padding:"8px 12px",background:BK2,borderRadius:11}}>
              {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:Y,animation:"blink 1.2s ease infinite",animationDelay:`${i*.2}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          placeholder="Me conta seu estilo..."
          style={{flex:1,padding:"11px 13px",background:BK3,border:`1px solid ${BD}`,borderRadius:10,color:WT,fontFamily:BF,fontSize:13,outline:"none"}}
          onFocus={e=>e.target.style.borderColor=Y} onBlur={e=>e.target.style.borderColor=BD}/>
        <button onClick={send} disabled={loading} style={{padding:"11px 16px",borderRadius:10,border:"none",background:loading?BD:Y,color:BK,fontFamily:HF,fontSize:14,letterSpacing:1,cursor:loading?"not-allowed":"pointer",flexShrink:0}}>
          {loading?"...":"ENVIAR"}
        </button>
      </div>
    </div>
  );
}
