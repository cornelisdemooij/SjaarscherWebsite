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

      input {
        margin: 10px 0;
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

      #alternatives {
        margin: 10px 0;
      }
      #alternatives, #alternatives > a {
        font-size: 17px;
      }
    `;
  }

  // Need to add code here to check or get XSRF token.

  render() {
    return html`
      <form @submit=${this.submit}>
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

        <input id="email" type="text" placeholder="naam@mail.com" name="email" required>
        <input id="password" type="password" placeholder="wachtwoord" name="password" required>
        <button type="submit">Log in</button>

        <div id="alternatives">
          <a href="#">Wachtwoord vergeten?</a> · <a href="#">Account aanmaken</a>
        </div>
      </form>
    `;
  }

  submit(e) {
    e.preventDefault(); // Prevent the form's default behaviour, where it uses the input values as query params.

    const email = this.shadowRoot.getElementById('email').value;
    const password = this.shadowRoot.getElementById('password').value;

    XSRF.getXSRFToken()
      .then(xsrfToken => fetch(`${apiHost}/api/account/login`, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken
        }),
        body: JSON.stringify({email, password})
      }))
      .then(response => response.text())
      .then((data) => {
        const parsedData = data ? JSON.parse(data) : {};
        if (parsedData.status && parsedData.status !== 202) {
          throw parsedData;
        } else {
          if (parsedData) {
            navigateBack();
          } else {
            navigate('/about')
          }
        }
      })
      .catch((error) => {
        console.error(error)
        window.alert('Error: Could not log you in. Backend responded with: ' + JSON.stringify(error));
      });
  }
}

customElements.define('login-page', LoginPage);