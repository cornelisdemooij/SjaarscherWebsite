import {LitElement, html, css} from 'lit-element';

class ProfileCollection extends LitElement {
  static get styles() {
    return css`
      profile-element {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
        background-color: transparent;
      }
    `;
  }

  static get properties() {
    return {
      profiles: { type: Array, value: [] },
    };
  }

  constructor() {
    super();
    this.profiles = [
      {
        firstName: 'Amanda',
        lastName: 'Broekema',
        age: 19,
      },
      {
        firstName: 'Bert',
        lastName: '',
        age: 19,
      },
      {
        firstName: 'Clarissa',
        lastName: 'de Baars',
      },
      {
        firstName: 'Dave',
        lastName: 'Johnson',
        age: 18,
      },
      {
        firstName: 'Ellie',
        lastName: 'van der Vlucht'
      },
      {
        firstName: 'Freddy',
        lastName: 'van \'t Veld',
        age: 17,
      },
      {
        firstName: 'Gert',
        lastName: 'Smit',
        age: 18,
      },
    ];
  }

  render() {
    return html`
      ${this.profiles.map(profile => html`
        <profile-element
          firstName="${profile.firstName}"
          lastName="${profile.lastName}"
          age=${profile.age}
        ></profile-element>
      `)}
    `;
  }
  
  firstUpdated() {
    this.addEventListener("profileSwipeEvent", this._handleProfileSwipe);
  }

  _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  _handleProfileSwipe() {
    const swipedProfile = this.profiles.slice(1,1);
    console.log(`swipedProfile = ${JSON.stringify(swipedProfile)}`);
    
    const fadeTime = 0.3; // in seconds.
    const profileElements = this.shadowRoot.querySelectorAll('profile-element');
    const swipedProfileElement = profileElements[profileElements.length-1];
    swipedProfileElement.style.transition = `${fadeTime}s`;
    swipedProfileElement.style.opacity = '0';
    setTimeout(() => {
      this.requestUpdate();
      swipedProfileElement.parentNode.removeChild(swipedProfileElement);
    }, fadeTime*1000);
  }
}

customElements.define('profile-collection-element', ProfileCollection);