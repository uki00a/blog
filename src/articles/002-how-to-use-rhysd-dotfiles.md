---
publishDate: 2020-08-23
title: rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする
tags:
  - vim
  - vscode
---

# rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする

## はじめに

[dotfilesリポジトリ](https://github.com/uki00a/dotfiles)の管理をシェルスクリプトから[rhysd/dotfiles](https://github.com/rhysd/dotfiles)に移行しました。

この記事では`rhysd/dotfiles`を使ってdotfilesリポジトリを管理するについて記載します。

## `rhysd/dotfiles`とは?

dotfilesリポジトリの管理を楽にしてくれるツールです。

以下の作業を自動化してくれます:

- 設定ファイルに対するシンボリックリンクの作成
- シンボリックリンクの削除

## インストール

以下のいずれかの手段でインストールできます

- `go get`を使う
- [Releases](https://github.com/rhysd/dotfiles/releases)ページからダウンロードする

## dotfilesリポジトリのクローン

ドキュメントによると、以下のコマンドでcloneできるようです。

```shell
# github.com/uki00a/dotfilesをクローンする
$ dotfiles clone uki00a
```

筆者は[ghq](https://github.com/x-motemen/ghq)を使っているため、以下のコマンドでdotfilesリポジトリをcloneしました。

```shell
$ ghq get https://github.com/uki00a/dotfiles.git
```

## 基本的な使い方

基本的には、cloneしてきたリポジトリへ移動し、以下のコマンドを実行するだけです。
これにより、シンボリックリンクの作成が自動化されます。

```shell
$ dotfiles link
```

また、ドライランにも対応しています。
以下のコマンドを実行することで、どのファイルに対してシンボリックリンクが作成されるかを確認することができます。

```shell
$ dotfiles link --dry
No repository was specified nor $DOTFILES_REPO_PATH was not set. Assuming current repository is a dotfiles repository.

Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/vim' -> '/home/uki00a/.config/nvim'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/vim' -> '/home/uki00a/.vim'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/vscode/keybindings.json' -> '/home/uki00a/.config/Code/User/keybindings.json'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/vscode/settings.json' -> '/home/uki00a/.config/Code/User/settings.json'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/.agignore' -> '/home/uki00a/.agignore'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/.tmux.conf' -> '/home/uki00a/.tmux.conf'
Exist: '/home/uki00a/ghq/github.com/uki00a/dotfiles/.vimrc' -> '/home/uki00a/.vimrc'
```

## カスタムマッピングを定義する

`rhysd/dotfiles`は、[src/mappings.go](https://github.com/rhysd/dotfiles/blob/master/src/mappings.go)にて、シンボリックリンクを作成すべきファイルを管理しています。
ここで定義されている設定ファイルについては、特に設定をしなくとも、`dotfiles link`を実行するだけでシンボリックリンクの作成が自動化されます。

しかし、[src/mappings.go](https://github.com/rhysd/dotfiles/blob/master/src/mappings.go)で定義されていない設定ファイルについては、自身でマッピングを定義する必要があります。

まず、`.dotfiles`ディレクトリを作成し、このディレクトリ内に自身のOS環境に応じて以下のファイルを作成します。

- `mappings_linux.json` (Linux環境向け)
- `mappings_darwin.json` (Mac OS環境向け)
- `mappings_windows.json` (Windows環境向け)
- `mappings_unixlike.json` (LinuxまたはMac OS共通)
- `mappings.json` (全OS共通のマッピング情報を定義する)

筆者はLinuxを使用しているため、以下のような内容で`.dotfiles/mappings_unixlike.json`を作成しました。

```json
{
  "vim": ["~/.config/nvim", "~/.vim"],
  "vscode/settings.json": "~/.config/Code/User/settings.json",
  "vscode/keybindings.json": "~/.config/Code/User/keybindings.json"
}
```

デフォルトでは、`rhysd/dotfiles`はvscodeやNeovimの設定ファイルを認識しないため、それらに関するマッピング情報を定義しています。

この状態で`dotfiles link`を実行すると、vscodeやNeovimの設定ファイルに対するシンボリックリンクが作成されるようになります。

## シンボリックリンクの削除

以下のコマンドを実行すると、`rhysd/dotfiles`によって作成されたシンボリックリンクが削除されます。

```shell
$ dotfiles clean
```

## おわりに

この記事では`rhysd/dotfiles`の使い方について解説しました。
このツールを使うことでシンボリックリンク等の作成が自動化されるため、とても便利だと思いました。
興味があれば、ぜひ使ってみてください。
