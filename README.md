# knowledge-base

## Development Requirements

- NodeJs 20 (v20.9.0)
- MongoDB 7 (Can use docker)

## Setup

### Dependencies

- run `npm ci`

### Environment variables

- Create `.env` file (`cp .env.example .env`)

### MongoDB

- `cd docker && cp .db.env.example .db.env`
- `docker-compose up`

## Launch

- `npm run dev`
  or
- `npm  run build && npm start`
