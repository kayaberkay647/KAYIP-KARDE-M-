import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const PUBLIC = path.join(ROOT, "public");
export const PRODUCTION = path.join(ROOT, "production");
export const STATUS_FILE = path.join(ROOT, "src/generated/asset-status.json");

export function walk(dir: string, base = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full, base);
    if (e.name.startsWith(".")) return [];
    return [path.relative(base, full).split(path.sep).join("/")];
  });
}

/** ffprobe ile ses süresi (sn). ffprobe yoksa undefined. */
export function probeDuration(file: string): number | undefined {
  try {
    const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file], { encoding: "utf8" });
    const d = parseFloat(out.trim());
    return Number.isFinite(d) ? Math.round(d * 1000) / 1000 : undefined;
  } catch {
    return undefined;
  }
}

export function loadEnv() {
  const f = path.join(ROOT, ".env");
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

export const args = process.argv.slice(2);
export const flag = (name: string) => args.includes(`--${name}`);
export const opt = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
