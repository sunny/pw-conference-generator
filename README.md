# Générateur de conférences Paris Web

[Essayer en ligne](https://dev.sunfox.org/paris-web/)

## Développement

Cloner puis :

```sh
npm install
npm run build
npm start
```

## Déploiement

Par exemple :

```sh
npm run build
rsync -r www/ sunfox:/var/www/dev.sunfox.org/paris-web/
```
