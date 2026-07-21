function Agenda(){
  const [day,setDay]=useState(0);
  const days=["Hoje","Amanhã","Sex","Sáb","Dom"];
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:16}}>
      <SHead title="AGENDA" accent="HOJE" sub="Quarta, 07 de Maio · 5 agendamentos"/>
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
        {days.map((d,i)=>(
          <div key={d} onClick={()=>setDay(i)} style={{flexShrink:0,padding:"8px 14px",borderRadius:10,background:day===i?Y:BK3,border:`1px solid ${day===i?Y:BD}`,cursor:"pointer"}}>
            <div style={{fontSize:11,color:day===i?BK:WD,fontWeight:600}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {AGENDA_DATA.map(a=>(
          <Card key={a.id}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{background:Y,borderRadius:8,padding:"6px 10px",textAlign:"center",flexShrink:0}}>
                <div style={{fontFamily:HF,fontSize:17,color:BK,lineHeight:1}}>{a.time}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13}}>{a.client}</div>
                <div style={{fontSize:11,color:WD,marginTop:1}}>{a.service} · {a.prof}</div>
              </div>
              <Pill color={a.status==="confirmado"?GR:Y}>{a.status}</Pill>
            </div>
          </Card>
        ))}
      </div>
      <button style={{width:"100%",padding:13,background:Y,border:"none",borderRadius:11,fontFamily:HF,fontSize:17,letterSpacing:2,color:BK,cursor:"pointer"}}>+ NOVO AGENDAMENTO</button>
    </div>
  );
}
