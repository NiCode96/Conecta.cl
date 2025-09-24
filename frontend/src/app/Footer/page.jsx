import Link from "next/link";

export default function Footer() {
  return (
    <div>

      <div>
        <h1>Sección 1</h1>
        <h1>Sección 2</h1>
        <h1>Sección 3</h1>

        <div>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>

      <div>
        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
          <li>Elemento 3</li>
          <li>Elemento 4</li>
          <li>Elemento 5</li>
          <li>Elemento 6</li>
          <li>Elemento 7</li>
          <li>Elemento 8</li>
          <li>Elemento 9</li>
          <li>Elemento 10</li>
        </ul>

        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
          <li>Elemento 3</li>
          <li>Elemento 4</li>
          <li>Elemento 5</li>
          <li>Elemento 6</li>
          <li>Elemento 7</li>
          <li>Elemento 8</li>
          <li>Elemento 9</li>
          <li>Elemento 10</li>
        </ul>

        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
          <li>Elemento 3</li>
          <li>Elemento 4</li>
          <li>Elemento 5</li>
          <li>Elemento 6</li>
          <li>Elemento 7</li>
          <li>Elemento 8</li>
          <li>Elemento 9</li>
          <li>Elemento 10</li>
        </ul>

        <div></div>
      </div>

      <hr />

      <div>
        <div></div>
      </div>

      <div></div>

      <div>
        <Link href="/dashboard">
          Acceder
        </Link>
      </div>

      <div>
        <h1>
          Todos los derechos reservados: www.ejemplo.com
        </h1>
      </div>

      <div></div>
    </div>
  );
}
