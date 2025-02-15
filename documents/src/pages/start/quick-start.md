<!--
type: page
title: Element Framework
description: Welcome to Element Framework
location: ./quick-start
layout: default
-->

# Quick Start

@>Element Framework works best with ![npm >=8](https://img.shields.io/badge/npm-%3E=8-blue?labelColor=8C8C8C) and ![node.js >=16](https://img.shields.io/badge/node.js-%3E=16-blue?labelColor=8C8C8C)

Using a build tool, like [Vite](https://vitejs.dev) or [Parcel](https://parceljs.org/) is recommended to get started quickly. These allow you to quickly prototype and serve your application with minimal to no configuration.

## Installation

Components are published as a single package and provide all foundational building blocks required to build an application.

```bash
npm install @refinitiv-ui/elements
```

Halo is the official theme for LSEG Workspace products. It's provided to correctly initialise your application with correct styling and typography.

```bash
npm install @refinitiv-ui/halo-theme
```

## Usage

Start using components by importing their definitions and themes in your HTML file. Using `script[type=module]` allows us to import EF modules.

```html
<script type="module">
  // import elements
  import '@refinitiv-ui/elements/button';
  import '@refinitiv-ui/elements/panel';
  // import styles for typography, body and other native inbuilt elements.
  import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
  // import element themes
  import '@refinitiv-ui/elements/button/themes/halo/dark';
  import '@refinitiv-ui/elements/panel/themes/halo/dark';
</script>
<ef-panel spacing>
  <h2>Hello EF!</h2>
  <ef-button cta>OK</ef-button>
</ef-panel>
```

## Build your first app

Start building your first application using EF with your favourite frameworks: [Angular](./tutorials/angular), [React](./tutorials/react), [Vue](./tutorials/vue). For bundling guideline, see [Bundling Configuration](./guides/bundling-configuration).

::footer::
