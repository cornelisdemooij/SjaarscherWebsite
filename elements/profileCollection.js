import {LitElement, html, css} from 'lit-element';

class ProfileCollection extends LitElement {
  static get styles() {
    return css`
      profile-element {
        position: absolute;
        margin: 0 auto;
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
        study: 'Industrial Design',
        distance: '2 km',
        description: 'Live. Laugh. Love. :D'
      },
      {
        firstName: 'Bert',
        lastName: '',
        age: 19,
        study: 'HBO Bachelor Lerarenopleiding Wiskunde',
        description: 'Mijn huisgenoot heet inderdaad Ernie.'
      },
      {
        firstName: 'Clarissa',
        lastName: 'de Baars',
        study: 'Life Science & Technology',
        distance: '1.5 km',
        description: 'Mijn ideale date? Met een kleine bootje het meer op en de hele dag vissen. 🐟'
      },
      {
        firstName: 'Dave',
        lastName: 'Johnson',
        age: 18,
        distance: '450 m',
        description: 'Cave Johnson is my dad #portal #bestgame'
      },
      {
        firstName: 'Ellie',
        lastName: 'van der Vlucht',
        description: `Yes, that is my pug. #dogmom
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving
        superlange beschrijving`,
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
        study: 'Klinische Technologie',
        distance: '750 m',
        description: 'Aankomend werktuigbouw eerstejaars'
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
          study=${profile.study ? profile.study : ''}
          distance=${profile.distance ? profile.distance : ''}
          description=${profile.description ? profile.description : ''}
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
    const swipedProfile = this.profiles.pop();
    console.log(`swipedProfile = ${JSON.stringify(swipedProfile)}`);
    console.log(`profiles = ${JSON.stringify(this.profiles)}`);
    
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