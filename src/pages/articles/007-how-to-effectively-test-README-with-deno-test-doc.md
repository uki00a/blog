---
date: 2021-08-23
title: deno test --docでREADME.mdをうまくテストする
tags:
  - deno
layout: ../../layouts/Article.astro
---

## はじめに

[Deno v1.13](https://deno.com/blog/v1.13)から`deno test --doc`コマンドでMarkdownファイルがサポートされました。

この機能を利用することで、`README.md`などに記述したサンプルコードの型チェックをすることができます。

そのため、Denoモジュールを[deno.land/x](https://deno.land/x)や[nest.land](https://nest.land/)などに公開する場合、サンプルコードが正しく動作することを保証するのにとても役立ちます。

## 問題

`README.md`などにサンプルコードを記述する際は、以下のように`import`節には[deno.land/x](https://deno.land/x)の公開URLを記述することが一般的だと思います。

例)

~~~~~~markdown
  ## Usage

  ```ts
  import { connect } from "https://deno.land/x/redis/mod.ts";
  
  const redis = await connect({ hostname: "127.0.0.1" });
  await redis.set("foo", "bar");
  const value = await redis.get("foo");
  console.assert(typeof value === "string");
  await redis.del("foo");
  ```
~~~~~~

この場合、モジュールは`https://deno.land/x/redis/mod.ts`から読み込まれてしまうため、**CIなどで最新状態のソースに対してテストができない**問題があります。

## 解決策

この問題は[Import maps](https://deno.land/manual@v1.13.1/linking_to_external_code/import_maps)を使用することで解決できます。

以下のように`import_map.test.json`を用意します。

```json
{
  "imports": {
    "https://deno.land/x/redis/mod.ts": "./mod.ts"
  }
}
```

そして、`deno test --doc`コマンドを実行する際に`--import-map`オプションでこのファイルを指定します。

```shell
$ deno test --doc --no-run --import-map=import_map.test.json README.md
```

こうすることで、`https://deno.land/x/redis/mod.ts`が`./mod.ts`の読み込みに置き換えられるため、ローカルの最新状態の`mod.ts`に対してテストすることができます。

## 参考

- [Deno 1.13 Release Notes](https://deno.com/blog/v1.13) 

### 環境

- Deno v1.13.1
