<!--
type: page
title: Sidebar Layout
location: ./elements/sidebar-layout
layout: default
language_tabs: [javascript, typescript]
-->

# Sidebar Layout
::
```javascript
::sidebar-layout::
```
```css
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 50px 0;
  background-color: #dfe2e8;
}
[slot="main-content"] {
  text-align: center;
  padding: 90px 0;
  background-color: #f1f1f1;
}
```
```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Layout</ef-header>
  <ef-panel slot="sidebar-content" spacing>Menus</ef-panel>
  <ef-panel slot="main-content" spacing>This is awesome.</ef-panel>
</ef-sidebar-layout>
```
::

`ef-sidebar-layout` provides an app layout with a sidebar. There are four sections where a component can be slotted in.

* Sidebar header
* Sidebar content
* Main header
* Main content

The header slots can be omitted. Also, the component will automatically provide a vertical scrollbar if content is too long.

## Usage
`ef-sidebar-layout` is a layout, it is up to the developer to slot any contents into it. Typically, `ef-sidebar-layout` should be used together with `ef-header` for header slots, and `ef-panel` for content. Components that are used inside the layout must be imported by the app.

::
```javascript
::sidebar-layout::
```
```css
ef-sidebar-layout {
  height: 200px;
}

[slot="sidebar-content"] {
  text-align: center;
  padding: 70px 0;
}

[slot="main-content"] {
  text-align: center;
  padding: 70px 0;
}
```
```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Layout</ef-header>
  <ef-panel slot="sidebar-content" spacing class="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">Main Header</ef-header>
  <ef-panel slot="main-content" spacing class="main-content">Main Content</ef-panel>
</ef-sidebar-layout>
```
::

```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Header</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">Main Header</ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```

## Add toolbar commands
Menus on header could be implemented by using slots of `ef-header`.

::
```javascript
::sidebar-layout::
```
```css
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 60px 0;
}
[slot="main-content"] {
  text-align: center;
  padding: 60px 0;
}
```
```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button slot="right" transparent icon="settings"></ef-button>
    <ef-button slot="right" transparent icon="share"></ef-button>
  </ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```
::

```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button slot="right" transparent icon="settings"></ef-button>
    <ef-button slot="right" transparent icon="share"></ef-button>
  </ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```

## Toggled sidebar
Sidebar can be hidden by adding the `collapsed` attribute. A toggle button to collapse the sidebar can be implemented by code.

::
```javascript
::sidebar-layout::
const layout = document.querySelector('ef-sidebar-layout');
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
  layout.collapsed = !layout.collapsed;
  toggleButton.setAttribute('icon', layout.collapsed ? 'leftpanel-closed' : 'leftpanel-open');
});
```
```css
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 60px 0;
}
[slot="main-content"] {
  text-align: center;
  padding: 60px 0;
}
```
```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel spacing slot="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button transparent slot="left" id="toggleButton" icon="leftpanel-open"></ef-button>
    <ef-button slot="right" transparent icon="settings"></ef-button>
  </ef-header>
  <ef-panel spacing slot="main-content">Main Content</ef-panel>
</ef-sidebar-layout>
```
::

```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel spacing slot="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button transparent slot="left" id="toggleButton" icon="leftpanel-open"></ef-button>
    <ef-button slot="right" transparent icon="settings"></ef-button>
  </ef-header>
  <ef-panel spacing slot="main-content">Main Content</ef-panel>
</ef-sidebar-layout>
```

```javascript
const layout = document.querySelector('ef-sidebar-layout');
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
  layout.collapsed = !layout.collapsed;
  toggleButton.setAttribute('icon', layout.collapsed ? 'leftpanel-closed' : 'leftpanel-open');
});
```

```typescript
import { SidebarLayout } from '@refinitiv-ui/elements/sidebar-layout';

const layout: SidebarLayout | null = document.querySelector('ef-sidebar-layout');
const toggleButton = document.getElementById('toggleButton');
toggleButton?.addEventListener('click', () => {
  if (layout) {
    layout.collapsed = !layout.collapsed;
    toggleButton.setAttribute('icon', layout.collapsed ? 'leftpanel-closed' : 'leftpanel-open');
  }
});
```
