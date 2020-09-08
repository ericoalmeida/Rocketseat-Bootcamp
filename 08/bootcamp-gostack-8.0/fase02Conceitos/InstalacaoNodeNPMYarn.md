# Ferramentas

# Instalação NVM

<code>
  <strong>
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
  </strong>
</code>

<br />
<br />

ou <br />

<code>
  <strong>
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
  </strong>
</code>

<br />
<br />

Adicione as linhas abaixo, nos arquivos: <strong> ~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc </strong> <br />
<code>
  <strong>
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh" # This loads nvm
  </strong>
</code>

# Instale o NodeJS

Exibir as versões disponíveis <br />
<code>
  <strong>
    nvm ls-remote
  </strong>
</code>

<br />

Instala uma versão especifica <br />
<code>
  <strong>
    nvm install v10.16.3
  </strong>
</code>

# Instale o Yarn

Adicione o repositório do yarn com o comando abaixo: <br />
<code>
  <strong>
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/  yarn.list <br />
  </strong>  
</code>

<br />

Em seguida, voce pode simplesmente executar: <br /> 
<code>
  <strong>
    sudo apt-get update && sudo apt-get install --no-install-recommends yarn
  </strong>
</code>
