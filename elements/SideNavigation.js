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
      <a href="home">Home</a>
      <a href="unions">Verenigingen</a>
      <a href="students">Studenten</a>
      <a href="chat">Chat</a>
      <a href="events">Events</a>
      <a href="account">Account</a>
      <a href="settings">Instellingen</a>
      <a href="about">Contact</a>
      <!-- TODO Add language button here -->
    `;
  }
}

customElements.define('side-navigation', SideNavigation);