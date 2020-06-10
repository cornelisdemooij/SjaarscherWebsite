import { LitElement, html, css } from 'lit-element';
import { submitEmail } from '../util.js';

class AboutPage extends LitElement {
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

      #container {
        height: 100vh;
        width: 600px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      @media (max-width: 600px) {
        #container {
          max-width: 100%;
        }
      }

      .construction-icon {
        width: 100px;
        margin: 20px;
        fill: #970931;
      }
      @media (max-width: 200px) {
        .construction-icon {
          width: 50%;
        }
      }

      p, input {
        margin: 0 0 20px 0;
      }

      input {
        border: black solid 3px;
      }
      input:invalid {
        border: #970931 solid 3px;
      }
      @media (max-width: 600px) {
        input {
          width: calc(100% - 10px);
        }
      }

      #submit {
        background-color: #970931;
        border: 0 solid #970931;
        border-radius: 3px;
        padding: 15px 50px 15px 50px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        color: #ffffff;
      }
      @media (max-width: 600px) {
        #submit {
          width: 100%;
          padding: 15px 0 15px 0;
          border-radius: 0;
        }
      }

      #successMessage, #failMessage {
        display: none;
        transition: 0.3s
      }
    `;
  }

  render() {
    return html`
      <div id='container'>
        <svg class="construction-icon" viewBox="0 0 135.47 135.48">
          <path d="M 54.275502,274.99139 23.292792,244.00868 C 17.180917,237.89681 8.0527916,236.70618 0.69737459,240.33097 L -27.507208,212.12639 v -16.43062 l -33.866667,-25.4 -16.933333,16.93333 25.4,33.86667 h 16.430625 l 28.2045826,28.20458 c -3.5983326,7.35542 -2.4341656,16.48354 3.677709,22.59542 l 30.9827034,30.98271 c 3.86292,3.86291 10.10709,3.86291 13.94355,0 l 13.94354,-13.94354 c 3.83646,-3.86292 3.83646,-10.10709 0,-13.94355 z M 9.4550836,229.82702 c 7.4877084,0 14.5256284,2.91041 19.8172884,8.20208 l 5.13292,5.13292 c 4.18042,-1.82563 8.14917,-4.36563 11.58875,-7.80521 9.81604,-9.81604 13.14979,-23.62729 10.02771,-36.16854 -0.58209,-2.38125 -3.57188,-3.20146 -5.31813,-1.45521 l -19.685,19.685 -17.965205,-2.98979 -2.989792,-17.96521 19.684997,-19.685 c 1.74625,-1.74625 0.89959,-4.73604 -1.50812,-5.34458 -12.541252,-3.09563 -26.3525024,0.23812 -36.1420854,10.0277 -7.5406246,7.54063 -11.0860416,17.48896 -10.9008326,27.41084 l 21.7222906,21.72229 c 2.143125,-0.50271 4.365625,-0.76729 6.535209,-0.76729 z M -18.035125,251.52285 -33.037,236.52097 -73.3595,276.86994 c -6.614583,6.61458 -6.614583,17.3302 0,23.94479 6.614584,6.61458 17.330209,6.61458 23.944792,0 l 32.7025,-32.70251 c -2.010833,-5.2652 -2.619375,-11.00666 -1.322917,-16.58937 z m -43.33875,43.65625 c -3.4925,0 -6.35,-2.8575 -6.35,-6.35 0,-3.51896 2.831042,-6.35 6.35,-6.35 3.518959,0 6.35,2.83104 6.35,6.35 0,3.4925 -2.831041,6.35 -6.35,6.35 z" transform="translate(78.320437,-170.29577)"/>
        </svg>
        <p>
          Onder constructie.
        </p>
        <p>
          Laat je email adres achter en we sturen je een bericht wanneer we live gaan:
        </p>
        <input type="email" id="email" required placeholder="naam@mail.com" pattern="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z])+$">
        <input type="button" id="submit" value="Verzenden" @click=${this._submitEmail}>
        <p id="successMessage">
          Je email adres is opgeslagen, bedankt en tot snel!
        </p>
        <p id="failMessage">
          Het is niet gelukt om je email adres op te slaan, onze excuses.
          Probeer het nog eens, of stuur een berichtje naar <a href="mailto:info@sjaarscher.nl">info@sjaarscher.nl</a>.
        </p>
      </div>
    `;
  }

  async _submitEmail() {
    const mailComponent = this.shadowRoot.querySelector('#email');
    const valid = mailComponent.checkValidity();
    if (!valid) {
      window.alert('Het email adres dat je hebt ingevuld is niet geldig.');
      return;
    }
    const email = mailComponent.value;
    const emailSaved = await submitEmail(email);
    if (emailSaved) {
      this.shadowRoot.querySelector('#successMessage').style.display = 'block';
      this.shadowRoot.querySelector('#failMessage').style.display = 'none';
    } else {
      this.shadowRoot.querySelector('#successMessage').style.display = 'none';
      this.shadowRoot.querySelector('#failMessage').style.display = 'block';
    }
  }
}

customElements.define('about-page', AboutPage);