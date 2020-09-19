import { Component, createElement } from "./framework.js";
import './css/index.css'
import img_1 from './images/1.jpg';
import img_2 from './images/2.jpg';
import img_3 from './images/3.jpg';
import img_4 from './images/4.jpg';

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let record of this.attributes.src) {
      let child = document.createElement('div');
      child.classList.add('item');
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }

    let position = 0;
    this.root.addEventListener("mousedown", event => {
      let children = this.root.children;
      let staetX = event.clientX;

      let move = event => {
        let x = event.clientX - staetX;
        // let current = position - Math.round(x / 640);
        let current = position -((x - x % 640) / 640);

        for(let offset of [-1, 0, 1]){
          let pos = current + offset;
          pos = (pos + children.length) % children.length

          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${- pos * 640 + offset * 640 + x % 640}px)`
        }

        for(let child of children) {
         
        }
      }

      let up = event => {
        let x = event.clientX - staetX;
        position = position - Math.round(x / 640);
        for(let offset of [0, -Math.sign(Math.round(x / 640) - x + 320 * Math.sign(x))]){
          let pos = position + offset;
          pos = (pos + children.length) % children.length

          children[pos].style.transition = '';
          children[pos].style.transform = `translateX(${- pos * 640 + offset * 640}px)`
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })
    

    /*let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = 'none';
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`

      setTimeout(() => {
        next.style.transition = '';
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        next.style.transform = `translateX(${- nextIndex * 100}%)`

        currentIndex = nextIndex;
      }, 16);

     
    }, 1000)
    */

    return this.root
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

const d = [img_1, img_2, img_3, img_4,]

// document.body.appendChild(a)

let a = <Carousel src={d} />
a.mountTo(document.body)
