<p align="center"><img src="logo.svg" alt="Emacs Hero" width="200"></p>

# Emacs Hero ⌨️🦸

*[🇪🇸 Leer en Español](README.es.md)*

**Emacs Hero** is an interactive, single-file (`index.html`) web application designed to teach and train muscle memory for native Emacs keybindings. Inspired by interactive platforms like VimHero, its goal is to help you master text navigation and editing without constantly relying on the `Esc` key or the mouse, focusing specifically on prose, Org-mode, and coding workflows.

> **Note:** Perfect for Doom Emacs users (or other Evil-based frameworks) who want to write text fluidly and ergonomically by taking advantage of the "native bindings" while in *insert mode*.

## 🚀 Features

- **Interactive Lessons**: Learn by doing. The simulator detects your keystrokes in real-time and evaluates your progress.
- **Goal-based Validation**: It's not just about pressing keys; you must modify the buffer to meet specific goals (like changing a state to `DONE` in Org-mode).
- **Minigames ("Bug Survival")**: Special levels where you must evade bugs (🐛) using basic movement shortcuts to survive.
- **Built-in Cheatsheet**: A quick reference section organized by intent: General, Prose/Essay, Org-mode/Poetry, and Coding.
- **Fully Customizable**: You can configure your simulated `Ctrl` or `Meta` key directly from the interface.
- **Easter Eggs**: Discover hidden secrets with `M-x`! (Hint: 🧩).

## 🛠️ Installation & Usage

Zero dependencies! No need to install Node, Python, or anything similar.

1. Clone this repository:
   ```bash
   git clone https://github.com/diegoveraniego/emacs-hero.git
   ```
2. Open the `index.html` file in any modern web browser.
3. Start practicing!

Alternatively, you can host it instantly and for free via **GitHub Pages**.

## 🏗️ Architecture

The project is an exercise in radical minimalism:
- **`index.html`**: Contains the semantic structure.
- **`app.js` & `data.js`**: Vanilla JavaScript logic and localization.
- **`style.css`**: Vanilla CSS with the *Modus Vivendi* palette.
- **Rendering Engine**: A mini buffer emulator that draws cursors, highlights syntax (Org, C, Elisp), and handles overlays.

## 🤝 Contributing

Contributions are super welcome! If you want to add new lessons:
1. Look for the `LESSONS` constant inside `data.js`.
2. Add a new object following the established format (title, buffer, required keys, optional validation, etc.).
3. Submit a *pull request*.

The code is structured to support Internationalization (English/Spanish).

## 📄 License

This project is open-source. Use it, modify it, and share it!
