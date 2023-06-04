# LaTeX recognition

This application is a [Tauri](https://tauri.app/)
bundle using the [MyScript API](https://www.myscript.com/)

![](app.png)

# Compile

### Dependencies (Arch)
```bash
sudo pacman -S fuse2
sudo pacman -S webkit2gtk
cargo install tauri-cli
```

## Tauri Build

```bash
cargo tauri build
# Dev:
# cargo tauri dev
```