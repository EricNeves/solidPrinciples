<h4 align="center">
  <br />
  <img src=".doc/icon.png">
  <br />
    Solid Principles
  <br />
</h4>

<p align="center">Aplicação criada com base nos <strong>Pricípios SOLID</strong> e <strong>Package By Feature</strong>, além de utilizar recursos como, <strong>Typescript</strong>, <strong>Express</strong>, <strong>PostgreSQL</strong>, <strong>Prisma</strong>, <strong>Jest</strong> e <strong>Docker</strong>.</p>

<h4 align="center">
  
</h4> 

<p align="center">Data de criação: May 8, 2024</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/ericneves/solidprinciples?display_timestamp=author&style=flat-square&logo=github&color=%2303AED2" alt="Github">
  <img src="https://img.shields.io/github/languages/count/ericneves/solidprinciples?style=flat-square&logo=progress&color=%2341B06E">
  <img src="https://img.shields.io/github/languages/top/ericneves/solidprinciples?style=flat-square&logo=typescript&logoColor=%23FFBB70&color=%23FFBB70">
  <img src="https://img.shields.io/github/license/ericneves/solidprinciples?style=flat-square&logo=git&color=%23F05032">
</p>

<img src=".doc/screenshotA.png">
<img src=".doc/screenshotB.png">

#### Intro

Este projeto tem como foco a implementação dos princípios **SOLID**, nos quais visam trazer para a aplicação mais **flexibilidade**, **escalabilidade** e **fácil manutenção**.

Tais princípios, representados por cada letra do próprio nome.

> [!NOTE]
> - **S** (**Single Responsibility Principle**): Uma classe deve ter apenas uma razão para mudar, ou seja, ela deve ter uma única responsabilidade dentro do sistema.
> - **O** (**Open-Closed Principle**): As entidades/objetos de um software devem ser abertas para extensão, mas fechadas para modificação. Isso significa que quando novos comportamentos forem adicionados, devemos estender e não alterar o código-fonte original.
> - **L** (**Liskov Substitution Principle**): Os objetos de uma classe derivada devem ser substituíveis por objetos de sua classe base sem interromper o funcionamento do programa.
> - **I** (**Interface Segregation Principle**): Uma funcionalidade não deve depender de interfaces que não utilizam. Em vez disso, interfaces específicas devem ser criadas para partes específicas do software.
> - **D** (**Dependency Inversion Principle**): Módulos de alto nível não devem depender de módulos de baixo nível, mas ambos devem depender de abstrações e não das implementações.
>****

Esses padrões facilitam o processo de desenvolvimento de software ao permitir o **reuso**, **dividir** **responsabilidades** e possibilitar a **integração** de diferentes tipos de **banco de dados**. Além disso, tornam a implementação de **testes automatizados**, seja de **testes unitários**, **integração** ou **end-to-end** (**E2E**), mais fácil.

Além do mais, foi implementado o padrão arquitetural **package-by-feature**, diferentemente do **package-by-layer** como na **arquitetura em camadas**, esse padrão foca em organizar código em torno de funcionalidades específicas e centradas no domínio. Todos os componentes de uma funcionalidade são organizados juntos (**controllers**, **useCases**, **DTO**, **Factory** e etc...), o que facilita a compreensão e manutenção, além de outros recursos.

#### Features

- 📁 Padrão Package By Feature
- ✅ Criar usuário
- 🔐 Autenticação - JWT
- 👾 Informações do Usuário
- 🖊️ Editar Usuário
- 🧹 Deletar Usuário
- ⚡ Dependencies:
  
  