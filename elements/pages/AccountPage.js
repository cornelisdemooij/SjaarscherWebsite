import {LitElement, html, css} from 'lit-element';

class AccountPage extends LitElement {
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

      @media screen and (max-width: 360px) {
        * {
          font-size: 20px;
        }
      }
    `;
  }

  render() {
    return html`
      Under construction.
    `;
  }
}

customElements.define('account-page', AccountPage);