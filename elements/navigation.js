import {LitElement, html, css} from 'lit-element';

class SideNavigation extends LitElement {
  static get styles() {
    return css`
      /* The navigation menu links */
      a {
        padding: 8px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #333333;
        display: block;
        transition: 0.3s;
      }

      /* When you mouse over the navigation links, change their color */
      a:hover, a:active, a:focus {
        background-color: #970931;
        color: #FFFFFF;
        outline: none;
      }

      /* Position and style the close button (top right corner) */
      .closebtn {
        font-size: 25px;
        padding: 6px 16px 10px;
      }

      /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
      @media screen and (max-height: 450px) {
        a {
          font-size: 18px;
        }
      }
    `;
  }

  render() {
    return html`  
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#">Unions</a>
      <a href="#">Students</a>
      <a href="#">Chat</a>
      <a href="#">Events</a>
      <a href="#">Account</a>
      <a href="#">Settings</a>
      <a href="#">About</a>
    `;
  }
}

customElements.define('side-navigation', SideNavigation);