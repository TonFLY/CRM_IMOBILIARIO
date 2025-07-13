# 🏠 CRM Imobiliário - Sistema Completo
## Manual Técnico para Iniciantes (Até uma criança de 4 anos consegue! 👶)

---

## 🌟 **O QUE É ESTE SISTEMA?**

Imagine uma **caixinha mágica** que ajuda pessoas que vendem casas a organizarem tudo:
- 📝 Lista de clientes (pessoas que querem comprar/alugar)
- 🏠 Lista de casas/apartamentos para vender
- 📅 Visitas agendadas
- 💼 Negociações

É como ter um **assistente super inteligente** que nunca esquece nada!

---

## 🎨 **COMO FUNCIONA? (Para Criança de 4 anos)**

```
🖥️ COMPUTADOR
    ↓
📱 TELA BONITA (Frontend - React)
    ↓
🔌 PONTE MÁGICA (API)
    ↓
🧠 CÉREBRO (Backend - Python)
    ↓
📚 MEMÓRIA (Banco de Dados)
```

**Traduzindo:**
1. **Você clica** na tela bonita
2. **A ponte** leva sua mensagem para o cérebro
3. **O cérebro** pensa e busca na memória
4. **A resposta** volta para a tela bonita

---

## 📁 **ESTRUTURA DE PASTAS (Como está organizado)**

```
vmp_crm/                          ← Pasta principal (a casa)
├── 📄 README.md                   ← Este arquivo (manual de instruções)
├── 📂 backend/                    ← Cérebro do sistema (Python)
│   ├── 🧠 main.py                ← Arquivo principal (coração)
│   ├── 📊 crm.db                 ← Banco de dados (memória)
│   ├── 📂 models/                ← Definições das "coisas" 
│   │   ├── models.py             ← Como são: Cliente, Imóvel, etc.
│   │   └── database.py           ← Conexão com a memória
│   ├── 📂 routers/               ← Caminhos da API
│   │   ├── client.py             ← Tudo sobre clientes
│   │   ├── properties.py         ← Tudo sobre imóveis
│   │   ├── user.py               ← Tudo sobre usuários
│   │   ├── visit.py              ← Tudo sobre visitas
│   │   └── negotiation.py        ← Tudo sobre negociações
│   ├── 📂 schemas/               ← Regras de validação
│   │   └── schemas.py            ← O que pode/não pode
│   ├── 📂 auth/                  ← Sistema de login
│   │   └── auth.py               ← Verificação de senhas
│   └── 📄 requirements.txt       ← Lista de ferramentas necessárias
└── 📂 frontend/                  ← Tela bonita (React)
    ├── 📂 src/                   ← Código fonte
    │   ├── 🎨 styles.css         ← Cores e beleza
    │   ├── 📂 pages/             ← Páginas do site
    │   │   ├── DashboardPage.tsx ← Página inicial
    │   │   ├── ClientsPage.tsx   ← Lista de clientes
    │   │   ├── PropertiesPage.tsx← Lista de imóveis
    │   │   └── LoginPage.tsx     ← Página de login
    │   ├── 📂 components/        ← Peças reutilizáveis
    │   ├── 📂 services/          ← Comunicação com backend
    │   │   └── api.ts            ← Ponte mágica
    │   └── 📂 types/             ← Definições TypeScript
    │       └── index.ts          ← Tipos dos dados
    ├── 📄 package.json           ← Lista de ferramentas do frontend
    └── 📄 vite.config.ts         ← Configurações
```

---

## 🚀 **COMO INSTALAR E RODAR**

### 📋 **Pré-requisitos (O que você precisa ter)**

