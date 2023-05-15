import { HandshakeStatus } from "@replit/extensions";
import { useReplit, useThemeValues } from "@replit/extensions-react";
import { CloudOff, RefreshCw, Loader } from "react-feather";
import { tokens, rcss } from "../lib/tokens";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeValues = useThemeValues();
  const { status } = useReplit();

  const mappedThemeValues = themeValues
    ? Object.entries(themeValues).map(
        ([key, val]) =>
          `--${key.replace(
            /[A-Z]/g,
            (c) => "-" + c.toLowerCase()
          )}: ${val} !important;`
      )
    : [];

  if (status === HandshakeStatus.Error) {
    return (
      <div css={[rcss.flex.grow(1), rcss.center, rcss.flex.column]}>
        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(8),
            rcss.align.center,
            rcss.p(16),
            rcss.borderRadius(16),
            rcss.neumorph(8, 16),
            rcss.linearGradient(-45, [
              tokens.backgroundHigher,
              tokens.backgroundDefault,
            ]),
            {
              border: `solid 1px ${tokens.backgroundDefault}`,
              maxWidth: 360,
            },
          ]}
        >
          <CloudOff size={48} color={tokens.outlineDefault} />

          <span className="header">Handshake Failed</span>

          <p>
            This extension couldn't establish a handshake with the Replit
            workspace. Please click the <RefreshCw size="1em" /> button to try
            again.
          </p>
        </div>
      </div>
    );
  } else if (status === HandshakeStatus.Loading) {
    return (
      <div css={[rcss.flex.grow(1), rcss.center, rcss.flex.column]}>
        <Loader
          size={48}
          color={tokens.outlineDefault}
          css={{ animation: "spin linear 1s infinite" }}
        />
      </div>
    );
  } else {
    return (
      <>
        <style>{`:root, .replit-ui-theme-root {
${mappedThemeValues.join("\n")}
        }`}</style>
        {children}
      </>
    );
  }
}
