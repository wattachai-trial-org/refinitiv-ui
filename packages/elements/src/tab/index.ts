import {
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  ControlElement
} from '@refinitiv-ui/core';
import { VERSION } from '../';

import '../icon';
import '../label';

const isAllWhitespaceTextNode = (node: Node): boolean =>
  node.nodeType === document.TEXT_NODE
  && !node.textContent?.trim();

/**
 * A building block for individual tab
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-tab', {
  alias: 'coral-tab'
})
export class Tab extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Specify icon name to display in tab
   */
  @property({ type: String })
  public icon = '';

  /**
   * Specify tab's label text
   */
  @property({ type: String })
  public label = '';

  /**
   * Specify tab's sub-label text
   */
  @property({ type: String, attribute: 'sub-label' })
  public subLabel = '';

  /**
   * Specify tab's active status
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * Set tab to clearable
   */
  @property({ type: Boolean, reflect: true })
  public clears = false;

  /**
   * Enable shortening the label
   */
  @property({ type: String, reflect: true })
  public truncate: 'center' | '' | null | undefined = '';

  /**
   * Limit the number of lines before truncating
   */
  @property({ type: String, reflect: true, attribute: 'max-line' })
  public maxLine: string | null | undefined;

  /**
   * Set tab to clearable on hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'clears-on-hover' })
  public clearsOnHover = false;

  /**
   * Use level styling from theme
   * @ignore
   */
  @property({ type: String, reflect: true })
  public level: '1' | '2' | '3' = '1';

  /**
   * True, if there is slotted content
   */
  private isSlotHasChildren = true;

  /**
   * @param node that should be checked
   * @returns whether node can be ignored.
   */
  private isIgnorable (node: Node): boolean {
    return node.nodeType === document.COMMENT_NODE
      || isAllWhitespaceTextNode(node);
  }

  /**
   * Checks slotted children nodes and updates component to refresh label and sub-label templates.
   * @param event slotchange
   * @returns {void}
   */
  private checkSlotChildren = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.isSlotHasChildren = !slot.assignedNodes().filter(node => !this.isIgnorable(node)).length;
    void this.requestUpdate();
  };

  /**
   * Omitted maxLine if subLabel is provided
   * @returns Max line value
   */
  private getMaxLine (): string | null | undefined {
    return this.subLabel ? null : this.maxLine;
  }

  /**
   * @param event event from close button
   * @returns {void}
   */
  private handleClickClear (event: MouseEvent): void {
    event.stopPropagation();
    /**
     * Fires when click on cross occurs. `detail.label` provides label of tab if defined. `detail.active` provides current active state.
     * @param detail.label - label stored on the tab
     * @param detail.active - current active state, always present
     */
    this.dispatchEvent(new CustomEvent('clear', {
      detail: {
        label: this.label,
        active: this.active
      }
    }));
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-flex;
      }
      :host [part=sub-label] {
        display: block;
      }
    `;
  }

  /**
   * Show Close Button if allow clears
   * @returns close button template
   */
  private get CloseTemplate (): TemplateResult | null {
    return this.clears || this.clearsOnHover ? html`
        <div part="close-container">
          <ef-icon part="close" icon="cross" @tap="${this.handleClickClear}"></ef-icon>
        </div>
      ` : null;
  }

  /**
   * Create ef-label template when label is true
   * @returns Label template
   */
  private get LabelTemplate (): TemplateResult | null {
    if(!this.label || !this.isSlotHasChildren) {
      return null;
    }
    return html`
      <ef-label
        part="label"
        .truncate=${this.truncate}
        .maxLine=${this.getMaxLine()}
      >
        ${this.label}
      </ef-label>
    `;
  }

  /**
   * Create ef-label template when subLabel is true
   * @returns SubLabel template
   */
  private get SubLabelTemplate (): TemplateResult | null {
    if(!this.subLabel || !this.isSlotHasChildren) {
      return null;
    }
    return html`
      <ef-label
      part="sub-label"
      .truncate=${this.truncate}
      .maxLine=${this.getMaxLine()}>
        ${this.subLabel}
      </ef-label>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.icon ? html`<ef-icon icon=${this.icon} part="icon"></ef-icon>` : null}
        <div part="label-container">
          ${this.LabelTemplate}
          ${this.SubLabelTemplate}
          <slot @slotchange="${this.checkSlotChildren}">
          </slot>
        </div>
      ${this.CloseTemplate}
    `;
  }
}
