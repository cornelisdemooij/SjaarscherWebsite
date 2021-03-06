import {LitElement, html, css} from 'lit-element';

class StudentsPage extends LitElement {
  static get styles() {
    return css`
      construction-page {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        text-align: center;
        background-color: transparent;
      }

      student-profile {
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
        pointer-events: none; /* ignore mouse/touch, otherwise hints interfere with swipes */
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
      @media (max-width: 600px) {
        .hint {
          top: calc(50vw - 10px);
        }
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

      swipe-hint {
        position: absolute;
        margin: 285px auto;
        left: 0;
        right: 0;
        z-index: 1;
        pointer-events: none; /* ignore mouse/touch, otherwise hints interfere with swipes */
      }
      @media (max-width: 600px) {
        swipe-hint {
          margin-top: 47.5vw;
        }
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
      <construction-page></construction-page>
      <swipe-hint id='swipe-hint'></swipe-hint>
      ${this.profiles.map(profile => html`
        <student-profile
          firstName="${profile.firstName}"
          lastName="${profile.lastName}"
          age=${profile.age}
          study=${profile.study ? profile.study : ''}
          distance=${profile.distance ? profile.distance : ''}
          description=${profile.description ? profile.description : ''}
        ></student-profile>
      `)}
      <div id='hint-container'>
        <div id='dislike-hint' class='hint'>NOPE</div>
        <div id='like-hint' class='hint'>LIKE</div>
      </div>
    `;
  }
  
  firstUpdated() {
    this.addEventListener("studentProfileSwipeEvent", this._handleProfileSwipe);
    this.addEventListener("studentProfileLeanEvent", this._handleProfileLean);
    this.addEventListener("studentProfileUnleanEvent", this._handleProfileUnlean);
    this.addEventListener("profileMouseEvent", this._hideSwipeHint);
    this.addEventListener("profileTouchEvent", this._hideSwipeHint);
  }

  _handleProfileSwipe() {
    const swipedProfile = this.profiles.pop();
    //console.log(`swipedProfile = ${JSON.stringify(swipedProfile)}`);
    
    const fadeTime = 0.3; // in seconds.
    const profileElements = this.shadowRoot.querySelectorAll('student-profile');
    const swipedProfileElement = profileElements[profileElements.length-1];
    swipedProfileElement.style.transition = `${fadeTime}s`;
    swipedProfileElement.style.opacity = '0';
    swipedProfileElement.style.display = 'none';
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

  _hideSwipeHint() {
    const swipeHint = this.shadowRoot.querySelector('#swipe-hint');
    swipeHint.style.display = 'none';
  }
}

customElements.define('students-page', StudentsPage);