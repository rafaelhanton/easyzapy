# easyzapy - Whaticket OPEN AI - Pro Version

Este repositório contém a versão da APIBRASIL do Whaticket, uma aplicação full-stack com backend Node.js/TypeScript e frontend React.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- **Docker** e **Docker Compose**: Para gerenciar os serviços de banco de dados (PostgreSQL) e cache (Redis).
- **Node.js** (versão 18 ou superior recomendada) e **npm** (ou Yarn): Para executar as aplicações backend e frontend.

## 2. Iniciar os Serviços de Banco de Dados e Cache (Docker Compose)

Navegue até o diretório raiz do projeto e inicie os contêineres do Redis e PostgreSQL usando Docker Compose.

```bash
docker compose up -d
```

## 3. Configuração e Execução do Backend

### Instalar Dependências

Navegue até o diretório `backend/` e instale as dependências do Node.js:

```bash
cd backend
npm install # ou yarn install
npm build # ou yarn install
```

### Executar Migrações e Seeds do Banco de Dados

Após a instalação das dependências, execute as migrações e os seeds para configurar o banco de dados. Certifique-se de que os serviços Docker (PostgreSQL) estejam rodando.

```bash
npm run db:migrate # ou yarn db:migrate
npm run db:seed # ou yarn db:seed
```

### Iniciar o Servidor Backend

Você pode iniciar o backend em modo de desenvolvimento (com recarregamento automático) ou em modo de produção (após a compilação).

- **Modo de Desenvolvimento (recomendado para trabalhar no código):**
  ```bash
  npm run dev:server # ou yarn dev:server
  ```
- **Modo de Produção (requer compilação prévia):**
  ```bash
  npm start # ou yarn start
  ```

O backend estará acessível em `http://localhost:8080` (ou a porta configurada no seu `backend/.env`).

## 4. Configuração e Execução do Frontend

### Instalar Dependências

Navegue até o diretório `frontend/` e instale as dependências do Node.js:

```bash
cd frontend/
npm install # ou yarn install
npm build # ou yarn install
```

### Iniciar o Servidor Frontend

Inicie o servidor de desenvolvimento do React:

```bash
npm start # ou yarn start
```

O frontend estará acessível em `http://localhost:3000` (ou a porta configurada no seu `frontend/.env`).

---

Após seguir todos esses passos, sua aplicação easyzapy deverá estar rodando completamente.
