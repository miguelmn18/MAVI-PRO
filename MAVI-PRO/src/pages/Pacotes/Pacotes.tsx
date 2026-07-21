function Pacotes(){
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="PACOTES" accent="E COMBOS"/>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {PACKAGES.map(p=>(
          <Card key={p.id} glow>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{fontFamily:HF,fontSize:20,letterSpacing:1}}>{p.name}</div>
                <Pill color={GR}>Economiza R${p.saves}</Pill>
              </div>
              <div style={{fontFamily:HF,fontSize:24,color:Y}}>R${p.price}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:12}}>
              {p.services.map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{fontSize:10,color:Y}}>✓</span>
                  <span style={{fontSize:12,color:WD}}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{flex:1,padding:9,background:Y,border:"none",borderRadius:9,fontFamily:HF,fontSize:13,letterSpacing:1,color:BK,cursor:"pointer"}}>EDITAR</button>
              <button style={{flex:1,padding:9,background:"transparent",border:`1px solid ${BD}`,borderRadius:9,fontFamily:BF,fontSize:12,color:WD,cursor:"pointer"}}>Remover</button>
            </div>
          </Card>
        ))}
      </div>
      <button style={{width:"100%",padding:12,background:BK3,border:`1px solid ${BD}`,borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:Y,cursor:"pointer"}}>+ NOVO PACOTE</button>
    </div>
  );
}
