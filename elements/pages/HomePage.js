import {LitElement, html, css} from 'lit-element';

class HomePage extends LitElement {
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

      #home-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #FAFAFA;
        text-align: center;
      }

      #logo-icon {
        display: block;
        width: calc(100% - 160px);
        max-width: 230px;
        margin: 0 auto;
        padding-top: 50px;
      }
      #logo-text {
        display: block;
        width: calc(100% - 60px);
        max-width: 334px;
        margin: 0 auto;
      }

      #start-container {
        position: absolute;
        width: 80vw;
        margin: 50px 10vw;
      }
      #start-prompt {
        margin: 10px 0;
      }
      .start-answer {
        background-color: #970931;
        border: 0 solid #970931;
        border-radius: 3px;
        padding: 15px 50px 15px 50px;
        margin: 10px 0;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        color: #ffffff;
      }

      @media screen and (max-width: 270px) {
        #start-container {
          width: 100vw;
          margin: 50px 0;
        }
        .start-answer {
          border-radius: 0px;
          padding: 15px 0;
          width: 100%;
        }
      }
    `;
  }

  render() {
    return html`
      <div id='home-container'>
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
        <div id='start-container'>
          <div id='start-prompt'>Ik ben op zoek naar...</div>
          <a class='start-answer' href="#" onclick="onNavigate('/unions'); return false;">
            Verenigingen
          </a>
          <a class='start-answer' href="#" onclick="onNavigate('/students'); return false;">
            Studenten
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);