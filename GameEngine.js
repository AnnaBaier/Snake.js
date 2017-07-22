/**
 * Created by D067563 on 01.02.2017.
 */

'use strict';

class Rectangle {
    constructor(x, y, width, height, fillColor, strokeColor, strokeWidth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor === undefined ? 'white' : fillColor;
        this.strokeColor = strokeColor === undefined ? 'white' : strokeColor;
        this.strokeWidth = strokeWidth === undefined ? 0 : strokeWidth;
    }

    getBounds() {
        return {
            leftX: this.x,
            rightX: this.x + this.width,
            upperY: this.y,
            lowerY: this.y + this.height
        };
    }

    doesCollide(rectangle) {
        let thisBounds = this.getBounds();
        let thatBounds = rectangle.getBounds();

        return (thisBounds.rightX > thatBounds.leftX && thisBounds.leftX < thatBounds.rightX) &&
            (thisBounds.lowerY > thatBounds.upperY && thisBounds.upperY < thatBounds.lowerY);
    }
}

class GameEngine {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
    }

    getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    setSize(width, height) {
        this.context.canvas.width = width;
        this.context.canvas.height = height;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    calculateScale(width, height, widthGap, heightGap) {
        widthGap = widthGap === undefined ? 0 : widthGap;
        heightGap = heightGap === undefined ? 0 : heightGap;

        let widthScale = 1 + ((this.getScreenSize().width * (1 - widthGap) - width) / width);
        let heightScale = 1 + ((this.getScreenSize().height * (1 - heightGap) - height) / height);

        if (widthScale < heightScale) {
            this.scale = widthScale;
        } else {
            this.scale = heightScale;
        }
    }

    setBackground(backgroundColor) {
        this.clearCanvas();
        this.canvas.style.backgroundColor = backgroundColor;
    }

    drawRectangle(rectangle) {
        this.context.fillStyle = rectangle.fillColor;
        this.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

        this.context.strokeStyle = rectangle.strokeColor;
        this.context.lineWidth = rectangle.strokeWidth;
        this.context.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }

    keyDown(handler) {
        document.addEventListener('keydown', function (event) {
            if (event.defaultPrevented) {
                return;
            }

            if (handler(event)) {
                event.preventDefault();
            }
        });
    }

    keyUp(handler) {
        document.addEventListener('keyup', function (event) {
            if (event.defaultPrevented) {
                return;
            }

            if (handler(event)) {
                event.preventDefault();
            }
        });
    }

    drawLoop(loop, fpsRaw) {
        let fps = fpsRaw === undefined ? 1000 : fpsRaw;
        var interval = setInterval(loop, 1000 / fps);
    }
}