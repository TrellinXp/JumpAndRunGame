import { JumpAndRun } from './game.js';
class JumpAndRunController {
    
    constructor() {
        this.game = new JumpAndRun();

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');  
        this.x = canvas.width;
        this.y = 0;
        this.addStartListener(); 
        this.addJumpListener();
        this.startCreatingBackground();
        this.createClouds();
        this.addLifesLeft(this.game.numberOfLives);
        this.startCreatingObstacles();
        this.obstacles = [];
    }

    addStartListener() {
        let self = this;
        let start = document.getElementById('start');
        start.onclick = function () {
            location.reload();
        };
    }

    addLifesLeft(numberOfLives) {
        console.log(numberOfLives);
        let self = this;
        //this.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        console.log(numberOfLives);

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

        //this.ctx.drawImage(copiedCloud, 180, 40, 64, 64);

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
                    player.classList.remove('slide-bottom');       
                    player.classList.add('slide-top');
                    setTimeout(self.slideBottom, 800); 
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
        self.moveReactangle(100, 92, 30, 30, 'black');
        self.createStairs(250, 93, 30, 30, 'black'); 
    }

    moveReactangle(x, y, w, h, color) {
        let self = this;
        let count = 0;
        const interval = setInterval(function() {
            self.createRectangle(x-count, y, w+1, h+1, 'rgba(169,226, 251, 1)'); 
            count++;
            setTimeout(function() {
                self.createRectangle(x-count, y+1, w, h, color);
                self.obstacles.push(x + ' , '+y)
            }, 200)
            console.log(self.obstacles);
            count++;
        }, 200);
    }

    moveStairs(x, y, w, h, color) { 
        let self = this;          
        let count = 0;
        const interval = setInterval(function() {
            /*
            self.createRectangle(x, y, w, h, 'rgba(169,226, 251, 1)');
            self.createRectangle(x+30-count, y, w, h, 'rgba(169,226, 251, 1)');
            self.createRectangle(x+30-count, y-1, w, h, 'rgba(169,226, 251, 1)');
            */
            count++;
            /*setTimeout(function() {
                self.createRectangle(x, y, w, h, 'black');
                self.createRectangle(x+30-count, y, w, h, 'black');
                self.createRectangle(x+30-count, y-1, w, h, 'black');
            }, 10)*/

            count++;
        }, 10);
    }
    
    createRectangle(x, y, w, h, color) {        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    slideBottom() {
        this.player.classList.remove('slide-top');
        this.player.classList.add('slide-bottom');
    }
}

window.addEventListener('load', function () {
    new JumpAndRunController();
});