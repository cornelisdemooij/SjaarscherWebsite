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

      #hint-container {
        position: relative;
        height: 0;
        max-width: 600px;
        z-index: 1;
        margin: 0 auto;
      }
      @media (max-width: 600px) {
        #hint-container {
          max-width: 100%;
        }
      }
      .hint {
        position: absolute;
        opacity: 0;
        transition: none;
        font-size: 48px;
        top: 290px;
      }
      #dislike-hint {
        color: #a73030;
        left: 20px;
        transform: rotate(-20deg);
      }
      #like-hint {
        color: #60a730;
        right: 20px;
        transform: rotate(20deg);
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
        description: 'Mijn huisgenoot heet inderdaad Ernie. Ik hou van getallen, kleuren en vogels.'
      },
      {
        firstName: 'Clarissa',
        lastName: 'de Baars',
        study: 'Life Science & Technology',
        distance: '1.5 km',
        description: 'Mijn ideale date? Met een klein bootje het meer op en de hele dag vissen. 🐟'
      },
      {
        firstName: 'Dave',
        lastName: 'Johnson',
        age: 18,
        study: 'Computer Science and Engineering',
        distance: '450 m',
        description: 'Cave Johnson is my dad #portal #bestgame'
      },
      {
        firstName: 'Ellie',
        lastName: 'van der Vlucht',
        age: 19,
        study: 'Electrical Engineering',
        distance: '300 m',
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
        study: 'Bouwkunde',
        description: 'Afgewezen voor de kunstacademie :('
      },
      {
        firstName: 'Gert',
        lastName: 'Smit',
        age: 18,
        study: 'Werktuigbouwkunde',
        distance: '750 m',
        description: 'Aankomend werktuigbouw eerstejaars. Ik speel akoestische gitaar en maak aardewerk'
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
      <div id='hint-container'>
        <div id='dislike-hint' class='hint'>NOPE</div>
        <div id='like-hint' class='hint'>LIKE</div>
      </div>
    `;
  }
  
  firstUpdated() {
    this.addEventListener("profileSwipeEvent", this._handleProfileSwipe);
    this.addEventListener("profileLeanEvent", this._handleProfileLean);
    this.addEventListener("profileUnleanEvent", this._handleProfileUnlean);
  }

  _handleProfileSwipe() {
    const swipedProfile = this.profiles.pop();
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

  _handleProfileLean(e) {
    let hint;
    if (e.detail === 'like') {
      hint = this.shadowRoot.querySelector('#like-hint');
    } else if (e.detail === 'dislike') {
      hint = this.shadowRoot.querySelector('#dislike-hint');
    }
    if (hint) {
      hint.style.transition = 'none';
      hint.style.opacity = 1;
    }
  }

  _handleProfileUnlean(e) {
    if (e.detail === 'none') {
      const likehint = this.shadowRoot.querySelector('#like-hint');
      const dislikehint = this.shadowRoot.querySelector('#dislike-hint');
      likehint.style.transition = '0.3s';
      dislikehint.style.transition = '0.3s';
      likehint.style.opacity = 0;
      dislikehint.style.opacity = 0;
    }
  }
}

customElements.define('profile-collection-element', ProfileCollection);