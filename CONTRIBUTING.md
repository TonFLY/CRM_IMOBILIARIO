# Guia de Contribuição - VMP CRM

Obrigado por querer contribuir com o VMP CRM! 🎉

## 🤝 Como Contribuir

### 📋 Tipos de Contribuição

1. **🐛 Reportar Bugs**
2. **💡 Sugerir Funcionalidades**
3. **📖 Melhorar Documentação**
4. **💻 Contribuir com Código**
5. **🎨 Melhorar Design/UX**

### 🐛 Reportando Bugs

Antes de reportar um bug:
- ✅ Verifique se já não existe uma issue similar
- ✅ Teste com a versão mais recente
- ✅ Colete informações do ambiente

**Template para Bug Report:**
```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado
O que deveria acontecer.

## 📱 Ambiente
- OS: [Windows/Mac/Linux]
- Navegador: [Chrome/Firefox/Safari]
- Versão: [1.0.0]

## 📸 Screenshots
Se aplicável, adicione screenshots.
```

### 💡 Sugerindo Funcionalidades

**Template para Feature Request:**
```markdown
## 💡 Descrição da Funcionalidade
Descrição clara da funcionalidade proposta.

## 🎯 Problema que Resolve
Que problema esta funcionalidade resolveria?

## 💭 Solução Proposta
Como você imagina que funcionaria?

## 🔀 Alternativas Consideradas
Outras formas de resolver o mesmo problema.

## 📋 Checklist Adicional
- [ ] Esta funcionalidade beneficiaria outros usuários
- [ ] Considerei alternativas existentes
- [ ] Estou disposto a ajudar na implementação
```

### 💻 Contribuindo com Código

#### 🔧 Configuração do Ambiente

1. **Fork o repositório**
2. **Clone localmente:**
   ```bash
   git clone https://github.com/seu-usuario/vmp_crm.git
   cd vmp_crm
   ```

3. **Configure o backend:**
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   # source .venv/bin/activate  # Mac/Linux
   pip install -r requirements.txt
   ```

4. **Configure o frontend:**
   ```bash
   cd frontend
   npm install
   ```

#### 🌿 Workflow de Desenvolvimento

1. **Crie uma branch:**
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   # ou
   git checkout -b fix/nome-do-bug
   ```

2. **Faça suas mudanças**
3. **Teste localmente**
4. **Commit com mensagem descritiva:**
   ```bash
   git commit -m "feat: adiciona sistema de notificações por email"
   # ou
   git commit -m "fix: corrige bug na validação de telefone"
   ```

5. **Push para seu fork:**
   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

6. **Abra um Pull Request**

#### 📝 Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc.
- `refactor:` Refatoração de código
- `test:` Adicionar/modificar testes
- `chore:` Mudanças em ferramentas, configurações

**Exemplos:**
```bash
feat: adiciona filtro por data no relatório de vendas
fix: corrige erro de validação no formulário de cliente
docs: atualiza guia de instalação no README
style: padroniza indentação no arquivo ClientsPage.tsx
refactor: reorganiza estrutura de pastas do backend
test: adiciona testes unitários para API de clientes
chore: atualiza dependências do frontend
```

#### 🧪 Executando Testes

```bash
# Backend
cd backend
python -m pytest

# Frontend
cd frontend
npm test
```

#### ✅ Checklist do Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada se necessário
- [ ] Mudanças testadas localmente
- [ ] Commit messages seguem padrão
- [ ] Branch atualizada com main

### 🎨 Padrões de Código

#### 🐍 Python (Backend)

```python
# Use type hints
def criar_cliente(nome: str, email: str) -> dict:
    """
    Cria um novo cliente no sistema.
    
    Args:
        nome: Nome completo do cliente
        email: Email válido do cliente
        
    Returns:
        dict: Dados do cliente criado
    """
    # Implementação...
    pass

# Use nomes descritivos
def buscar_clientes_por_status(status: str) -> List[Client]:
    pass

# Docstrings em português
class Client(SQLModel, table=True):
    """
    Modelo que representa um cliente no sistema.
    
    Attributes:
        id: Identificador único do cliente
        nome: Nome completo do cliente
        email: Endereço de email
    """
    pass
```

#### ⚛️ React/TypeScript (Frontend)

```tsx
// Use interfaces tipadas
interface ClientProps {
  cliente: Client;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// Componentes funcionais com arrow functions
export const ClientCard: React.FC<ClientProps> = ({ 
  cliente, 
  onEdit, 
  onDelete 
}) => {
  // Hooks no topo
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Funções auxiliares
  const handleEdit = () => {
    onEdit(cliente.id);
  };
  
  // JSX no return
  return (
    <div className="client-card">
      {/* Conteúdo */}
    </div>
  );
};

// Comentários em português
// TODO: Adicionar validação de email
// FIXME: Corrigir bug na formatação de telefone
// NOTE: Esta função será refatorada na v2.0
```

#### 🎨 CSS

```css
/* Use nomenclatura BEM */
.client-card {
  /* Propriedades principais */
}

.client-card__header {
  /* Header do card */
}

.client-card__header--highlight {
  /* Modificador para header destacado */
}

/* Comentários descritivos */
/* Estilo para cards de cliente na página principal */
.client-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Visual */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  
  /* Interação */
  transition: transform 0.2s ease;
}

/* Responsividade mobile-first */
@media (min-width: 768px) {
  .client-card {
    flex-direction: row;
  }
}
```

### 📖 Documentação

- **README.md**: Informações gerais e setup
- **CHANGELOG.md**: Histórico de mudanças
- **docs/**: Documentação técnica detalhada
- **Comentários no código**: Em português
- **JSDoc/Docstrings**: Para funções públicas

### 🔍 Code Review

Critérios de aprovação:
- ✅ Funcionalidade implementada corretamente
- ✅ Código limpo e legível
- ✅ Testes cobrindo cenários principais
- ✅ Documentação atualizada
- ✅ Performance adequada
- ✅ Segurança considerada

### 🚀 Deploy e Release

1. **Versioning**: Seguimos [SemVer](https://semver.org/)
2. **Release Notes**: Cada release tem notas detalhadas
3. **Testing**: Testes automatizados antes do deploy
4. **Rollback**: Plano de rollback para cada release

### 📞 Suporte

- 💬 **GitHub Discussions**: Para dúvidas gerais
- 🐛 **GitHub Issues**: Para bugs e features
- 📧 **Email**: dev@vmpcrm.com

### 🏆 Reconhecimento

Contribuidores ativos ganham:
- 🏅 Badge de contributor
- 📝 Menção no CHANGELOG
- 🎉 Reconhecimento na comunidade

---

**Obrigado por contribuir! Juntos fazemos o VMP CRM melhor! 🚀**
