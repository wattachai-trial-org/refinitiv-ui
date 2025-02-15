/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["select/Template Template Parts Empty DOM has all required parts"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>
`;
/* end snapshot select/Template Template Parts Empty DOM has all required parts */

snapshots["select/Template Template Parts Placeholder is rendered"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
      Placeholder
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>
`;
/* end snapshot select/Template Template Parts Placeholder is rendered */

snapshots["select/Template Template Parts Lazy Render: options"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>
`;
/* end snapshot select/Template Template Parts Lazy Render: options */

snapshots["select/Template Template Parts Lazy Render: options opened"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Lazy Render: options opened */

snapshots["select/Template Template Parts Lazy Render: data"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>
`;
/* end snapshot select/Template Template Parts Lazy Render: data */

snapshots["select/Template Template Parts Lazy Render: data opened"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Lazy Render: data opened */

snapshots["select/Template Template Parts Data is reflected to render"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to render */

snapshots["select/Template Template Parts Data is reflected to reverse render"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to reverse render */

snapshots["select/Template Template Parts Data is reflected to render null data"] = 
`<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to render null data */

