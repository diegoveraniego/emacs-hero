// ═══════════════════════════════════════════════════════════
// EMACS HERO — Data & i18n
// ═══════════════════════════════════════════════════════════

const I18N = {
  es: {
    title: "Emacs Hero — Aprende Emacs",
    subtitle: "Domina la edición de texto a la velocidad del pensamiento.",
    btn_learn: "Aprender a usar Emacs",
    btn_why: "¿Por qué Emacs?",
    btn_continue: "Continuar Lección",
    modal_title: "⌨ Elige tu tecla Ctrl",
    modal_desc: "En Emacs Hero, una tecla de tu elección actúa como <strong style=\"color:var(--purple)\">Ctrl</strong>. Mantenla presionada y pulsa la segunda tecla para ejecutar comandos <code style=\"color:var(--red);background:var(--bg);padding:1px 5px;border-radius:3px\">C-</code>. Alt sigue siendo Meta (<code style=\"color:var(--blue);background:var(--bg);padding:1px 5px;border-radius:3px\">M-</code>).",
    btn_start: "Empezar →",
    custom_placeholder: "Presiona la tecla que quieres usar…",
    tab_practice: "práctica",
    tab_stats: "stats",
    tab_cheatsheet: "cheatsheet",
    ex_before: "Antes",
    ex_after: "Después",
    ex_toggle: "Mostrar ejemplo",
    toast_done: "¡Completado!",
    mb_ready: "Buffer listo. Usa tu tecla Ctrl para empezar.",
    next_btn: "Siguiente:",
    why_title: "¿Por qué Emacs y Native Bindings?",
    why_body: `
      <p>Emacs no es solo un editor, es un <em>entorno de lisp</em>. Pero su sistema de atajos de teclado (keybindings) tiene una filosofía única: <strong>nunca abandonar el modo de inserción</strong>.</p>
      <p>A diferencia de Vim (donde debes presionar <code>Esc</code> constantemente para cambiar a modo Normal y moverte), en Emacs utilizas teclas modificadoras (<code>Ctrl</code> y <code>Alt/Meta</code>) combinadas con letras para moverte, borrar y editar el texto <em>mientras escribes</em>.</p>
      <p><strong>El problema del Meñique (Pinky Problem)</strong><br>
      Originalmente, Emacs se diseñó para teclados donde el Ctrl estaba junto a la tecla 'A' (donde hoy está Caps Lock). En teclados modernos, usar el meñique para el Ctrl inferior causa fatiga. Por eso, en <strong>Emacs Hero</strong> te enseñamos a mapear otra tecla (como <code>Esc</code> o <code>Caps Lock</code>) para que actúe como Ctrl.</p>
      <p>Al dominar estos atajos, lograrás una fluidez inigualable para escribir código, pero especialmente para redactar <strong>prosa, poesía y ensayos</strong>, donde el flujo de pensamiento no debe interrumpirse.</p>
    `,
    cs_intro: "<strong>Flujo de escritura en Emacs:</strong> No uses la tecla Esc repetidamente. Usa la zona de control para moverte, borrar y corregir mientras te mantienes en el flujo (insert mode).",
    cs_gen: "⌨ General",
    cs_gen_1: "Movimiento Esencial",
    cs_gen_2: "Kill Ring (Cortar/Pegar)",
    cs_prose: "📝 Prosa & Ensayo",
    cs_prose_1: "Corrección rápida",
    cs_prose_2: "Edición fluida",
    cs_org: "🦄 Org-mode & Poesía",
    cs_org_1: "Estructura & Tareas",
    cs_org_2: "Poesía (Versos y estrofas)",
    cs_code: "💻 Coding & Comandos",
    cs_code_1: "Búsqueda y Reemplazo",
    cs_code_2: "Sistema y Ventanas",
    desc: {
      "char_fwd_bwd": "Caracter adelante / atrás",
      "line_nxt_prv": "Línea siguiente / anterior",
      "word_fwd_bwd": "Palabra adelante / atrás",
      "line_beg_end": "Inicio / fin de línea",
      "buf_beg_end": "Inicio / fin de buffer",
      "mark_act": "Activar mark (seleccionar)",
      "copy_cut": "Copiar / Cortar región",
      "yank": "Pegar (yank)",
      "yank_pop": "Rotar kill ring (tras C-y)",
      "undo": "Undo",
      "del_char_fwd": "Borrar caracter adelante",
      "del_word_bwd_fwd": "Borrar palabra atrás / adelante",
      "kill_line": "Matar hasta el fin de la línea",
      "kill_sentence": "Matar hasta el fin de oración",
      "fill_para": "Refluir párrafo (fill-paragraph)",
      "trans_char_word": "Transponer letras / palabras",
      "upcase_downcase": "Palabra a MAYÚSCULAS / minúsculas",
      "capitalize": "Capitalizar palabra",
      "org_cycle": "Colapsar / expandir heading",
      "org_new_heading": "Nuevo heading al mismo nivel",
      "org_todo": "Ciclar estado TODO",
      "org_timestamp": "Insertar timestamp activo",
      "poetry_open_line": "Abrir línea vacía debajo",
      "poetry_indent": "Indentar verso actual",
      "poetry_move": "Mover verso/estrofa arriba/abajo",
      "isearch": "Isearch (buscar) adelante / atrás",
      "isearch_rep": "Repetir última búsqueda",
      "query_replace": "Query replace (reemplazar confirmando)",
      "split_win": "Dividir ventana H / V",
      "other_win": "Saltar a otra ventana",
      "exec_cmd": "Ejecutar comando por nombre",
      "cancel_cmd": "Cancelar comando actual"
    }
  },
  en: {
    title: "Emacs Hero — Learn Emacs",
    subtitle: "Master text editing at the speed of thought.",
    btn_learn: "Learn to use Emacs",
    btn_why: "Why Emacs?",
    btn_continue: "Continue Lesson",
    modal_title: "⌨ Choose your Ctrl key",
    modal_desc: "In Emacs Hero, a key of your choice acts as <strong style=\"color:var(--purple)\">Ctrl</strong>. Hold it down and press a second key to execute <code style=\"color:var(--red);background:var(--bg);padding:1px 5px;border-radius:3px\">C-</code> commands. Alt acts as Meta (<code style=\"color:var(--blue);background:var(--bg);padding:1px 5px;border-radius:3px\">M-</code>).",
    btn_start: "Start →",
    custom_placeholder: "Press the key you want to use…",
    tab_practice: "practice",
    tab_stats: "stats",
    tab_cheatsheet: "cheatsheet",
    ex_before: "Before",
    ex_after: "After",
    ex_toggle: "Show example",
    toast_done: "Completed!",
    mb_ready: "Buffer ready. Use your Ctrl key to start.",
    next_btn: "Next:",
    why_title: "Why Emacs and Native Bindings?",
    why_body: `
      <p>Emacs is not just an editor; it is a <em>lisp machine</em>. Its keybinding philosophy is unique: <strong>never leave insert mode</strong>.</p>
      <p>Unlike Vim (where you must constantly press <code>Esc</code> to enter Normal mode to navigate), in Emacs you use modifier keys (<code>Ctrl</code> and <code>Alt/Meta</code>) combined with letters to move, delete, and edit text <em>while you type</em>.</p>
      <p><strong>The Pinky Problem</strong><br>
      Emacs was originally designed for keyboards where Ctrl was next to the 'A' key (where Caps Lock is today). On modern keyboards, using the pinky finger for the bottom Ctrl causes fatigue. That's why in <strong>Emacs Hero</strong> we teach you to map another key (like <code>Esc</code> or <code>Caps Lock</code>) to act as Ctrl.</p>
      <p>By mastering these bindings, you'll achieve unparalleled fluidity for writing code, but especially for writing <strong>prose, poetry, and essays</strong>, where the flow of thought must remain uninterrupted.</p>
    `,
    cs_intro: "<strong>Emacs writing flow:</strong> Don't press Esc repeatedly. Use the control zone to move, delete, and correct while staying in the flow (insert mode).",
    cs_gen: "⌨ General",
    cs_gen_1: "Essential Movement",
    cs_gen_2: "Kill Ring (Cut/Paste)",
    cs_prose: "📝 Prose & Essay",
    cs_prose_1: "Quick Correction",
    cs_prose_2: "Fluid Editing",
    cs_org: "🦄 Org-mode & Poetry",
    cs_org_1: "Structure & Tasks",
    cs_org_2: "Poetry (Verses & Stanzas)",
    cs_code: "💻 Coding & Commands",
    cs_code_1: "Search & Replace",
    cs_code_2: "System & Windows",
    desc: {
      "char_fwd_bwd": "Character forward / backward",
      "line_nxt_prv": "Next / previous line",
      "word_fwd_bwd": "Word forward / backward",
      "line_beg_end": "Beginning / end of line",
      "buf_beg_end": "Beginning / end of buffer",
      "mark_act": "Activate mark (select)",
      "copy_cut": "Copy / Cut region",
      "yank": "Paste (yank)",
      "yank_pop": "Rotate kill ring (after C-y)",
      "undo": "Undo",
      "del_char_fwd": "Delete character forward",
      "del_word_bwd_fwd": "Delete word backward / forward",
      "kill_line": "Kill to end of line",
      "kill_sentence": "Kill to end of sentence",
      "fill_para": "Reflow paragraph (fill-paragraph)",
      "trans_char_word": "Transpose characters / words",
      "upcase_downcase": "Word to UPPERCASE / lowercase",
      "capitalize": "Capitalize word",
      "org_cycle": "Collapse / expand heading",
      "org_new_heading": "New heading at same level",
      "org_todo": "Cycle TODO state",
      "org_timestamp": "Insert active timestamp",
      "poetry_open_line": "Open empty line below",
      "poetry_indent": "Indent current verse",
      "poetry_move": "Move verse/stanza up/down",
      "isearch": "Isearch (search) forward / backward",
      "isearch_rep": "Repeat last search",
      "query_replace": "Query replace (confirming)",
      "split_win": "Split window H / V",
      "other_win": "Jump to other window",
      "exec_cmd": "Execute command by name",
      "cancel_cmd": "Cancel current command"
    }
  }
};

