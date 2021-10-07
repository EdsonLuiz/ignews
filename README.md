## Notas

- CSS modules
- SASS
- _app e _documents
  - _app é recarregado sempre que acontecer uma mudança de página.
  - _document é carregado uma única vez durante a execução do app
- google fonts
  - configure para `anonymous`
  - [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)
- tag title deve ser definida no componente que renderiza a página
  ```ts
  import Head from 'next/head'
  export class Home {
    render() {
      return (
        <div>
          <Head>
            <title>My page title</title>
          </Head>
        </div>
      )
    }
  }
  ```

### Requisição SPA
No React tradicional todas as requisições HTTP são realizadas no lado do cliente, isto pode causar dois problemas.  
- A interface pode ser renderizada sem a resposta da API e ocorrer um re-render quando os dados da API forem retornados, causando um layout shift.
- Quando a página for indexada os dados fornecidos pela API podem não estar disponíveis no momento da indexação.

### Requisição SSR (Server Side Rendering)
O servidor embutido do Next vai ser utilizado para realizar as requisições HTTP, montar a página e devolver uma página completa para o navergador.  
O `SSR` só funciona em páginas do Next e não em components. Para ter acesso a dados do servidor em um componente é necessário repassar este dado da página para o componente.

```tsx
import {GetServerSideProps} from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {name: 'Some', age: 99}
  }
}
```

### SSG (Static Site Generation)
Salva o HTML de forma estática, isto pode evitar requisições HTTP desnecessárias e diminuir o consumo de recursos.  
O `getStaticProps` vai ser executado uma vez e seu resultado vai ser salvo como uma página estática.  
Pode ser utilizada a opção `revalidate`, que vai definir quanto tempo este HTML estático deve ser mantido até que seja gerado um novo documento com novos dados.

```tsx
import {GetStaticProps} from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {name: 'Some', age: 99},
    revalidade: 60 * 60 * 24; // 24 horas até que um novo documento seja gerado
  }
}
```

### Quando utilizar?
- SSG: Quando não existe problema caso a mesma página seja exibida para diferentes tipos de usuários.
- SSR: Quando a página precisa de informações dinâmicas, dados diferentes de acordo com cada usuário.
- Client-side: Quando os dados podem ser carregados depois da página ser renderizada sem causar grandes problemas.

### Next-Auth
- Adicione o pacote
  ```shell
  yarn add next-auth
  ```
- Cire uma api route `pages/api/auth/[...nextauth].ts`
- Configure as keys no seu provider.
- Adicione as keys no `.env`
  ```
  PROVIDER_ID=YOUR_CLIENT_ID
  PROVIDER_SECRET=YOUR_CLIENT_SECRET
  ```
- Problemas ao seguir a documentação utilizando TypeScript? Olhe este [link](https://github.com/nextauthjs/next-auth/issues/210)
- Configure da forma antiga.
  ```tsx
  import NextAuth from "next-auth"
  import Providers from "next-auth/providers"

  export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        scope: 'read:user'
      }),
      // ...add more providers here
    ],
  })
  ```
- Configure um escopo de acordo com as necessidades da aplicação. [github-scopes](https://docs.github.com/pt/developers/apps/building-oauth-apps/scopes-for-oauth-apps).
- Para realizar `signIn` e `signOut` utilize a funções de mesmo nome do pacote `next-auth/client`. A função `signIn` recebe como parâmetro o nome do provider.
- Utilize o hook `useSession`, do pacote `next-auth/client`, para recuperar dados da sessão do usuário logado.
  ```ts
  const [session] = useSession()
  ```
- Utilize a `ContextAPI` para compartilhar informações de autenticação entre os componentes.
- O Next disponibiliza um Provider no pacote `next-auth/client`. Adicione este provider no arquivo `_app.tsx`.
  ```tsx
  import {Provider as NextAuthProvider} from 'next-auth/client'

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <NextAuthProvider session={pageProps.session}>
         ...
      </NextAuthProvider>
    )
  }
  export default MyApp
  ```
- `pageProps.session` utilizado para receber informações da sessão ativa do usuário.