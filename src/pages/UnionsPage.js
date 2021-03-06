import {LitElement, html, css} from 'lit-element';
import Groups from '../crud/Groups.js';

class UnionsPage extends LitElement {
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

      union-profile {
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
      profiles: { type: Array },
    };
  }

  constructor() {
    super();
    this.profiles = [];
    Groups.read()
      .then(result => this.profiles = result)
      .catch(error => console.error(error));
  }

  render() {
    return html`
      <construction-page></construction-page>
      <swipe-hint id='swipe-hint'></swipe-hint>
      ${this.profiles
        .slice(-3)
        .map(profile => html`
          <union-profile
            id="${profile.id}"
            name="${profile.name}"
            description=${profile.description ? profile.description : ''}
            website="${profile.website}"
            email="${profile.email}"
            phoneNumber="${profile.phoneNumber}"
            city="${profile.city}"
            country="${profile.country}"
          ></union-profile>
        `)
      }
      <div id='hint-container'>
        <div id='dislike-hint' class='hint'>NOPE</div>
        <div id='like-hint' class='hint'>LIKE</div>
      </div>
    `;
  }
  
  firstUpdated() {
    this.addEventListener("unionProfileSwipeEvent", this._handleUnionProfileSwipe);
    this.addEventListener("unionProfileLeanEvent", this._handleUnionProfileLean);
    this.addEventListener("unionProfileUnleanEvent", this._handleUnionProfileUnlean);
    this.addEventListener("profileMouseEvent", this._hideSwipeHint);
    this.addEventListener("profileTouchEvent", this._hideSwipeHint);
  }

  _handleUnionProfileSwipe() {
    const fadeTime = 0.3; // in seconds.

    const swipedProfile = this.profiles.pop();
    const profileElements = this.shadowRoot.querySelectorAll('union-profile');
    const swipedProfileElement = profileElements[profileElements.length-1];
    const parentNode = swipedProfileElement.parentNode;
    const childNodes = parentNode.children;

    //console.log(`swipedProfile = ${JSON.stringify(swipedProfile)}`);
    
    swipedProfileElement.style.transition = `${fadeTime}s`;
    swipedProfileElement.style.opacity = '0';
    swipedProfileElement.style.display = 'none';

    setTimeout(() => {
      parentNode.insertBefore(childNodes[4], childNodes[2]);
      swipedProfileElement.setRotation(0);
      swipedProfileElement.style.transition = `0s`;
      swipedProfileElement.style.opacity = '1';
      swipedProfileElement.style.display = 'initial';
      const newProfile = this.profiles.slice(-4,-3)[0];
      swipedProfileElement.setData(newProfile);
    }, fadeTime*1000);
  }

  _handleUnionProfileLean(e) {
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

  _handleUnionProfileUnlean(e) {
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

customElements.define('unions-page', UnionsPage);