// ── Buffer content ──────────────────────────────────────────
const BUFS = {
  es: {
    org: [
      '* El FOSS hacia la educación musical sostenible',
      '** TODO Revisión de bibliografía',
      '*** [ ] Calderón-Garrido, 2019',
      '*** [ ] Butler et al, 2021',
      '*** [ ] Champion & Hill, 2025',
      '** Discusión',
      'Esta categoría emergió como la más citada en el análisis.',
      'Los participantes señalaron que el aprendizaje ocurre',
      'principalmente en contextos no formales: foros, YouTube,',
      'comunidades en línea y grupos de Telegram.',
    ],
    elisp: [
      '(after! evil',
      "  (setq evil-default-state 'emacs)",
      "  (evil-set-initial-state 'org-mode 'emacs))",
      '',
      "(setq doom-theme 'modus-vivendi",
      '      doom-font (font-spec :family "Iosevka Nerd Font Mono"',
      '                           :size 14',
      "                           :weight 'light))",
      '',
      '; Configuración adicional para el entorno',
    ],
    journal: [
      '*** [2026-06-29 lun 23:14]',
      'Hoy estuve programando con IA. Aprendí cosas',
      'interesantes sobre los keybinds de Emacs.',
      'Mañana tengo seminario de grado y práctica',
      'en el colegio. No olvidar los ejercicios de espalda.',
      '',
      '*** [2026-06-28 dom 11:30]',
      'Revisé el capítulo de metodología. Falta mejorar',
      'la sección de análisis temático.',
    ],
    c: [
      'static void',
      'on_tag_activated (GtkListView *list_view,',
      '                  guint        position,',
      '                  gpointer     user_data)',
      '{',
      '  CualiWindow *win = CUALI_WINDOW (user_data);',
      '  g_return_if_fail (CUALI_IS_WINDOW (win));',
      '  /* TODO: implementar activación de tag */',
      '}',
      '',
    ],
    bugs: [
      'Estás atrapado en un laberinto de código legacy.',
      'Evade los bugs usando C-n, C-p, C-f y C-b.',
      '',
      '======================',
      '|                    |',
      '|     [  ]  [  ]     |',
      '|                    |',
      '======================',
      '',
      'Si te alcanzan, pierdes.',
      'Llega a la salida para completar el nivel.',
      '',
      '                       [EXIT]',
    ]
  },
  en: {
    org: [
      '* FOSS towards sustainable music education',
      '** TODO Literature review',
      '*** [ ] Calderón-Garrido, 2019',
      '*** [ ] Butler et al, 2021',
      '*** [ ] Champion & Hill, 2025',
      '** Discussion',
      'This category emerged as the most cited in the analysis.',
      'Participants noted that learning occurs',
      'mainly in non-formal contexts: forums, YouTube,',
      'online communities and Telegram groups.',
    ],
    elisp: [
      '(after! evil',
      "  (setq evil-default-state 'emacs)",
      "  (evil-set-initial-state 'org-mode 'emacs))",
      '',
      "(setq doom-theme 'modus-vivendi",
      '      doom-font (font-spec :family "Iosevka Nerd Font Mono"',
      '                           :size 14',
      "                           :weight 'light))",
      '',
      '; Additional environment configuration',
    ],
    journal: [
      '*** [2026-06-29 mon 23:14]',
      'Today I was coding with AI. Learned interesting',
      'things about Emacs keybinds.',
      'Tomorrow I have a degree seminar and practice',
      'at the school. Must remember back exercises.',
      '',
      '*** [2026-06-28 sun 11:30]',
      'Reviewed the methodology chapter. Need to improve',
      'the thematic analysis section.',
    ],
    c: [
      'static void',
      'on_tag_activated (GtkListView *list_view,',
      '                  guint        position,',
      '                  gpointer     user_data)',
      '{',
      '  CualiWindow *win = CUALI_WINDOW (user_data);',
      '  g_return_if_fail (CUALI_IS_WINDOW (win));',
      '  /* TODO: implement tag activation */',
      '}',
      '',
    ],
    bugs: [
      'You are trapped in a legacy code maze.',
      'Evade the bugs using C-n, C-p, C-f and C-b.',
      '',
      '======================',
      '|                    |',
      '|     [  ]  [  ]     |',
      '|                    |',
      '======================',
      '',
      'If they catch you, you lose.',
      'Reach the exit to complete the level.',
      '',
      '                       [EXIT]',
    ]
  }
};

