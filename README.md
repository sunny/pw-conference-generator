# Générateur de conférences Paris Web

[Essayer en ligne](https://dev.sunfox.org/paris-web/)

## Développement

Cloner puis :

```console
npx http-server www -p 8000
```

## Déploiement

Par exemple :

```console
rsync -r www/ sunfox:/var/www/dev.sunfox.org/paris-web/
```
