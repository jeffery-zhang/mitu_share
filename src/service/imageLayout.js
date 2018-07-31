import './../css/image-layout.scss'

class ImageLayout {
  constructor(container, imgs) {
    this.container = container;
    this.imgs = imgs;
    this._init();
  }

  _init() {
    if (this.imgs.length === 1) {
      this._render(this.container, this.imgs[0].url);
      return;
    }
    this._multiRender();
  }

  _multiRender() {
    const length = this.imgs.length;
    this.container.className += ' length' + length;
    this.imgs.forEach((item, index) => {
      const dom = document.createElement('div');
      dom.style.position = 'absolute';
      this._render(dom, item.url);
      this.container.appendChild(dom);
    });    
  }

  _render(dom, img) {
    dom.style.background = 'url("' + img + '") center center/cover no-repeat';
  }
}

export default ImageLayout;
