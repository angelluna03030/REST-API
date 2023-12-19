import Link from "next/link"
import "./estilos.css"
import Card from "@/app/catalogo/card"
import Image from "next/image"

const Catalogo= () =>{
    return (<>

<nav>
      <ul>
        <li>
          <Link href="/componestes">Catálogo</Link>
        </li>
        <li>
          <Link href="/pedidos">Pedidos</Link>
        </li>
      </ul>
    </nav>
       <center><h1>Catalogo</h1></center> 
        <div className="Catalogo">
        
           <Card foto={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRucp-XKZKSoTcMfYG9DXeVIaq3fgOOY93mhAnGn02JiOCX2IK-rMslFyPFwTg7v2Fnl5o&usqp=CAU"} nombre="camise negra" color="negro" precio_venta="150.000" lugar="card1"></Card>
           <Card foto={"https://hips.hearstapps.com/hmg-prod/images/7588089100-1-1-1-1654068357.jpg?crop=1.00xw:0.304xh;0,0.332xh&resize=1200:*"} nombre="camise roja" color="rojo" precio_venta="250.000" lugar="card2"></Card>
    
           
        
        </div>
        <div className="Catalogo">
        
           <Card foto={"https://m.media-amazon.com/images/I/61kTU9LHRRL._AC_SL1500_.jpg"} nombre="buso de rana" color="verde" precio_venta="250.000" lugar="card3"></Card>
           <Card foto={"https://m.media-amazon.com/images/I/61k3x4lvyQL.jpg"} nombre="camise negra" color="negro" precio_venta="150.000" lugar="card4"></Card>
    
           
        
        </div>
        <div className="Catalogo">
        
        <Card foto={"https://m.media-amazon.com/images/I/718Z7Y6NHwL._AC_SL1500_.jpg"} nombre="camise negra" color="negro" precio_venta="200.000" lugar="card5"></Card>
        <Card foto={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs4GaV1xCAbG4LaLQrvYvygOQJWAfUFoOcUg&usqp=CAU"} nombre="camise verde" color="verde" precio_venta="120.000" lugar="card6"></Card>
 
        
     
     </div>
    
     
        </>
    )
}

export default Catalogo