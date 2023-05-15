import { PackagerName } from "../state";
import { rcss, tokens } from "../lib/tokens";
import { useAtom } from "jotai";
import { ButtonHTMLAttributes } from "react";
import { useReplitEffect } from "@replit/extensions-react";
import { Box, Download, Loader } from "react-feather";
import { FsNodeType, messages } from "@replit/extensions";
import Button from "./Button";

const PackagerButton = ({
  active,
  ...props
}: {
  active: boolean;
} & ButtonHTMLAttributes<any>) => {
  return (
    <button
      css={[
        {
          border: "none",
          cursor: "pointer",
        },
        rcss.px(8),
        rcss.py(4),
        rcss.borderRadius(4),
        active
          ? [
              {
                color: tokens.accentPrimaryStronger,
                background: tokens.backgroundHigher,
              },
            ]
          : [
              {
                color: tokens.foregroundDimmest,
                background: "transparent",
              },
            ],
      ]}
      {...props}
    ></button>
  );
};

export default function Header() {
  const [packagerName, setPackagerName] = useAtom(PackagerName);

  useReplitEffect(
    async ({ fs }) => {
      const dirContents = await fs.readDir(".");

      if (dirContents.children) {
        const files = dirContents.children.filter(
          (c) => c.type === FsNodeType.File
        );

        if (files.some((x) => x.filename === "yarn.lock")) {
          setPackagerName("yarn");
        } else if (files.some((x) => x.filename === "package-lock.json")) {
          setPackagerName("npm");
        } else if (files.some((x) => x.filename === "pnpm-lock.yaml")) {
          setPackagerName("pnpm");
        }
      }
    },
    [packagerName]
  );

  return (
    <div
      css={[
        rcss.neumorph(4, 8),
        rcss.borderRadius(16),
        rcss.py(8),
        rcss.px(16),
        rcss.linearGradient(0, [
          tokens.backgroundDefault,
          tokens.backgroundHigher,
        ]),
        rcss.flex.row,
        rcss.rowWithGap(8),
        rcss.align.center,
      ]}
    >
      <span className="header">
        Node Packager <Box size="1em" />
      </span>

      <div css={[rcss.flex.grow(1)]} />

      <Button>
        <Download size={16} />
      </Button>

      {packagerName ? (
        <div
          css={[
            rcss.neumorphInset(2, 4),
            rcss.p(8),
            rcss.borderRadius(8),
            rcss.flex.row,
            rcss.rowWithGap(8),
          ]}
        >
          <PackagerButton
            active={packagerName === "npm"}
            onClick={() => setPackagerName("npm")}
          >
            NPM
          </PackagerButton>

          <PackagerButton
            active={packagerName === "yarn"}
            onClick={() => setPackagerName("yarn")}
          >
            Yarn
          </PackagerButton>

          <PackagerButton
            active={packagerName === "pnpm"}
            onClick={() => setPackagerName("pnpm")}
          >
            PNPM
          </PackagerButton>
        </div>
      ) : (
        <Loader size={16} css={{ animation: "spin 1s infinite linear" }} />
      )}
    </div>
  );
}
