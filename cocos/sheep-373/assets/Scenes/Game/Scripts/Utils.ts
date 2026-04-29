/**
 * 矩形
 */
interface IRectangle {
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number;
  /** 宽 */
  width: number;
  /** 高 */
  height: number;
}

/**
 * 工具类
 */
export class Utils {
  /**
   * 判断两个矩形是否覆盖
   * @param rectangle1 矩形1
   * @param rectangle2 矩形2
   */
  public static isRectangleOverlap(
    rectangle1: IRectangle,
    rectangle2: IRectangle
  ) {
    const { x: x1, y: y1, width: w1, height: h1 } = rectangle1;
    const { x: x2, y: y2, width: w2, height: h2 } = rectangle2;

    // 判断是否没有重叠
    if (x1 + w1 <= x2 || x1 >= x2 + w2 || y1 + h1 <= y2 || y1 >= y2 + h2) {
      return false;
    }

    // 否则有重叠
    return true;
  }

  /**
   * 生成随机点
   * @param width 容器宽
   * @param height 容器高
   * @param numPoints 生成点数量
   */
  public static generateRandomPoints(width, height, numPoints = 90) {
    const points = [];
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    for (let i = 0; i < numPoints; i++) {
      // 随机生成 x 和 y 坐标，范围是 [-halfWidth, halfWidth] 和 [-halfHeight, halfHeight]
      const x = Math.random() * width - halfWidth;
      const y = Math.random() * height - halfHeight;

      points.push({ x, y });
    }

    return points;
  }
}
