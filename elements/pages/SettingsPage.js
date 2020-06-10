import {LitElement, html, css} from 'lit-element';

class SettingsPage extends LitElement {
  static get styles() {
    return css`
      @font-face {
        font-family: 'Helvetica Neue';
        src: url(/assets/fonts/HelveticaNeueMedium.ttf) format("truetype");
      }

      * {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 28px;
      }
    `;
  }

  render() {
    return html`
      <construction-page></construction-page>
    `;
  }
}

customElements.define('settings-page', SettingsPage);