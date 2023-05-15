import { atom } from 'jotai';

export type Packager = "npm" | "yarn" | "pnpm";

export const PackageViewing = atom<string | null>(null);
export const PackagerName = atom<Packager | null>(null);