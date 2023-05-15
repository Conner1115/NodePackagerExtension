import { css } from "@emotion/react";
import { CSSProperties } from "react";

export const tokens = {
  backgroundRoot: `var(--background-root)`,
  backgroundDefault: `var(--background-default)`,
  backgroundHigher: `var(--background-higher)`,
  backgroundHighest: `var(--background-highest)`,

  accentPrimaryDimmest: `var(--accent-primary-dimmest)`,
  accentPrimaryDimmer: `var(--accent-primary-dimmer)`,
  accentPrimaryDefalut: `var(--accent-primary-default)`,
  accentPrimaryStronger: `var(--accent-primary-stronger)`,
  accentPrimaryStrongest: `var(--accent-primary-strongest)`,

  outlineDefault: `var(--outline-default)`,
  outlineDimmer: `var(--outline-dimmer)`,
  outlineDimmest: `var(--outline-dimmest)`,

  foregroundDefault: `var(--foreground-default)`,
  foregroundDimmer: `var(--foreground-dimmer)`,
  foregroundDimmest: `var(--foreground-dimmest)`,
}

export type Space =
  | 0
  | 2
  | 4
  | 8
  | 12
  | 16
  | 24
  | 32
  | 40
  | 48
  | 64
  | 80
  | 128
  | 256;
const toSpace = (space: Space) => `${space}px`;

type BorderRadius = Space | "full";
const toBorderRadius = (radius: BorderRadius) => {
  if (radius === "full") {
    return "50%";
  }

  return radius + "px";
};

export const rcss = {
  p: (space: Space) => css({ padding: toSpace(space) }),
  px: (space: Space) =>
    css({ paddingLeft: toSpace(space), paddingRight: toSpace(space) }),
  py: (space: Space) =>
    css({ paddingTop: toSpace(space), paddingBottom: toSpace(space) }),
  pt: (space: Space) => css({ paddingTop: toSpace(space) }),
  pb: (space: Space) => css({ paddingBottom: toSpace(space) }),
  pl: (space: Space) => css({ paddingLeft: toSpace(space) }),
  pr: (space: Space) => css({ paddingRight: toSpace(space) }),
  m: (space: Space) => css({ margin: toSpace(space) }),
  mx: (space: Space) =>
    css({ marginLeft: toSpace(space), marginRight: toSpace(space) }),
  my: (space: Space) =>
    css({ marginTop: toSpace(space), marginBottom: toSpace(space) }),
  mt: (space: Space) => css({ marginTop: toSpace(space) }),
  mb: (space: Space) => css({ marginBottom: toSpace(space) }),
  ml: (space: Space) => css({ marginLeft: toSpace(space) }),
  mr: (space: Space) => css({ marginRight: toSpace(space) }),

  position: {
    static: css({ position: "static" }),
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" }),
  },

  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    rowReverse: css({ display: "flex", flexDirection: "row-reverse" }),
    columnReverse: css({ display: "flex", flexDirection: "column-reverse" }),
    grow: (flexGrow: number) => css({ flexGrow }),
    growAndShrink: (flex: number) => css({ flexGrow: flex, flexShrink: flex }),
    shrink: (flex: number) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
    wrapReverse: css({ flexWrap: "wrap-reverse" }),
  },

  display: {
    none: css({ display: "none" }),
    block: css({ display: "block" }),
    inline: css({ display: "inline" }),
    inlineBlock: css({ display: "inline-block" }),
    flex: css({ display: "flex" }),
    inlineFlex: css({ display: "inline-flex" }),
    grid: css({ display: "grid" }),
  },

  center: css({ alignItems: "center", justifyContent: "center" }),

  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    stretch: css({ alignItems: "stretch" }),
    baseline: css({ alignItems: "baseline" }),
    end: css({ alignItems: "flex-end" }),
  },

  justify: {
    start: css({ justifyContent: "flex-start" }),
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
    spaceAround: css({ justifyContent: "space-around" }),
    spaceEvenly: css({ justifyContent: "space-evenly" }),
  },

  rowWithGap: (space: Space) =>
    css({
      flexDirection: "row",
      "& > *": { marginRight: toSpace(space) },
      "& > *:last-child": { marginRight: 0 },
    }),

  colWithGap: (space: Space) =>
    css({
      flexDirection: "column",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:last-child": { marginBottom: 0 },
    }),

  rowReverseWithGap: (space: Space) =>
    css({
      flexDirection: "row-reverse",
      "& > *": { marginRight: toSpace(space) },
      "& > *:first-child": { marginRight: 0 },
    }),

  colReverseWithGap: (space: Space) =>
    css({
      flexDirection: "column-reverse",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:first-child": { marginBottom: 0 },
    }),

  borderRadius: (
    ...radius:
      | [BorderRadius]
      | [BorderRadius, BorderRadius, BorderRadius, BorderRadius]
  ) => {
    return css({
      borderRadius: radius.map(toBorderRadius).join(" "),
    });
  },

  textAlign: {
    left: css({ textAlign: "left" }),
    center: css({ textAlign: "center" }),
    right: css({ textAlign: "right" }),
  },

  overflow: (overflow: CSSProperties["overflow"]) => css({ overflow }),
  overflowX: (overflowX: CSSProperties["overflowX"]) => css({ overflowX }),
  overflowY: (overflowY: CSSProperties["overflowY"]) => css({ overflowY }),

  zIndex: (zIndex: number) => css({ zIndex }),

  top: (top: number | string) => css({ top }),
  bottom: (bottom: number | string) => css({ bottom }),
  left: (left: number | string) => css({ left }),
  right: (right: number | string) => css({ right }),

  width: (width: number | string) => css({ width }),
  height: (height: number | string) => css({ height }),
  maxWidth: (maxWidth: number | string) => css({ maxWidth }),
  maxHeight: (maxHeight: number | string) => css({ maxHeight }),
  minWidth: (minWidth: number | string) => css({ minWidth }),
  minHeight: (minHeight: number | string) => css({ minHeight }),

  truncate: css({
    display: "inline-block",
    lineHeight: 1.2,
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  linearGradient: (angle: number, colors: Array<string>) =>
    css({
      backgroundImage: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
    }),

  boxShadow: (boxShadow: string) => css({
    boxShadow
  }),

  neumorph: (distance: Space, blur: Space, level: "default" | "higher" = "default") => {
    let low = tokens.backgroundRoot;
    let high = tokens.backgroundHigher;

    switch (level) {
      case "higher":
        low = tokens.backgroundDefault;
        high = tokens.backgroundHighest;
        break;
    }

    return css({
      boxShadow: `${distance}px ${distance}px ${blur}px ${low}, -${distance}px -${distance}px ${blur}px ${high}` as string
    })
  },

  neumorphInset: (distance: Space, blur: Space, level: "default" | "higher" = "default") => {
    let low = tokens.backgroundRoot;
    let high = tokens.backgroundHigher;

    switch (level) {
      case "higher":
        low = tokens.backgroundDefault;
        high = tokens.backgroundHighest;
        break;
    }

    return css({
      boxShadow: `inset ${distance}px ${distance}px ${blur}px ${low}, inset -${distance}px -${distance}px ${blur}px ${high}` as string
    })
  }
};
