import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { translate, Translate } from '@refinitiv-ui/translate';
import { VERSION } from '../../version.js';
import '@refinitiv-ui/phrasebook/locale/en/notification.js';

import '../../icon/index.js';

/**
 * Used to show informative content when something happens in the application
 *
 * @fires collapsed - Fired when notification is collapsed.
 * @fires dismiss - Fired when the user taps close button to dismiss notification. The event is not triggered if dismiss is done programmatically.
 *
 */
@customElement('ef-notification')
export class Notification extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static override get version (): string {
    return VERSION;
  }

  /**
   * Default role of the element
   */
  protected override readonly defaultRole: string | null = 'alert';

  /**
   * The message to show in the notification.
   */
  @property({ type: String })
  public message = '';

  /**
   * Notification style: Confirm
   */
  @property({ type: Boolean, reflect: true })
  public confirm = false;

  /**
   * Notification style: Warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
   * Notification style: Error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Toggles the collapsed state.
   */
  @property({ type: Boolean, reflect: true })
  public collapsed = false;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  /**
   * On first updated lifecycle
   * @param changedProperties changed property
   * @returns {void}
   */
  protected override firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('animationend', this.onAnimationEnd);
  }

  /**
   * Dismisses the notification, firing a `dismiss` event and collapsing the notification.
   * @returns {void}
   */
  public dismiss (): void {
    const event = new CustomEvent('dismiss', {
      bubbles: false,
      cancelable: true
    });

    // do action only if it was not prevented by a handler
    if (this.dispatchEvent(event)) {
      this.collapsed = true;
    }
  }

  /**
   * Event handler for the clear button.
   * @param event event object
   * @returns {void}
   * @private
   */
  private onClearClick (event: Event): void {
    event.stopPropagation();
    this.dismiss();
  }

  /**
   * Event handler for when animation end.
   * @returns {void}
   */
  private onAnimationEnd (): void {
    if (this.collapsed) {
      this.dispatchEvent(new CustomEvent('collapsed', {
        bubbles: false,
        cancelable: false
      }));
    }
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   *
   * @returns CSS template
   */
  static override get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      [part=label] {
        color: red;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   *
   * @returns {TemplateResult} Render template
   */
  protected override render (): TemplateResult {
    return html`
    <style>
    :host {
      display: block;
    }
    </style>
    <div part="container">
      <div part="content"><slot>${this.message}</slot></div>
      <ef-icon part="clear" icon="cross" role="button" aria-description="${this.t('CLOSE')}" @click="${this.onClearClick.bind(this)}"></ef-icon>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-notification': Notification;
  }
}
