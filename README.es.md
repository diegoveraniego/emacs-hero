<p align="center"><img src="logo.svg" alt="Emacs Hero" width="200"></p>

# Emacs Hero ⌨️🦸

*[🇬🇧 Read in English](README.md)*

**Emacs Hero** es una aplicación web interactiva de un solo archivo (`index.html`) diseñada para enseñar y entrenar la memoria muscular de los atajos de teclado nativos de Emacs. Inspirada en plataformas interactivas como VimHero, su objetivo es ayudarte a dominar la navegación y edición de texto sin depender constantemente de la tecla `Esc` o el ratón, enfocándose específicamente en flujos de trabajo de texto, Org-mode y código.

### Por qué creé esto
El motivo de creación de este proyecto fue para yo mismo poder aprender a usar los atajos nativos de Emacs. Vengo de Vim y de Doom Emacs, pero tenía ganas de probar algo nuevo, y qué mejor manera de aprenderlo que construyendo esta herramienta. En el proceso, me di cuenta además que en Emacs hay muchas formas de aprender internamente (usando `M-x` o buscando el atajo que quieres hacer), pero esta app ofrece un camino guiado y divertido.

> **Nota:** Perfecto para usuarios de Doom Emacs (u otros frameworks basados en Evil) que quieren escribir texto de forma fluida y ergonómica aprovechando los "atajos nativos" mientras están en el *modo insertar*.

## 🚀 Características

- **Lecciones Interactivas**: Aprende practicando. El simulador detecta tus pulsaciones de teclado en tiempo real y evalúa tu progreso.
- **Validación por Objetivos**: No se trata solo de presionar teclas; tienes que modificar el buffer para cumplir metas específicas (como cambiar un estado a `DONE` en Org-mode).
- **Minijuegos ("Bug Survival")**: Niveles especiales donde deberás evadir bugs (🐛) usando los atajos de movimiento básicos para sobrevivir.
- **Cheatsheet Integrado**: Una sección de referencia rápida organizada por intención: General, Prosa/Ensayo, Org-mode/Poesía y Coding.
- **Totalmente Personalizable**: Puedes configurar tu tecla simulada de `Ctrl` o `Meta` directamente desde la interfaz.
- **Easter Eggs**: ¡Descubre secretos ocultos con `M-x`! (Pista: 🧩).

## 🛠️ Instalación y Uso

¡Cero dependencias! No necesitas instalar Node, Python ni nada por el estilo.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/diegoveraniego/emacs-hero.git
   ```
2. Abre el archivo `index.html` en cualquier navegador web moderno.
3. ¡Empieza a practicar!

Alternativamente, puedes alojarlo instantáneamente y gratis a través de **GitHub Pages**.

## 🏗️ Arquitectura

El proyecto es un ejercicio de minimalismo radical:
- **`index.html`**: Contiene absolutamente todo (HTML semántico, CSS vainilla con paleta *Modus Vivendi* y la lógica de estado/renderizado en Vanilla JavaScript).
- **Motor de Renderizado**: Un mini-emulador de buffer que dibuja cursores, resalta sintaxis (Org, C, Elisp) y maneja las superposiciones.

## 🤝 Contribuir

¡Las contribuciones son súper bienvenidas! Si quieres agregar nuevas lecciones:
1. Busca la constante `LESSONS` dentro de la etiqueta `<script>`.
2. Añade un nuevo objeto con el formato establecido (título, buffer, atajos requeridos, validación opcional, etc.).
3. Haz un *pull request*.

El código está estructurado para que una futura localización (traducción al inglés u otros idiomas) sea sencilla.

## 📄 Licencia

Este proyecto es de código abierto. ¡Úsalo, modifícalo y compártelo!
