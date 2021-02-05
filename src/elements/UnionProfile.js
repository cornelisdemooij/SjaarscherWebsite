import { LitElement, html, css } from 'lit-element';
import GroupImages from '../crud/GroupImages.js';
import { formatPhoneNumber } from '../util.js';
import { siteHost } from '../../config/config.js';

class UnionProfile extends LitElement {
  static get styles() {
    return css`
      .drag-container {
        margin: 0 auto;
        width: 600px;
        transform-origin: 50% 120%;
      }
      @media (max-width: 600px) {
        .drag-container {
          width: 100%;
        }
      }
      .drag-container-content {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 600px;
        overflow: hidden;
      }
      @media (max-width: 600px) {
        .drag-container-content {
          height: 100vw;
        }
      }

      /* Profile */
      .image-container {
        color: white;
        height: 100%;
        width: 100%;
        background-color: #333333;
      }
      .profile-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
      .profile-name {
        position: absolute;
        left: 10px;
        right: 50px;
        bottom: 10px;
        text-align: left;
        color: white;
        background-color: transparent;
        font-size: 32px;
        text-shadow: 3px 3px 5px #000000;
      }
      #share-icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        height: 30px;
        width: 30px;
        background-color: transparent;
        cursor: pointer;
        transition: 0.3s;
        fill: white;
      }
      #share-icon:hover {
        fill: #970931;
      }

      .info-container {
        width: calc(100%-20px);
        height: calc(100vh - 100vw - 20px);
        overflow: scroll;
        margin: 0 auto;
        padding: 10px;
        background-color: #FFFFFF;
        text-align: left;
        font-size: 21px;
        color: #333333;
        overflow-x: hidden;
        scrollbar-width: none;
      }
      .info-container::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      @media (min-width: 602px) {
        .info-container {
          width: 580px;
          height: calc(100vh - 600px - 20px);
        }
      }
      @media (max-height: 750px) {
        .info-container {
          min-height: 150px;
        }
      }
      .info-container > * {
        margin-bottom: 5px;
      }
      .info-divider {
        border-top: solid 1px #BBBBBB;
      }
    `;
  }

  static get properties() {
    return {
      id: { type: Number },
      name: { type: String },
      description: { type: String, value: '' },

      website: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
      city: { type: String },
      country: { type: String },

      groupImages: { type: Array },
      
      _oldMouseX: { type: Number },
      _oldMouseY: { type: Number },
      _oldElemX: { type: Number },
      _oldElemY: { type: Number },
      _swipeResult: { type: String },
      _dragContainer: { type: Object },
    };
  }