1. **Python 3.11+** → [Download aqui](https://python.org)
2. **Node.js 18+** → [Download aqui](https://nodejs.org)
3. **Git** → [Download aqui](https://git-scm.com)
4. **Editor de código** → VS Code [Download aqui](https://code.visualstudio.com)

### 🔧 **Instalação (Passo a passo como receita de bolo)**

#### 1️⃣ **Baixar o código**
```bash
# Abra o terminal e digite:
git clone https://github.com/TonFLY/CRM_IMOBILIARIO.git
cd vmp_crm
```

#### 2️⃣ **Configurar o Backend (Cérebro)**
```bash
# Entre na pasta do backend
cd backend

# Crie um ambiente virtual (casinha isolada para o Python)
python -m venv .venv

# Ative o ambiente (Windows)
.venv\Scripts\activate

# Ative o ambiente (Mac/Linux)
source .venv/bin/activate

# Instale as ferramentas necessárias
pip install -r requirements.txt

# Crie o banco de dados
python init_db.py

# Crie um usuário teste
python create_test_user.py

# Execute o backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 3️⃣ **Configurar o Frontend (Tela Bonita)**
```bash
# Abra OUTRO terminal e entre na pasta frontend
cd frontend

# Instale as ferramentas necessárias
npm install

# Execute o frontend
npm run dev
```

#### 4️⃣ **Testar se funcionou**
- Abra o navegador em: `http://localhost:5173`
- Login: `admin` / Senha: `admin`
- 🎉 **Pronto! Sistema funcionando!**

---

## 🎯 **FUNCIONALIDADES PRINCIPAIS**

### 👥 **Gestão de Clientes**
- ✅ **Cadastrar** novos clientes
- ✅ **Editar** dados dos clientes
- ✅ **Visualizar** detalhes completos
- ✅ **Filtrar** por status (Lead, Ativo, Inativo)
- ✅ **Buscar** por nome, email ou telefone
- ✅ **Categorizar** por tipo de interesse

### 🏠 **Gestão de Imóveis**
- ✅ **Cadastrar** propriedades
- ✅ **Editar** informações
- ✅ **Visualizar** detalhes
- ✅ **Filtrar** por tipo, status, localização
- ✅ **Buscar** por características
- ✅ **Acompanhar** valores

### 📅 **Agenda de Visitas**
- 🔄 **Em desenvolvimento**

### 💼 **Funil de Vendas**
- 🔄 **Em desenvolvimento**

---

## 🎨 **TECNOLOGIAS USADAS (E por que)**

### 🎭 **Frontend (Tela Bonita)**
- **React 18** → Framework moderno para criar interfaces
- **TypeScript** → JavaScript com tipos (evita erros)
- **Vite** → Ferramenta super rápida para desenvolvimento
- **React Router** → Navegação entre páginas
- **Axios** → Comunicação com o backend

### 🧠 **Backend (Cérebro)**
- **FastAPI** → Framework Python super rápido
- **SQLModel** → ORM moderno para banco de dados
- **SQLite** → Banco de dados simples (arquivo único)
- **JWT** → Sistema de autenticação seguro
- **Uvicorn** → Servidor web de alta performance

---

## 🔧 **COMO MODIFICAR O SISTEMA**

### 🎨 **Mudando Cores e Aparência**

**Arquivo:** `frontend/src/styles.css`

```css
/* Cores principais */
:root {
  --cor-primaria: #3182ce;    /* Azul principal */
  --cor-secundaria: #38a169;  /* Verde */
  --cor-perigo: #e53e3e;      /* Vermelho */
  --cor-aviso: #dd6b20;       /* Laranja */
}

/* Para mudar a cor dos botões principais */
.btn-primary {
  background-color: var(--cor-primaria);
  color: white;
}
```

### 📝 **Adicionando um novo campo ao Cliente**

#### 1️⃣ **No Backend:**

**Arquivo:** `backend/models/models.py`
```python
class Client(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    phone: str
    email: str
    interest_type: str
    status: str = Field(default="Lead")
    preferences: Optional[str] = None
    novo_campo: Optional[str] = None  # ← ADICIONE AQUI
```

**Arquivo:** `backend/schemas/schemas.py`
```python
class ClientCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    interest_type: str
    status: str = "Lead"
    preferences: Optional[str] = None
    novo_campo: Optional[str] = None  # ← ADICIONE AQUI

class ClientRead(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr
    interest_type: str
    status: str
    preferences: Optional[str]
    novo_campo: Optional[str]  # ← ADICIONE AQUI
```

#### 2️⃣ **No Frontend:**

**Arquivo:** `frontend/src/types/index.ts`
```typescript
export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest_type: string;
  status: string;
  preferences?: string;
  novo_campo?: string;  // ← ADICIONE AQUI
}
```

**Arquivo:** `frontend/src/pages/ClientFormPage.tsx`
```tsx
// Adicione no formulário:
<div className="form-group">
  <label className="form-label">Novo Campo:</label>
  <input
    type="text"
    value={formData.novo_campo || ''}
    onChange={(e) => setFormData({...formData, novo_campo: e.target.value})}
    className="form-input"
  />
</div>
```

#### 3️⃣ **Migração do Banco:**
```python
# Crie um arquivo: backend/migrate_novo_campo.py
import sqlite3

conn = sqlite3.connect('crm.db')
cursor = conn.cursor()

try:
    cursor.execute('ALTER TABLE client ADD COLUMN novo_campo TEXT')
    print('Campo adicionado com sucesso!')
except Exception as e:
    print(f'Erro: {e}')

conn.commit()
conn.close()
```

### 🆕 **Criando uma Nova Página**

#### 1️⃣ **Crie o arquivo:**
**Arquivo:** `frontend/src/pages/MinhaNovaPage.tsx`
```tsx
import { useState } from 'react';

export const MinhaNovaPage = () => {
  const [dados, setDados] = useState('');

  return (
    <div className="container">
      <h1>Minha Nova Página</h1>
      <p>Conteúdo da página aqui!</p>
    </div>
  );
};
```

#### 2️⃣ **Adicione a rota:**
**Arquivo:** `frontend/src/App.tsx`
```tsx
import { MinhaNovaPage } from './pages/MinhaNovaPage';

// Dentro do <Routes>:
<Route 
  path="/minha-nova-pagina" 
  element={
    <ProtectedRoute>
      <MinhaNovaPage />
    </ProtectedRoute>
  } 
/>
```

#### 3️⃣ **Adicione ao menu:**
**Arquivo:** `frontend/src/pages/DashboardPage.tsx`
```tsx
<button 
  className="btn btn-primary"
  onClick={() => navigate('/minha-nova-pagina')}
>
  Ir para Minha Nova Página
</button>
```

---

## 🐛 **PROBLEMAS COMUNS E SOLUÇÕES**

### ❌ **"Module not found"**
**Problema:** Falta instalar dependências
**Solução:**
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### ❌ **"Port already in use"**
**Problema:** Porta já está sendo usada
**Solução:**
```bash
# Matar processo na porta 8000
npx kill-port 8000

# Matar processo na porta 5173
npx kill-port 5173
```

### ❌ **"Database not found"**
**Problema:** Banco de dados não foi criado
**Solução:**
```bash
cd backend
python init_db.py
```

### ❌ **"Login not working"**
**Problema:** Usuário não existe
**Solução:**
```bash
cd backend
python create_test_user.py
```

### ❌ **"CORS Error"**
**Problema:** Frontend não consegue falar com backend
**Solução:** Verificar se ambos estão rodando:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

---

## 🔐 **SISTEMA DE SEGURANÇA**

### 🔑 **Como funciona o Login:**
1. **Usuário** digita login/senha
2. **Backend** verifica se está correto
3. **Se correto:** Gera um "token" (chave mágica)
4. **Frontend** guarda essa chave
5. **Toda requisição** usa essa chave para provar identidade

### 🛡️ **Arquivo de configuração:**
**Arquivo:** `backend/auth/auth.py`
```python
SECRET_KEY = "sua-chave-super-secreta"  # ← MUDE ISSO EM PRODUÇÃO!
```

---

## 📚 **BANCO DE DADOS**

### 🗃️ **Estrutura das Tabelas:**

#### **Tabela: user**
```sql
id          → Número único do usuário
username    → Nome de login
email       → Email do usuário
hashed_password → Senha criptografada
is_active   → Se está ativo (true/false)
```

#### **Tabela: client**
```sql
id              → Número único do cliente
name            → Nome completo
phone           → Telefone
email           → Email
interest_type   → Tipo de interesse (Compra/Aluguel/Venda/Investimento)
status          → Status (Lead/Prospect/Cliente Ativo/Cliente Inativo)
preferences     → Observações e preferências
```

#### **Tabela: property**
```sql
id          → Número único do imóvel
type        → Tipo (Casa/Apartamento/Terreno)
location    → Localização
value       → Valor
description → Descrição
status      → Status (Disponível/Vendido/Alugado)
```

### 💾 **Como fazer backup:**
```bash
# O banco é um arquivo único: backend/crm.db
# Para backup, simplesmente copie este arquivo!
cp backend/crm.db backup_$(date +%Y%m%d).db
```

### 🔧 **Como visualizar os dados:**
Use um programa como:
- **DB Browser for SQLite** → [Download](https://sqlitebrowser.org/)
- **DBeaver** → [Download](https://dbeaver.io/)

---

## 🚀 **COMO COLOCAR EM PRODUÇÃO**

### 🌐 **Backend (Servidor)**

#### **Opção 1: Railway/Render/Heroku**
1. Crie conta no serviço
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente:
   ```
   DATABASE_URL=sua-url-do-banco
   SECRET_KEY=sua-chave-secreta
   ```

#### **Opção 2: VPS (Servidor próprio)**
```bash
# No servidor
git clone seu-repositorio
cd backend
pip install -r requirements.txt
pip install gunicorn

# Execute em produção
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 🎨 **Frontend**

#### **Opção 1: Vercel/Netlify**
1. Conecte seu repositório
2. Configure pasta de build: `frontend`
3. Deploy automático!

#### **Opção 2: Servidor próprio**
```bash
cd frontend
npm run build
# Copie pasta 'dist' para seu servidor web
```

---

## 📊 **MONITORAMENTO E LOGS**

### 📈 **Como ver o que está acontecendo:**

#### **Backend Logs:**
```bash
# No terminal onde o backend roda, você verá:
INFO:     127.0.0.1:54321 - "GET /clients/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:54321 - "POST /clients/ HTTP/1.1" 200 OK
```

#### **Frontend Logs:**
```bash
# Abra F12 no navegador > Console
# Erros aparecerão em vermelho
# Logs em azul/preto
```

#### **Banco de Dados:**
```python
# Adicione logs personalizados em qualquer arquivo:
import logging
logging.info("Cliente criado com sucesso!")
logging.error("Erro ao criar cliente!")
```

---

## 🔧 **FERRAMENTAS ÚTEIS**

### 🛠️ **Para Desenvolvimento:**
- **Thunder Client** (VS Code) → Testar API
- **SQLite Viewer** (VS Code) → Ver banco de dados
- **Auto Rename Tag** (VS Code) → Renomear tags HTML
- **Prettier** (VS Code) → Formatar código
- **ES7+ React** (VS Code) → Snippets React

### 📱 **Para Teste:**
- **Postman** → Testar API
- **Insomnia** → Alternativa ao Postman

### 🎨 **Para Design:**
- **Figma** → Criar designs
- **ColorZilla** → Pegar cores de sites

---

## 📖 **DICIONÁRIO TÉCNICO (Para iniciantes)**

| Termo | O que significa | Exemplo |
|-------|----------------|---------|
| **API** | Interface que permite programas conversarem | WhatsApp conversa com servidor |
| **Frontend** | Parte visual do sistema | Tela do Instagram |
| **Backend** | Parte que processa dados | Cérebro do Instagram |
| **Banco de Dados** | Local onde dados ficam guardados | Agenda do telefone |
| **Token** | Chave de acesso temporária | Pulseira de festa |
| **CORS** | Regra de segurança entre sites | Porteiro do prédio |
| **JSON** | Formato de dados | Receita de bolo estruturada |
| **HTTP** | Protocolo de comunicação web | Linguagem da internet |
| **CRUD** | Create, Read, Update, Delete | Criar, Ver, Editar, Apagar |
| **ORM** | Tradutor entre código e banco | Google Tradutor |

---

## 🤝 **COMO CONTRIBUIR**

### 📝 **Reportando Bugs:**
1. Vá em **Issues** no GitHub
2. Clique **New Issue**
3. Descreva:
   - O que você estava fazendo
   - O que aconteceu
   - O que deveria acontecer
   - Screenshots se possível

### 💡 **Sugerindo Melhorias:**
1. Abra uma **Issue** com label "enhancement"
2. Explique sua ideia
3. Por que seria útil
4. Como poderia funcionar

### 🔧 **Fazendo Mudanças:**
1. **Fork** o repositório
2. Crie uma **branch**: `git checkout -b minha-feature`
3. Faça as mudanças
4. **Commit**: `git commit -m "Adiciona nova feature"`
5. **Push**: `git push origin minha-feature`
6. Abra um **Pull Request**

---

## 📞 **SUPORTE E CONTATO**

### 🆘 **Precisa de Ajuda?**
- 📧 **Email:** suporte@vmpcrm.com
- 💬 **Discord:** [Link do servidor]
- 📱 **WhatsApp:** (11) 99999-9999
- 🐙 **GitHub Issues:** Para bugs e sugestões

### 📚 **Documentação Adicional:**
- [API Documentation](http://localhost:8000/docs) - Swagger UI
- [Component Library](docs/components.md) - Guia de componentes
- [Database Schema](docs/database.md) - Estrutura do banco

---

## 📅 **ROADMAP (Futuras Funcionalidades)**

### 🎯 **Em Desenvolvimento:**
- [ ] 📅 Sistema completo de visitas
- [ ] 💼 Funil de vendas visual
- [ ] 📊 Dashboard com gráficos
- [ ] 📱 App mobile

### 🚀 **Próximas Versões:**
- [ ] 🔔 Sistema de notificações
- [ ] 📧 Templates de email
- [ ] 📄 Geração de contratos
- [ ] 💰 Controle financeiro
- [ ] 🗺️ Integração com mapas
- [ ] 📈 Relatórios avançados

### 🌟 **Ideias Futuras:**
- [ ] 🤖 Chatbot para leads
- [ ] 📞 Integração com telefonia
- [ ] 🏠 Tour virtual 360°
- [ ] 🎨 Criador de sites
- [ ] 📱 App para clientes

---

## 🎉 **CONCLUSÃO**

Parabéns! 🎊 Você agora tem um **manual completo** do sistema CRM Imobiliário.

### 🚀 **Próximos Passos:**
1. ✅ Instale o sistema
2. ✅ Teste todas as funcionalidades
3. ✅ Personalize conforme sua necessidade
4. ✅ Coloque em produção
5. ✅ Monitore e melhore continuamente

### 💝 **Lembre-se:**
- **Este sistema foi feito com ❤️**
- **Não tenha medo de experimentar**
- **Cada erro é uma oportunidade de aprender**
- **A comunidade está aqui para ajudar**

---

## 📜 **LICENÇA**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

**Isso significa que você pode:**
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Usar privadamente

**Com a condição de:**
- 📝 Incluir a licença original
- 📝 Incluir o copyright

---

## 👨‍💻 **AUTORES**

- **Desenvolvedor Principal:** [Seu Nome](https://github.com/seu-usuario)
- **Contributors:** [Lista de colaboradores](https://github.com/seu-usuario/vmp_crm/contributors)

---

## 🙏 **AGRADECIMENTOS**

- Obrigado a todos que contribuíram
- Obrigado à comunidade open source
- Obrigado por usar nosso sistema!

---

**📌 Última atualização:** Julho 2025
**📌 Versão do documento:** v1.0
**📌 Versão do sistema:** v1.0.0

---

<div align="center">

### 🌟 **Se este manual te ajudou, dê uma ⭐ no GitHub!** 🌟

</div>
3. [Backend (API) - Explicação Detalhada](#backend-api---explicação-detalhada)
4. [Frontend (Interface) - Explicação Detalhada](#frontend-interface---explicação-detalhada)
5. [Como Rodar o Sistema](#como-rodar-o-sistema)
6. [Como Modificar e Adicionar Funcionalidades](#como-modificar-e-adicionar-funcionalidades)
7. [Estrutura de Arquivos Explicada](#estrutura-de-arquivos-explicada)
8. [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)
9. [Como Fazer Deploy (Colocar Online)](#como-fazer-deploy-colocar-online)

---

## 🤔 O que é este Sistema?

### Para que serve?
Este é um **CRM (Customer Relationship Management)** específico para **corretores de imóveis**. É como um "caderninho digital" que ajuda corretores a:

- 📝 **Cadastrar imóveis** (casas, apartamentos, terrenos)
- 👥 **Gerenciar clientes** (pessoas interessadas em comprar/alugar)
- 📅 **Agendar visitas** aos imóveis
- 💰 **Acompanhar negociações** (do primeiro contato até o fechamento)
- 📊 **Ver estatísticas** do negócio

### Como funciona?
O sistema tem **duas partes principais**:

1. **Backend (API)** - O "cérebro" que processa dados e guarda informações
2. **Frontend (Interface)** - A "cara bonita" que o usuário vê e usa

**Analogia simples**: Imagine um restaurante:
- **Backend** = Cozinha (onde prepara a comida, ninguém vê)
- **Frontend** = Salão (onde o cliente come, parte visível)
- **API** = Garçom (leva pedidos do salão para cozinha e traz comida pronta)

---

## 🏗️ Arquitetura Geral

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│                 │   ←──────────→   │                 │
│   FRONTEND      │                  │    BACKEND      │
│   (React)       │   Requisições    │   (FastAPI)     │
│   Porta: 5173   │      API         │   Porta: 8000   │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌─────────────────┐                  ┌─────────────────┐
│   NAVEGADOR     │                  │  BANCO DE DADOS │
│   (Chrome,      │                  │   (SQLite)      │
│   Firefox, etc) │                  │                 │
└─────────────────┘                  └─────────────────┘
```

### Como eles se comunicam?
1. **Usuário** clica em algo no **Frontend**
2. **Frontend** envia uma **requisição HTTP** para o **Backend**
3. **Backend** processa, consulta o **banco de dados** se necessário
4. **Backend** retorna uma **resposta** para o **Frontend**
5. **Frontend** mostra o resultado para o **usuário**

---

## 🔧 Backend (API) - Explicação Detalhada

### O que é?
O Backend é a parte "invisível" do sistema que:
- Recebe pedidos do Frontend
- Processa informações
- Salva/busca dados no banco
- Retorna respostas

### Tecnologias Usadas

#### 🐍 Python
**O que é**: Linguagem de programação fácil de entender
**Por que usamos**: É simples, poderosa e tem muitas bibliotecas prontas

#### ⚡ FastAPI
**O que é**: Framework (conjunto de ferramentas) para criar APIs
**Por que usamos**: 
- Muito rápido
- Documentação automática
- Validação automática de dados
- Fácil de usar

#### 🗄️ SQLModel
**O que é**: Biblioteca para trabalhar com banco de dados
**Por que usamos**: 
- Permite escrever Python em vez de SQL puro
- Validação automática
- Fácil de manter

#### 🔐 JWT (JSON Web Tokens)
**O que é**: Sistema de autenticação (login)
**Como funciona**: 
1. Usuário faz login com usuário/senha
2. Sistema gera um "token" (como uma pulseirinha de evento)
3. A cada requisição, o token é enviado
4. Sistema verifica se o token é válido

### Estrutura de Pastas do Backend

```
backend/
├── auth/                    # 🔐 Tudo relacionado à segurança
│   ├── __init__.py         # Arquivo que transforma pasta em módulo Python
│   └── auth.py             # Funções de login, senha, tokens
│
├── models/                  # 🗄️ Definições do banco de dados
│   ├── __init__.py
│   ├── database.py         # Configuração do banco
│   └── models.py           # Tabelas (User, Property, Client, etc)
│
├── routers/                 # 🛣️ Rotas da API (endpoints)
│   ├── __init__.py
│   ├── user.py             # /users/login, /users/register
│   ├── properties.py       # /properties/ (CRUD de imóveis)
│   ├── client.py           # /clients/ (CRUD de clientes)
│   ├── visit.py            # /visits/ (CRUD de visitas)
│   └── negotiation.py      # /negotiations/ (CRUD de negociações)
│
├── schemas/                 # 📝 Validação de dados
│   ├── __init__.py
│   └── schemas.py          # Define como dados devem ser estruturados
│
├── services/                # 🔧 Lógica de negócio
│   └── __init__.py         # (vazio por enquanto, para futuras funcionalidades)
│
├── main.py                  # 🚀 Arquivo principal que inicia a API
├── requirements.txt         # 📋 Lista de bibliotecas necessárias
├── .env                     # 🔧 Configurações (senhas, URLs)
├── init_db.py              # 🗄️ Script para criar banco
└── create_test_user.py     # 👤 Script para criar usuário de teste
```

### Arquivos Principais Explicados

#### 📄 `main.py` - O Coração da API
```python
from fastapi import FastAPI                    # Importa o FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Permite frontend acessar
from routers import user, properties, client, visit, negotiation  # Importa rotas

app = FastAPI(title="CRM Imobiliário SaaS")   # Cria a aplicação

# CORS - Permite que frontend (porta 5173) acesse backend (porta 8000)
origins = ["http://localhost:5173", "http://localhost:5174", ...]
app.add_middleware(CORSMiddleware, allow_origins=origins, ...)

# Registra todas as rotas
app.include_router(user.router)        # /users/...
app.include_router(properties.router)  # /properties/...
# ... outros routers
```

**O que acontece aqui**:
1. Importa todas as ferramentas necessárias
2. Cria a aplicação FastAPI
3. Configura CORS (permite frontend conversar com backend)
4. Registra todas as rotas (endpoints)

#### 📄 `models/models.py` - Definição das Tabelas
```python
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):           # Tabela de usuários
    id: Optional[int] = Field(primary_key=True)  # ID único
    username: str = Field(unique=True)           # Nome de usuário único
    email: str = Field(unique=True)              # Email único
    hashed_password: str                         # Senha criptografada
    is_active: bool = Field(default=True)        # Usuário ativo?

class Property(SQLModel, table=True):       # Tabela de imóveis
    id: Optional[int] = Field(primary_key=True)
    type: str                               # "Casa", "Apartamento", "Terreno"
    location: str                           # "Centro, São Paulo"
    value: float                            # 250000.00
    description: Optional[str] = None       # Descrição opcional
    status: str                             # "Disponível", "Vendido", "Alugado"
```

**O que cada classe representa**:
- **User**: Cada corretor que usa o sistema
- **Property**: Cada imóvel cadastrado
- **Client**: Cada cliente interessado
- **Visit**: Cada visita agendada
- **Negotiation**: Cada negociação em andamento

#### 📄 `auth/auth.py` - Sistema de Segurança
```python
from passlib.context import CryptContext     # Para criptografar senhas
from jose import jwt                         # Para criar tokens JWT

# Configuração para criptografar senhas
pwd_context = CryptContext(schemes=["bcrypt"])

def get_password_hash(password):
    """Transforma 'minha123' em '$2b$12$xyz...' (hash)"""
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """Verifica se senha digitada confere com hash salvo"""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    """Cria token JWT que expira em 30 minutos"""
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
```

**Como funciona a segurança**:
1. **Cadastro**: Senha é criptografada antes de salvar
2. **Login**: Compara senha digitada com hash salvo
3. **Token**: Se login correto, gera token JWT
4. **Acesso**: Token é verificado em cada requisição protegida

#### 📄 `routers/user.py` - Rotas de Usuário
```python
@router.post("/register")
def register(user: UserCreate, session: Session = Depends(get_session)):
    """Endpoint para cadastrar novo usuário"""
    # 1. Verifica se username já existe
    # 2. Criptografa a senha
    # 3. Salva no banco
    # 4. Retorna dados do usuário (sem senha)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    """Endpoint para fazer login"""
    # 1. Busca usuário no banco pelo username
    # 2. Verifica se senha está correta
    # 3. Gera token JWT
    # 4. Retorna token
```

### Como o Backend Processa uma Requisição

**Exemplo: Usuário faz login**

1. **Frontend envia**: `POST /users/login` com `{"username": "admin", "password": "123456"}`

2. **FastAPI recebe** e direciona para função `login()` em `routers/user.py`

3. **Função login()**:
   ```python
   # 1. Busca usuário no banco
   user = session.exec(select(User).where(User.username == "admin")).first()
   
   # 2. Verifica senha
   if verify_password("123456", user.hashed_password):
       # 3. Gera token
       token = create_access_token(data={"sub": "admin"})
       # 4. Retorna token
       return {"access_token": token, "token_type": "bearer"}
   ```

4. **FastAPI retorna**: `{"access_token": "eyJ0eXAi...", "token_type": "bearer"}`

5. **Frontend recebe** o token e salva no localStorage

---

## 💻 Frontend (Interface) - Explicação Detalhada

### O que é?
O Frontend é a parte **visível** do sistema que o usuário vê e interage.

### Tecnologias Usadas

#### ⚛️ React
**O que é**: Biblioteca JavaScript para criar interfaces
**Como funciona**: 
- Divide a tela em "componentes" (peças reutilizáveis)
- Cada componente tem seu próprio estado e lógica
- Quando algo muda, React atualiza apenas o necessário

#### 🚀 Vite
**O que é**: Ferramenta para desenvolvimento e build
**Por que usamos**: Muito mais rápido que webpack

#### 📘 TypeScript
**O que é**: JavaScript com tipagem
**Vantagem**: Catch erros antes de rodar o código

#### 🔄 Axios
**O que é**: Biblioteca para fazer requisições HTTP
**Como funciona**: Envia pedidos para a API e recebe respostas

### Estrutura de Pastas do Frontend

```
frontend/src/
├── components/              # 🧩 Componentes reutilizáveis
│   └── AuthProvider.tsx    # Gerencia estado de autenticação
│
├── hooks/                   # 🔗 Custom hooks do React
│   └── useAuthContext.ts   # Hook para acessar dados de autenticação
│
├── pages/                   # 📄 Páginas da aplicação
│   ├── LoginPage.tsx       # Página de login
│   └── DashboardPage.tsx   # Página principal (dashboard)
│
├── services/                # 🌐 Comunicação com API
│   └── api.ts              # Configuração do Axios
│
├── types/                   # 📝 Definições TypeScript
│   └── index.ts            # Interfaces (User, Property, etc)
│
├── App.tsx                  # 🏠 Componente principal
├── main.tsx                # 🚀 Ponto de entrada da aplicação
└── styles.css              # 🎨 Estilos globais
```

### Arquivos Principais Explicados

#### 📄 `main.tsx` - Ponto de Entrada
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Para navegação
import App from './App.tsx'
import './styles.css'

// Pega elemento com id="root" do HTML e renderiza a aplicação React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>        {/* Habilita roteamento (URLs diferentes) */}
      <App />              {/* Componente principal */}
    </BrowserRouter>
  </StrictMode>,
)
```

#### 📄 `App.tsx` - Roteamento Principal
```tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { useAuth } from './hooks/useAuthContext';

// Componente que protege rotas (só acessa se logado)
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>           {/* Disponibiliza dados de auth para toda app */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>    {/* Só acessa se logado */}
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AuthProvider>
  );
}
```

**Como funciona o roteamento**:
- `/login` → Mostra página de login
- `/dashboard` → Mostra dashboard (só se logado)
- `/` → Redireciona para `/dashboard`

#### 📄 `services/api.ts` - Comunicação com Backend
```tsx
import axios from 'axios';

// Configura Axios para sempre usar a base URL da API
const api = axios.create({
  baseURL: 'http://localhost:8000',    // URL do backend
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: Adiciona token JWT automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Adiciona: "Authorization: Bearer eyJ0eXAi..."
  }
  return config;
});

// Interceptor: Se token expirou (401), redireciona para login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**O que são interceptors**:
- **Request**: Executado ANTES de enviar requisição
- **Response**: Executado DEPOIS de receber resposta
- Útil para tarefas automáticas (adicionar token, tratar erros)

#### 📄 `hooks/useAuthContext.ts` - Hook de Autenticação
```tsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**O que é um Hook**:
- Função especial do React que permite "usar" funcionalidades
- `useAuth()` retorna: `{ user, token, login, logout, loading }`
- Qualquer componente pode chamar `const { user } = useAuth()`

#### 📄 `pages/LoginPage.tsx` - Página de Login
```tsx
export const LoginPage = () => {
  const [username, setUsername] = useState('');      // Estado do campo usuário
  const [password, setPassword] = useState('');      // Estado do campo senha
  const [loading, setLoading] = useState(false);     // Estado de carregamento
  const { login } = useAuth();                       // Função de login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();                              // Impede reload da página
    setLoading(true);                               // Mostra loading
    
    try {
      await login({ username, password });          // Chama API de login
      navigate('/dashboard');                       // Redireciona se sucesso
    } catch (error) {
      setError('Falha no login');                   // Mostra erro
    } finally {
      setLoading(false);                            // Para loading
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};
```

### Fluxo de Uma Ação no Frontend

**Exemplo: Usuário faz login**

1. **Usuário digita** username e password
2. **Estados são atualizados**: `setUsername('admin')`, `setPassword('123456')`
3. **Usuário clica** no botão "Entrar"
4. **handleSubmit** é executado:
   ```tsx
   // 1. Impede reload da página
   e.preventDefault();
   
   // 2. Ativa loading
   setLoading(true);
   
   // 3. Chama função login
   await login({ username: 'admin', password: '123456' });
   ```
5. **Função login** (no AuthProvider):
   ```tsx
   // 1. Cria FormData
   const formData = new FormData();
   formData.append('username', 'admin');
   formData.append('password', '123456');
   
   // 2. Envia para API
   const response = await api.post('/users/login', formData);
   
   // 3. Salva token
   localStorage.setItem('token', response.data.access_token);
   ```
6. **Se sucesso**: Redireciona para dashboard
7. **Se erro**: Mostra mensagem de erro

---

## 🚀 Como Rodar o Sistema

### Pré-requisitos
Instale no seu computador:
- **Python 3.11+** (https://python.org)
- **Node.js 18+** (https://nodejs.org)
- **Git** (https://git-scm.com)
- **VS Code** (recomendado) (https://code.visualstudio.com)

### Passo a Passo Completo

#### 1️⃣ Clone o Repositório
```bash
git clone <url-do-repositorio>
cd vmp_crm
```

#### 2️⃣ Configure o Backend
```bash
# Entre na pasta do backend
cd backend

# Crie ambiente virtual Python (isola dependências)
python -m venv .venv

# Ative o ambiente virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instale dependências Python
pip install -r requirements.txt

# Crie as tabelas do banco
python init_db.py

# Crie usuário de teste
python create_test_user.py

# Inicie a API
python -m uvicorn main:app --reload
```

**O que cada comando faz**:
- `python -m venv .venv`: Cria pasta `.venv` com Python isolado
- `.venv\Scripts\activate`: "Liga" o ambiente virtual
- `pip install -r requirements.txt`: Instala FastAPI, SQLModel, etc
- `python init_db.py`: Cria arquivo `crm.db` com tabelas
- `python create_test_user.py`: Adiciona usuário "admin" com senha "123456"
- `uvicorn main:app --reload`: Inicia servidor na porta 8000

#### 3️⃣ Configure o Frontend
```bash
# Abra novo terminal e entre na pasta frontend
cd frontend

# Instale dependências Node.js
npm install

# Inicie servidor de desenvolvimento
npm run dev
```

**O que cada comando faz**:
- `npm install`: Lê `package.json` e instala React, Vite, Axios, etc
- `npm run dev`: Inicia servidor Vite na porta 5173

#### 4️⃣ Teste o Sistema
1. Abra navegador em `http://localhost:5173`
2. Use credenciais: `admin` / `123456`
3. Deve redirecionar para dashboard

### Comandos Úteis

#### Backend
```bash
# Ver documentação da API
# http://localhost:8000/docs

# Parar servidor
# Ctrl + C

# Recriar banco (APAGA TODOS OS DADOS!)
python init_db.py

# Ver logs detalhados
python -m uvicorn main:app --reload --log-level debug
```

#### Frontend
```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Verificar erros de lint
npm run lint
```

---

## 🔧 Como Modificar e Adicionar Funcionalidades

### Cenário 1: Adicionar Novo Campo a Imóvel

**Objetivo**: Adicionar campo "quartos" aos imóveis

#### 1️⃣ Modifique o Modelo (Backend)
```python
# backend/models/models.py
class Property(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    type: str
    location: str
    value: float
    description: Optional[str] = None
    status: str
    quartos: int = Field(default=1)  # ← NOVO CAMPO
```

#### 2️⃣ Atualize os Schemas (Backend)
```python
# backend/schemas/schemas.py
class PropertyCreate(BaseModel):
    type: str
    location: str
    value: float
    description: Optional[str] = None
    status: str
    quartos: int  # ← NOVO CAMPO

class PropertyRead(BaseModel):
    id: int
    type: str
    location: str
    value: float
    description: Optional[str]
    status: str
    quartos: int  # ← NOVO CAMPO
```

#### 3️⃣ Atualize os Types (Frontend)
```typescript
// frontend/src/types/index.ts
export interface Property {
  id: number;
  type: string;
  location: string;
  value: number;
  description?: string;
  status: string;
  quartos: number;  // ← NOVO CAMPO
}

export interface PropertyCreate {
  type: string;
  location: string;
  value: number;
  description?: string;
  status: string;
  quartos: number;  // ← NOVO CAMPO
}
```

#### 4️⃣ Recrie o Banco
```bash
# ⚠️ CUIDADO: Isso apaga todos os dados!
cd backend
python init_db.py
python create_test_user.py
```

### Cenário 2: Criar Nova Página

**Objetivo**: Criar página para listar imóveis

#### 1️⃣ Crie o Componente
```tsx
// frontend/src/pages/PropertiesPage.tsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import type { Property } from '../types';

export const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties/');
        setProperties(response.data);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container">
      <h1>Imóveis</h1>
      <div className="properties-grid">
        {properties.map(property => (
          <div key={property.id} className="card">
            <h3>{property.type}</h3>
            <p>{property.location}</p>
            <p>R$ {property.value.toLocaleString()}</p>
            <p>{property.quartos} quartos</p>
            <span className={`status ${property.status}`}>
              {property.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### 2️⃣ Adicione a Rota
```tsx
// frontend/src/App.tsx
import { PropertiesPage } from './pages/PropertiesPage';

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/properties" 
        element={<ProtectedRoute><PropertiesPage /></ProtectedRoute>} 
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
```

#### 3️⃣ Adicione CSS
```css
/* frontend/src/styles.css */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status.Disponível {
  background-color: #c6f6d5;
  color: #22543d;
}

.status.Vendido {
  background-color: #fed7d7;
  color: #c53030;
}
```

### Cenário 3: Adicionar Nova API Endpoint

**Objetivo**: Criar endpoint para buscar imóveis por tipo

#### 1️⃣ Adicione a Rota (Backend)
```python
# backend/routers/properties.py
@router.get("/by-type/{property_type}", response_model=list[PropertyRead])
def get_properties_by_type(
    property_type: str,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    """Busca imóveis por tipo (Casa, Apartamento, etc)"""
    properties = session.exec(
        select(Property).where(Property.type == property_type)
    ).all()
    return properties
```

#### 2️⃣ Use no Frontend
```tsx
// frontend/src/pages/PropertiesPage.tsx
const fetchPropertiesByType = async (type: string) => {
  try {
    const response = await api.get(`/properties/by-type/${type}`);
    setProperties(response.data);
  } catch (error) {
    console.error('Erro ao buscar imóveis por tipo:', error);
  }
};

// Adicione botões de filtro
<div className="filters">
  <button onClick={() => fetchPropertiesByType('Casa')}>
    Casas
  </button>
  <button onClick={() => fetchPropertiesByType('Apartamento')}>
    Apartamentos
  </button>
</div>
```

---

## 📁 Estrutura de Arquivos Explicada

### Por que esta organização?

#### Backend
```
backend/
├── auth/           # Segurança isolada (fácil de manter/atualizar)
├── models/         # Banco de dados centralizado
├── routers/        # Cada "grupo" de endpoints em arquivo separado
├── schemas/        # Validação centralizada
└── services/       # Lógica de negócio (para não "inchar" os routers)
```

**Princípios**:
- **Separação de responsabilidades**: Cada pasta tem uma função específica
- **Modularidade**: Fácil de encontrar e modificar código
- **Escalabilidade**: Fácil adicionar novos módulos

#### Frontend
```
frontend/src/
├── components/     # Peças reutilizáveis (botões, formulários, etc)
├── hooks/          # Lógica compartilhada
├── pages/          # Telas da aplicação
├── services/       # Comunicação externa (API)
└── types/          # Contratos de dados (TypeScript)
```

**Princípios**:
- **Componentes reutilizáveis**: Um botão criado, usado em várias telas
- **Hooks customizados**: Lógica complexa isolada e reutilizável
- **Tipagem forte**: TypeScript previne erros

### Convenções de Nomenclatura

#### Arquivos
- **PascalCase** para componentes: `LoginPage.tsx`, `AuthProvider.tsx`
- **camelCase** para utilitários: `useAuth.ts`, `api.ts`
- **kebab-case** para CSS: `login-container`, `btn-primary`

#### Variáveis/Funções
```python
# Python (snake_case)
def get_current_user():
    user_data = get_user_from_token()
    return user_data
```

```typescript
// TypeScript (camelCase)
const getCurrentUser = () => {
  const userData = getUserFromToken();
  return userData;
};
```

#### Constantes
```python
# Python
SECRET_KEY = "supersecretkey"
DATABASE_URL = "sqlite:///./crm.db"
```

```typescript
// TypeScript
const API_BASE_URL = 'http://localhost:8000';
const TOKEN_KEY = 'token';
```

---

## 🚨 Problemas Comuns e Soluções

### Backend

#### ❌ Erro: `ModuleNotFoundError: No module named 'fastapi'`
**Causa**: FastAPI não instalado ou ambiente virtual não ativado
**Solução**:
```bash
# Verifique se ambiente virtual está ativo
.venv\Scripts\activate

# Reinstale dependências
pip install -r requirements.txt

# Verifique instalação
pip list | grep fastapi
```

#### ❌ Erro: `CORS policy: No 'Access-Control-Allow-Origin'`
**Causa**: Frontend e backend em portas diferentes não configuradas
**Solução**:
```python
# backend/main.py
origins = [
    "http://localhost:5173",  # Adicione a porta do frontend
    "http://localhost:5174",
    "http://localhost:5175",
]
```

#### ❌ Erro: `sqlite3.OperationalError: no such table: user`
**Causa**: Banco não foi criado ou está corrompido
**Solução**:
```bash
# Recrie o banco
python init_db.py
python create_test_user.py
```

#### ❌ Erro: `401 Unauthorized`
**Causa**: Token expirado ou inválido
**Solução**:
1. Faça logout e login novamente
2. Verifique se `SECRET_KEY` é a mesma no `.env`
3. Verifique se token está sendo enviado:
   ```javascript
   // No navegador, abra Developer Tools > Application > Local Storage
   // Deve ter: token: "eyJ0eXAi..."
   ```

### Frontend

#### ❌ Erro: `npm: command not found`
**Causa**: Node.js não instalado
**Solução**: Instale Node.js de https://nodejs.org

#### ❌ Erro: `TypeError: Cannot read properties of undefined`
**Causa**: Tentando acessar propriedade de objeto que não existe
**Solução**:
```tsx
// ❌ Problemático
const userName = user.username;

// ✅ Seguro
const userName = user?.username;
// ou
const userName = user && user.username;
```

#### ❌ Erro: `Failed to compile. Module not found`
**Causa**: Import incorreto ou arquivo não existe
**Solução**:
```tsx
// ❌ Caminho errado
import { useAuth } from './useAuth';

// ✅ Caminho correto
import { useAuth } from '../hooks/useAuthContext';
```

#### ❌ Página em branco
**Causa**: Erro JavaScript não tratado
**Solução**:
1. Abra Developer Tools (F12)
2. Vá na aba "Console"
3. Procure por erros em vermelho
4. Google o erro específico

### Problemas de Rede

#### ❌ `ERR_CONNECTION_REFUSED`
**Causa**: Backend não está rodando
**Solução**:
```bash
cd backend
python -m uvicorn main:app --reload
```

#### ❌ Request demora muito
**Causa**: Backend travado ou problema de rede
**Solução**:
1. Reinicie o backend
2. Verifique se há loops infinitos no código
3. Adicione timeout nas requisições:
   ```typescript
   const response = await api.get('/properties/', { 
     timeout: 5000  // 5 segundos
   });
   ```

---

## 🌐 Como Fazer Deploy (Colocar Online)

### Backend Deploy

#### Opção 1: Railway (Recomendado - Gratuito)
1. **Prepare o projeto**:
   ```bash
   # Crie Procfile na raiz do backend
   echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile
   
   # Crie runtime.txt
   echo "python-3.11.0" > runtime.txt
   ```

2. **Configure variáveis de ambiente**:
   ```bash
   # No Railway, adicione:
   DATABASE_URL=postgresql://user:pass@host:port/db
   SECRET_KEY=seu-secret-key-super-seguro
   FRONTEND_URL=https://seu-frontend.vercel.app
   ```

3. **Deploy**:
   - Conecte repositório GitHub ao Railway
   - Railway detecta automaticamente e faz deploy

#### Opção 2: Heroku
```bash
# Instale Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crie app
heroku create seu-crm-backend

# Configure variáveis
heroku config:set SECRET_KEY=seu-secret-key
heroku config:set DATABASE_URL=postgresql://...

# Deploy
git push heroku main
```

### Frontend Deploy

#### Opção 1: Vercel (Recomendado - Gratuito)
1. **Configure para produção**:
   ```typescript
   // frontend/src/services/api.ts
   const api = axios.create({
     baseURL: process.env.NODE_ENV === 'production' 
       ? 'https://seu-backend.railway.app'
       : 'http://localhost:8000',
   });
   ```

2. **Deploy**:
   - Conecte repositório GitHub ao Vercel
   - Vercel detecta Vite automaticamente
   - Build e deploy automático

#### Opção 2: Netlify
```bash
# Build local
npm run build

# Instale Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Configuração de Produção

#### Backend
```python
# backend/.env (produção)
DATABASE_URL=postgresql://user:pass@host:port/database
SECRET_KEY=chave-super-segura-de-32-caracteres
FRONTEND_URL=https://seu-frontend.vercel.app
DEBUG=False
```

#### Frontend
```typescript
// frontend/vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,  // Não gera sourcemaps em produção
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});
```

### Checklist de Deploy

#### Antes do Deploy
- [ ] Teste localmente em modo produção
- [ ] Configure variáveis de ambiente
- [ ] Atualize URLs da API
- [ ] Remove logs de desenvolvimento
- [ ] Testa autenticação
- [ ] Verifica CORS

#### Depois do Deploy
- [ ] Teste login no ambiente de produção
- [ ] Verifique console por erros
- [ ] Teste responsividade mobile
- [ ] Configure domínio personalizado
- [ ] Configure SSL (HTTPS)

---

## 🔍 Debugging e Logs

### Backend - Como Debuggar

#### Logs Detalhados
```python
# backend/main.py
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.4f}s")
    return response
```

#### Debugging com Print
```python
# Em qualquer função
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(f"🔍 Login attempt for: {form_data.username}")  # Debug
    
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    print(f"🔍 User found: {user is not None}")  # Debug
    
    if not user:
        print("❌ User not found")  # Debug
        raise HTTPException(status_code=401, detail="User not found")
```

#### Usando Debugger (VS Code)
1. Crie `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "FastAPI",
         "type": "python",
         "request": "launch",
         "program": "${workspaceFolder}/backend/main.py",
         "module": "uvicorn",
         "args": ["main:app", "--reload"],
         "cwd": "${workspaceFolder}/backend"
       }
     ]
   }
   ```

2. Coloque breakpoints clicando na margem esquerda
3. Aperte F5 para iniciar debug

### Frontend - Como Debuggar

#### Console Logs
```typescript
const login = async (data: LoginData) => {
  console.log('🔍 Login data:', data);  // Debug
  
  try {
    const response = await api.post('/users/login', formData);
    console.log('🔍 Login response:', response.data);  // Debug
    
    localStorage.setItem('token', response.data.access_token);
    console.log('🔍 Token saved to localStorage');  // Debug
  } catch (error) {
    console.error('❌ Login error:', error);  // Debug
  }
};
```

#### React Developer Tools
1. Instale extensão "React Developer Tools" no navegador
2. Abra DevTools > Components
3. Veja estado de todos os componentes em tempo real

#### Network Tab
1. Abra DevTools (F12) > Network
2. Faça ações no site
3. Veja todas as requisições HTTP
4. Clique em uma requisição para ver detalhes

### Logs de Produção

#### Backend (Railway)
```bash
# Ver logs em tempo real
railway logs

# Ver logs específicos
railway logs --tail 100
```

#### Frontend (Vercel)
```bash
# Ver logs de build
vercel logs

# Ver logs de função
vercel logs --scope=seu-projeto
```

---

## 📈 Monitoramento e Performance

### Métricas Importantes

#### Backend
- **Response Time**: Quanto tempo demora cada endpoint
- **Error Rate**: Quantas requisições falham
- **CPU/Memory Usage**: Uso de recursos do servidor
- **Database Connections**: Quantas conexões ativas

#### Frontend
- **Page Load Time**: Tempo para carregar página
- **Bundle Size**: Tamanho dos arquivos JavaScript
- **Core Web Vitals**: Métricas de UX do Google

### Ferramentas de Monitoramento

#### Gratuitas
- **Sentry**: Tracking de erros
- **Google Analytics**: Comportamento de usuários
- **Railway Metrics**: Metrics do servidor
- **Vercel Analytics**: Performance do frontend

#### Configuração Básica - Sentry

```python
# backend/main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="https://sua-dsn-do-sentry.com",
    integrations=[FastApiIntegration()],
)
```

```typescript
// frontend/src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://sua-dsn-do-sentry.com",
});
```

---

## 🔐 Segurança - Boas Práticas

### Backend

#### 1. Nunca Commite Secrets
```python
# ❌ NUNCA faça isso
SECRET_KEY = "minha-chave-secreta"

# ✅ Use variáveis de ambiente
SECRET_KEY = os.getenv("SECRET_KEY")
```

#### 2. Validação de Input
```python
# ✅ Sempre valide dados de entrada
class PropertyCreate(BaseModel):
    type: str = Field(min_length=1, max_length=50)
    value: float = Field(gt=0, le=10_000_000)  # Entre 0 e 10 milhões
    location: str = Field(min_length=5, max_length=200)
```

#### 3. Rate Limiting
```python
# Instale: pip install slowapi
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/users/login")
@limiter.limit("5/minute")  # Máximo 5 tentativas por minuto
def login(request: Request, ...):
    # ...
```

#### 4. Logs de Segurança
```python
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        # Log tentativa de login inválida
        logger.warning(f"Failed login attempt for user: {form_data.username}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Log login bem-sucedido
    logger.info(f"Successful login for user: {form_data.username}")
```

### Frontend

#### 1. Nunca Armazene Secrets
```typescript
// ❌ NUNCA faça isso
const API_KEY = "sk-1234567890abcdef";

// ✅ Use variáveis de ambiente (para dados não sensíveis)
const API_URL = import.meta.env.VITE_API_URL;
```

#### 2. Sanitização de Dados
```typescript
// Instale: npm install dompurify
import DOMPurify from 'dompurify';

const sanitizedHtml = DOMPurify.sanitize(userInput);
```

#### 3. HTTPS Only
```typescript
// Sempre use HTTPS em produção
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.seudominio.com'  // HTTPS
    : 'http://localhost:8000',      // HTTP só para dev
});
```

---

## 🧪 Testes

### Backend - Testes com Pytest

#### Instalação
```bash
pip install pytest httpx
```

#### Teste Básico
```python
# backend/tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/users/login", data={
        "username": "admin",
        "password": "123456"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid():
    response = client.post("/users/login", data={
        "username": "admin",
        "password": "senha-errada"
    })
    assert response.status_code == 401
```

#### Executar Testes
```bash
# Todos os testes
pytest

# Com coverage
pytest --cov=app

# Teste específico
pytest tests/test_auth.py::test_login_success
```

### Frontend - Testes com Jest

#### Instalação
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

#### Teste Básico
```typescript
// frontend/src/__tests__/LoginPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../pages/LoginPage';

test('renders login form', () => {
  render(<LoginPage />);
  
  expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
});

test('shows error on invalid login', async () => {
  render(<LoginPage />);
  
  fireEvent.change(screen.getByLabelText(/usuário/i), { 
    target: { value: 'admin' } 
  });
  fireEvent.change(screen.getByLabelText(/senha/i), { 
    target: { value: 'senha-errada' } 
  });
  fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
  
  expect(await screen.findByText(/falha no login/i)).toBeInTheDocument();
});
```

---

## 📚 Recursos para Aprender Mais

### Documentação Oficial
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **SQLModel**: https://sqlmodel.tiangolo.com/
- **Vite**: https://vitejs.dev/

### Tutoriais Recomendados
- **FastAPI Tutorial**: https://fastapi.tiangolo.com/tutorial/
- **React Tutorial**: https://react.dev/learn
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

### Comunidades
- **Stack Overflow**: Para dúvidas específicas
- **GitHub**: Para ver código de outros projetos
- **Discord FastAPI**: Comunidade oficial FastAPI
- **Reddit r/reactjs**: Comunidade React

---

## 🎯 Conclusão

Este documento cobriu **TUDO** que você precisa saber para:

✅ **Entender** como o sistema funciona  
✅ **Rodar** o sistema localmente  
✅ **Modificar** e adicionar funcionalidades  
✅ **Resolver** problemas comuns  
✅ **Fazer deploy** para produção  
✅ **Manter** e monitorar o sistema  

### Próximos Passos Sugeridos

1. **Familiarize-se** rodando o sistema
2. **Implemente** uma funcionalidade pequena (ex: novo campo)
3. **Estude** o código linha por linha
4. **Experimente** quebrar e consertar coisas
5. **Leia** documentação das tecnologias usadas

### Lembre-se

- **Não tenha medo de experimentar** - você tem backup!
- **Google é seu amigo** - toda dúvida já foi perguntada antes
- **Leia mensagens de erro** - elas geralmente dizem o que está errado
- **Faça commits pequenos e frequentes** - facilita encontrar problemas
- **Documente suas mudanças** - seu eu futuro agradece

**Boa sorte! 🚀**

---

*Documento criado em ${new Date().toLocaleDateString('pt-BR')} - Versão 1.0*
