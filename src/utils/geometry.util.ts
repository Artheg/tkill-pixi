export type Point = {
  x: number;
  y: number;
};

export class GeometryUtil {

  public static rotatePoint(point: Point, center: Point, angle: number): Point {
    angle = angle * (Math.PI / 180); // Convert to radians
    const rotatedX =
      Math.cos(angle) * (point.x - center.x) -
      Math.sin(angle) * (point.y - center.y) +
      center.x;

    const rotatedY =
      Math.sin(angle) * (point.x - center.x) +
      Math.cos(angle) * (point.y - center.y) +
      center.y;

    return { x: rotatedX, y: rotatedY };
  }

}
