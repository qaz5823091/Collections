const setting = {
    'width' : 50,
    'height': 75,
};

class EyeWhite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, setting.width, setting.height);
    }
}

class EyeBlack {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vector = new p5.Vector(this.x, this.y);
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    set variant(v) {
        this.vector.x = v.x;
        this.vector.y = v.y;
    }

    wink() {
        fill(0);
        ellipse(this.x, this.y, setting.width - 30, setting.width - 60);
    }

    draw() {
        fill(0);
        circle(this.x + this.vector.x, this.y + this.vector.y, setting.width - 30);
    }
}

class Eye
{
    constructor(x, y, wp)
    {
        this.x = x;
        this.y = y;
        this.wink_period = wp;
        this.eye_white = new EyeWhite(x, y);
        this.eye_black = new EyeBlack(x, y);
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.eye_white.position = pos;
        this.eye_black.position = pos;
        this.wink_period = pos.z;
    }

    get period() {
        return this.wink_period;
    }

    track(mouse_pos) {
        var temp_vector = new p5.Vector(0, 0);
        temp_vector.x = mouse_pos.x - this.x;
        temp_vector.y = mouse_pos.y - this.y;
        temp_vector.normalize();
        temp_vector.mult(5);
        this.eye_black.variant = temp_vector;
    }

    draw(is_winked) {
        this.eye_white.draw();
        if (is_winked) {
            this.eye_black.wink();
        }
        else {
            this.eye_black.draw();
        }
        // console.log(this.eye_white.getPosition);
    }
}
