---
publishDate: 2020-08-22
title: このブログについて
tags:
  - pagic
  - deno
  - GitHubActions
layout: ../../layouts/Article.astro
---

# このブログについて 

## 使っている技術

このブログは[pagic](https://github.com/xcatliu/pagic)を使って作成しています。

この記事を書いた時点でのバージョンは次の通りです。

- deno@v1.3.1
- pagic@v0.8.6

## pagicとは?

- Denoで実装されたスタティックサイトジェネレータ
- 記事をReactコンポーネントまたはmarkdown形式で記述できる
- プラグインシステムにより拡張することが可能

## pagicの使い方

TBD

## デプロイ

GitHub Actionsを使って、ビルド及びデプロイを自動化しています。

`.github/workflows`ディレクトリ内に以下のようなyamlファイルを用意します。


```yaml
name: build
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: denolib/setup-deno@master
      with:
        deno-version: 1.3.1
    - name: Build
      run: |
        deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@v0.8.6/mod.ts build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

これにより、masterブランチへのpush時に、以下の処理が実行されます。

1. `pagic build`による静的サイトの生成
2. [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)によるGitHub Pagesへのデプロイ

## このサイトのソース

[https://github.com/uki00a/blog](https://github.com/uki00a/blog)に置いています
