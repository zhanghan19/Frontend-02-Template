function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }

    for (let prop in element.computedStyle) {
        const p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {  // 去除px转换类型
            element.style[prop] = parseInt(element.style[prop]);
        }

        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {  // 纯数字转化类型
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style
}

function layout(element) {
    if (!element.computedStyle) {
        return
    }

    const elementStyle = getStyle(element);

    if (elementStyle.display !== "flex") {
        return
    }

    const items = element.children.filter(e => e.type === "element");

    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
    })

    let style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    })

    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }

    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }

    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }

    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }

    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'center'
    }

    let mainSize, // 主轴size width / height
        mainStart, // 主轴起点 left / right / top / bottom
        mainEnd,  // 主轴终点 left / right / top / bottom
        mainSign, // 主轴符号位，用于是否 reverse +1 / -1
        mainBase, // 主轴开始的位置 0 / style.width
        crossSize, // 交叉轴size
        crossStart, // 交叉轴坐标起点
        crossEnd,  // 交叉轴坐标终点
        crossSign,  // 交叉轴符号，用于是否 reverse
        crossBase;  // 交叉轴开始的位置

    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    } else if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    } else if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    } else if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (style.flexWrap === 'wrap-reverse') {
        let temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = +1;
    }

    let isAutoMainSize = false;
    // 没有设置mainSize用子元素撑开
    if (!style[mainSize]) {  // auto sizing
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];  // --------------------------------------
            }
        }
        isAutoMainSize = true;
    }

    const flexLine = [];
    const flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];  // 剩余空间
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);

        // 单个元素miansize
        if(itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }
        
        if(itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);  // 取最大交叉轴
            }
            flexLine.push(item);
        } else {
            // 当前flex子项，大于flex mainSize，自适应
            if(itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }

            // 当前flex 子项，大于flex容器剩余mainSpace，另起新行
            if(mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                // 创建新行
                flexLine = [item];
                flexLines.push(flexLine);

                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {  // 未超过 flex 容器剩余mainSpace添加进行
                flexLine.push(item);
            }

            // 处理交叉轴，只需要取 flex 子项最大 crossSize
            if(itemStyle[crossSize] != null && itemStyle[crossSize] !==(void 0)) {
                crossSpace = Math.max(crossSpace,itemStyle[crossSize]);
            }

            // flex 剩余容器 mainSpace
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
    console.log(items);

}

module.exports = layout;
