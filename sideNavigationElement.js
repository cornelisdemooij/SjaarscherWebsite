import {LitElement, html, css} from 'lit-element';

class SideNavigationElement extends LitElement {
  static get styles() {
    return css`
      /* The navigation menu links */
      a {
        padding: 8px 16px 8px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #FFFFFF;
        display: block;
        transition: 0.3s;
      }

      /* When you mouse over the navigation links, change their color */
      a:hover {
        color: #83082b;
      }

      /* Position and style the close button (top right corner) */
      .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
      }

      /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
      @media screen and (max-height: 450px) {
        a {font-size: 18px;}
      }
    `;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`  
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#">Swipe</a>
      <a href="#">Chat</a>
      <a href="#">Profile</a>
      <a href="#">Contact</a>
    `;
  }
  
  firstUpdated() {
    
  }
}

customElements.define('side-navigation-element', SideNavigationElement);