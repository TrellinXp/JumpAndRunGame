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
        this.startCreatingObstacles();
        //this.startCreatingBackground(0, 0);
        this.player = document.getElementById('player');
    }

    addStartListener() {
        let self = this;
        let start = document.getElementById('start');
        start.onclick = function () {
            start.innerHTML = 'Restart';
            //self.startCreatingBackground(0, 0);
        };
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

    startCreatingBackground(x, y) {
        const theCanvas = document.getElementById('canvas');
        const ctx = theCanvas.getContext('2d');        
        var img = new Image;
        img.src = '/img/background.jpg';
        img.classList.add('background');
        ctx.drawImage(img, 0, this.y); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.x -= 4;

        setTimeout(this.startCreatingBackground, 100, x, y);
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
        this.createObstacle(x, y, w, h, color);
    }
    
    createObstacle(x, y, w, h, color) {        
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