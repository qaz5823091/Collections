class Eyes
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.left_eye = new Eye(this.x - 50, this.y);
        this.right_eye = new Eye(this.x + 50, this.y);
        this.wink_period = 5;
    }

    get period() {
        return this.wink_period;
    }

    track(mouse_pos) {
        this.left_eye.track(mouse_pos);
        this.right_eye.track(mouse_pos);
    }

    draw(is_winked) {
        this.left_eye.draw(is_winked);
        this.right_eye.draw(is_winked);
    }
}
