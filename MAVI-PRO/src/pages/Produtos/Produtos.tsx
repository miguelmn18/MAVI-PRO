function Produtos(){
  return(
    <div style={{animation:"fadeUp .3s ease",display:"flex",flexDirection:"column",gap:14}}>
      <SHead title="PRODUTOS" accent="EM ESTOQUE"/>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {PRODUCTS.map(p=>{
          const low=p.stock<=5;
          return(
            <Card key={p.id} style={{border:`1px solid ${low?RD+"44":BD}`}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:low?RD+"22":YG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🧴</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{p.name}</div>
                  <div style={{fontSize:11,color:low?RD:WD,marginTop:1}}>Estoque: {p.stock} un.{low?" · ⚠️ Baixo":""}</div>
                </div>
                <div style={{fontFamily:HF,fontSize:18,color:Y}}>R${p.price}</div>
                <span style={{color:WD,fontSize:13,marginLeft:4,cursor:"pointer"}}>✏️</span>
              </div>
            </Card>
          );
        })}
      </div>
      <button style={{width:"100%",padding:12,background:BK3,border:`1px solid ${BD}`,borderRadius:11,fontFamily:HF,fontSize:16,letterSpacing:2,color:Y,cursor:"pointer"}}>+ NOVO PRODUTO</button>
    </div>
  );
}
