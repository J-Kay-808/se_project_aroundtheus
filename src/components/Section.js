export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem = (cardData) => {
    const element = this._renderer(cardData);
    this._container.prepend(element);
  };

  renderItems = () => {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  };
}
