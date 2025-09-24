// /backend/auth/google.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKENS_PATH = path.join(__dirname, '../tokens.json');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Mantener tokens actualizados en disco cuando Google refresque el access_token o entregue un nuevo refresh_token
oauth2Client.on('tokens', (tokens) => {
  try {
    if (!tokensCache) tokensCache = {};
    tokensCache = { ...tokensCache, ...tokens };
    saveTokensToFile(tokensCache);
  } catch (e) {
    console.error('No se pudo actualizar tokens.json desde evento tokens', e);
  }
});

// Scopes: events (crear/editar) y calendar (lectura básica). Puedes quitar el segundo si no lo usas.
export const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar'
];

// Persistencia simple de tokens (archivo)
function loadTokensFromFile() {
  try {
    if (fs.existsSync(TOKENS_PATH)) {
      const raw = fs.readFileSync(TOKENS_PATH, 'utf8');
      const tokens = JSON.parse(raw);
      if (tokens && tokens.access_token) {
        oauth2Client.setCredentials(tokens);
        return tokens;
      }
    }
  } catch {}
  return null;
}

function saveTokensToFile(tokens) {
  try {
    fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf8');
  } catch (e) {
    console.error('No se pudo guardar tokens.json', e);
  }
}

let tokensCache = loadTokensFromFile();

export function getAuthUrl(state = '') {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    include_granted_scopes: true,
    state
  });
}

export async function setTokensFromCode(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  tokensCache = { ...(tokensCache || {}), ...tokens };
  saveTokensToFile(tokensCache);
  return tokens;
}

export function ensureAuth() {
  if (!tokensCache) throw new Error('No hay tokens OAuth aún. Visita /calendar/auth/google');
  oauth2Client.setCredentials(tokensCache);
  return oauth2Client;
}

// =============================================
// Helpers por profesional (multi‑usuario)
// =============================================
// Crea un cliente OAuth2 listo para usar usando un refresh_token específico
export function getOAuthClientForRefreshToken(refresh_token) {
  if (!refresh_token) throw new Error('Falta refresh_token del profesional');
  const client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  client.setCredentials({ refresh_token });
  return client;
}

// Devuelve una instancia de Google Calendar v3 con el auth provisto
export function getCalendar(auth) {
  return google.calendar({ version: 'v3', auth });
}