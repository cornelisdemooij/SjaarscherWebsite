export default function dragElement(elem) {
  var oldMouseX = 0, oldMouseY = 0;
  var oldElemX = 0, oldElemY = 0;
  let draggableElem = elem.querySelectorAll('.drag-container-content')[0];
  let width = draggableElem.offsetWidth;
  let height = draggableElem.offsetHeight;
  if (draggableElem) {
    // If present, the header is where you move the DIV from: // TODO: Add handlers for device touches.
    draggableElem.onmousedown = dragMouseDown;
  }

  function setRotation(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);
    elem.style.transformOrigin = `bottom center`;
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
    let deltaMouseX = e.clientX - oldMouseX;
    let deltaMouseY = e.clientY - oldMouseY;
    let newElemX = oldElemX + deltaMouseX;
    let newElemY = oldElemY + deltaMouseY;

    let a1 = Math.atan2(width/2-oldElemX, height-oldElemY);
    let a2 = Math.atan2(newElemX-width/2, height-newElemY);
    let a = a1+a2;
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
