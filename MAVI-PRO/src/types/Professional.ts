const PROFS=[
  {id:1,name:"Lucas Ferreira",role:"Degradê & Navalhado",hours:"Seg-Sáb 9h-19h",cuts:48,revenue:1440,exp:120,avatar:"L",phone:"(11) 99999-0001"},
  {id:2,name:"Rafael Souza",role:"Corte Clássico",hours:"Ter-Dom 10h-20h",cuts:35,revenue:1050,exp:80,avatar:"R",phone:"(11) 99999-0002"},
  {id:3,name:"Diego Martins",role:"Afro & Tranças",hours:"Seg-Sex 8h-18h",cuts:62,revenue:1860,exp:150,avatar:"D",phone:"(11) 99999-0003"},
];

function Profissional(){
  const [open,setOpen]=useState(null);
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="MEUS" accent="PROFISSIONAIS"/>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {PROFS.map(b=>{
          const isOpen=open===b.id;
          return(
            <Card key={b.id} style={{cursor:"pointer",border:`1px solid ${isOpen?Y:BD}`}}>
              <div onClick={()=>setOpen(isOpen?null:b.id)} style={{display:"flex",alignItems:"center",gap:12}}>
                <Av letter={b.avatar} size={42}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{b.name}</div>
                  <div style={{fontSize:11,color:WD,marginTop:1}}>{b.role}</div>
                  <div style={{fontSize:10,color:WD,marginTop:1}}>{b.hours}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:HF,fontSize:16,color:Y}}>{b.cuts}</div>
                  <div style={{fontSize:10,color:WD}}>atend./mês</div>
                </div>
              </div>
              {isOpen&&(
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${BD}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:10}}>
                    {[{l:"Faturamento",v:`R$${b.revenue}`},{l:"Lucro",v:`R$${b.revenue-b.exp}`},{l:"Ticket Médio",v:`R$${(b.revenue/b.cuts).toFixed(0)}`},{l:"Telefone",v:b.phone}].map(x=>(
                      <div key={x.l} style={{background:BK2,padding:"8px 10px",borderRadius:8}}>
                        <div style={{fontSize:10,color:WD}}>{x.l}</div>
                        <div style={{fontWeight:600,color:Y,fontSize:12,marginTop:1}}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{flex:1,padding:9,background:Y,border:"none",borderRadius:9,fontFamily:HF,fontSize:13,letterSpacing:1,color:BK,cursor:"pointer"}}>EDITAR</button>
                    <button style={{flex:1,padding:9,background:"transparent",border:`1px solid ${BD}`,borderRadius:9,fontFamily:BF,fontSize:12,color:WD,cursor:"pointer"}}>Desativar</button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <button style={{width:"100%",padding:12,background:BK3,border:`1px solid ${BD}`,borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:Y,cursor:"pointer"}}>+ ADICIONAR PROFISSIONAL</button>
    </div>
  );
}
