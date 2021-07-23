import { JumpAndRun } from './game.js';
class JumpAndRunController {
    
    constructor() {
        this.game = new JumpAndRun();

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');  
        this.x = canvas.width;
        this.y = 0;
        this.obstacles = [];
        this.addStartListener(); 
        this.addJumpListener();
        this.startCreatingBackground();
        this.createClouds();
        this.addLifesLeft(this.game.numberOfLives);
        this.startCreatingObstacles();
    }

    addStartListener() {
        let start = document.getElementById('start');
        start.onclick = function () {
            location.reload();
        };
    }

    addLifesLeft(numberOfLives) {
        let self = this;
        var heart = document.getElementById("heart");

        let copiedHeart = heart.cloneNode(true);
        console.log(copiedHeart);

        for(var count = 0; count < numberOfLives; count++) {
            var img = new Image;
            img.src = './img/heart.png';
            self.ctx.drawImage(copiedHeart, (count * 14)+10, 5, 10, 10);
        }

    }

    createClouds() {
        var clood = document.getElementById("cloud");

        let copiedCloud = clood.cloneNode(true);
        console.log(copiedCloud);
        copiedCloud.style.display = 'block';

        let width = clood.style.width;
        console.log(width);

        this.ctx.drawImage(copiedCloud, 10, 10, 52, 64);
        this.ctx.drawImage(copiedCloud, 60, 30, 64, 64);
        this.ctx.drawImage(copiedCloud, 140, 0, 64, 64);
        this.ctx.drawImage(copiedCloud, 230, 0, 64, 64);
    }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    

    addJumpListener() {
        let self = this;
        let player = document.getElementById('player');
        window.onkeydown = function(e) {
            switch (e.keyCode) {
                case 38:  
                    player.classList.remove('slide-bck-left');       
                    player.classList.add('slide-top');
                    setTimeout(self.slideRight, 500);
                    setTimeout(self.slideBottom, 800); 
                    setTimeout(self.slideLeft, 3000);
                    break;
            }
        };  
    }

    startCreatingBackground() {    
        var self = this;
        self.createRectangle(0, 0, canvas.width, canvas.height, '#03a9f457');
        self.createRectangle(0, 123, canvas.width, canvas.height, 'green');
    }

    startCreatingObstacles() {
        var self = this;
        const interval = setInterval(function() {
            self.moveReactangle(250, 92, 30, 30, 'black');
        }, 5000);
    }

    moveReactangle(x, y, w, h, color) {
        let self = this;
        let count = 0;
        const interval = setInterval(function() {
            self.createRectangle(x-count, y, w+1, h+1, 'rgba(169,226, 251, 1)'); 
            count++;
            setTimeout(function() {
                self.createRectangle(x-count, y+1, w, h, color);
                self.obstacles.push(x + ' , '+y);
            }, 100)
            count++;
        }, 100);
    }
    
    createRectangle(x, y, w, h, color) {        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    slideBottom() {
        this.player.classList.remove('slide-fwd-right');
        this.player.classList.add('slide-bottom');
    }

    slideRight() {
        this.player.classList.remove('slide-top');
        this.player.classList.add('slide-fwd-right');
    }

    slideLeft() {
        this.player.classList.remove('slide-bottom');
        this.player.classList.add('slide-bck-left');
    }
}

window.addEventListener('load', function () {
    new JumpAndRunController();
});