System.register("q-bundled:///fs/cocos/core/math/utils.js", ["./bits.js"], function (_export, _context) {
  "use strict";

  var bits, _d2r, _r2d, HALF_PI, TWO_PI, EPSILON, random;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en Tests whether or not the arguments have approximately the same value, within an absolute<br/>
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less<br/>
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   * @zh 在glMatrix的绝对或相对容差范围内，测试参数是否具有近似相同的值。<br/>
   * EPSILON(小于等于1.0的值采用绝对公差，大于1.0的值采用相对公差)
   * @param a The first number to test.
   * @param b The second number to test.
   * @return True if the numbers are approximately equal, false otherwise.
   */
  function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
  }
  /**
   * @en Tests whether or not the arguments have approximately the same value by given maxDiff<br/>
   * @zh 通过给定的最大差异，测试参数是否具有近似相同的值。
   * @param a The first number to test.
   * @param b The second number to test.
   * @param maxDiff Maximum difference.
   * @return True if the numbers are approximately equal, false otherwise.
   */


  function approx(a, b, maxDiff) {
    maxDiff = maxDiff || EPSILON;
    return Math.abs(a - b) <= maxDiff;
  }
  /**
   * @en Clamps a value between a minimum float and maximum float value.<br/>
   * @zh 返回最小浮点数和最大浮点数之间的一个数值。可以使用 clamp 函数将不断变化的数值限制在范围内。
   * @param val
   * @param min
   * @param max
   */


  function clamp(val, min, max) {
    if (min > max) {
      var temp = min;
      min = max;
      max = temp;
    }

    return val < min ? min : val > max ? max : val;
  }
  /**
   * @en Clamps a value between 0 and 1.<br/>
   * @zh 将值限制在0和1之间。
   * @param val
   */


  function clamp01(val) {
    return val < 0 ? 0 : val > 1 ? 1 : val;
  }
  /**
   * @param from
   * @param to
   * @param ratio - The interpolation coefficient.
   */


  function lerp(from, to, ratio) {
    return from + (to - from) * ratio;
  }
  /**
   * @en Convert Degree To Radian<br/>
   * @zh 把角度换算成弧度。
   * @param {Number} a Angle in Degrees
   */


  function toRadian(a) {
    return a * _d2r;
  }
  /**
   * @en Convert Radian To Degree<br/>
   * @zh 把弧度换算成角度。
   * @param {Number} a Angle in Radian
   */


  function toDegree(a) {
    return a * _r2d;
  }
  /**
   * @method random
   */


  /**
   * @en Returns a floating-point random number between min (inclusive) and max (exclusive).<br/>
   * @zh 返回最小(包含)和最大(不包含)之间的浮点随机数。
   * @method randomRange
   * @param min
   * @param max
   * @return The random number.
   */
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  /**
   * @en Returns a random integer between min (inclusive) and max (exclusive).<br/>
   * @zh 返回最小(包含)和最大(不包含)之间的随机整数。
   * @param min
   * @param max
   * @return The random integer.
   */


  function randomRangeInt(min, max) {
    return Math.floor(randomRange(min, max));
  }
  /**
   * @en
   * Linear congruence generator using Hull-Dobell Theorem.
   * @zh
   * 使用 Hull-Dobell 算法的线性同余生成器构造伪随机数
   *
   * @param seed The random seed.
   * @return The pseudo random.
   */


  function pseudoRandom(seed) {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280.0;
  }
  /**
   * @en
   * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
   * @zh
   * 返回一个在范围内的浮点伪随机数，注意，不包含边界值
   *
   * @param seed
   * @param min
   * @param max
   * @return The random number.
   */


  function pseudoRandomRange(seed, min, max) {
    return pseudoRandom(seed) * (max - min) + min;
  }
  /**
   * @en Returns a pseudo-random integer between min (inclusive) and max (exclusive).<br/>
   * @zh 返回最小(包含)和最大(不包含)之间的浮点伪随机数。
   * @param seed
   * @param min
   * @param max
   * @return The random integer.
   */


  function pseudoRandomRangeInt(seed, min, max) {
    return Math.floor(pseudoRandomRange(seed, min, max));
  }
  /**
   * @en
   * Returns the next power of two for the value.<br/>
   * @zh
   * 返回下一个最接近的 2 的幂
   *
   * @param val
   * @return The the next power of two.
   */


  function nextPow2(val) {
    return bits.nextPow2(val);
  }
  /**
   * @en Returns float remainder for t / length.<br/>
   * @zh 返回t / length的浮点余数。
   * @param t Time start at 0.
   * @param length Time of one cycle.
   * @return The Time wrapped in the first cycle.
   */


  function repeat(t, length) {
    return t - Math.floor(t / length) * length;
  }
  /**
   * @en
   * Returns time wrapped in ping-pong mode.
   * @zh
   * 返回乒乓模式下的相对时间
   *
   * @param t Time start at 0.
   * @param length Time of one cycle.
   * @return The time wrapped in the first cycle.
   */


  function pingPong(t, length) {
    t = repeat(t, length * 2);
    t = length - Math.abs(t - length);
    return t;
  }
  /**
   * @en Returns ratio of a value within a given range.<br/>
   * @zh 返回给定范围内的值的比率。
   * @param from Start value.
   * @param to End value.
   * @param value Given value.
   * @return The ratio between [from, to].
   */


  function inverseLerp(from, to, value) {
    return (value - from) / (to - from);
  }
  /**
   * @en Compare the absolute values of all components and the component with the largest absolute value will be returned.
   * @zh 对所有分量的绝对值进行比较大小，返回绝对值最大的分量。
   * @param v vec3 like value
   * @returns max absolute component
   */


  function absMaxComponent(v) {
    if (Math.abs(v.x) > Math.abs(v.y)) {
      if (Math.abs(v.x) > Math.abs(v.z)) {
        return v.x;
      } else {
        return v.z;
      }
    } else if (Math.abs(v.y) > Math.abs(v.z)) {
      return v.y;
    } else {
      return v.z;
    }
  }
  /**
   * @en Compare the absolute value of two values and return the value with the largest absolute value
   * @zh 对 a b 的绝对值进行比较大小，返回绝对值最大的值。
   * @param a number
   * @param b number
   */


  function absMax(a, b) {
    if (Math.abs(a) > Math.abs(b)) {
      return a;
    } else {
      return b;
    }
  }
  /**
   * @en
   * Make the attributes of the specified class available to be enumerated
   * @zh
   * 使指定类的特定属性可被枚举
   * @param prototype Inherit the prototype chain of the ValueType class
   * @param attrs List of attributes that need to be enumerated
   */


  function enumerableProps(prototype, attrs) {
    attrs.forEach(function (key) {
      Object.defineProperty(prototype, key, {
        enumerable: true
      });
    });
  }

  _export({
    equals: equals,
    approx: approx,
    clamp: clamp,
    clamp01: clamp01,
    lerp: lerp,
    toRadian: toRadian,
    toDegree: toDegree,
    randomRange: randomRange,
    randomRangeInt: randomRangeInt,
    pseudoRandom: pseudoRandom,
    pseudoRandomRange: pseudoRandomRange,
    pseudoRandomRangeInt: pseudoRandomRangeInt,
    nextPow2: nextPow2,
    repeat: repeat,
    pingPong: pingPong,
    inverseLerp: inverseLerp,
    absMaxComponent: absMaxComponent,
    absMax: absMax,
    enumerableProps: enumerableProps
  });

  return {
    setters: [function (_bitsJs) {
      bits = _bitsJs;
    }],
    execute: function () {
      _d2r = Math.PI / 180.0;
      _r2d = 180.0 / Math.PI;

      _export("HALF_PI", HALF_PI = Math.PI * 0.5);

      _export("TWO_PI", TWO_PI = Math.PI * 2.0);

      _export("EPSILON", EPSILON = 0.000001);

      _export("random", random = Math.random);
    }
  };
});