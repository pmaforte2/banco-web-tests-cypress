# Banco Web - Testes Automatizados com Cypress

Projeto de automação de testes E2E (End-to-End) para a aplicação de um banco, utilizando Cypress e JavaScript. O projeto valida funcionalidades críticas como autenticação de usuários e realização de transferências bancárias.

## 📋 Componentes do Projeto

### Estrutura de Diretórios

```
banco-web-tests-cypress/
├── cypress/
│   ├── e2e/                          # Testes automatizados
│   │   ├── login.cy.js               # Testes de autenticação
│   │   └── transferencia.cy.js       # Testes de transferências
│   ├── fixtures/                     # Dados de teste
│   │   └── credenciais.json          # Credenciais para testes
│   ├── support/
│   │   ├── e2e.js                    # Configuração geral de suporte
│   │   ├── commands.js               # Registro de custom commands
│   │   └── commands/
│   │       ├── common.js             # Commands genéricos
│   │       ├── login.js              # Commands de autenticação
│   │       └── transferencia.js      # Commands de transferências
│   └── reports/                      # Relatórios HTML gerados
├── cypress.config.js                 # Configuração do Cypress
├── package.json                      # Dependências do projeto
└── README.md                         # Este arquivo
```

### Arquivos Principais

- **cypress.config.js**: Configuração central do Cypress, inclui baseUrl e configuração do reporter
- **package.json**: Define dependências (Cypress, cypress-mochawesome-reporter) e scripts
- **fixtures/credenciais.json**: Dados de entrada para os testes (usuários válidos e inválidos)

## 🚀 Instalação

### Pré-requisitos

- **Node.js** v14 ou superior
- **npm** ou **yarn**
- **API em execução**: https://github.com/juliodelimas/banco-api
- **Aplicação Web em execução**: https://github.com/juliodelimas/banco-web

### Passos de Instalação

1. Clone ou acesse o repositório:
```bash
cd banco-web-tests-cypress
```

2. Instale as dependências:
```bash
npm install
```

3. Verifique se a API está acessível em seu servidor (padrão: `http://localhost:3001`)

4. Verifique se a aplicação web está rodando em `http://localhost:4000`

## ▶️ Execução dos Testes

### Executar testes em modo headless (sem interface visual)
```bash
npm test
```

### Executar testes em modo headed (com browser visível)
```bash
npm run cy:headed
```

Isso abrirá a interface do Cypress onde você pode:
- Executar todos os testes
- Executar testes específicos
- Debugar testes
- Visualizar em tempo real

### Executar testes específicos
```bash
npm test -- --spec "cypress/e2e/login.cy.js"
```

## 📊 Estrutura de Testes

### 1. Testes de Login (`login.cy.js`)

Valida a autenticação de usuários na aplicação.

#### Cenários de Teste:

| Cenário | Descrição |
|---------|-----------|
| Login com dados válidos | Verifica se login com credenciais corretas permite acesso ao sistema |
| Login com dados inválidos | Valida se mensagem de erro é exibida ao usar credenciais incorretas |

### 2. Testes de Transferência (`transferencia.cy.js`)

Valida a funcionalidade de transferências entre contas.

#### Cenários de Teste:

| Cenário | Descrição |
|---------|-----------|
| Transferência com valores válidos | Verifica se transferência com valores menores que R$ 5.000 é realizada |
| Transferência acima do limite | Valida restrição de segurança para valores acima de R$ 5.000 sem token |

## 🔧 Custom Commands

Custom Commands são funções reutilizáveis que encapsulam ações comuns, melhorando a legibilidade e manutenibilidade dos testes.

### Commands de Login (`cypress/support/commands/login.js`)

#### `cy.loginComCredenciaisValidas()`
Realiza login com credenciais válidas carregadas do arquivo de fixtures.

**Uso:**
```javascript
cy.loginComCredenciaisValidas()
```

**O que faz:**
- Carrega credenciais válidas de `fixtures/credenciais.json`
- Preenche campo de usuário
- Preenche campo de senha
- Clica no botão "Entrar"

---

#### `cy.loginComCredenciaisInvalidas()`
Realiza login com credenciais inválidas para testar tratamento de erros.

