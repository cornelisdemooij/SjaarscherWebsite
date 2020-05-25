import {LitElement, html, css} from 'lit-element';

class Profile extends LitElement {
  static get styles() {
    return css`
      .drag-container {
        margin: 0 auto;
        width: 600px;
        transform-origin: bottom center;
      }
      @media (max-width: 600px) {
        .drag-container {
          width: 100%;
        }
      }
      .drag-container-content {
        position: relative;
        cursor: move;
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
        right: 10px;
        bottom: 10px;
        text-align: left;
        color: white;
        background-color: transparent;
        font-size: 32px;
        text-shadow: 3px 3px 5px #000000;
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
          width: 578px;
          height: calc(100vh - 600px - 20px);
          border-left: solid 1px #BBBBBB;
          border-right: solid 1px #BBBBBB;
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
      firstName: { type: String },
      lastName: { type: String, value: '' },
      age: { type: Number },
      study: { type: String, value: '' },
      distance: { type: String, value: '' },
      description: { type: String, value: '' },
      
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
  }

  render() {
    return html`  
      <div class="drag-container">
        <div class="drag-container-content">
          <div class="image-container" @mousedown=${this._onMouseDown} @touchstart=${this._onTouchStart}>
            <img 
              class="profile-image"
              src="assets/profilePictures/${this.firstName}/${this.firstName.toLowerCase()}.jpg" 
              alt="${this.firstName}" 
              title="${this.firstName}"
            >
            <div class="profile-name">${this.firstName} ${this.lastName} ${this.age ? '(' + this.age + ')' : ''}</div>
          </div>
        </div>
      </div>
      <div class="info-container">
        ${this.study ? html`<div class="study">${this.study}</div>` : ''}
        ${this.distance ? html`<div class="distance">${this.distance}</div>` : ''}
        ${
          (this.study || this.distance) && (this.description) ?
          html`<div class="info-divider"></div>` : ''
        }
        ${this.description ? html`<div class="description">${this.description}</div>` : ''}
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

  _onMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragStart(e.clientX, e.clientY);
    
    // Set handlers for mouse moving and button being released:
    this.onmousemove = this._onMouseMove;
    this.onmouseup = this._onMouseUp;
  }
  _onTouchStart(e) {
    e = e || window.event;
    e.preventDefault();
    this._dragStart(e.touches[0].clientX, e.touches[0].clientY);
    
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
        const event = new CustomEvent('profileLeanEvent', { 
          detail: 'like',
          bubbles: true, 
          composed: true 
        });
        this.dispatchEvent(event);
      }
      this._swipeResult = 'like';
    } else if (a < -0.5) {
      if (this._swipeResult === 'none') {
        const event = new CustomEvent('profileLeanEvent', { 
          detail: 'dislike',
          bubbles: true, 
          composed: true 
        });
        this.dispatchEvent(event);
      }
      this._swipeResult = 'dislike';
    } else {
      if (this._swipeResult !== 'none') {
        const event = new CustomEvent('profileUnleanEvent', { 
          detail: 'none',
          bubbles: true, 
          composed: true 
        });
        this.dispatchEvent(event);
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
    const event = new CustomEvent('profileUnleanEvent', { 
      detail: 'none',
      bubbles: true, 
      composed: true 
    });
    this.dispatchEvent(event);
    if (this._swipeResult !== 'none') {
      const event = new CustomEvent('profileSwipeEvent', { 
        detail: this._swipeResult,
        bubbles: true, 
        composed: true 
      });
      this.dispatchEvent(event);
    } else {
      this._dragContainer.style.transition = '0.3s';
      this._dragContainer.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
    }
  }
}

customElements.define('profile-element', Profile);