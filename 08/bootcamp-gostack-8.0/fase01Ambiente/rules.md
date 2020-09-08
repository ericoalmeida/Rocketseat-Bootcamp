rules: {
  >Ponta como erro, todads as regras que ele nao encontrar e que nao bater com o codigo. <br />
  ```
  'prettier/prettier':'error',
  ```

  >Permite a utilizacao de codigo JSX em arquivos .js <br />
  ```
  'react/jsx-filename-extension': [
    'warn', { extensions: ['.js','.jsx']}
  ],
  ```  

  >Permite que seja utilizado export que nao seja default. <br />
  ```
  'import/prefer-default-export':'off',
  ```

  >Desabilita a obrigatoriedade de utilizacao do this nos metodos/variáveis das classes. <br />
  ```
  'class-methods-use-this':'off',
  ```

  >Permite reatribuir valores dos parametros passados. <br />
  ```
  "no-param-reassign":"off",
  ```

  >Desabilita o camelcase em nomes de variaveis e classes. <br />
  ```
  "camelcase":"off",
  ```

  > Ignora a variável next se ela nao estiver sendo utilizada. <br />
  ```
  "no-unused-vars" :[
    "error",{"argsIgnorePattern": "next"}
  ],
  ```

> Permite a utilizacao do console apenas com a variavel tron
  ```
  'no-console' : ['error', {allow: ['tron']}]
  ```
}