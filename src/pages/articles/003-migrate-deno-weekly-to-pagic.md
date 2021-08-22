---
date: 2021-06-02
title: 週刊DenoのサイトをPagicに移行した話
tags:
  - deno
  - pagic
layout: ../../layouts/Article.astro
---

## はじめに

個人で[週刊Deno](https://uki00a.github.io/deno-weekly/)というサイトを運営しています。

このサイトで使用しているスタティックサイトジェネレータを[Pagic](https://github.com/xcatliu/pagic)に移行したため、その中で得たノウハウなどについてまとめてみます。

## Pagicとは?

PagicはDenoとReactをベースにしたスタティックサイトジェネレータです。

以下のような特徴を備えています。

- 記事をtsxまたはMarkdownで記述できます。
- カスタムテーマやプラグインシステムによって拡張することが可能です。
- 目次の自動生成をサポートしています。
- ページのタグ付けをサポートしています(blogプラグイン)

## 移行理由

当初は、Markdownで記事を書いてそこからHTMLを生成できれば十分であったため、自作のDenoスクリプトを作成して運用していました。

しかし、運用とともに様々な機能を追加していった結果、このスクリプトは徐々に肥大化していきました。

また、将来的に追加していきたい機能も複数存在している状況でした。

このままこのスクリプトに機能を追加していくより、やりたい機能を一通り提供しており、十分にテストもされているPagicに移行した方が楽そうと判断し、移行することにしました。

## Pagicの使い方について

### おおまかな使い方

1. `pagic.config.ts`または`pagic.config.tsx`をルートディレクトリに用意する。
1. `$ pagic build —watch —serve`でdevサーバを起動する。
1. エディタで記事を書く。
1. http://localhost:8000で生成されたページを確認する。

### 設定例

設定ファイルは`pagic.config.ts`または`pagic.config.tsx`と命名します。

```tsx
import { React } from "pagic";

export default {
  root: "https://uki00a.github.io/deno-weekly/",
  title: "週刊Deno",
  description: "このサイトでは、毎週Denoに関わる最新情報を発信しています。",
  srcDir: ".",
  theme: "blog", // Pagicには"default", "blog", "docs"の3種類のテーマが組み込まれています。
  plugins: ["blog", "ga"],
  // <head>タグの内容
  head: (
    <>
      <link
        rel="icon"
        href="https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico"
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@uki00a" />
      <meta name="twitter:creator" content="@uki00a" />
    </>
  ),
  blog: {
    // ブログ記事が格納されているディレクトリを指定
    root: "/articles",
    // SNSなどの情報 (ハンバーガーメニュー内にリンクが表示されます🍔)
    social: {
      github: "uki00a",
      email: "uki00a@gmail.com",
      twitter: "uki00a",
    },
  },
  ga: typeof Deno === "undefined" ? undefined : {
    id: Deno.env.get("TRACKING_ID"),
  },
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },
  md: {
    tocEnabled: true,
  },
  // ハンバーガーメニューの設定🍔
  nav: [
    {
      text: "ホーム",
      link: "https://uki00a.github.io/deno-weekly",
      icon: "czs-home-l",
    },
    {
      text: "タグ一覧",
      link: "https://uki00a.github.io/deno-weekly/tags",
      icon: "czs-tag-l",
    },
    {
      text: "カテゴリ一覧",
      link: "https://uki00a.github.io/deno-weekly/categories",
      icon: "czs-category-l",
    },
    {
      text: "アーカイブ",
      link: "https://uki00a.github.io/deno-weekly/archives",
      icon: "czs-box-l",
    },
    {
      text: "このサイトについて",
      link: "https://uki00a.github.io/deno-weekly/about/index.html",
      icon: "czs-about-l",
    },
  ],
};
```

依存関係は[Import maps](https://github.com/WICG/import-maps)をで管理しており、以下のように設定しています。

```json
{
  "imports": {
    "pagic": "https://deno.land/x/pagic@v1.3.1/mod.ts"
  }
}
```

### ビルド

Pagicで静的サイトをビルドするときは、基本的にはコマンドラインから以下のように実行します。

```shell
$ deno run --unstable --allow-read --allow-write --allow-net --allow-run --allow-env https://deno.land/x/pagic@v1.3.1/mod.ts build
```

しかし、このように運用をしてしまうと、Import mapsで管理しているPagicのバージョンとビルド時に使用するPagicのバージョンがずれてしまう可能性が考えられます。

この問題を回避するため、`build.ts`というファイルを用意しています。

```typescript
import Pagic from "pagic";

if (import.meta.main) {
  await new Pagic().build();
}
```

このようにすることで、**Import mapsで管理しているバージョンのPagicを使用して静的ページをビルドすることができます。**

```shell
$ deno run --unstable --allow-read --allow-write --allow-net --allow-run --allow-env --import-map ./import_map.json ./build.ts
```

## ホスティング

ホスティングサイトとしては、GitHub Pagesを使用しています。

デプロイはGitHub Actionsで自動化しています。

Pagicでビルドした静的ファイルはデフォルトでdistディレクトリに生成されるため、それらのファイルを[https://github.com/peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)を使って、GitHub Pagesへデプロイしています。

GitHub Actionsのワークフローの定義は以下の通りです。

```yaml
name: ci
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - "**"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: denolib/setup-deno@master
      with:
        deno-version: 1.10.2
    - name: Run fmt
      run: |
        deno fmt --check --ignore=articles
    - name: Run lint
      run: |
        deno lint --unstable --ignore=articles
    - name: Build
      env:
        URL: https://uki00a.github.io/deno-weekly
        TRACKING_ID: G-MK2K2MRMBF
      run: |
        deno run --unstable --allow-read --allow-write --allow-net --allow-run --allow-env --import-map ./import_map.json ./build.ts
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      if: ${{ github.event_name == 'push' }}
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

このようなファイルを`.github/workflows`ディレクトリに用意することで、リポジトリにpushするたびにGitHub Pagesへ静的ファイルがデプロイされます。

## 移行してよかったこと

Pagicはページのタグ付け(blogプラグイン)や目次の生成機能などが提供されているのが便利に感じました。

また、ダイナミックなページを生成したいときに、tsxで書けるのもよいところだと思います。

デフォルトでblog, docs, defaultなどのテーマが提供されており、OSSのドキュメントサイトなどを手軽に作成したい場合などにも便利なのではないかと思います。

## 逆に移行して辛く感じていること

移行した影響により、ビルド時間が若干増加しました。(高速化するテクニックについては後述します)

このあたりはトレードオフなので仕方ないと考えています。

## はまった点・ノウハウなど

### GitHub Pagesにデプロイする際は`config.root`を設定する必要がある

週刊Denoのサイトは[https://uki00a.github.io](https://uki00a.github.io)の`/deno-weekly`配下でページを公開しています。

このような構成の場合、デフォルトだとアセットが`https://uki00a.github.io/`から読み込まれてしまい、404エラーが発生してしまいます。

```tsx
export default {
  root: "https://uki00a.github.io/deno-weekly/",
    ...
};
```

このような場合、上記のように`pagic.config.tsx`の`root`プロパティでベースURLを指定することで問題を回避できます。

### 目次の生成

公式の`blog`テーマなどを使っている場合、マークダウンファイル内に`${toc}`を記述しておくと、Pagicが目次を自動生成してくれて便利です。

```markdown
---
title: 2021/05/24〜2021/05/30の最新情報
tags:
  - Sinco
  - Deno Deploy
  - Velociraptor
  - Cliffy
categories:
  - news
---

${toc}


## [Sinco v2.0.0のリリース](https://github.com/drashland/sinco/releases/tag/v2.0.0)

...
```

## ビルド/リビルドの高速化

ローカルでページを編集した際に、編集内容をプレビューしたい場合があります。

しかし、ファイル数が多くなるとビルドにそれなりに時間がかかります。

そのような場合、一時的にプラグインの読み込みやビルド対象のファイルを限定することで、ある程度の高速化が期待できます。

```jsx
export default {
  plugins: ["-clean", "blog", "ga"],
  include: ["articles/2021/05"],
    ...
};
```

このように`pagic.config.tsx`の設定を変更することで、以下のような効果を見込めます。

- `plugins`に`-clean`を指定して`clear`プラグインを無効化することで、静的ファイルの生成が若干高速化されます。
- `include`に`articles/2021/05`を指定することで、そのディレクトリ配下のファイルのみがビルドされるようになります。

### 404ページについて

GitHub Pagesで404ページをカスタマイズしたいときは、[404.html](http://docs.github.com/ja/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)というファイルを用意する必要があります。

週刊Denoのサイトでは、`404.html`を動的に生成するために、プロジェクトルートに`404.tsx`を配置しています。

```tsx
import { React } from "pagic";
import type { PagicLayout } from "pagic";

const NotFoundPage: PagicLayout = ({ config }) => (
  <>
    <h1>ページが見つかりませんでした</h1>
    <ul>
      <li>
        <a href={`${config.root}index.html`}>TOPページ</a>
      </li>
      <li>
        <a href={`${config.root}tags/index.html`}>タグ一覧</a>
      </li>
      <li>
        <a href={`${config.root}archives/index.html`}>アーカイブ</a>
      </li>
    </ul>
  </>
);

export default NotFoundPage;
```

### Twitterカードを生成したい

Pagicの組み込みテーマ(`default` or `blob` or `docs`)を使っている場合、`pagic.config.tsx`の`blog.social.twitter`を設定しておくと、Twitterカード用のmetaタグが生成されます。

```shell
export default {
  ...
  blog: {
    root: "/articles",
    social: {
      github: "uki00a",
      email: "uki00a@gmail.com",
      twitter: "uki00a",
    },
  },
  ...
}
```

## 参考情報

https://github.com/xcatliu/pagic