  constructor() {
    super();
    this._swipeResult = 'none';
    this.groupImages = [];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'id') {
      if (newVal != oldVal) {
        GroupImages.readByGroupId(newVal)
        .then(result => {
          this.groupImages = result;
          this.render();
        })
        .catch(error => console.error(error));
      }
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  render() {
    return html`
      <div class="drag-container">
        <div class="drag-container-content">
          <div class="image-container" @mousedown=${this._onMouseDown} @touchstart=${this._onTouchStart}>
            ${
              (this.groupImages.length > 0)
              ? html`
                  <img 
                    class="profile-image"
                    src="${siteHost}/assets/groups/${this.groupImages[0].filename}"
                    alt="${this.name}"
                    title="${this.name}"
                  >
                `
              : ''
            }
            <div class="profile-name">${this.name}</div>
            <svg id="share-icon" viewBox="0 0 135.47 118.53">
              <path d="M 79.898019,-0.96433064 33.330298,-41.177029 c -4.076171,-3.520281 -10.500519,-0.662517 -10.500519,4.805891 v 21.18069 c -42.499756,0.486569 -76.2,9.0043004 -76.2,49.280762 0,16.256263 10.472473,32.360923 22.048523,40.780763 3.612356,2.62757 8.760619,-0.67019 7.428706,-4.92946 -11.997267,-38.368019 5.690394,-48.553948 46.722771,-49.144234 v 23.260844 c 0,5.47687 6.429375,8.32194 10.500519,4.80589 L 79.898019,8.6474524 c 2.92921,-2.529946 2.93317,-7.078398 0,-9.61178304 z" transform="translate(53.370221,42.725081)"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="info-container">
        ${this.city ? html`<div class="city">${this.city}</div>` : ''}
        ${this.description ? html`<div class="description">${this.description}</div>` : ''}
        ${this.website ? html`<div><a href="${this.website}">${this.website}</a></div>` : ''}
        ${this.email ? html`<div><a href="mailto:${this.email}">${this.email}</a></div>` : ''}
        ${this.phoneNumber ? html`<div><a href="tel:${this.phoneNumber}">${formatPhoneNumber(this.phoneNumber)}</a></div>` : ''}
      </div>
    `;
  }
  
  firstUpdated() {
    this._dragContainer = this.shadowRoot.querySelectorAll('.drag-container')[0];
  }

  setRotation(a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    this._dragContainer.style.transform = `matrix(${c}, ${s}, ${-s}, ${c}, 0, 0)`;
  }

  setData(profile) {
    if (profile == undefined) {
      this.style.display = 'none';
      return;
    } else {
      this.style.display = 'initial';
    }

    this.groupImages = [];
    const oldId = this.id;
    this.id = profile.id;
    this.attributeChangedCallback('id', oldId, this.id);

    this.name = profile.name;
    this.description = profile.description;

    this.website = profile.website;
    this.email = profile.email;
    this.phoneNumber = profile.phoneNumber;
    this.city = profile.city;
    this.country = profile.country;
  }

  _onMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragStart(e.clientX, e.clientY);

    this._dispatchCustomEvent('profileMouseEvent');
    
    // Set handlers for mouse moving and button being released:
    this.onmousemove = this._onMouseMove;
    this.onmouseup = this._onMouseUp;
  }
  _onTouchStart(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragStart(e.touches[0].clientX, e.touches[0].clientY);

    this._dispatchCustomEvent('profileTouchEvent');
    
    // Set handlers for moving and release:
    this.ontouchmove = this._onTouchMove;
    this.ontouchend = this._onTouchEnd;
  }
  _dragStart(clientX, clientY) {
    // Function to handle common functionality for mouse and touch.
    this._dragContainer.style.transition = '0.0s';
    this.width = this._dragContainer.offsetWidth;
    this.height = this._dragContainer.offsetHeight;

    // Get the click/touch position position at startup:
    this.oldMouseX = clientX;
    this.oldMouseY = clientY;

    // Convert click/touch position to point on element: // TODO: Take into account existing rotation
    this.oldElemX = clientX - parseInt(this._dragContainer.offsetLeft);
    this.oldElemY = clientY - parseInt(this._dragContainer.offsetTop);
  }

  _onMouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragMove(e.clientX, e.clientY);
  }
  _onTouchMove(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragMove(e.touches[0].clientX, e.touches[0].clientY);
  }
  _dragMove(clientX, clientY) {
    // Function to handle common functionality for mouse and touch.
    // Calculate the change in cursor position:
    const deltaMouseX = clientX - this.oldMouseX;
    const deltaMouseY = clientY - this.oldMouseY;
    const newElemX = this.oldElemX + deltaMouseX;
    const newElemY = this.oldElemY + deltaMouseY;

    const a1 = Math.atan2(this.width/2 - this.oldElemX, this.height - this.oldElemY);
    const a2 = Math.atan2(newElemX - this.width/2, this.height - newElemY);
    const a = a1+a2;
    if (a > 0.5) {
      if (this._swipeResult === 'none') {
        this._dispatchCustomEvent('unionProfileLeanEvent', 'like');
      }
      this._swipeResult = 'like';
    } else if (a < -0.5) {
      if (this._swipeResult === 'none') {
        this._dispatchCustomEvent('unionProfileLeanEvent', 'dislike');
      }
      this._swipeResult = 'dislike';
    } else {
      if (this._swipeResult !== 'none') {
        this._dispatchCustomEvent('unionProfileUnleanEvent', 'none');
      }
      this._swipeResult = 'none';
    }
    this.setRotation(a);
  }

  _onMouseUp() {
    // Stop moving the element when mouse button is released:
    this.onmousemove = null;
    this.onmouseup = null;
    this._dragEnd();
  }
  _onTouchEnd() {
    // Stop moving the element when mouse button is released:
    this.ontouchmove = null;
    this.ontouchend = null;
    this._dragEnd();
  }
  _dragEnd() {
    this._dispatchCustomEvent('unionProfileUnleanEvent', 'none');
    if (this._swipeResult !== 'none') {
      this._dispatchCustomEvent('unionProfileSwipeEvent', this._swipeResult);
    } else {
      this._dragContainer.style.transition = '0.3s';
      this._dragContainer.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
    }
  }

  _dispatchCustomEvent(name, detail) {
    const event = new CustomEvent(name, { 
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('union-profile', UnionProfile);