# Emacs Hero ⌨️🦸

**Emacs Hero** es una aplicación web interactiva de un solo archivo (`index.html`) diseñada para enseñar y entrenar la memoria muscular de los atajos de teclado nativos de Emacs. Inspirado en plataformas interactivas, su objetivo es ayudarte a dominar el movimiento y edición de texto sin depender constantemente de la tecla `Esc` o del ratón, enfocándose especialmente en los flujos de trabajo de prosa, Org-mode y código.

> **Nota:** Perfecto para usuarios de Doom Emacs (u otros frameworks basados en Evil) que deseen escribir texto de manera fluida y ergonómica aprovechando los "native bindings" en el *insert mode*.

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
