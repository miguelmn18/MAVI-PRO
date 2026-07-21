function Clientes(){
  const [open,setOpen]=useState(null);
  const absent=CLIENTS.filter(c=>c.lastDays>=60);
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="MEUS" accent="CLIENTES"/>
      {absent.length>0&&(
        <div style={{background:RD+"18",border:`1px solid ${RD}44`,borderRadius:11,padding:12,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:20}}>⚠️</span>
          <div>
            <div style={{fontWeight:600,fontSize:13,color:RD}}>Clientes ausentes</div>
            <div style={{fontSize:12,color:WD}}>{absent.length} cliente(s) sem visita há +60 dias</div>
          </div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {CLIENTS.map(c=>{
          const isOpen=open===c.id,isAbsent=c.lastDays>=60;
          return(
            <Card key={c.id} style={{cursor:"pointer",border:`1px solid ${isOpen?Y:isAbsent?RD+"44":BD}`}}>
              <div onClick={()=>setOpen(isOpen?null:c.id)} style={{display:"flex",alignItems:"center",gap:12}}>
                <Av letter={c.name[0]} color={isAbsent?RD:Y}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{c.name}</div>
                  <div style={{fontSize:11,color:WD,marginTop:1}}>{c.phone}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:isAbsent?RD:WD}}>Último: {c.last}</div>
                  {isAbsent&&<div style={{fontSize:10,color:RD,marginTop:1}}>{c.lastDays} dias ausente</div>}
                </div>
              </div>
              {isOpen&&(
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${BD}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:10}}>
                    {[{l:"Total atend.",v:c.cuts},{l:"Pontos",v:c.points},{l:"Desafios",v:c.challenges},{l:"Status",v:c.status}].map(x=>(
                      <div key={x.l} style={{background:BK2,padding:"8px 10px",borderRadius:8}}>
                        <div style={{fontSize:10,color:WD}}>{x.l}</div>
                        <div style={{fontWeight:600,color:Y,fontSize:12,marginTop:1}}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{flex:1,padding:9,background:GR,border:"none",borderRadius:9,fontFamily:HF,fontSize:13,letterSpacing:1,color:BK,cursor:"pointer"}}>AGENDAR</button>
                    <button style={{flex:1,padding:9,background:"transparent",border:`1px solid ${BD}`,borderRadius:9,fontFamily:BF,fontSize:12,color:WD,cursor:"pointer"}}>WhatsApp</button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
