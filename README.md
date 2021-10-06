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