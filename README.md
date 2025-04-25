# Project

## command
```shell
npm run dev 
# http://localhost:3000
```

- Install lib
```shell
npm i lucide-react
npm i next-themes
```

## Create react project
```shell
npx create-next-app@latest nextjs-ts-ecommerce

```

### Create .gitignore
```
# Dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# Testing
/coverage

# Next.js
/.next/
/out/
/.swc/
next-env.d.ts

# Production
/build
/dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env*.local
.env
.env.development
.env.test
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# IDE specific files
/.idea
# VSCode (ignore all except for recommended extensions and settings)
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
*.sublime-*
*.code-workspace

# Cache
.eslintcache
.stylelintcache

# Optional: if using Storybook
/storybook-static

# Optional: for SASS
.sass-cache/

# PWA
**/public/sw.js
**/public/workbox-*.js
**/public/worker-*.js
**/public/fallback-*.js
**/public/sw.js.map
**/public/workbox-*.js.map
**/public/worker-*.js.map
**/public/fallback-*.js.map
```

### fix issue tailwind 3 to tailwind 4

- Change @apply to @reference for case error `Cannot apply unknown utility class`

```code
@layer base {
  body {
    @reference bg-background text-foreground;
  }
}

@layer base {
  * {
    @reference border-border;
  }
  body {
    @reference bg-background text-foreground;
  }
}
```

## Install https://ui.shadcn.com/

```shell
npx shadcn@latest init
```
- after run this command, you have to restart service now

- Test Add new Button
```shell
npx shadcn@latest add button
```

## Create Header & Footer Components

```shell

```

## Create Theme Mode Toggle

```shell
npx shadcn@latest add dropdown-menu
```

## Responsice Sheet Menu

```shell
npx shadcn@latest add sheet
```

## Create Product Card Component with shadcn

```shell
npx shadcn@latest add card
```

## Install Prisma

```shell
npm i -D prisma @prisma/client
```

- Initial schema file
```shell
npx prisma init
```

## Create Database with Prisma

- After config on `prisma/schema.prisma`, and then run command below

```shell
npx prisma generate

```

- Run this command for migrate database, and after run complete you will get database script `prisma/migrations/20250421140714_init/migration.sql` and auto create table on database

```shell
npx prisma migrate dev --name init
```

- Open prisma studio (http://localhost:5555)

```shell
npx prisma studio
```

## Seed Sample Data

```shell
npx tsx ./db/seed
```

## Zod Validation & Type Interface

```shell
npm i zod
```

## Servlerless Environment Config [SKIP this process]

```shell
npm i @neondatabase/serverless @prisma/adapter-neon ws
npm i @prisma/adapter-neon@6.5.0 @prisma/client@6.5.0 prisma@6.5.0
npm i -D @types/ws bufferutil
```

- modify code `prisma/schema.prisma`

```typescript
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
  previewFeatures = ["driverAdapters"]  // <== Add this line
}
```

- run prisma generate again after change

```shell
npx prisma generate

```

- Add new file `db/prisma.ts`

## Product Details Page

```shell
npx shadcn@latest add badge
```

## Product Images component

## Initial Deployment


## Docker file
docker-postgresql/docker-compose.yml

```Docker
version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: my_postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - postgres_network

volumes:
  postgres_data:

networks:
  postgres_network:


# docker compose -f docker-postgresql/docker-compose.yml up -d

```



