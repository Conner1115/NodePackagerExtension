import { ButtonHTMLAttributes } from "react";
import { rcss, tokens } from "../lib/tokens";

export default function Button(props: ButtonHTMLAttributes<any>) {
  return <button {...props} css={[
    rcss.neumorph(2, 8, 'higher'),
    rcss.p(8),
    rcss.borderRadius(8),
    rcss.linearGradient(-45, [
      tokens.backgroundDefault,
      tokens.backgroundHighest
    ]),
    {
      color: tokens.foregroundDefault,
      border: 'none',
      fontSize: 14,
      fontFamily: 'var(--font-family-default)',
      transition: '0.25s',
      '&:hover': [rcss.neumorph(4, 8, 'higher'), {
        cursor: 'pointer',
        color: tokens.accentPrimaryStronger
      }]
    }
  ]}/>
}