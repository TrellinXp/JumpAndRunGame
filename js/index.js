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
        //this.createClouds();
        this.addLifesLeft(this.game.numberOfLives);
        //this.startCreatingObstacles();

        this.player = document.getElementById('player');
    }

    addStartListener() {
        let self = this;
        let start = document.getElementById('start');
        start.onclick = function () {
            const interval = setInterval(function() {
                self.startCreatingObstacles();
            }, 20);
        };
    }

    addLifesLeft(numberOfLives) {
        console.log(numberOfLives);
        let self = this;
        //this.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        console.log(numberOfLives);

        for(var count = 0; count < numberOfLives; count++) {
            var img = new Image;
            img.src = './img/heart.png';
            self.ctx.drawImage(img, count * 10, 10, 20, 20);
        }

    }

    createClouds() {
        for(let count=0; count < 10; count) {
            var clood = document.getElementById("cloud");
            clood.display = 'block';
            this.ctx.drawImage(clood, 0, 0, 20, 20);
        }
    }

    addJumpListener() {
        let self = this;
        window.onkeydown = function(e) {
            switch (e.keyCode) {
                case 38:  
                    self.player.classList.remove('slide-bottom');       
                    self.player.classList.add('slide-top');
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
        let count = 0;
        const interval = setInterval(function() {
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height, 'brown');
            self.moveObstacle(180-count, 120, 30, 30, 'brown');
            count++;            
          }, 20);
    }

    moveObstacle(x, y, w, h, color) {
        this.createRectangle(x, y, w, h, color);
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