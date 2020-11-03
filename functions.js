
function makeShape(shape, size, x, y, o, red, g, b) {
    let r = size;
    //noFill();
    fill(red, g, b, o)
    noStroke();
    push();
    //translate(windowWidth/2, windowHeight/2);
    translate(x, y);
    
    if(shape < 2) {
        ellipse(0, 0, r);
    }
    else if(shape < 3) {
        push();
        strokeWeight(5);
        stroke(red, g, b, o);
        line(-r/2, -r/2, +r/2, +r/2);
        pop();
    }
    else {
        beginShape();
        for(let i = 0; i < TWO_PI; i += TWO_PI/shape) {
            let x = r * sin(i);
            let y = r * cos(i);
            vertex(x, y);
            //ellipse(x, y, r);
        }
    endShape(CLOSE);
    }
    pop();
}

let totalr = 0;
class Part {
    constructor(shape, size, x, y, o, r, g, b) {
        this.shape = shape;
        this.size = size;
        this.x = x;
        this.y = y;
        this.o = o;
        this.r = r;
        this.g = g;
        this.b = b;
        this.tox = abs(this.x-width/2);
        this.toy = abs(this.y-height/2);
        //time & speed consistency
        if(this.tox > this.toy){
            this.sx = 5;
            this.sy = this.toy/(this.tox/5);
        }
        else if(this.toy > this.tox) {
            this.sy = 5;
            this.sx = this.tox/(this.toy/5);
        }
    }
    show() { 
        fill(this.r, this.g, this.b, this.o)
        noStroke();
        push();
        translate(width/2, height/2);
        for(let j = 0; j < reps; j ++) {
            rotate(radians(angle));
            fill(this.r, this.g, this.b, this.o)
            //ellipse(this.x, this.y, this.size)
            if(this.shape < 2) {
                ellipse(this.x, this.y, this.size);
            }
            else if(this.shape < 3) {
                push();
                strokeWeight(5);
                fill(this.r, this.g, this.b, this.o)
                line(this.x-this.size/2, this.y-this.size/2, this.x+this.size/2, this.y+this.size/2);
                pop();
            }
            else {
                push();
                translate(this.x - width/2, this.y - height/2);
                beginShape();
                for(let i = 0; i < TWO_PI; i += TWO_PI/this.shape) {
                    let x = this.size * sin(i);
                    let y = this.size * cos(i);
                    vertex(x, y);
                }
                endShape(CLOSE);
                pop();
            }
        }
        pop();

    }

    drop() {
        for(let s of parts)   {
            if(dist(this.x, this.y, s.x, s.y) > (this.size *2) + (s.size*2)) {
//                print(dist(this.x, this.y, s.x, s.y))
                if(this.x > width/2) {
                    this.x -= this.sx;
                }
                if(this.x < width/2) {
                    this.x += this.sx;
                }
                if(this.y > height/2) {
                    this.y -= this.sy;
                }
                if(this.y < height/2) {
                    this.y += this.sy;
                }
            }
        }
        //ellipse(this.x, this.y, 20)
    }
    
    touching(x, y, size) {
        if(dist(this.x, this.y, x, y) <= this.size + size) {
            return true;
        }
        else {
            return false;
        }
        
    }
}
