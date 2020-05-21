import {LitElement, html, css} from 'lit-element';

class ProfileElement extends LitElement {
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
        background-color: #FFFFFF;
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
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      oldMouseX: { type: Number },
      oldMouseY: { type: Number },
      oldElemX: { type: Number },
      oldElemY: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = 'Ellie';
    this.oldMouseX = 0;
    this.oldMouseY = 0;
    this.oldElemX = 0;
    this.oldElemY = 0;
  }

  render() {
    return html`  
      <div class="drag-container">
        <div class="drag-container-content">
          <div class="image-container" @mousedown=${this._onMouseDown}>
            <img 
              class="profile-image"
              src="assets/profilePictures/${this.name}/ellie.jpg" 
              alt="${this.name}" 
              title="${this.name}"
            >
            <div class="profile-name">Ellie van der Vlucht (19)</div>
          </div>
        </div>
      </div>
    `;
  }

  setRotation(a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    const dragContainer = this.shadowRoot.querySelectorAll('.drag-container')[0];
    dragContainer.style.transform = `matrix(${c}, ${s}, ${-s}, ${c}, 0, 0)`;
  }

  _onMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    const elem = this.shadowRoot.querySelectorAll('.drag-container-content')[0];
    this.width = elem.offsetWidth;
    this.height = elem.offsetHeight;

    // Get the mouse cursor position at startup:
    this.oldMouseX = e.clientX;
    this.oldMouseY = e.clientY;
    // Convert mouse cursor position to point on element: // TODO: Take into account existing rotation
    this.oldElemX = e.clientX - parseInt(elem.offsetLeft);
    this.oldElemY = e.clientY - parseInt(elem.offsetTop);
    // Set handlers for mouse moving and button being released: // TODO: Add handlers for device touches.
    this.onmousemove = this._onMouseMove;
    this.onmouseup = this._onMouseUp;
  }

  _onMouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the change in cursor position:
    const deltaMouseX = e.clientX - this.oldMouseX;
    const deltaMouseY = e.clientY - this.oldMouseY;
    const newElemX = this.oldElemX + deltaMouseX;
    const newElemY = this.oldElemY + deltaMouseY;

    const a1 = Math.atan2(this.width/2 - this.oldElemX, this.height - this.oldElemY);
    const a2 = Math.atan2(newElemX - this.width/2, this.height - newElemY);
    const a = a1+a2;
    if (a > 0.5) {
      console.log('like');
    } else if (a < -0.5) {
      console.log('dislike');
    }
    this.setRotation(a);
  }

  _onMouseUp() {
    // TODO: Animate the element bouncing back to its original position.
    // Stop moving the element when mouse button is released:
    this.onmousemove = null;
    this.onmouseup = null;
  }
}

customElements.define('profile-element', ProfileElement);