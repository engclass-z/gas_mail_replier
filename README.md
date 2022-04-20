# gas_mail_replier

GAS を利用してメールの自動返信を行うスクリプト

# 環境設定

本プログラムでは yarn 及び clasp を利用して開発を行っています。

必要なパッケージをインストールし、clasp に Google アカウントでログインしてください。

```
$ npm install -g @google/clasp
$ yarn
$ yarn login
$ yarn init
```

# コマンド

ブラウザ上で Apps Script エディタを開く

```
$ yarn open
```

実装した ts ファイルを元に gs ファイルを作成し、AppsScript にアップロードする

```
$ yarn push
```
