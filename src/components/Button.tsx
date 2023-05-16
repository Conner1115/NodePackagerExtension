import { ButtonHTMLAttributes } from "react";
import { rcss, tokens } from "../lib/tokens";

export default function Button(props: ButtonHTMLAttributes<any>) {
  return (
    <button
      {...props}
      css={[
        rcss.neumorph(2, 8, "higher"),
        rcss.p(8),
        rcss.borderRadius(8),
        rcss.linearGradient(-45, [
          tokens.backgroundDefault,
          tokens.backgroundHighest,
        ]),
        {
          color: tokens.foregroundDefault,
          border: `solid 1px ${tokens.backgroundDefault}`,
          fontSize: 14,
          fontFamily: "var(--font-family-default)",
          transition: "0.25s",
          "&:hover": [
            {
              cursor: "pointer",
              color: tokens.accentPrimaryStronger,
              borderColor: tokens.accentPrimaryDefault,
            },
          ],
          "&:focus": {
            border: `solid 2px ${tokens.accentPrimaryDimmer}`,
          },
          "&:active": [
            rcss.neumorphInset(2, 4),
            {
              borderColor: tokens.accentPrimaryDefault,
            },
          ],
        },
      ]}
    />
  );
}
