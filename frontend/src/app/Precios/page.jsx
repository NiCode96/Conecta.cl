export default function Pricing() {
  const plans = [
    {
      id: "Tarifa Unica",
      title: "Plan Básico",
      price: "$XX.XXX",
      note: "por unidad",
      desc: "Descripción breve y neutral del plan básico.",
      accent: "text-rose-600",
      li: "text-gray-600",
      tick: "text-rose-600",
      btn: "text-rose-600 ring-1 ring-inset ring-rose-200 hover:ring-rose-300",
      dark: false,
      feats: [
        "Característica 1",
        "Característica 2",
        "Característica 3",
        "Característica 4",
        "Característica 5"
      ],
    },
    {
      id: "Paquete 4 Sesiones",
      title: "Plan Avanzado",
      price: "$YY.YYY",
      note: "por unidad",
      desc: "Descripción breve y neutral del plan avanzado.",
      accent: "text-rose-600",
      li: "text-gray-600",
      tick: "text-rose-600",
      btn: "text-rose-600 ring-1 ring-inset ring-rose-200 hover:ring-rose-300",
      dark: false,
      feats: [
        "Característica 1",
        "Característica 2",
        "Característica 3",
        "Característica 4",
        "Característica 5",
        "Característica 6",
      ],
    },
  ];

  return (
    <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      {/* Título */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-rose-600">
          <strong>Título de sección neutral</strong>
        </h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Subtítulo o descripción general del servicio en texto neutro.
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Texto de ejemplo para descripción adicional en un tono neutro.
      </p>

      {/* Planes */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-y-6 sm:mt-20 md:grid-cols-2 md:gap-x-8 justify-center">
        {plans.map((p) => (
          <div
            key={p.id}
            className={
              p.dark
                ? "relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10 flex flex-col h-full" // Background color for dark card + flex column + full height
                : "rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0 flex flex-col h-full" // Background color for light card + flex column + full height
            }
          >
            <div className="flex-1">
              <h3 id={`tier-${p.id}`} className={`text-base/7 font-semibold ${p.accent}`}>
                {/* Título del plan - editable */}
                {p.title}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={`text-5xl font-semibold tracking-tight ${
                    p.dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {/* Precio - editable */}
                  {p.price}
                </span>
                <span
                  className={`text-base ${
                    p.dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {/* Nota debajo del precio - editable */}
                  {p.note}
                </span>
              </p>
              <p
                className={`mt-6 text-base/7 ${
                  p.dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {/* Descripción - editable */}
                {p.desc}
              </p>

              {/* Lista de features */}
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm/6 ${p.li} sm:mt-10`}
              >
                {/* Lista de características - editar cada item en el array feats */}
                {p.feats.map((f, i) => (
                  <li key={i} className="flex gap-x-3">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className={`h-6 w-5 flex-none ${p.tick}`} // p.tick sets the color of the tick icon
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 
                        1.052l-8 10.5a.75.75 0 0 
                        1-1.127.075l-4.5-4.5a.75.75 0 
                        1 1.06-1.06l3.894 3.893 
                        7.48-9.817a.75.75 0 0 1 
                        1.05-.143Z"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón */}
            <a
              href="#"
              aria-describedby={`tier-${p.id}`}
              className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                p.btn // p.btn controls the text and ring color (borders)
              } ${p.dark ? "sm:mt-10" : "sm:mt-10"}`}
            >
              {/* Texto del botón - editable */}
              Acción del plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}