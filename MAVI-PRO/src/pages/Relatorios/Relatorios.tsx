function Relatorios(){
  const [tab,setTab]=useState("receita");
  const tabs=[{id:"receita",l:"Receita"},{id:"atend",l:"Atend."},{id:"agend",l:"Agend."},{id:"produto",l:"Produtos"},{id:"ticket",l:"Ticket"},{id:"ausentes",l:"Ausentes"}];
  const absent=CLIENTS.filter(c=>c.lastDays>=60);
  const avgTicket=PROFS.reduce((a,b)=>a+(b.revenue/b.cuts),0)/PROFS.length;
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="RELATÓRIOS" accent="DIVERSOS"/>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{flexShrink:0,padding:"7px 13px",borderRadius:9,border:`1px solid ${tab===t.id?Y:BD}`,background:tab===t.id?YG:BK3,color:tab===t.id?Y:WD,fontFamily:BF,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            {t.l}
          </button>
        ))}
      </div>
      {tab==="receita"&&<Card><SLabel>Receita vs Despesas — 6 meses</SLabel><MiniChart data={REV_DATA} color={Y}/><div style={{height:8}}/><MiniChart data={EXP_DATA} color={RD}/><div style={{display:"flex",gap:12,marginTop:10}}><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,borderRadius:2,background:Y}}/><span style={{fontSize:11,color:WD}}>Receita</span></div><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,borderRadius:2,background:RD}}/><span style={{fontSize:11,color:WD}}>Despesa</span></div></div></Card>}
      {tab==="atend"&&<Card><SLabel>Atendimentos por mês</SLabel><MiniChart data={ATD_DATA} color={GR} h={80}/><div style={{marginTop:10,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:WD}}>Total: {ATD_DATA.reduce((a,b)=>a+b,0)}</span><span style={{fontSize:12,color:GR}}>Média: {(ATD_DATA.reduce((a,b)=>a+b,0)/6).toFixed(0)}/mês</span></div></Card>}
      {tab==="agend"&&<Card><SLabel>Agendamentos por mês</SLabel><MiniChart data={AGD_DATA} color={Y} h={80}/><div style={{marginTop:10,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:WD}}>Total: {AGD_DATA.reduce((a,b)=>a+b,0)}</span><span style={{fontSize:12,color:Y}}>Média: {(AGD_DATA.reduce((a,b)=>a+b,0)/6).toFixed(0)}/mês</span></div></Card>}
      {tab==="produto"&&<Card><SLabel>Produtos vendidos por mês</SLabel><MiniChart data={PROD_DATA} color="#B9F2FF" h={80}/><div style={{marginTop:10,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:WD}}>Total: {PROD_DATA.reduce((a,b)=>a+b,0)} un.</span><span style={{fontSize:12,color:"#B9F2FF"}}>Média: {(PROD_DATA.reduce((a,b)=>a+b,0)/6).toFixed(0)}/mês</span></div></Card>}
      {tab==="ticket"&&<div style={{display:"flex",flexDirection:"column",gap:8}}><Card><SLabel>Ticket Médio Mensal</SLabel><div style={{fontFamily:HF,fontSize:36,color:Y}}>R${avgTicket.toFixed(2)}</div><p style={{fontSize:12,color:WD,marginTop:4}}>Média entre todos os profissionais</p></Card>{PROFS.map(b=><Card key={b.id}><div style={{display:"flex",alignItems:"center",gap:10}}><Av letter={b.avatar} size={32}/><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{b.name}</div><div style={{fontSize:11,color:WD}}>{b.cuts} atend.</div></div><div style={{fontFamily:HF,fontSize:18,color:Y}}>R${(b.revenue/b.cuts).toFixed(2)}</div></div></Card>)}</div>}
      {tab==="ausentes"&&<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{background:RD+"18",border:`1px solid ${RD}33`,borderRadius:11,padding:12}}><div style={{fontWeight:600,fontSize:13,color:RD,marginBottom:2}}>⚠️ {absent.length} clientes ausentes</div><div style={{fontSize:12,color:WD}}>Sem visita há mais de 60 dias</div></div>{absent.map(c=><Card key={c.id} style={{border:`1px solid ${RD}33`}}><div style={{display:"flex",alignItems:"center",gap:10}}><Av letter={c.name[0]} color={RD} size={36}/><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{c.name}</div><div style={{fontSize:11,color:RD,marginTop:1}}>{c.lastDays} dias sem visita</div></div><button style={{padding:"6px 12px",background:GR,border:"none",borderRadius:8,fontFamily:HF,fontSize:12,letterSpacing:1,color:BK,cursor:"pointer"}}>CHAMAR</button></div></Card>)}</div>}
    </div>
  );
}
