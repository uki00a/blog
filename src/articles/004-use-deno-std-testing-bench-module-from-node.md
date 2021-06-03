---
publishDate: 2021-06-04
title: deno_std/testing/benchをNode.jsから使用する
tags:
  - deno
  - Node.js
  - TypeScript
  - JavaScript
---

# deno_std/testing/benchをNode.jsから使用する

## はじめに

この記事では、Node.jsからdeno_stdの[testing/benchモジュール](https://github.com/denoland/deno_std/tree/main/testing)を使用する方法について解説します。

## 確認環境

* Deno: v1.10.3
* Node.js: v16.3.0

## 解説

`benchmark.ts`というファイルがあったとします。

```typescript
import {
  bench,
  BenchmarkRunResult,
  runBenchmarks,
} from "https://deno.land/std@0.97.0/testing/bench.ts";

function sum(...numbers: number[]): number {
  return numbers.reduce((x, y) => x + y, 0);
}

export function run(): Promise<BenchmarkRunResult> {
  bench({
    name: `sum`,
    runs: 10000,
    func: (b) => {
      b.start();
      sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
      b.stop();
    },
  });

  return runBenchmarks();
}
```

`run`関数では、deno_stdの`testing/bench`モジュールを使用してベンチマークを取っています。

このファイルはTypeScriptで記述されているため、このままではNode.jsから利用することはできません。

Denoには`deno bundle`コマンドというバンドラを内蔵しているため、これを使用してJavaScript形式へ変換してみます。

```shell
$ deno bundle benchmark.ts > benchmark.mjs
```

次に、`benchmark.mjs`をimportしてベンチマークを実行するためのJavaScriptファイル(`node.mjs`)を用意してみます。

```javascript
import { run } from "./benchmark.mjs";

global.Deno = {};

run();
```

`testing/bench`モジュールは`Deno`オブジェクトが存在しないとエラーが発生してしまうため、上記のコードでは`global.Deno`に空オブジェクトを設定しています。

それでは、実行してみます。

```shell
$ node node.mjs
running 1 benchmark ...
benchmark sum ...
  10000 runs avg: 0.00033167510032653806ms
benchmark result: DONE. 1 measured; 0 filtered
```

うまくいきました！

## (補足) どうしてNode.jsからdeno_stdを使っているの？

[deno-redis](https://github.com/denodrivers/redis)というDenoで実装されたRedisクライアントがあります。

現在、`deno-redis`のメンテナンスをしているのですが、個人的な目標としてNode.jsの[ioredis](https://github.com/luin/ioredis)と同等レベルのパフォーマンスを出したいというのがあります。

その関係もあって、CIでdeno-redisとioredisで同様のコードを実行し、それぞれのパフォーマンスを計測するということを行っています。

## おわりに

この記事では、Node.jsから[testing/benchモジュールの使用方法](https://github.com/denoland/deno_std/tree/main/testing)を解説しました。

Denoに向けて書かれた他のモジュールについても、この記事で解説したものと同様の方法によってNode.jsからも使用できる可能性がありますので、参考になれば幸いです。
