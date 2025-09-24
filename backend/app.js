import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tituloRoutes from "./views/tituloRoutes.js";
import textosRoutes from "./views/textosRoutes.js";
import proyectoRouter from "./views/proyectosRoutes.js";
import contactoRouter from "./views/contactoRoutes.js";
import calendarRoutes from "./views/calendar.js";
import pacienteRoutes from "./views/pacientesRoutes.js";
import fichaRoutes from "./views/fichaRoutes.js";

const app = express();
app.use(express.json()); // 👈 NECESARIO para leer req.body
app.use(cookieParser()); // 👈 Necesario para leer/escribir cookies (JWT)
app.use(cors({
  origin: "http://localhost:3000", // Frontend Next.js en local
  credentials: true                // Permite enviar/recibir cookies
}))


app.get("/", (req, res) => { res.send("Hola mundo"); });
app.use("/titulo", tituloRoutes);
app.use("/textos", textosRoutes);
app.use("/proyectos", proyectoRouter);
app.use('/contacto', contactoRouter )
app.use('/calendar', calendarRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/ficha', fichaRoutes);

// app.set("trust proxy", 1); // 👉 Descomenta en producción detrás de proxy (para cookies 'secure')
app.listen(3001, () => {
  console.log('http://localhost:3001/')
})