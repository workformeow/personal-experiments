# VS Code Settings

Backup of my VS Code user settings, for setting up a new machine.

## Restore

1. Install fonts: [Fira Code](https://github.com/tonsky/FiraCode) and [Hack](https://github.com/source-foundry/hack).
2. Install extensions:

```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension redhat.vscode-yaml
code --install-extension github.github-vscode-theme
code --install-extension pkief.material-icon-theme
code --install-extension aaron-bond.better-comments
code --install-extension codeium.codeium
code --install-extension anthropic.claude-code
```

3. Copy `settings.json` to:
   - Windows: `%APPDATA%\Code\User\settings.json`
   - macOS: `~/Library/Application Support/Code/User/settings.json`
   - Linux: `~/.config/Code/User/settings.json`
4. Restart VS Code.
