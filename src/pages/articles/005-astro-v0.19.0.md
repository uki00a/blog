---
date: 2021-08-22
title: Astro v0.19.0の新機能について
tags:
  - Astro
  - JavaScript
  - Node.js
  - Jamstack
layout: ../../layouts/Article.astro
---

[Astro](https://astro.build/)のv0.19.0がリリースされました。

この記事では、v0.19.0で追加された新機能について紹介します。

## Astroとは?

Node.jsで実装されたスタティックサイトジェネレータです。

以下のような特徴があります。

- [Snowpack](https://www.snowpack.dev/)をベースとしており、高い生産性が期待できる
- [Partial Hydration](https://docs.astro.build/core-concepts/component-hydration)という独自の仕組みを提供している
- [Astroコンポーネント](https://docs.astro.build/core-concepts/astro-components)というJSXライクな独自形式でページなどを記述できる
- Markdownサポート
- React/Preact/Vue.js/Svelteなどのフレームワークもサポート

## ダイナミックルーティング

動的にページを生成するためにダイナミックルーティングの仕組みが実装されました。

ページネーションやタグ機能を実装したり、ContentfulやmicroCMSなどのHeadless CMSと連携して記事の一覧を生成したい場合などに使用することができます。

### 例) タグ機能の実装

ダイナミックルーティングを使用したタグ機能の実装例を紹介します。

まず、各記事で[Frontmatter](https://middlemanapp.com/jp/basics/frontmatter/)を使用して`tags`を定義します。

```markdown
---
date: 2020-08-22
title: Denoの使い方
tags:
  - deno
  - TypeScript
layout: ../../layouts/Article.astro
---

# Denoの使い方

## Hello, world!

...
```

次に、`src/pages/tags/[tag].astro`というファイルを用意します。

```jsx
---
import Layout from '../../layouts/Base.astro';

export function getStaticPaths() {
  const allArticles = Astro.fetchContent('../articles/*.md');
  const articlesByTag = allArticles.reduce((articlesByTag, article) => {
    for (const tag of article.tags) {
      if (!articlesByTag[tag]) {
        articlesByTag[tag] = [];
      }
      articlesByTag[tag].push(article);
    }
    return articlesByTag;
  }, {});
  const paths = Object.entries(articlesByTag).map(([tag, articles]) => {
    const params = { tag };
    const props = { articles: articles.sort((a, b) => new Date(b.date) - new Date(a.date)) };
    return { params, props };
  });

  return paths;
}

const { tag } = Astro.request.params;
const { articles } = Astro.props;
---

<Layout
  tag={tag}
  articles={articles}>
  <section>
    <h2>#{tag}</h2>
    <ul>
    {
      articles.map((x) => (
        <li>
          <a href={x.url}>{x.title}</a>
        </li>
      ))
    }
    </ul>
  </section>
</Layout>
```

ダイナミックルーティングを使いたいときは、このようにファイル名を`[slug].astro`という形式にします。

そして、`getStaticPaths`関数をexportする必要があります。

ダイナミックルーティングによって生成されるページのパスは`getStaticPaths`関数から返却された`params`の値を元に決定されます。

例えば、`getStaticPaths`を実行した結果、以下の値が返却されたとします。

```javascript
{
  params: [
    { tag: "deno" },
    { tag: "TypeScript" }
  ],
  props: [
    ...
  ]
}
```

この場合、最終的に以下のようなページが生成されます。

- `/tags/deno`
- `/tags/TypeScript`

## client:onlyディレクティブ

`client:only`ディレクティブが追加されました。

これが付与されたコンポーネントはビルド時にレンダリングされず、ブラウザ上でhydrateされるようになります。

`Window`などのブラウザ上で提供されるAPIに依存したコンポーネントに付与することを意図しているようです。

## Astro.resolve()

Astroコンポーネント中で相対パスを解決するために使うAPIです。

例えば、`src/pages/index.astro`から`src/assets/logo.png`を読み込みたいとします。

この場合、以下のように記述してもうまく読み込むことはできません。

```jsx
<img src="../assets/avatar.png" />
```

`Astro.resolve()`を使用することでこの問題を解決できます。

```jsx
<img src={Astro.resolve("../assets/avatar.png")} />
```

## 参考

- https://astro.build/blog/astro-019
