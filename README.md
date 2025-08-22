# Desafio IOB – Conheça o País

Monorepo com:
- **iob-api**: Rails API (Devise + JWT), Postgres e seed com **Itália**
- **iob-web**: React + Vite + TypeScript, autenticação via JWT, páginas: Login, Lista e Detalhe do país

## Requisitos
- Docker + Docker Compose
- Node 18+ (para rodar o frontend em dev)

## Como subir o backend (API)
```bash
docker compose up -d db
docker compose run --rm api bash -lc "bin/rails db:prepare db:seed"
docker compose up -d api
# logs (opcional): docker compose logs -f api

