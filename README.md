# Desafio IOB – Conheça o País

Monorepo com:
- **iob-api**: Rails API (Devise + JWT), Postgres e seed com **Itália**
- **iob-web**: React + Vite + TypeScript, autenticação via JWT, páginas: Login, Lista e Detalhe do país

## Requisitos
- Docker + Docker Compose
- Node 18+ (para rodar o frontend em dev)

## Como subir o backend (API)
Na raiz do projeto onde tem o arquivo docker-compose
```bash
docker compose up -d db
docker compose run --rm api bash -lc "bin/rails db:prepare db:seed"
docker compose up -d api
# logs (opcional): docker compose logs -f api

## Como subir o front
cd iob-web
npm install
Crie um arquivo .env.local dentro de iob-web/
# iob-web/.env.local
VITE_API_URL=http://localhost:3000

npm run dev
