export class Dispatcher{
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type)
    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event);
  }
}


export class Listener {
  constructor(element, recognizer) {
    // 控制多建一起按下出现事件监听会被触发多次，导致报错
    let isListeningMouse = false;
    let contexts = new Map();
    element.addEventListener("mousedown", event => {
      let context = Object.create(null);
      contexts.set("mouse" + (1 << event.button), context);
      recognizer.start(event, context)
      let mousemove = event => {
        let button = 1;

        while (button <= event.buttons) {
          if (button & event.buttons) {
            // order of buttons & button property is not same
            let key;
            if (button === 2)
              key = 4;
            else if (button === 4)
              key = 2
            else
              key = button

            let context = contexts.get("mouse" + key);
          
            recognizer.move(event, context);
          }

          button = button << 1;
        }
      }

      let mouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        
        recognizer.end(event, context)
        contexts.delete("mouse" + (1 << event.button))

        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          isListeningMouse = false;
        }

      }

      if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
      }

    })

    element.addEventListener("touchstart", event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })
    
    element.addEventListener("touchmove", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.move(touch, context)
      }
    })
    
    element.addEventListener("touchend", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.end(touch, context)
        contexts.delete(touch.identifier);
      }
    })
    
    element.addEventListener("touchcancel", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.cancel(touch, context)
        contexts.delete(touch.identifier);
      }
    })
    
  }
}


export class Recognize {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  start(point, context) {
    context.startX = point.clientX, context.startY = point.clientY;
    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    context.handler = setTimeout(() => {
      context.isPan = false;
      context.isTap = false;
      context.isPress = true;
      context.handler = null
      this.dispatcher.dispatch("press", {})
    }, 500)
  
  }

  move(point, context) {
    context.dx = point.clientX - context.startX, context.dy = point.clientY - context.startX;
    if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      context.isVertical = Math.abs(context.dx) < Math.abs(context.dy)
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
      clearTimeout(context.handler)
    }
  
    if (context.isPan) {
   
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
    }
  
    // 过滤半秒内的速度
    context.points = context.points.filter(point => Date.now() - point.t < 500)
    // move 的时候添加点
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }
  
  end(point, context) {
    if (context.isTap) {
      console.log("tap")
      this.dispatcher.dispatch("tap", {})
      clearTimeout(context.handler)
    }
    
    if (context.isPress) {
      this.dispatcher.dispatch("pressend", {})
    }
  
    // 计算速度
    context.points = context.points.filter(point => Date.now() - point.t < 500)
    let s, t, v;
    if (!context.points.length) {
      v = 0
    } else {
      s = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2)
      t = (Date.now() - context.points[0].t);
  
      v = s / t;
    }
  
    if (v > 1.5) {
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatcher.dispatch("panend", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      })
    }
  }

  cancel(point, context) {
    clearTimeout(context.handler)
    this.dispatcher.dispatch("cancel", {})
  }

}


export function enableGesture(element) {
  new Listener(element, new Recognize(new Dispatcher(element)));
}
