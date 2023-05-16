import { messages } from "@replit/extensions";

export default function parseNixDeps(content: string) {
  const depsSection = content.match(/deps.+\[[\w\W\n]+\]/);

  if (depsSection && typeof depsSection[0] === "string") {
    const deps = depsSection[0]
      .split(/\[|\]/)[1]
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    return {
      deps,
    };
  } else {
    return null;
  }
}