// ── Lessons ──────────────────────────────────────────────────
const LESSONS = {
  es: [
    { cat:'Basic Emacs', title:'Intro', keys:[], buf:'org', auto:true, req:[], need:0,
      theory:`<p>Bienvenido a <strong>Emacs Hero</strong>. Aprenderás los keybinds nativos de Emacs de forma interactiva, igual que vim-hero.com pero para Emacs.</p>
  <p>Emacs tiene dos modos principales: <code>Emacs state</code> (los keybinds nativos que aprenderás aquí) y <code>Evil state</code> (emulación de Vi). <code>C-z</code> alterna entre ambos. En Doom Emacs, Evil es el default — pero dominar los keybinds nativos es esencial para escribir sin fricciones.</p>
  <p>Notación: <code>C-f</code> = tu tecla sustituta + f. <code>M-f</code> = Alt+f. El badge en la topbar siempre muestra tu tecla activa. Presiona <strong>Next →</strong> para comenzar.</p>`,
      ex:{b:'C-z      alterna Evil/Emacs state\nC-h t    abre el tutorial de Emacs',a:'Tu tecla elegida actúa como Ctrl\nAlt actúa como Meta (M-)'}
    },
    { cat:'Basic Emacs', title:'Movimiento básico', keys:['C-f','C-b','C-n','C-p'], buf:'org', req:['C-f','C-b','C-n','C-p'], need:12,
      theory:`<p>Los cuatro keybinds fundamentales. <code>C-f</code> (forward-char) avanza un carácter. <code>C-b</code> (backward-char) retrocede. <code>C-n</code> (next-line) baja una línea. <code>C-p</code> (previous-line) sube.</p>
  <p>La clave: la mano derecha nunca abandona la fila home. Sin flechas, sin movimiento de muñeca. Parece raro al principio, pero después de una semana es automático y mucho más rápido.</p>
  <p>Practica moviéndote por el buffer usando solo estas cuatro teclas. Necesitas 12 usos para completar la lección.</p>`,
      ex:{b:'El cur|sor está aquí\n(| marca la posición)',a:'C-f → El curs|or está aquí\nC-n → baja una línea'}
    },
    { cat:'Basic Emacs', title:'Inicio y fin de línea', keys:['C-a','C-e'], buf:'org', req:['C-a','C-e'], need:6,
      theory:`<p><code>C-a</code> (beginning-of-line) lleva el cursor al inicio de la línea. <code>C-e</code> (end-of-line) lo lleva al final.</p>
  <p>Mnemónico: <strong>A</strong> es la primera letra del alfabeto → inicio. <strong>E</strong> de «end» → final. En una línea larga de código, estos dos keybinds son indispensables para orientarse.</p>
  <p>Patrón clásico: <code>C-a C-k</code> borra toda la línea desde el inicio (C-a va al inicio, C-k mata hasta el final).</p>`,
      ex:{b:'   def función(arg):\n       ^ cursor aquí',a:'C-a →|   def función(arg):\n(al inicio de la línea)\nC-e →   def función(arg):|'}
    },
    { cat:'Basic Emacs', title:'Movimiento por palabras', keys:['M-f','M-b'], buf:'elisp', req:['M-f','M-b'], need:8,
      theory:`<p><code>M-f</code> (forward-word) avanza una palabra. <code>M-b</code> (backward-word) retrocede una palabra. El prefijo <code>M-</code> (Meta = Alt) es la versión «por palabras» del movimiento por caracteres.</p>
  <p>La definición de «palabra» depende de la <em>syntax table</em> del modo. En <code>elisp-mode</code>, guiones forman parte de la palabra: <code>evil-default-state</code> es una sola palabra. En <code>text-mode</code>, solo alfanuméricos.</p>
  <p>Para saltar varias palabras: <code>M-3 M-f</code> avanza tres palabras. Muy útil en código denso.</p>`,
      ex:{b:"(setq |evil-default-state 'emacs)\n(cursor al inicio de evil-default-state)",a:"(setq evil-default-state| 'emacs)\n(M-f avanzó toda la palabra)"}
    },
    { cat:'Basic Emacs', title:'Extremos del buffer', keys:['M-<','M->'], buf:'journal', req:['M-<','M->'], need:4,
      theory:`<p><code>M-&lt;</code> (beginning-of-buffer) lleva el cursor al inicio del buffer. <code>M-&gt;</code> (end-of-buffer) al final. En el teclado: Alt+Shift+, y Alt+Shift+.</p>
  <p>Detalle importante del manual oficial: ambos comandos <strong>guardan la posición actual en el mark ring</strong>. Puedes volver exactamente donde estabas con <code>C-u C-SPC</code>.</p>
  <p>Flujo típico: <code>M-&lt;</code> para ir al inicio y revisar → luego <code>C-u C-SPC</code> para volver. No necesitas recordar el número de línea.</p>`,
      ex:{b:'Línea 5 del buffer\n(cursor en medio)',a:'M-< → Línea 1 del buffer\n(mark ring guardó L5)\nC-u C-SPC → vuelve a L5'}
    },
    { cat:'Basic Emacs', title:'Bug Survival', keys:['C-n','C-p','C-f','C-b'], req:['C-n','C-p','C-f','C-b'], buf:'bugs', hasBugs:true,
      validate: (B) => B.lines[B.cursor.l].includes('[EXIT]') && B.cursor.c >= B.lines[B.cursor.l].indexOf('E'),
      theory:`<p><strong>NIVEL DE PRUEBA:</strong> ¡Los bugs se acercan! Demuestra tu dominio de los comandos de movimiento básicos (<code>C-n</code>, <code>C-p</code>, <code>C-f</code>, <code>C-b</code>) evadiendo los 🐛 y llegando a la salida <code>[EXIT]</code> en la parte inferior del buffer.</p>
  <p>Recuerda mantener la calma y no quitar los dedos de la fila central. Si te alcanzan, el nivel se reinicia.</p>`,
      ex:{b:'El cursor es tu jugador\n🐛 → Bugs enemigos',a:'Usa C-n, C-p, C-f, C-b\nLlega hasta [EXIT] para ganar'}
    },
    { cat:'Basic Emacs', title:'Scroll sin mover cursor', keys:['C-v','M-v','C-l'], buf:'org', req:['C-v','M-v','C-l'], need:9,
      theory:`<p><code>C-v</code> (scroll-up) desplaza la vista hacia abajo. <code>M-v</code> (scroll-down) hacia arriba. El cursor no se mueve, solo cambia qué parte del buffer es visible.</p>
  <p><code>C-l</code> (recenter-top-bottom) es especial: <strong>cicla</strong> entre tres posiciones. Primera pulsación: centra el cursor en pantalla. Segunda: lo lleva al top. Tercera: al bottom.</p>
  <p>Truco: después de pegar texto con <code>C-y</code>, usa <code>C-l</code> para centrar la vista en el texto recién insertado.</p>`,
      ex:{b:'C-v  → desplaza vista hacia abajo\nM-v  → desplaza vista hacia arriba',a:'C-l (1×) → cursor al centro\nC-l (2×) → cursor al top\nC-l (3×) → cursor al bottom'}
    },
    { cat:'Edición', title:'Borrar carácter', keys:['DEL','C-d'], buf:'journal', req:['DEL','C-d'], need:8,
      theory:`<p><code>DEL</code> (Backspace) ejecuta <code>backward-delete-char</code>: borra el carácter <em>antes</em> del cursor. <code>C-d</code> ejecuta <code>delete-char</code>: borra el carácter <em>bajo</em> el cursor.</p>
  <p>Diferencia clave: <code>DEL</code> y <code>C-d</code> <strong>no van al kill ring</strong>. El texto se pierde. Para borrar y poder recuperar, usa los comandos <code>kill-</code> de las siguientes lecciones.</p>
  <p>Mnemónico: <strong>D</strong> de «delete» hacia adelante. Backspace hacia atrás.</p>`,
      ex:{b:'Hoy estuVe programando\n        ^cursor después de V',a:'DEL → Hoy estue programando\n(borra la V hacia atrás)\nC-d → borra el carácter bajo el cursor'}
    },
    { cat:'Edición', title:'Borrar palabra', keys:['M-DEL','M-d'], buf:'elisp', req:['M-DEL','M-d'], need:6,
      theory:`<p><code>M-DEL</code> (backward-kill-word) mata la palabra <em>anterior</em>. <code>M-d</code> (kill-word) mata la palabra <em>siguiente</em>. A diferencia de DEL/C-d, estas palabras van al <strong>kill ring</strong> y se pueden recuperar con <code>C-y</code>.</p>
  <p>«Matar» en Emacs = cortar. «Borrar» = eliminar sin guardar. Esta distinción es fundamental en todo Emacs.</p>
  <p>Uso típico: escribiste mal una palabra larga → <code>M-DEL</code> la elimina de golpe, sin presionar Backspace 15 veces.</p>`,
      ex:{b:"(setq evil-default-state |'emacs)\n               ^cursor aquí",a:"(setq |'emacs)\n(M-DEL mató 'evil-default-state')"}
    },
    { cat:'Edición', title:'Kill line', keys:['C-k'], buf:'org', req:['C-k'], need:5,
      theory:`<p><code>C-k</code> (kill-line) mata desde el cursor hasta el final de la línea. El texto va al kill ring y puede recuperarse.</p>
  <p>Comportamiento exacto: si hay texto hasta el final, lo mata todo. Si el cursor está al final de la línea, mata el newline y une con la siguiente. Múltiples <code>C-k</code> consecutivos acumulan el texto como una sola entrada en el kill ring.</p>
  <p>Patrón clásico: <code>C-a C-k</code> borra toda la línea. <code>C-k C-k</code> borra línea y newline.</p>`,
      ex:{b:'Esta es |una línea larga de texto\n(cursor en el medio)',a:'C-k → Esta es \n("una línea larga de texto" va al kill ring)\nC-y → lo devuelve'}
    },
    { cat:'Edición', title:'Kill ring', keys:['C-SPC','C-w','M-w','C-y','M-y'], buf:'org', req:['C-SPC','C-w','C-y'], need:9,
      theory:`<p>El <strong>kill ring</strong> es el clipboard de Emacs, pero guarda múltiples elementos. <code>C-SPC</code> (set-mark) activa la marca. Mueve el cursor para definir la región, luego:</p>
  <p><code>C-w</code> (kill-region) corta la región al kill ring. <code>M-w</code> (copy-region-as-kill) la copia sin borrar. <code>C-y</code> (yank) pega el elemento más reciente.</p>
  <p><code>M-y</code> (yank-pop) cicla por elementos anteriores del kill ring, reemplazando lo recién pegado. Esencial para recuperar texto que «perdiste» hace varios kills.</p>`,
      ex:{b:'C-SPC → marca inicio\n(mueve cursor)\nC-w → cortar  M-w → copiar',a:'C-y → pega el más reciente\nM-y → cicla por anteriores'}
    },
    { cat:'Edición', title:'Edición de texto', keys:['M-q','C-t','M-u','C-o'], buf:'journal', req:['C-t','M-u','C-o'], need:6,
      theory:`<p><code>M-q</code> (fill-paragraph) reformatea el párrafo actual para que cada línea no exceda <code>fill-column</code> (70 chars por defecto). Indispensable para prosa y comentarios.</p>
  <p><code>C-t</code> (transpose-chars) intercambia el carácter bajo el cursor con el anterior. Para el typo clásico «teh»: cursor al final → <code>C-t</code> → «the». Instantáneo.</p>
  <p><code>M-u</code> convierte la siguiente palabra a MAYÚSCULAS. <code>M-l</code> a minúsculas. <code>C-o</code> (open-line) inserta una línea en blanco debajo sin mover el cursor.</p>`,
      ex:{b:'teh → C-t → the\n(transpose-chars corrige typo)',a:'palabra → M-u → PALABRA\nC-o → inserta línea abajo'}
    },
    { cat:'Búsqueda', title:'Isearch', keys:['C-s','C-r'], buf:'journal', req:['C-s'], need:3,
      theory:`<p><code>C-s</code> activa <code>isearch-forward</code>: búsqueda incremental hacia adelante. <code>C-r</code> hacia atrás. La búsqueda es <em>incremental</em>: Emacs encuentra el primer match mientras escribes.</p>
  <p>Durante isearch: <code>C-s</code> de nuevo → siguiente match. <code>C-r</code> → invierte dirección. <code>RET</code> → confirma (cursor queda en el match). <code>C-g</code> → cancela y regresa al origen.</p>
  <p>Tip del manual oficial: <code>C-s C-s</code> repite la última búsqueda. Muy útil para reusar.</p>`,
      ex:{b:'C-s → activa isearch\n(escribe para buscar incrementalmente)',a:'C-s de nuevo → siguiente match\nRET → confirmar posición\nC-g → cancelar y volver al origen'}
    },
    { cat:'Búsqueda', title:'Replace', keys:['M-%'], buf:'org', req:['M-%'], need:1,
      theory:`<p><code>M-%</code> (query-replace) inicia reemplazo interactivo. Emacs pide dos strings: qué buscar y con qué reemplazar.</p>
  <p>En cada match: <code>y</code> → reemplaza y va al siguiente. <code>n</code> → salta sin reemplazar. <code>!</code> → reemplaza todos los restantes. <code>q</code> → termina.</p>
  <p>Activa el comando y escribe el texto a buscar en el minibuffer. Presiona Enter para pasar a escribir el reemplazo.</p>`,
      ex:{b:'M-% → buscar: "TODO"\n    → reemplazar: "DONE"',a:'y → reemplaza uno\n! → reemplaza todos\nq → salir'}
    },
    { cat:'Esenciales', title:'C-g — el más importante', keys:['C-g'], buf:'c', req:['C-g'], need:3,
      theory:`<p><code>C-g</code> (keyboard-quit) cancela <em>cualquier</em> cosa: un comando a medias, un prefijo pendiente, el minibuffer, isearch activo, la región marcada. <strong>Siempre funciona. Siempre.</strong></p>
  <p>Si Emacs parece bloqueado o en un estado extraño, <code>C-g</code> (varias veces si es necesario) te devuelve al estado normal. Es el escape universal de Emacs.</p>
  <p>Para practicar: activa un prefijo con <code>C-x</code> (verás <code>C-x -</code> en el minibuffer), luego cancela con <code>C-g</code>.</p>`,
      ex:{b:'Estado confuso / prefix pendiente / isearch activo',a:'C-g → estado limpio\n(siempre funciona, siempre)'}
    },
    { cat:'Esenciales', title:'M-x — ejecutar comandos', keys:['M-x'], buf:'c', req:['M-x'], need:2,
      theory:`<p><code>M-x</code> (execute-extended-command) abre el minibuffer para ejecutar cualquier función de Emacs por nombre. Si un comando existe pero no tiene keybind, <code>M-x</code> es cómo lo invocas.</p>
  <p>Poder real: descubrimiento. Escribe <code>M-x fill-</code> y ves todos los comandos relacionados. Es sistema de ayuda, ejecución y exploración en uno.</p>
  <p><strong>Easter egg:</strong> escribe <code>tetris</code> después de <code>M-x</code> 🎮</p>`,
      ex:{b:'M-x → minibuffer activo\n(escribe el nombre del comando)',a:'M-x tetris → inicia tetris\nM-x fill-paragraph → igual que M-q'}
    },
    { cat:'Esenciales', title:'Ventanas', keys:['C-x 2','C-x o'], buf:'c', req:['C-x 2','C-x 3','C-x o'], need:4,
      theory:`<p>Emacs divide la pantalla en <em>ventanas</em>. <code>C-x 2</code> (split-window-below) divide horizontalmente. <code>C-x 3</code> divide verticalmente. <code>C-x o</code> (other-window) salta a la siguiente.</p>
  <p><code>C-x 0</code> (delete-window) cierra la ventana actual. <code>C-x 1</code> (delete-other-windows) cierra todas las demás y deja solo la actual.</p>
  <p>Usa los keybinds para ver la demo de splits actualizarse en tiempo real.</p>`,
      ex:{b:'[una sola ventana]',a:'C-x 2 → divide en dos\nC-x o → salta entre ellas\nC-x 1 → vuelve a una'}
    },
    { cat:'Org-mode', title:'Estructura de headings', keys:['TAB','M-RET'], buf:'org', req:['TAB','M-RET'], need:5,
      theory:`<p>En Org-mode, los headings usan <code>*</code>: un asterisco = nivel 1, dos = nivel 2, etc. <code>TAB</code> colapsa o expande el heading bajo el cursor. <code>S-TAB</code> colapsa/expande todo el buffer.</p>
  <p><code>M-RET</code> crea un nuevo heading al mismo nivel. <code>M-↑</code>/<code>M-↓</code> mueven el heading. <code>M-←</code>/<code>M-→</code> promueven/demotan (menos/más asteriscos).</p>
  <p>Org-mode transforma texto plano en un sistema de notas, proyectos y agenda. Todo en archivos <code>.org</code>.</p>`,
      ex:{b:'* Heading nivel 1\n** Subheading\n   contenido...',a:'TAB → colapsa/expande\nM-RET → nuevo heading mismo nivel'}
    },
    { cat:'Org-mode', title:'TODO', keys:['C-c C-t'], buf:'org',
      validate: (B) => {
        const line = B.lines.find(l => l.includes('Revisión de bibliografía'));
        return line && line.includes('DONE');
      },
      theory:`<p><code>C-c C-t</code> (org-todo) cicla el estado del heading actual. Por defecto: sin estado → <code>TODO</code> → <code>DONE</code> → sin estado.</p>
  <p><strong>Tu objetivo:</strong> Cambia el estado del heading "Revisión de bibliografía" a <code>DONE</code>.</p>
  <p>Combinado con el agenda (<code>C-c a</code>), todos los TODOs de tus archivos .org se consolidan en una vista de calendario.</p>`,
      ex:{b:'** TODO Revisión de bibliografía',a:'C-c C-t → ** DONE Revisión...\n(El objetivo es cambiarlo a DONE)'}
    },
    { cat:'Org-mode', title:'Links', keys:['C-c C-l','C-c C-o'], buf:'org', req:['C-c C-l','C-c C-o'], need:3,
      theory:`<p>Los links en Org tienen la sintaxis <code>[[destino][descripción]]</code>. El destino puede ser una URL, archivo, heading o cualquier cosa que Org entienda.</p>
  <p><code>C-c C-l</code> (org-insert-link) abre el minibuffer para insertar o editar el link bajo el cursor. <code>C-c C-o</code> (org-open-at-point) abre el link: URL en browser, archivo en Emacs.</p>
  <p><code>C-c C-c</code> confirma o ejecuta dependiendo del contexto — su función varía según donde esté el cursor.</p>`,
      ex:{b:'C-c C-l → [[https://gnu.org][GNU Emacs]]\n(escribe URL y descripción)',a:'C-c C-o → abre el link\n(URL en browser, archivo en Emacs)'}
    },
    { cat:'Org-mode', title:'Timestamps', keys:['C-c .','C-c !'], buf:'org', req:['C-c .','C-c !'], need:2,
      theory:`<p><code>C-c .</code> (org-time-stamp) inserta un timestamp <em>activo</em>: <code>&lt;2026-06-29 lun&gt;</code>. Los timestamps activos aparecen en la agenda. Úsalos para eventos y deadlines.</p>
  <p><code>C-c !</code> inserta un timestamp <em>inactivo</em>: <code>[2026-06-29 lun]</code>. No aparece en la agenda — solo registra cuándo pasó algo. Perfecto para journal entries y notas.</p>
  <p>Tu journal en el buffer usa timestamps inactivos: <code>[2026-06-29 lun 23:14]</code> — documenta, no agenda.</p>`,
      ex:{b:'C-c .  →  <2026-06-29 lun>  (activo, agenda)',a:'C-c !  →  [2026-06-29 lun]  (inactivo, solo registro)'}
    },
  ],
  en: [
    { cat:'Basic Emacs', title:'Intro', keys:[], buf:'org', auto:true, req:[], need:0,
      theory:`<p>Welcome to <strong>Emacs Hero</strong>. You will learn native Emacs keybinds interactively, just like vim-hero.com but for Emacs.</p>
  <p>Emacs has two main modes: <code>Emacs state</code> (the native keybinds you'll learn here) and <code>Evil state</code> (Vi emulation). <code>C-z</code> toggles between them. In Doom Emacs, Evil is the default — but mastering native keybinds is essential for frictionless writing.</p>
  <p>Notation: <code>C-f</code> = your substitute key + f. <code>M-f</code> = Alt+f. The badge on the topbar always shows your active key. Press <strong>Next →</strong> to start.</p>`,
      ex:{b:'C-z      toggles Evil/Emacs state\nC-h t    opens Emacs tutorial',a:'Your chosen key acts as Ctrl\nAlt acts as Meta (M-)'}
    },
    { cat:'Basic Emacs', title:'Basic movement', keys:['C-f','C-b','C-n','C-p'], buf:'org', req:['C-f','C-b','C-n','C-p'], need:12,
      theory:`<p>The four fundamental keybinds. <code>C-f</code> (forward-char) advances one character. <code>C-b</code> (backward-char) goes back. <code>C-n</code> (next-line) goes down a line. <code>C-p</code> (previous-line) goes up.</p>
  <p>The key: your right hand never leaves the home row. No arrows, no wrist movement. It feels weird at first, but after a week it's automatic and much faster.</p>
  <p>Practice moving around the buffer using only these four keys. You need 12 uses to complete the lesson.</p>`,
      ex:{b:'The cur|sor is here\n(| marks the position)',a:'C-f → The curs|or is here\nC-n → goes down one line'}
    },
    { cat:'Basic Emacs', title:'Start and end of line', keys:['C-a','C-e'], buf:'org', req:['C-a','C-e'], need:6,
      theory:`<p><code>C-a</code> (beginning-of-line) moves the cursor to the start of the line. <code>C-e</code> (end-of-line) moves it to the end.</p>
  <p>Mnemonic: <strong>A</strong> is the first letter of the alphabet → start. <strong>E</strong> for «end» → end. In a long line of code, these two keybinds are indispensable for orientation.</p>
  <p>Classic pattern: <code>C-a C-k</code> deletes the entire line from the start (C-a goes to start, C-k kills to the end).</p>`,
      ex:{b:'   def function(arg):\n       ^ cursor here',a:'C-a →|   def function(arg):\n(at the start of line)\nC-e →   def function(arg):|'}
    },
    { cat:'Basic Emacs', title:'Word movement', keys:['M-f','M-b'], buf:'elisp', req:['M-f','M-b'], need:8,
      theory:`<p><code>M-f</code> (forward-word) advances one word. <code>M-b</code> (backward-word) goes back one word. The <code>M-</code> prefix (Meta = Alt) is the «by words» version of character movement.</p>
  <p>The definition of a «word» depends on the <em>syntax table</em> of the mode. In <code>elisp-mode</code>, hyphens are part of the word: <code>evil-default-state</code> is a single word. In <code>text-mode</code>, only alphanumerics.</p>
  <p>To skip several words: <code>M-3 M-f</code> advances three words. Very useful in dense code.</p>`,
      ex:{b:"(setq |evil-default-state 'emacs)\n(cursor at start of evil-default-state)",a:"(setq evil-default-state| 'emacs)\n(M-f advanced the whole word)"}
    },
    { cat:'Basic Emacs', title:'Buffer edges', keys:['M-<','M->'], buf:'journal', req:['M-<','M->'], need:4,
      theory:`<p><code>M-&lt;</code> (beginning-of-buffer) moves the cursor to the start of the buffer. <code>M-&gt;</code> (end-of-buffer) to the end. On the keyboard: Alt+Shift+, and Alt+Shift+.</p>
  <p>Important detail from the official manual: both commands <strong>save the current position in the mark ring</strong>. You can return exactly where you were with <code>C-u C-SPC</code>.</p>
  <p>Typical flow: <code>M-&lt;</code> to go to the start and check → then <code>C-u C-SPC</code> to return. You don't need to remember the line number.</p>`,
      ex:{b:'Line 5 of the buffer\n(cursor in middle)',a:'M-< → Line 1 of the buffer\n(mark ring saved L5)\nC-u C-SPC → returns to L5'}
    },
    { cat:'Basic Emacs', title:'Bug Survival', keys:['C-n','C-p','C-f','C-b'], req:['C-n','C-p','C-f','C-b'], buf:'bugs', hasBugs:true,
      validate: (B) => B.lines[B.cursor.l].includes('[EXIT]') && B.cursor.c >= B.lines[B.cursor.l].indexOf('E'),
      theory:`<p><strong>TRIAL LEVEL:</strong> The bugs are approaching! Prove your mastery of basic movement commands (<code>C-n</code>, <code>C-p</code>, <code>C-f</code>, <code>C-b</code>) by evading the 🐛 and reaching the exit <code>[EXIT]</code> at the bottom of the buffer.</p>
  <p>Remember to stay calm and don't take your fingers off the home row. If they catch you, the level restarts.</p>`,
      ex:{b:'The cursor is your player\n🐛 → Enemy bugs',a:'Use C-n, C-p, C-f, C-b\nReach [EXIT] to win'}
    },
    { cat:'Basic Emacs', title:'Scroll without cursor move', keys:['C-v','M-v','C-l'], buf:'org', req:['C-v','M-v','C-l'], need:9,
      theory:`<p><code>C-v</code> (scroll-up) scrolls the view down. <code>M-v</code> (scroll-down) scrolls up. The cursor doesn't move, only what part of the buffer is visible changes.</p>
  <p><code>C-l</code> (recenter-top-bottom) is special: it <strong>cycles</strong> between three positions. First press: centers cursor on screen. Second: moves it to top. Third: to bottom.</p>
  <p>Trick: after pasting text with <code>C-y</code>, use <code>C-l</code> to center the view on the newly inserted text.</p>`,
      ex:{b:'C-v  → scrolls view down\nM-v  → scrolls view up',a:'C-l (1×) → cursor to center\nC-l (2×) → cursor to top\nC-l (3×) → cursor to bottom'}
    },
    { cat:'Editing', title:'Delete character', keys:['DEL','C-d'], buf:'journal', req:['DEL','C-d'], need:8,
      theory:`<p><code>DEL</code> (Backspace) executes <code>backward-delete-char</code>: deletes the character <em>before</em> the cursor. <code>C-d</code> executes <code>delete-char</code>: deletes the character <em>under</em> the cursor.</p>
  <p>Key difference: <code>DEL</code> and <code>C-d</code> <strong>do not go to the kill ring</strong>. The text is lost. To delete and be able to recover, use the <code>kill-</code> commands in the next lessons.</p>
  <p>Mnemonic: <strong>D</strong> for «delete» forward. Backspace backward.</p>`,
      ex:{b:'Today I waS coding\n        ^cursor after S',a:'DEL → Today I wa coding\n(deletes the S backward)\nC-d → deletes character under cursor'}
    },
    { cat:'Editing', title:'Delete word', keys:['M-DEL','M-d'], buf:'elisp', req:['M-DEL','M-d'], need:6,
      theory:`<p><code>M-DEL</code> (backward-kill-word) kills the <em>previous</em> word. <code>M-d</code> (kill-word) kills the <em>next</em> word. Unlike DEL/C-d, these words go to the <strong>kill ring</strong> and can be recovered with <code>C-y</code>.</p>
  <p>«Kill» in Emacs = cut. «Delete» = remove without saving. This distinction is fundamental throughout Emacs.</p>
  <p>Typical use: you misspelled a long word → <code>M-DEL</code> removes it all at once, without pressing Backspace 15 times.</p>`,
      ex:{b:"(setq evil-default-state |'emacs)\n               ^cursor here",a:"(setq |'emacs)\n(M-DEL killed 'evil-default-state')"}
    },
    { cat:'Editing', title:'Kill line', keys:['C-k'], buf:'org', req:['C-k'], need:5,
      theory:`<p><code>C-k</code> (kill-line) kills from the cursor to the end of the line. The text goes to the kill ring and can be recovered.</p>
  <p>Exact behavior: if there is text to the end, it kills it all. If the cursor is at the end of the line, it kills the newline and joins with the next. Multiple consecutive <code>C-k</code>s accumulate the text as a single entry in the kill ring.</p>
  <p>Classic pattern: <code>C-a C-k</code> deletes the whole line. <code>C-k C-k</code> deletes line and newline.</p>`,
      ex:{b:'This is |a long line of text\n(cursor in middle)',a:'C-k → This is \n("a long line of text" goes to kill ring)\nC-y → brings it back'}
    },
    { cat:'Editing', title:'Kill ring', keys:['C-SPC','C-w','M-w','C-y','M-y'], buf:'org', req:['C-SPC','C-w','C-y'], need:9,
      theory:`<p>The <strong>kill ring</strong> is Emacs' clipboard, but it stores multiple items. <code>C-SPC</code> (set-mark) activates the mark. Move the cursor to define the region, then:</p>
  <p><code>C-w</code> (kill-region) cuts the region to the kill ring. <code>M-w</code> (copy-region-as-kill) copies it without deleting. <code>C-y</code> (yank) pastes the most recent item.</p>
  <p><code>M-y</code> (yank-pop) cycles through previous items in the kill ring, replacing what was just pasted. Essential for recovering text you «lost» several kills ago.</p>`,
      ex:{b:'C-SPC → mark start\n(move cursor)\nC-w → cut  M-w → copy',a:'C-y → pastes most recent\nM-y → cycles previous'}
    },
    { cat:'Editing', title:'Text editing', keys:['M-q','C-t','M-u','C-o'], buf:'journal', req:['C-t','M-u','C-o'], need:6,
      theory:`<p><code>M-q</code> (fill-paragraph) reflows the current paragraph so each line doesn't exceed <code>fill-column</code> (70 chars by default). Indispensable for prose and comments.</p>
  <p><code>C-t</code> (transpose-chars) swaps the character under the cursor with the previous one. For the classic «teh» typo: cursor at the end → <code>C-t</code> → «the». Instant.</p>
  <p><code>M-u</code> converts the next word to UPPERCASE. <code>M-l</code> to lowercase. <code>C-o</code> (open-line) inserts a blank line below without moving the cursor.</p>`,
      ex:{b:'teh → C-t → the\n(transpose-chars fixes typo)',a:'word → M-u → WORD\nC-o → inserts line below'}
    },
    { cat:'Search', title:'Isearch', keys:['C-s','C-r'], buf:'journal', req:['C-s'], need:3,
      theory:`<p><code>C-s</code> activates <code>isearch-forward</code>: incremental search forward. <code>C-r</code> backward. Search is <em>incremental</em>: Emacs finds the first match as you type.</p>
  <p>During isearch: <code>C-s</code> again → next match. <code>C-r</code> → reverse direction. <code>RET</code> → confirm (cursor stays on match). <code>C-g</code> → cancel and return to origin.</p>
  <p>Tip from official manual: <code>C-s C-s</code> repeats the last search. Very useful for reusing.</p>`,
      ex:{b:'C-s → activates isearch\n(type to search incrementally)',a:'C-s again → next match\nRET → confirm position\nC-g → cancel and return'}
    },
    { cat:'Search', title:'Replace', keys:['M-%'], buf:'org', req:['M-%'], need:1,
      theory:`<p><code>M-%</code> (query-replace) starts interactive replacement. Emacs asks for two strings: what to find and what to replace it with.</p>
  <p>On each match: <code>y</code> → replaces and goes to next. <code>n</code> → skips without replacing. <code>!</code> → replaces all remaining. <code>q</code> → ends.</p>
  <p>Activate the command and type the text to search in the minibuffer. Press Enter to move on to typing the replacement.</p>`,
      ex:{b:'M-% → find: "TODO"\n    → replace: "DONE"',a:'y → replaces one\n! → replaces all\nq → exit'}
    },
    { cat:'Essentials', title:'C-g — the most important', keys:['C-g'], buf:'c', req:['C-g'], need:3,
      theory:`<p><code>C-g</code> (keyboard-quit) cancels <em>anything</em>: a half-finished command, a pending prefix, the minibuffer, active isearch, the marked region. <strong>It always works. Always.</strong></p>
  <p>If Emacs seems stuck or in a weird state, <code>C-g</code> (several times if necessary) returns you to normal state. It's Emacs' universal escape.</p>
  <p>To practice: activate a prefix with <code>C-x</code> (you'll see <code>C-x -</code> in minibuffer), then cancel with <code>C-g</code>.</p>`,
      ex:{b:'Confusing state / pending prefix / active isearch',a:'C-g → clean state\n(always works, always)'}
    },
    { cat:'Essentials', title:'M-x — execute commands', keys:['M-x'], buf:'c', req:['M-x'], need:2,
      theory:`<p><code>M-x</code> (execute-extended-command) opens the minibuffer to execute any Emacs function by name. If a command exists but has no keybind, <code>M-x</code> is how you invoke it.</p>
  <p>Real power: discovery. Type <code>M-x fill-</code> and you see all related commands. It's a help system, execution, and exploration in one.</p>
  <p><strong>Easter egg:</strong> type <code>tetris</code> after <code>M-x</code> 🎮</p>`,
      ex:{b:'M-x → active minibuffer\n(type the command name)',a:'M-x tetris → starts tetris\nM-x fill-paragraph → same as M-q'}
    },
    { cat:'Essentials', title:'Windows', keys:['C-x 2','C-x o'], buf:'c', req:['C-x 2','C-x 3','C-x o'], need:4,
      theory:`<p>Emacs divides the screen into <em>windows</em>. <code>C-x 2</code> (split-window-below) splits horizontally. <code>C-x 3</code> splits vertically. <code>C-x o</code> (other-window) jumps to the next one.</p>
  <p><code>C-x 0</code> (delete-window) closes the current window. <code>C-x 1</code> (delete-other-windows) closes all others and leaves only the current one.</p>
  <p>Use the keybinds to see the splits demo update in real time.</p>`,
      ex:{b:'[single window]',a:'C-x 2 → splits in two\nC-x o → jumps between them\nC-x 1 → back to one'}
    },
    { cat:'Org-mode', title:'Heading structure', keys:['TAB','M-RET'], buf:'org', req:['TAB','M-RET'], need:5,
      theory:`<p>In Org-mode, headings use <code>*</code>: one asterisk = level 1, two = level 2, etc. <code>TAB</code> collapses or expands the heading under the cursor. <code>S-TAB</code> collapses/expands the entire buffer.</p>
  <p><code>M-RET</code> creates a new heading at the same level. <code>M-↑</code>/<code>M-↓</code> move the heading. <code>M-←</code>/<code>M-→</code> promote/demote (fewer/more asterisks).</p>
  <p>Org-mode transforms plain text into a system of notes, projects, and agenda. All in <code>.org</code> files.</p>`,
      ex:{b:'* Heading level 1\n** Subheading\n   content...',a:'TAB → collapses/expands\nM-RET → new heading same level'}
    },
    { cat:'Org-mode', title:'TODO', keys:['C-c C-t'], buf:'org',
      validate: (B) => {
        const line = B.lines.find(l => l.includes('Literature review') || l.includes('Revisión de bibliografía'));
        return line && line.includes('DONE');
      },
      theory:`<p><code>C-c C-t</code> (org-todo) cycles the state of the current heading. Default: no state → <code>TODO</code> → <code>DONE</code> → no state.</p>
  <p><strong>Your goal:</strong> Change the state of the "Literature review" heading to <code>DONE</code>.</p>
  <p>Combined with the agenda (<code>C-c a</code>), all TODOs from your .org files are consolidated in a calendar view.</p>`,
      ex:{b:'** TODO Literature review',a:'C-c C-t → ** DONE Literature...\n(Goal is to change it to DONE)'}
    },
    { cat:'Org-mode', title:'Links', keys:['C-c C-l','C-c C-o'], buf:'org', req:['C-c C-l','C-c C-o'], need:3,
      theory:`<p>Links in Org have the syntax <code>[[destination][description]]</code>. The destination can be a URL, file, heading, or anything Org understands.</p>
  <p><code>C-c C-l</code> (org-insert-link) opens the minibuffer to insert or edit the link under the cursor. <code>C-c C-o</code> (org-open-at-point) opens the link: URL in browser, file in Emacs.</p>
  <p><code>C-c C-c</code> confirms or executes depending on context — its function varies based on cursor location.</p>`,
      ex:{b:'C-c C-l → [[https://gnu.org][GNU Emacs]]\n(type URL and description)',a:'C-c C-o → opens link\n(URL in browser, file in Emacs)'}
    },
    { cat:'Org-mode', title:'Timestamps', keys:['C-c .','C-c !'], buf:'org', req:['C-c .','C-c !'], need:2,
      theory:`<p><code>C-c .</code> (org-time-stamp) inserts an <em>active</em> timestamp: <code>&lt;2026-06-29 mon&gt;</code>. Active timestamps appear in the agenda. Use them for events and deadlines.</p>
  <p><code>C-c !</code> inserts an <em>inactive</em> timestamp: <code>[2026-06-29 mon]</code>. Doesn't appear in the agenda — just records when something happened. Perfect for journal entries and notes.</p>
  <p>Your journal in the buffer uses inactive timestamps: <code>[2026-06-29 mon 23:14]</code> — it documents, it doesn't schedule.</p>`,
      ex:{b:'C-c .  →  <2026-06-29 mon>  (active, agenda)',a:'C-c !  →  [2026-06-29 mon]  (inactive, just records)'}
    },
  ]
};
