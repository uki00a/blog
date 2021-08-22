---
date: 2021-08-22
title: AstroでTailwind CSSを使う
tags:
  - Astro
  - JavaScript
  - Node.js
  - tailwindcss
layout: ../../layouts/Article.astro
---

## はじめに

AstroからTailwind CSSを使う方法について調べてみたので、使用方法について記載します。

## 環境

- Astro v0.19.1
- Tailwind CSS v2.2.7

## セットアップ

まず、YarnやnpmでTailwind CSSをインストールします。

```shell
$ yarn add --dev tailwindcss
```

`tailwind.config.js`を用意します (Vue.jsやSvelteなどを使うときは、`purge`オプションを調整する必要があります)

```javascript
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{astro,js,jsx}'],
};
```

`astro.config.mjs`の`devOptions.tailwindConfig`を編集します。

```javascript
  ...
  devOptions: {
    // port: 3000,         // The port to run the dev server on.
    tailwindConfig: './tailwind.config.js', // Path to tailwind.config.js if used, e.g. './tailwind.config.js'
  },
  ...
```

これでTailwind CSSのクラスを使用できるようになります。

## 注意点

`tailwind.config.js`を編集した場合は、Astroのサーバプロセスを再起動しないと、設定の変更が反映されないみたいです。

## Markdownから生成されたHTMLにTailwind CSSのスタイルを適用する

AstroのMarkdownのレンダリング機能によって生成されたHTMLにTailwind CSSのスタイルを適用する際は、少し工夫が必要です。

[レイアウトコンポーネント](https://github.com/snowpackjs/astro/blob/astro%400.19.1/docs/src/pages/core-concepts/layouts.md)で[グローバルスタイル](https://github.com/snowpackjs/astro/blob/astro%400.19.1/docs/src/pages/guides/styling.md)+[@applyディレクティブ](https://tailwindcss.com/docs/extracting-components#extracting-component-classes-with-apply)を定義すると適用できます。

例)

```jsx
---
import BaseLayout from './Base.astro';

const {content} = Astro.props;
const { title, description } = content;
---

<BaseLayout title={title} description={description}>
  <style global>
  .markdown-body ul {
    @apply list-disc list-inside pl-4 mb-4
  }
  .markdown-body h1, h2, h3 {
    @apply font-bold mb-4
  }
  .markdown-body h1, h2 {
    @apply border-b-2 border-solid border-gray-200 
  }
  .markdown-body h1 {
    @apply text-3xl pb-2
  }
  .markdown-body h2 {
    @apply text-2xl
  }
  .markdown-body h3 {
    @apply text-lg
  }
  .markdown-body p {
    @apply mb-4
  }
  </style>
  <div class="markdown-body">
    <slot />
  </div>
</BaseLayout>
```

## 参考

- https://github.com/snowpackjs/astro/blob/astro%400.19.1/docs/src/pages/guides/styling.md#-tailwind
