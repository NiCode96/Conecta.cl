-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-09-2025 a las 02:33:12
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `LandingPageBasic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DatosContacto`
--

CREATE TABLE `DatosContacto` (
  `id_DatosContacto` int(11) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `red_social_1` varchar(255) DEFAULT NULL,
  `red_social_2` varchar(255) DEFAULT NULL,
  `red_social_3` varchar(255) DEFAULT NULL,
  `red_social_4` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `DatosContacto`
--

INSERT INTO `DatosContacto` (`id_DatosContacto`, `telefono`, `correo`, `red_social_1`, `red_social_2`, `red_social_3`, `red_social_4`) VALUES
(1, '+569 7949 0233', 'jpa.ingenieria.solutions@gmail.com', 'www.linkedin.com/in/jpaingeniería', 'NO', 'NO', 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichaClinica`
--

CREATE TABLE `fichaClinica` (
  `id_ficha` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `observaciones` text NOT NULL,
  `anotacionConsulta` text NOT NULL,
  `anamnesis` text NOT NULL,
  `diagnostico` text NOT NULL,
  `indicaciones` text NOT NULL,
  `fechaConsulta` date NOT NULL,
  `estadoFicha` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fichaClinica`
--

INSERT INTO `fichaClinica` (`id_ficha`, `id_paciente`, `observaciones`, `anotacionConsulta`, `anamnesis`, `diagnostico`, `indicaciones`, `fechaConsulta`, `estadoFicha`) VALUES
(1, 1, 'Paciente con diagnóstico de hipertiroidismo, presenta episodios de ataques de pánico. Actualmente se encuentra en tratamiento con Eutirox 500 mg. / Observación 1', 'Paciente acude a control médico refiriendo síntomas persistentes de ánimo bajo, falta de motivación y cansancio generalizado. Refiere dificultad para conciliar el sueño y sensación de desesperanza. Niega ideación suicida activa en este momento. Consulta para evaluación y seguimiento de tratamiento.', 'Paciente adulto, refiere antecedentes de ánimo depresivo desde hace varias semanas, con disminución de interés en actividades cotidianas y aislamiento social progresivo. Presenta dificultad para concentrarse en tareas laborales, insomnio de conciliación y sensación de fatiga durante el día. Niega consumo de drogas, alcohol ocasional sin excesos. No antecedentes familiares directos de patología psiquiátrica reportados.', 'Trastorno depresivo mayor, episodio moderado\r\n(CIE-10: F32.1)', '	1.	Continuar con tratamiento farmacológico según indicación previa de médico tratante (ej. ISRS).\r\n	2.	Control en 4 semanas para reevaluación de respuesta clínica.\r\n	3.	Mantener higiene del sueño (horarios regulares, evitar pantallas antes de dormir, no consumo de cafeína en la tarde).\r\n	4.	Recomendación de iniciar actividad física aeróbica leve a moderada al menos 3 veces por semana.\r\n	5.	Derivación a psicoterapia de apoyo.\r\n	6.	Instrucciones de acudir a urgencia si presenta ideas suicidas, empeoramiento del ánimo o síntomas nuevos relevantes.', '2025-08-21', 1),
(2, 1, '', 'El paciente acude a control refiriendo persistencia de ánimo bajo, fatiga frecuente y dificultad para mantener la concentración en sus actividades diarias. Menciona además alteraciones del sueño y sensación de desmotivación. No refiere ideación suicida activa.', 'Antecedente de diagnóstico de depresión mayor hace 6 meses, actualmente en tratamiento farmacológico con ISRS (sertralina 50 mg/día). El paciente reconoce cierta mejoría inicial, pero en las últimas semanas ha sentido un estancamiento en su progreso. No antecedentes de enfermedades crónicas relevantes. Apoyo familiar presente y estable.', 'Trastorno depresivo mayor en seguimiento, con síntomas residuales persistentes. No se observan factores de riesgo agudo que requieran hospitalización en este momento.\r\n', 'Mantener tratamiento farmacológico con sertralina en la dosis actual, reevaluando en próxima consulta la necesidad de ajuste.\r\n\r\n\r\n	•	Reforzar hábitos de higiene del sueño y rutina de actividad física moderada.\r\n	•	Recomendar iniciar sesiones de psicoterapia cognitivo-conductual una vez por semana.\r\n	•	Programar control médico en 4 semanas para evaluación de respuesta clínica.\r\n	•	Indicar consulta inmediata en caso de aparición de ideas suicidas o empeoramiento significativo del estado de ánimo.', '2025-08-12', 1),
(3, 1, '', 'Paciente acude a control de seguimiento. Refiere leve mejoría en el ánimo y mayor regularidad en el sueño desde la última consulta. Continúa con episodios de cansancio y baja motivación, pero con menor frecuencia. Mantiene buena adherencia al tratamiento indicado.', 'En tratamiento con antidepresivo ISRS desde hace 3 meses. Niega efectos adversos relevantes. Ha iniciado caminatas diarias de 20 minutos, refiere que le ayudan a distraerse. Persiste cierta dificultad en la concentración durante el trabajo. Apoyo familiar continúa siendo adecuado.', 'Trastorno depresivo mayor en evolución, con respuesta parcial al tratamiento. Estado clínico estable, sin signos de riesgo inminente.', '	•	Mantener medicación en la dosis actual, reevaluar posible ajuste en la próxima visita.\r\n	•	Continuar con rutinas de ejercicio aeróbico ligero al menos 3 veces por semana.\r\n	•	Reforzar técnicas de relajación y respiración para manejo de ansiedad asociada.\r\n	•	Sugerir aumentar frecuencia de sesiones de psicoterapia si es posible.\r\n	•	Próximo control en 6 semanas o antes si se produce empeoramiento clínico.', '2025-05-13', 1),
(4, 1, 'FSAEDGZFSDFGREWETRGSRSGHRWERA', 'GSHDFFGJSREWGHSDFHDFGS', 'uuuuuuuuu', 'asDasafsdgdsgfhdfjfgjkkjlfg', 'sdfhsdfjhterasghrththjgdjtysreaghaewgrwafrhfgswer', '2025-08-25', 1),
(5, 1, 'adascadscscasdccs', 'asdcvascasc', 'textoasdjpaDHAojknnzg9auYSGX', 'QSDEWQFCwrgewcedfdwxasxas', 'fdswgdsacxasdacsdacasx', '2025-08-15', 0),
(6, 1, 'adascadscscasdccs', 'asdcvascasc', 'textoasdjpaDHAojknnzg9auYSGX', 'QSDEWQFCwrgewcedfdwxasxas', 'fdswgdsacxasdacsdacasx', '2025-08-15', 0),
(7, 7, '	•	Paciente debe acudir a urgencias si presenta fiebre >38°C, dolor intenso persistente o hematuria macroscópica.\n	•	Explicar importancia de seguimiento por riesgo de complicación obstructiva.', '	•	Se recomienda registro diario de síntomas (dolor, cambios en la orina, episodios de urgencia miccional).\n	•	Explicar al paciente sobre signos de alarma.\n	•	En caso de confirmarse litiasis, discutir opciones de manejo (médico vs. quirúrgico).', 'Paciente masculino de 52 años, refiere dolor lumbar intermitente en el lado derecho desde hace 2 semanas. Presenta disuria ocasional y sensación de vaciamiento incompleto. Antecedentes de hipertensión arterial controlada. Niega fiebre, vómitos o hematuria evidente.', '	•	Cólico renal por litiasis urinaria en estudio.\n	•	Hiperplasia prostática benigna (descartar).\n	•	Infección urinaria baja (en observación).', '	1.	Aumentar ingesta hídrica a 2–3 litros diarios.\n	2.	Analgésicos de rescate según dolor (paracetamol 1 g cada 8 h si es necesario).\n	3.	Solicitar examen de orina completa, urocultivo y ecografía renal/vesical/prostática.\n	4.	Derivación a urología para control especializado en 7 días.', '2025-08-30', 1),
(8, 1, 'DOADSKFMLAÑSMDL', 'ADFKS´DPAKFSA', 'aSDASDFFS', 'ADOIFJOSDJKSPAJPSKMD', 'AODKPAKL', '2025-08-14', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacienteDatos`
--

CREATE TABLE `pacienteDatos` (
  `id_paciente` int(11) NOT NULL,
  `estado_paciente` int(1) NOT NULL DEFAULT 1,
  `nombre` varchar(500) NOT NULL,
  `apellido` varchar(500) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `nacimiento` date NOT NULL,
  `sexo` enum('MASCULINO','FEMENINO','OTRO') NOT NULL,
  `prevision_id` int(11) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `pais` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacienteDatos`
--

INSERT INTO `pacienteDatos` (`id_paciente`, `estado_paciente`, `nombre`, `apellido`, `rut`, `nacimiento`, `sexo`, `prevision_id`, `telefono`, `correo`, `direccion`, `pais`) VALUES
(1, 1, 'MARCELO IGNACIO', 'VILCHES LAGOS', '19', '2015-02-12', 'MASCULINO', 1, '+56932245465', 'MVILCHES@GMAIL.COM', 'GENERAL VENEGAS 1476 / SAN CARLOS / NUBLE', 'CHILE'),
(2, 1, 'Nicolas', 'Machuca', '265007422', '2025-08-09', 'MASCULINO', 1, '923329282', 'nmachuca@valtek.cl', 'San José 301', 'Chile'),
(3, 1, 'GABRIEL', 'BORIC FONT', '7468453738', '2025-05-15', 'MASCULINO', 1, '2343534466', 'ISDJSJD@WDFJISD.CL', 'LA MONEDA / SANTIAGO CENTRO', 'CHILE'),
(4, 1, 'FERNANDA', 'DEL MAURO RUIZ', '1836452754', '2025-08-09', 'FEMENINO', 1, '923329282', 'ISDJSJD@WDFJISD.CL', 'San José 301', 'CHILE'),
(5, 1, 'BOB ESPONJA', 'PANTALONES CUADRADOS', '191695879', '2025-06-26', 'OTRO', 2, '1232342345', 'NMACHUCA@VALTEK.CL', 'San José 301', 'CHILE'),
(6, 1, 'NARUTO', 'UZUMAKI', '735754278', '2024-01-26', 'MASCULINO', 1, '1232342345', 'NARUTO@GMAIL.COM', 'Avenida Rasengan 64', 'ALDEA DE LA HOJA'),
(7, 1, 'PABLO', 'NERUDA', '88815167', '1980-09-08', 'MASCULINO', 2, '988653287', 'NERUDO@POESIACHILE.CL', 'Isla Negra / Valparaiso', 'CHILE'),
(8, 1, 'FELIPE', 'CAMIROAGA', '76587352K', '2025-08-14', 'OTRO', 1, '864579873', 'FELIPE@MEGA.CL', 'SANTIAGO CENTRO ', 'CHILE'),
(9, 1, 'MICHELE ', 'BACHELET', 'JERIA', '2025-08-06', 'FEMENINO', 2, '746832653', 'MICHEL.BACHE@GMAIL.CL', 'LA MONEDA SANTIAGO', 'CHILE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Portafolio`
--

CREATE TABLE `Portafolio` (
  `portafolio_id` int(11) NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `descripcion_breve` text NOT NULL,
  `descripcion_detallada` text NOT NULL,
  `imagen1` varchar(1024) NOT NULL,
  `imagen2` varchar(1024) NOT NULL,
  `imagen3` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Portafolio`
--

INSERT INTO `Portafolio` (`portafolio_id`, `titulo`, `descripcion_breve`, `descripcion_detallada`, `imagen1`, `imagen2`, `imagen3`) VALUES
(1, 'Proyecto de Refuerzo e Impermeabilización -Estanque 4320-ST-036\r\n', 'Diseño estructural en acero para edificación de 30 x 26 m en Club de Polo, Colina. Se desarrollaron marcos metálicos, fundaciones combinadas y conexiones soldadas, cumpliendo normativa vigente. Proyecto entregado en nivel de ingenieria de detalle para garantizar seguridad, eficiencia y durabilidad estructural.', '', '', '', ''),
(2, 'Refuerzo e Impermeabilización Estanque - Minería', 'Diseño estructural y control de fisuración para reforzar e impermeabilizar estanque de relaves\r\nante aumento de carga por mayor caudal operativo. Se evaluó la capacidad del suelo de fundación, se reviso la estanqueidad estructural y la factibilidad hidráulica del sistema, asegurando la continuidad operativa bajo nuevos requerimientos.', '', '', '', ''),
(3, 'Verificación escalera de gato - cuerda de vida', 'Evaluación estructural del sistema de cuerda de vida vertical instalado en estructura industrial. Se verificaron anclajes, vigas soporte y puntos de fijación, asegurando cumplimiento normativo y resistencia ante condiciones reales de operación.', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Servicios`
--

CREATE TABLE `Servicios` (
  `id_Servicios` int(11) NOT NULL,
  `titulo_servicios` text NOT NULL,
  `descripcion` text NOT NULL,
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Textos`
--

CREATE TABLE `Textos` (
  `id_Textos` int(11) NOT NULL,
  `titulo_id` int(11) NOT NULL,
  `contenido` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Textos`
--

INSERT INTO `Textos` (`id_Textos`, `titulo_id`, `contenido`) VALUES
(1, 1, 'En Conecta Salud creemos que el aprendizaje más valioso surge de la experiencia práctica. Por eso, creamos una plataforma que conecta a estudiantes de carreras de la salud con profesionales activos en distintas áreas, ofreciendo clases particulares, tutorías y acompañamiento académico adaptado a cada necesidad.'),
(2, 2, 'Nuestra misión es democratizar el acceso a conocimientos clínicos de calidad, acercando la experiencia de profesionales de la salud a estudiantes que buscan reforzar sus aprendizajes y aplicar la teoría a la práctica real.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TitulosSecciones`
--

CREATE TABLE `TitulosSecciones` (
  `id_titulo` int(11) NOT NULL,
  `titulo` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `TitulosSecciones`
--

INSERT INTO `TitulosSecciones` (`id_titulo`, `titulo`) VALUES
(1, 'ConectaSalud'),
(2, 'Aprende de los mejores profesionales de la salud\n'),
(3, 'Conecta con expertos en distintas áreas y recibe clases particulares adaptadas a tus necesidades'),
(4, 'Conecta Salud es la plataforma que une a profesionales de la salud con estudiantes que buscan reforzar sus conocimientos, prepararse para exámenes o adquirir experiencia práctica.'),
(5, 'Titulo contactpo?'),
(6, 'Contacto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id_Usuarios` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `apellido` varchar(500) NOT NULL,
  `correo` varchar(500) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id_Usuarios`, `nombre`, `apellido`, `correo`, `contraseña`) VALUES
(1, 'Administrador', 'del Sistema', 'admin@gmail.com', '123123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `DatosContacto`
--
ALTER TABLE `DatosContacto`
  ADD PRIMARY KEY (`id_DatosContacto`);

--
-- Indices de la tabla `fichaClinica`
--
ALTER TABLE `fichaClinica`
  ADD PRIMARY KEY (`id_ficha`),
  ADD KEY `idx_ficha_paciente` (`id_paciente`),
  ADD KEY `idx_ficha_fecha` (`fechaConsulta`);

--
-- Indices de la tabla `pacienteDatos`
--
ALTER TABLE `pacienteDatos`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `idx_paciente_correo` (`correo`),
  ADD KEY `idx_paciente_rut` (`rut`);

--
-- Indices de la tabla `Portafolio`
--
ALTER TABLE `Portafolio`
  ADD PRIMARY KEY (`portafolio_id`);

--
-- Indices de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  ADD PRIMARY KEY (`id_Servicios`);

--
-- Indices de la tabla `Textos`
--
ALTER TABLE `Textos`
  ADD PRIMARY KEY (`id_Textos`),
  ADD KEY `idx_textos_titulo` (`titulo_id`);

--
-- Indices de la tabla `TitulosSecciones`
--
ALTER TABLE `TitulosSecciones`
  ADD PRIMARY KEY (`id_titulo`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_Usuarios`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DatosContacto`
--
ALTER TABLE `DatosContacto`
  MODIFY `id_DatosContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fichaClinica`
--
ALTER TABLE `fichaClinica`
  MODIFY `id_ficha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pacienteDatos`
--
ALTER TABLE `pacienteDatos`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Portafolio`
--
ALTER TABLE `Portafolio`
  MODIFY `portafolio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  MODIFY `id_Servicios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Textos`
--
ALTER TABLE `Textos`
  MODIFY `id_Textos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `TitulosSecciones`
--
ALTER TABLE `TitulosSecciones`
  MODIFY `id_titulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id_Usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fichaClinica`
--
ALTER TABLE `fichaClinica`
  ADD CONSTRAINT `fk_ficha_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacienteDatos` (`id_paciente`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `Textos`
--
ALTER TABLE `Textos`
  ADD CONSTRAINT `fk_textos_titulo` FOREIGN KEY (`titulo_id`) REFERENCES `TitulosSecciones` (`id_titulo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
