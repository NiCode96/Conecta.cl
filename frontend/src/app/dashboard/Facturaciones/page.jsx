export default function Facturaciones(){
    return(
        <div>
            <h1 className="text-6xl font-bold">Facturaciones y Ventas </h1>
                       <br /><br />
      <hr style={{ margin: "20px 0" }} />
      <br /><br />


          <div className="grid. grid-cols-2">
            <h1>Ingreso de Pago Manual</h1>
            <div className="flex flex-col">
                
                <label htmlFor="">Monto pagado: </label>
                <label htmlFor="">Fecha de la transferencia: </label>
                <label htmlFor="">Banco de origen: </label>
                <label htmlFor="">Número de comprobante: </label>
                <label htmlFor="">Titular de la cuenta de origen: </label>
                <label htmlFor="">RUT / Identificación: </label>
                <label htmlFor="">Motivo del pago : </label>
                <label htmlFor="">Cuenta de destino: </label>

            </div>

            <div>

            </div>
          </div>

     
        </div>
    )
}