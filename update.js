import { html, render } from 'lit-html';

const myTemplate = (name) => html`<p>Hello ${name}</p>`;
const contentElement = document.getElementById('content');
render(myTemplate('World'), contentElement);
