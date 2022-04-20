# gas_mail_replier

GAS を利用してメールの自動返信を行うスクリプト

# 初期設定

本プログラムでは clasp を利用して開発を行っています。

必要なパッケージをインストールし、clasp に Google アカウントでログインしてください。

```
$ npm install -g @google/clasp
$ clasp login
```

# コマンド

ブラウザ上で Apps Script エディタを開く

```
$ npm run open
```

実装した ts ファイルを元に gs ファイルを作成し、AppsScript にアップロードする

```
$ npm run push
```
