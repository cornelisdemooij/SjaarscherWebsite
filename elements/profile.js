import {LitElement, html, css} from 'lit-element';

class Profile extends LitElement {
  static get styles() {
    return css`
      .drag-container {
        position: relative;
        display: inline-block;
        width: 600px;
        transform-origin: bottom center;
      }
      @media (max-width: 600px) {
        .drag-container {
          max-width: 100%;
        }
      }
      .drag-container-content {
        position: relative;
        cursor: move;
        width: 100%;
        overflow: hidden;
      }
      .drag-container-content img {
        position: relative;
        width: 100%;
      }

      /* Profile */
      .image-container {
        position: relative;
        color: white;
      }
      .profile-image {
        height: 600px;
        object-fit: cover;
      }
      .profile-name {
        position: absolute;
        left: 18px;
        bottom: 12px;
        color: white;
        background-color: transparent;
        font-size: 32px;
        text-shadow: 3px 3px 5px #000000;
      }
    `;
  }

  static get properties() {
    return {
      firstName: { type: String },
      lastName: { type: String, value: '' },
      age: { type: Number },
      
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
    this.oldMouseX = 0;
    this.oldMouseY = 0;
    this.oldElemX = 0;
    this.oldElemY = 0;
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
      console.log('like');
      this._swipeResult = 'like';
    } else if (a < -0.5) {
      console.log('dislike');
      this._swipeResult = 'dislike';
    } else {
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