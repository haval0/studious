#from https://www.reddit.com/r/NixOS/comments/1h7stwc/react_native_with_expo_and_emulation_basic_flake/

{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    android-nixpkgs = {
      url = "github:tadfisher/android-nixpkgs/stable";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, android-nixpkgs }: 
  let
    pkgs = import nixpkgs {
      system = "x86_64-linux";
      config = {
        allowUnfree = true;
      };
    };

    android-sdk = android-nixpkgs.sdk.x86_64-linux (sdkPkgs: with sdkPkgs; [
      cmdline-tools-latest
      build-tools-35-0-0
      platform-tools
      platforms-android-35
      emulator
    ]); 
  in {
    devShells.x86_64-linux.default = pkgs.mkShell rec { 
      nativeBuildInputs = with pkgs; [ 
        pnpm
	nodejs
        typescript-language-server
        watchman
        jdk
	libvirt
        android-studio
        android-sdk
      ];
    };
  };
}
