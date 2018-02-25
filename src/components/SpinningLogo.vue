<template>
  <canvas ref="canvas" width="500" height="500" :style="sizeStyles"></canvas>
</template>

<script>
import * as Isomer from 'isomer';
const { Shape, Point, Color } = Isomer;

const PINK = new Color(201, 26, 84);
const GREY = new Color(51, 51, 51);

const MAGIC_ANGLE = 134.5;
const THIRD = 1 / 3;
const Z_OFFSET = -0.2;

const inRange = (start, angle) => start <= angle && angle < (start + 180);
const toRadians = (degrees) => degrees * Math.PI / 180;
const easeInOut = (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t;

export default {
  name: 'spinning-logo',
  props: {
    size: {
      type: Number,
      default: 250
    },
    ease: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      animationFrame: 0
    }
  },
  computed: {
    sizeStyles() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    }
  },
  mounted() {
    let iso = new Isomer(this.$refs.canvas);

    let t = 0;
    let scene = () => {
      let angle = (this.ease ? easeInOut(t) : t) * 360;
      let radians = toRadians(angle);

      iso.canvas.clear();

      let cube = () => iso.add(Shape.Prism(new Point(0, 0, Z_OFFSET), 3, 3, 3).rotateZ(new Point(1.5, 1.5, 0), radians), GREY);

      let back = (z) => iso.add(Shape.Prism(new Point(2, 1, z + Z_OFFSET), 2 - (2 * THIRD), 1, THIRD).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);
      let middle = (z) => iso.add(Shape.Prism(new Point(1, -THIRD, z + Z_OFFSET), 1, 4 - THIRD, THIRD).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);
      let front = (z) => iso.add(Shape.Prism(new Point(-THIRD, 1, z + Z_OFFSET), 2 - (2 * THIRD), 1, THIRD).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);

      let north = () => iso.add(Shape.Prism(new Point(1, -THIRD, Z_OFFSET), 1, THIRD, 3).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);
      let south = () => iso.add(Shape.Prism(new Point(1, 3, Z_OFFSET), 1, THIRD, 3).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);
      let east = () => iso.add(Shape.Prism(new Point(-THIRD, 1, Z_OFFSET), THIRD, 1, 3).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);
      let west = () => iso.add(Shape.Prism(new Point(3, 1, Z_OFFSET), THIRD, 1, 3).rotateZ(new Point(1.5, 1.5, 0), radians), PINK);

      if(inRange(MAGIC_ANGLE, angle)) {
        front(-THIRD); middle(-THIRD); back(-THIRD);
      } else {
        back(-THIRD); middle(-THIRD); front(-THIRD);
      }

      if(inRange(MAGIC_ANGLE - 90, angle)) {
        north();
      } else {
        south();
      }

      if(inRange(MAGIC_ANGLE, angle)) {
        east();
      } else {
        west();
      }

      cube();

      if(inRange(MAGIC_ANGLE, angle)) {
        west();
      } else {
        east();
      }

      if(inRange(MAGIC_ANGLE - 90, angle)) {
        south();
      } else {
        north();
      }

      if(inRange(MAGIC_ANGLE, angle)) {
        front(3); middle(3); back(3);
      } else {
        back(3); middle(3); front(3);
      }

      t = (t + (this.speed * 0.004)) % 1;
      this.animationFrame = requestAnimationFrame(scene);
    };
    this.animationFrame = requestAnimationFrame(scene);
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}
</script>

<style>

</style>