**Uso:**
```javascript
cy.loginComCredenciaisInvalidas()
```

**O que faz:**
- Carrega credenciais inválidas de `fixtures/credenciais.json`
- Preenche campo de usuário
- Preenche campo de senha
- Clica no botão "Entrar"

### Commands de Transferência (`cypress/support/commands/transferencia.js`)

#### `cy.realizarTransferecia(contaOrigem, contaDestino, valor)`
Executa uma transferência entre contas.

**Parâmetros:**
- `contaOrigem` (string): Nome da conta de origem (ex: "Maria")
- `contaDestino` (string): Nome da conta de destino (ex: "Marcos")
- `valor` (string): Valor a transferir (ex: "100.50")

**Uso:**
```javascript
cy.realizarTransferecia('Maria', 'Marcos', '100.50')
```

**O que faz:**
- Seleciona conta de origem no combo box
- Seleciona conta de destino no combo box
- Preenche campo de valor
- Clica no botão "Transferir"

### Commands Genéricos (`cypress/support/commands/common.js`)

#### `cy.verificarMensagemToast(mensagem)`
Valida se uma mensagem toast (notificação) específica é exibida.

**Parâmetros:**
- `mensagem` (string): Texto exato da mensagem esperada

**Uso:**
```javascript
cy.verificarMensagemToast('Transferência realizada!')
```

**O que faz:**
- Localiza o elemento com classe `.toast`
- Valida se contém o texto esperado

---

#### `cy.selecionarOpcaoComboBox(labelDoCampo, opcao)`
Seleciona uma opção em um combo box.

**Parâmetros:**
- `labelDoCampo` (string): Atributo `for` do label do campo (ex: "conta-origem")
- `opcao` (string): Texto da opção a selecionar (ex: "Maria")

**Uso:**
```javascript
cy.selecionarOpcaoComboBox('conta-origem', 'Maria')
```

**O que faz:**
- Localiza o combo box relacionado ao label
- Clica para abrir as opções
- Seleciona a opção especificada

## 📈 Relatórios

### Geração de Relatórios

Os testes geram relatórios HTML automaticamente usando **cypress-mochawesome-reporter**.

**Localização:** `cypress/reports/html/`

### Como acessar o relatório

Após executar os testes, abra o arquivo:
```
cypress/reports/html/index.html
```

### Conteúdo do Relatório

- ✅ Testes passados
- ❌ Testes falhados
- ⏱️ Duração de cada teste
- 📸 Screenshots de falhas
- 📝 Detalhes de execução

## 🐛 Troubleshooting

### "baseUrl não está acessível"
**Causa:** A aplicação web não está rodando em `http://localhost:4000`

**Solução:**
1. Inicie a aplicação em https://github.com/juliodelimas/banco-web
2. Verifique a porta no `cypress.config.js`

### "API não encontrada"
**Causa:** A API não está rodando em `http://localhost:3001`

**Solução:**
1. Inicie a API em https://github.com/juliodelimas/banco-api
2. Verifique se a porta está correta

### "Timeout em cy.get()"
**Causa:** Elemento não encontrado no tempo padrão

**Solução:**
1. Verifique se o seletor CSS está correto
2. Aumente o timeout: `cy.get('#elemento', { timeout: 10000 })`

### "Fixtures não encontradas"
**Causa:** Arquivo `credenciais.json` pode estar mal formatado

**Solução:**
1. Verifique o arquivo `cypress/fixtures/credenciais.json`
2. Certifique-se de que está em formato JSON válido

## 📚 Estrutura de um Teste

Todos os testes seguem o padrão **AAA (Arrange-Act-Assert)**:

```javascript
describe('Funcionalidade', () => {
  beforeEach(() => {
    // Arrange - Preparar o estado inicial
    cy.visit('/')
  })

  it('Deve fazer algo específico', () => {
    // Act - Executar a ação
    cy.loginComCredenciaisValidas()

    // Assert - Verificar o resultado
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })
})
```

## 📖 Documentação Adicional

- [Documentação Cypress](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress-Mochawesome-Reporter](https://github.com/LironEo/cypress-mochawesome-reporter)

## 👤 Autor

Projeto de automação de testes para aplicação bancária.

## 📝 Licença

ISC
