export default function dragElement(elem) {
  let oldMouseX = 0; let oldMouseY = 0;
  let oldElemX = 0; let oldElemY = 0;
  const draggableElem = elem.querySelectorAll('.drag-container-content')[0];
  const width = draggableElem.offsetWidth;
  const height = draggableElem.offsetHeight;
  if (draggableElem) {
    // If present, the header is where you move the DIV from: // TODO: Add handlers for device touches.
    draggableElem.onmousedown = dragMouseDown;
  }

  function setRotation(a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    elem.style.transform = `matrix(${c}, ${s}, ${-s}, ${c}, 0, 0)`;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup:
    oldMouseX = e.clientX;
    oldMouseY = e.clientY;
    // Convert mouse cursor position to point on element: // TODO: Take into account existing rotation
    oldElemX = e.clientX - parseInt(elem.offsetLeft);
    oldElemY = e.clientY - parseInt(elem.offsetTop);
    // Set handlers for mouse moving and button being released: // TODO: Add handlers for device touches.
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the change in cursor position:
    const deltaMouseX = e.clientX - oldMouseX;
    const deltaMouseY = e.clientY - oldMouseY;
    const newElemX = oldElemX + deltaMouseX;
    const newElemY = oldElemY + deltaMouseY;

    const a1 = Math.atan2(width/2-oldElemX, height-oldElemY);
    const a2 = Math.atan2(newElemX-width/2, height-newElemY);
    const a = a1+a2;
    if (a > 0.5) {
      console.log('like');
    } else if (a < -0.5) {
      console.log('dislike');
    }
    setRotation(a);
  }

  function closeDragElement() {
    // TODO: Animate the element bouncing back to its original position.
    // Stop moving the element when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
