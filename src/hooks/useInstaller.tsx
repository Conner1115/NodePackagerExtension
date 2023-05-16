import { messages, exec, fs } from "@replit/extensions";
import { useWatchTextFile } from "@replit/extensions-react";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import parseNixDeps from "../lib/parseNix";
import { IsInstalling, Packager } from "../state";

export default function useInstaller(
  onOutput: (output: string) => void = (_: string) => {}
) {
  const [installing, setInstalling] = useAtom(IsInstalling);
  const [output, setOutput] = useState("");

  const { content, writeChange, watchError } = useWatchTextFile({
    filePath: "replit.nix",
  });

  const install = useCallback(
    async (installer: Packager | null) => {
      if (installing) {
        messages.showWarning("Installation in progress, please wait");
        return;
      } else if (watchError || !content) {
        messages.showWarning("Could not read replit.nix");
        return;
      } else {
        setInstalling(true);
        setOutput("");
        let installCommand = "npm install";

        switch (installer) {
          case "yarn":
            installCommand = "yarn";
            if (!content.includes("pkgs.yarn")) {
              messages.showNotice("Adding yarn to replit.nix");
              writeChange({
                from: 0,
                to: content.length,
                insert: content.replace(/deps.+\[[\w\W\n]+\]/, (c) =>
                  c.replace("]", "\tpkgs.yarn\n\t]")
                ),
              });
              await exec({
                args: "echo 'Added yarn to replit.nix.  Please press the install button again.'",
                onOutput: (out) => {
                  setOutput((o) => o + out);
                  onOutput(out);
                },
              });
              setInstalling(false);
              return;
            }
            break;
          case "pnpm":
            installCommand = "pnpm install";
            if (!content.includes("pnpm")) {
              writeChange({
                from: 0,
                to: content.length,
                insert: content.replace(/deps.+\[[\w\W\n]+\]/, (c) =>
                  c.replace("]", "\tpkgs.nodePackages.pnpm\n\t]")
                ),
              });
              await exec({
                args: "echo 'Added pnpm to replit.nix.  Please press the install button again.'",
                onOutput: (out) => {
                  setOutput((o) => o + out);
                  onOutput(out);
                },
              });
              setInstalling(false);
              return;
            }
            break;
          case "npm":
            if (!content.includes("nodejs")) {
              messages.showError("NodeJS is not installed.");
              setInstalling(false);
            }
            break;
          default:
            messages.showError("Unknown packager");
            return;
        }

        await exec({
          args: installCommand,
          onOutput: (out) => {
            setOutput((o) => o + out);
            onOutput(out);
          },
        });

        setInstalling(false);
      }
    },
    [installing, content, watchError]
  );

  return { install, installing, output };
}
