import projectConfig from 'https://uki00a.github.io/blog/pagic.config.js';
import Ga from 'https://uki00a.github.io/blog/_ga.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "articles/004-use-deno-std-testing-bench-module-from-node.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/004-use-deno-std-testing-bench-module-from-node.html",
    'title': "deno_std/testing/benchをNode.jsから使用する",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>deno_std/testing/benchをNode.jsから使用する</h1>\n<h2 id="%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">はじめに<a class="anchor" href="#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">§</a></h2>\n<p>この記事では、Node.jsからdeno_stdの<a href="https://github.com/denoland/deno_std/tree/main/testing">testing/benchモジュール</a>を使用する方法について解説します。</p>\n<h2 id="%E7%A2%BA%E8%AA%8D%E7%92%B0%E5%A2%83">確認環境<a class="anchor" href="#%E7%A2%BA%E8%AA%8D%E7%92%B0%E5%A2%83">§</a></h2>\n<ul>\n<li>Deno: v1.10.3</li>\n<li>Node.js: v16.3.0</li>\n</ul>\n<h2 id="%E8%A7%A3%E8%AA%AC">解説<a class="anchor" href="#%E8%A7%A3%E8%AA%AC">§</a></h2>\n<p><code>benchmark.ts</code>というファイルがあったとします。</p>\n<pre class="language-typescript"><code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>\n  bench<span class="token punctuation">,</span>\n  BenchmarkRunResult<span class="token punctuation">,</span>\n  runBenchmarks<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"<a class="token url-link" href="https://deno.land/std@0.97.0/testing/bench.ts">https://deno.land/std@0.97.0/testing/bench.ts</a>"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token operator">...</span>numbers<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>BenchmarkRunResult<span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token function">bench</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">sum</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n    runs<span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">func</span><span class="token operator">:</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      b<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      b<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token function">runBenchmarks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p><code>run</code>関数では、deno_stdの<code>testing/bench</code>モジュールを使用してベンチマークを取っています。</p>\n<p>このファイルはTypeScriptで記述されているため、このままではNode.jsから利用することはできません。</p>\n<p>Denoには<code>deno bundle</code>コマンドというバンドラを内蔵しているため、これを使用してJavaScript形式へ変換してみます。</p>\n<pre class="language-shell"><code class="language-shell">$ deno bundle benchmark.ts <span class="token operator">></span> benchmark.mjs\n</code></pre>\n<p>次に、<code>benchmark.mjs</code>をimportしてベンチマークを実行するためのJavaScriptファイル(<code>node.mjs</code>)を用意してみます。</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> run <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">"./benchmark.mjs"</span><span class="token punctuation">;</span>\n\nglobal<span class="token punctuation">.</span><span class="token property-access"><span class="token maybe-class-name">Deno</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>testing/bench</code>モジュールは<code>Deno</code>オブジェクトが存在しないとエラーが発生してしまうため、上記のコードでは<code>global.Deno</code>に空オブジェクトを設定しています。</p>\n<p>それでは、実行してみます。</p>\n<pre class="language-shell"><code class="language-shell">$ node node.mjs\nrunning <span class="token number">1</span> benchmark <span class="token punctuation">..</span>.\nbenchmark <span class="token function">sum</span> <span class="token punctuation">..</span>.\n  <span class="token number">10000</span> runs avg: <span class="token number">0</span>.00033167510032653806ms\nbenchmark result: DONE. <span class="token number">1</span> measured<span class="token punctuation">;</span> <span class="token number">0</span> filtered\n</code></pre>\n<p>うまくいきました！</p>\n<h2 id="%E8%A3%9C%E8%B6%B3-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6nodejs%E3%81%8B%E3%82%89deno_std%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE">(補足) どうしてNode.jsからdeno_stdを使っているの？<a class="anchor" href="#%E8%A3%9C%E8%B6%B3-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6nodejs%E3%81%8B%E3%82%89deno_std%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE">§</a></h2>\n<p><a href="https://github.com/denodrivers/redis">deno-redis</a>というDenoで実装されたRedisクライアントがあります。</p>\n<p>現在、<code>deno-redis</code>のメンテナンスをしているのですが、個人的な目標としてNode.jsの<a href="https://github.com/luin/ioredis">ioredis</a>と同等レベルのパフォーマンスを出したいというのがあります。</p>\n<p>その関係もあって、CIでdeno-redisとioredisで同様のコードを実行し、それぞれのパフォーマンスを計測するということを行っています。</p>\n<h2 id="%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB">おわりに<a class="anchor" href="#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB">§</a></h2>\n<p>この記事では、Node.jsから<a href="https://github.com/denoland/deno_std/tree/main/testing">testing/benchモジュール</a>を使用する方法について解説しました。</p>\n<p>Denoに向けて書かれた他のモジュールについても、この記事で解説したものと同様の方法によってNode.jsからも使用できる可能性がありますので、参考になれば幸いです。</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "G-R8RKYMTR71" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement("link", { href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css", rel: "stylesheet" }),
            React.createElement("link", { href: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico", rel: "icon" }),
            React.createElement("meta", { content: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png", property: "og:image" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "https://uki00a.github.io/blog/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "deno_std/testing/bench\u3092Node.js\u304B\u3089\u4F7F\u7528\u3059\u308B"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">はじめに<a class="anchor" href="#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">§</a></h2>\n<p>この記事では、Node.jsからdeno_stdの<a href="https://github.com/denoland/deno_std/tree/main/testing">testing/benchモジュール</a>を使用する方法について解説します。</p>\n<h2 id="%E7%A2%BA%E8%AA%8D%E7%92%B0%E5%A2%83">確認環境<a class="anchor" href="#%E7%A2%BA%E8%AA%8D%E7%92%B0%E5%A2%83">§</a></h2>\n<ul>\n<li>Deno: v1.10.3</li>\n<li>Node.js: v16.3.0</li>\n</ul>\n<h2 id="%E8%A7%A3%E8%AA%AC">解説<a class="anchor" href="#%E8%A7%A3%E8%AA%AC">§</a></h2>\n<p><code>benchmark.ts</code>というファイルがあったとします。</p>\n<pre class="language-typescript"><code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>\n  bench<span class="token punctuation">,</span>\n  BenchmarkRunResult<span class="token punctuation">,</span>\n  runBenchmarks<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"<a class="token url-link" href="https://deno.land/std@0.97.0/testing/bench.ts">https://deno.land/std@0.97.0/testing/bench.ts</a>"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token operator">...</span>numbers<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>BenchmarkRunResult<span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token function">bench</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">sum</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n    runs<span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">func</span><span class="token operator">:</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      b<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      b<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token function">runBenchmarks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p><code>run</code>関数では、deno_stdの<code>testing/bench</code>モジュールを使用してベンチマークを取っています。</p>\n<p>このファイルはTypeScriptで記述されているため、このままではNode.jsから利用することはできません。</p>\n<p>Denoには<code>deno bundle</code>コマンドというバンドラを内蔵しているため、これを使用してJavaScript形式へ変換してみます。</p>\n<pre class="language-shell"><code class="language-shell">$ deno bundle benchmark.ts <span class="token operator">></span> benchmark.mjs\n</code></pre>\n<p>次に、<code>benchmark.mjs</code>をimportしてベンチマークを実行するためのJavaScriptファイル(<code>node.mjs</code>)を用意してみます。</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> run <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">"./benchmark.mjs"</span><span class="token punctuation">;</span>\n\nglobal<span class="token punctuation">.</span><span class="token property-access"><span class="token maybe-class-name">Deno</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>testing/bench</code>モジュールは<code>Deno</code>オブジェクトが存在しないとエラーが発生してしまうため、上記のコードでは<code>global.Deno</code>に空オブジェクトを設定しています。</p>\n<p>それでは、実行してみます。</p>\n<pre class="language-shell"><code class="language-shell">$ node node.mjs\nrunning <span class="token number">1</span> benchmark <span class="token punctuation">..</span>.\nbenchmark <span class="token function">sum</span> <span class="token punctuation">..</span>.\n  <span class="token number">10000</span> runs avg: <span class="token number">0</span>.00033167510032653806ms\nbenchmark result: DONE. <span class="token number">1</span> measured<span class="token punctuation">;</span> <span class="token number">0</span> filtered\n</code></pre>\n<p>うまくいきました！</p>\n<h2 id="%E8%A3%9C%E8%B6%B3-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6nodejs%E3%81%8B%E3%82%89deno_std%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE">(補足) どうしてNode.jsからdeno_stdを使っているの？<a class="anchor" href="#%E8%A3%9C%E8%B6%B3-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6nodejs%E3%81%8B%E3%82%89deno_std%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE">§</a></h2>\n<p><a href="https://github.com/denodrivers/redis">deno-redis</a>というDenoで実装されたRedisクライアントがあります。</p>\n<p>現在、<code>deno-redis</code>のメンテナンスをしているのですが、個人的な目標としてNode.jsの<a href="https://github.com/luin/ioredis">ioredis</a>と同等レベルのパフォーマンスを出したいというのがあります。</p>\n<p>その関係もあって、CIでdeno-redisとioredisで同様のコードを実行し、それぞれのパフォーマンスを計測するということを行っています。</p>\n<h2 id="%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB">おわりに<a class="anchor" href="#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB">§</a></h2>\n<p>この記事では、Node.jsから<a href="https://github.com/denoland/deno_std/tree/main/testing">testing/benchモジュール</a>を使用する方法について解説しました。</p>\n<p>Denoに向けて書かれた他のモジュールについても、この記事で解説したものと同様の方法によってNode.jsからも使用できる可能性がありますので、参考になれば幸いです。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB" }, "\u306F\u3058\u3081\u306B")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%A2%BA%E8%AA%8D%E7%92%B0%E5%A2%83" }, "\u78BA\u8A8D\u74B0\u5883")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%A7%A3%E8%AA%AC" }, "\u89E3\u8AAC")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%A3%9C%E8%B6%B3-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6nodejs%E3%81%8B%E3%82%89deno_std%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE" }, "(\u88DC\u8DB3) \u3069\u3046\u3057\u3066Node.js\u304B\u3089deno_std\u3092\u4F7F\u3063\u3066\u3044\u308B\u306E\uFF1F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB" }, "\u304A\u308F\u308A\u306B")))),
    'author': "uki00a",
    'contributors': [
        "uki00a"
    ],
    'date': "2021-06-03T21:14:59.000Z",
    'updated': null,
    'excerpt': "はじめに この記事では、Node.jsからdeno_stdのtesting/benchモジュールを使用する方法について解説します。 確認環境 - Deno: v1.10.3 - Node.js: v16.3.0 解説 benchmark.tsというファイルがあったとします。 import { bench...",
    'cover': undefined,
    'publishDate': "2021-06-04T00:00:00.000Z",
    'tags': [
        "deno",
        "Node.js",
        "TypeScript",
        "JavaScript"
    ]
};
