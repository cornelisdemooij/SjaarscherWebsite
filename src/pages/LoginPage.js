import {LitElement, html, css} from 'lit-element';
import { apiHost } from '../../config/config.js';
import XSRF from '../services/XSRF.js';

class LoginPage extends LitElement {
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

      form {
        height: 100vh;
        width: 100vw;
        background-color: #FAFAFA;
      }

      #logo-icon {
        display: block;
        width: calc(100% - 160px);
        max-width: 230px;
        margin: 0 auto;
        padding: 50px 0 0;
      }
      #logo-text {
        display: block;
        width: calc(100% - 60px);
        max-width: 334px;
        margin: 0 auto;
        padding: 0 0 20px;
      }

      div {
        margin: 10px 0;
      }

      input {
        text-align: center;
        width: 592px;
      }
      @media (max-width: 600px) {
        input {
          width: 100%;
          border-width: 1px 0px 1px 0px;
          border-style: solid;
          border-color: rgb(118,118,118);
          padding: 2px 3px;
        }
      }

      button {
        background-color: #970931;
        border: 0 solid #970931;
        border-radius: 3px;
        padding: 15px 50px 15px 50px;
        margin: 10px 0;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        color: #ffffff;
        width: 600px;
      }
      @media (max-width: 600px) {
        button {
          width: 100%;
          border-radius: 0;
        }
      }

      #alternatives, #alternatives > a {
        font-size: 17px;
      }
    `;
  }

  static get properties() {
    return {
      xsrfToken: { type: String },
    };
  }

  constructor() {
    super();
    this.xsrfToken = '';
    XSRF.getXSRFToken()
      .then(xsrfToken => this.xsrfToken = xsrfToken)
      .catch(error => console.error(error));
  }

  // Need to add code here to check or get XSRF token.

  render() {
    return html`
      <form action="${apiHost}/api/account/login" method="POST">
        <img
          id="logo-icon"
          src="https://cdn.sjaarscher.nl/icons/favicon-512x512.png"
          alt="Sjaarscher"
        />
        <img
          id="logo-text"
          src="https://cdn.sjaarscher.nl/icons/Sjaarscher%20-%20Text%20Logo.png"
          alt="Sjaarscher"
        />

        <div id="email">
          <input type="text" placeholder="naam@mail.com" name="email" required>
        </div>
        <div id="password">
          <input type="password" placeholder="wachtwoord" name="password" required>
        </div>
        <input type="hidden" name="_csrf" value="${this.xsrfToken}"/>
        <button type="submit">Log in</button>

        <div id="alternatives">
          <a href="#">Wachtwoord vergeten?</a> · <a href="#">Account aanmaken</a>
        </div>
        
      </form>
    `;
  }
}

customElements.define('login-page', LoginPage);