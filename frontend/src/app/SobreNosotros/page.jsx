async function cargarTitulos() {
  const res = await fetch("http://localhost:3001/titulo");
  const dataTitulos = await res.json();
  return dataTitulos;
}

async function cargarTextos() {
  const res = await fetch("http://localhost:3001/textos");
  const textodata = await res.json();
  return textodata;
}

export default async function SobreNosotros() {
  const titulos = await cargarTitulos();
  const quienesSomos = titulos.find((item) => item.id_titulo === 3);
  const quehacemos = titulos.find((item) => item.id_titulo === 4);

  const textos = await cargarTextos();
  const textoQuienesSomos = textos.find((item) => item.id_Textos === 1);
  const textoQueHacemos = textos.find((item) => item.id_Textos === 2);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center text-center">
      {quienesSomos && (
        <h1 className="text-4xl font-bold mb-4">{quienesSomos.titulo}</h1>
      )}
      {textoQuienesSomos && (
        <p className="text-lg mb-8">{textoQuienesSomos.contenido}</p>
      )}
      {quehacemos && (
        <h1 className="text-4xl font-bold mb-4">{quehacemos.titulo}</h1>
      )}
      {textoQueHacemos && (
        <p className="text-lg">{textoQueHacemos.contenido}</p>
      )}
    </div>
  );
}
