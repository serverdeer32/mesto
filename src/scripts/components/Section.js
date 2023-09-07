export default class Section {
  constructor(renderer, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this.renderer(item);
    });
  }
}

