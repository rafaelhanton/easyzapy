# Whaticket OPEN AI - Pro Version
Esse repositório é onde será armazenado a versão da APIBRASIL do Whaticket

# Dependencia
```bash
apt install git -y && apt update -y && apt upgrade -y
```
# Download
```bash
cd /opt && git clone https://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@github.com/jhowbhz/apibrasil-whaticket-openai.git chatbot && cd /opt/chatbot
```
# Adicionando usuário deploy
```bash
adduser deploy
```

```bash
sudo usermod -aG sudo deploy
``` 

# URL repo
```bash
https://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@github.com/APIBrasil/apibrasil-whaticket-openai.git
```

# Comandos adicionais
```bash
ERR_OSSL_EVP_UNSUPPORTED
export NODE_OPTIONS=--openssl-legacy-provider

-----------------------
install node 18
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash  && source ~/.profile  && nvm install 18 && nvm use 18

install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && sudo apt update -y && sudo apt install yarn -y

npm install pm2 -g

------------------------
npx sequelize db:migrate
npx sequelize db:seed:all

------------------------

Up backend
pm2 start dist/server.js --name apibrasil01-backend --node-args="--max-old-space-size=8096"

Up frontend
pm2 start server.js --name apibrasil01-frontend
```
