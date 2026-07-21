function Financeiro(){
  const [open,setOpen]=useState(null);
  const totalRev=PROFS.reduce((a,b)=>a+b.revenue,0);
  const totalExp=PROFS.reduce((a,b)=>a+b.exp,0);
  const salesTotal=SALES.reduce((a,b)=>a+b.total,0);
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:16}}>
      <SHead title="CONTROLE" accent="FINANCEIRO" sub="Maio 2025"/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <MiniStat label="Faturamento" value={`R$${totalRev.toLocaleString()}`} accent={Y} icon="💰"/>
        <MiniStat label="Despesas" value={`R$${totalExp.toLocaleString()}`} accent={RD} icon="📉"/>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <MiniStat label="Lucro" value={`R$${(totalRev-totalExp).toLocaleString()}`} accent={GR} icon="📈"/>
        <MiniStat label="Vendas" value={`R$${salesTotal}`} accent={Y} icon="🛍️"/>
      </div>
      <Card><SLabel>Faturamento — 6 meses</SLabel><MiniChart data={REV_DATA}/></Card>
      <div>
        <SLabel>Por profissional</SLabel>
        {PROFS.map(b=>{
          const isOpen=open===b.id;
          return(
            <Card key={b.id} style={{marginBottom:8,cursor:"pointer",border:`1px solid ${isOpen?Y:BD}`}}>
              <div onClick={()=>setOpen(isOpen?null:b.id)} style={{display:"flex",alignItems:"center",gap:10}}>
                <Av letter={b.avatar}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{b.name}</div>
                  <div style={{fontSize:11,color:WD}}>{b.cuts} atendimentos</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:HF,fontSize:17,color:Y}}>R${b.revenue}</div>
                  <div style={{fontSize:10,color:GR}}>Liq. R${b.revenue-b.exp}</div>
                </div>
                <span style={{color:WD,fontSize:10,marginLeft:4}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${BD}`,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,animation:"fadeUp .2s ease"}}>
                  {[{l:"Ticket",v:`R$${(b.revenue/b.cuts).toFixed(0)}`},{l:"Despesa",v:`R$${b.exp}`},{l:"Part.",v:`${((b.revenue/PROFS.reduce((a,x)=>a+x.revenue,0))*100).toFixed(0)}%`}].map(x=>(
                    <div key={x.l} style={{background:BK2,padding:"8px 10px",borderRadius:8}}>
                      <div style={{fontSize:10,color:WD}}>{x.l}</div>
                      <div style={{fontWeight:600,color:Y,fontSize:13,marginTop:1}}>{x.v}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
