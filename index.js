import dragElement from './profileDragging.js';

// Make the teaser draggable:
const dragElems = document.getElementsByClassName('drag-container');
for (const dragElem of dragElems) {
  dragElement(dragElem);
}
