{ pkgs }: {
	deps = [
		pkgs.yarn
  pkgs.nodePackages.prettier
		pkgs.nodejs-18_x
		pkgs.nodePackages.typescript-language-server
		pkgs.replitPackages.jest
		pkgs.yarn
		pkgs.nodePackages.pnpm
	];
}