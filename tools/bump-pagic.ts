import {
  fromFileUrl,
  joinPaths
} from "../deps.ts";

async function bumpPagic(path: string, newVersion: string): Promise<void> {
  const contents = await Deno.readTextFile(path);
  const newContents = contents.replace(/https:\/\/deno.land\/x\/pagic@(v\d+\.\d+\.\d+)\/mod.ts/, (match, version) => {
    return match.replace(version, newVersion.startsWith("v") ? newVersion : `v${newVersion}`);
  });
  await Deno.writeTextFile(path, newContents);
}

async function main(): Promise<void> {
  const rootDir = fromFileUrl(new URL("..", import.meta.url));
  const [newVersion] = Deno.args;
  await bumpPagic(joinPaths(rootDir, "src", "_deps.tsx"), newVersion);
  await bumpPagic(joinPaths(rootDir, ".github", "workflows", "build.yml"), newVersion);
}

if (import.meta.main) {
  await main();
}