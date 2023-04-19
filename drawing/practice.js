let points1 = [[748, 147], [960, 147], [748, 333], [960, 333]];
let points2 = [[861, 225], [1023, 225], [861, 399], [1023, 399]];

const polygon1 = [[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]];
const polygon2 = [[5, 5], [5, 15], [15, 15], [15, 5], [5, 5]];

// Calculate the intersection of the two polygons
const result = intersection(polygon1, polygon2);

console.log(result); // Output: [[5, 10], [10, 5]]

function intersection(polygon1, polygon2) {
  // First, create an empty array to store the intersection points
  const intersectionPoints = [];

  // Loop through each pair of points (edge) in the first polygon
  for (let i = 0; i < polygon1.length; i++) {
    const point1 = polygon1[i];
    const point2 = polygon1[(i + 1) % polygon1.length];

    // Loop through each edge in the second polygon
    for (let j = 0; j < polygon2.length; j++) {
      const point3 = polygon2[j];
      const point4 = polygon2[(j + 1) % polygon2.length];
      // Calculate the intersection point of the two edges
      const intersectionPoint = getIntersection(point1, point2, point3, point4);
      console.log(intersectionPoint);

      // If there is an intersection point, add it to the array
      if (intersectionPoint) {
        intersectionPoints.push(intersectionPoint);
      }
    }
  }

  // Return the array of intersection points
  return intersectionPoints;
}

// This function calculates the intersection point of two line segments
// It returns null if the lines do not intersect
function getIntersection(point1, point2, point3, point4) {
  // Calculate the denominator of the equation
  const denominator = (point4[1] - point3[1]) * (point2[0] - point1[0]) - (point4[0] - point3[0]) * (point2[1] - point1[1]);

  // If the denominator is 0, the lines are parallel and do not intersect
  if (denominator === 0) {
    return null;
  }

  // Calculate the intersection point
  const x = ((point4[0] - point3[0]) * (point1[0] * point2[1] - point1[1] * point2[0]) - (point2[0] - point1[0]) * (point3[0] * point4[1] - point3[1] * point4[0])) / denominator;
  const y = ((point4[1] - point3[1]) * (point1[0] * point2[1] - point1[1] * point2[0]) - (point2[1] - point1[1]) * (point3[0] * point4[1] - point3[1] * point4[0])) / denominator;

  // Check if the intersection point lies within both line segments
  if (isWithinBounds(point1, point2, [x, y]) && isWithinBounds(point3, point4, [x, y])) {
    return [x, y];
  }

  // If the intersection point does not lie within both line segments, return null
  return null;
}

// This function checks if a point lies within a line segment
function isWithinBounds(point1, point2, point) {
  // Check if the point has the same x-coordinate as the line segment
  if (point[0] === point1[0] && point[0] === point2[0]) {
    // If the x-coordinates are the same, check if the point has a y-coordinate within the range of the line segment
    return Math.min(point1[1], point2[1]) <= point[1] && point[1] <= Math.max(point1[1], point2[1]);
  }
  // If the x-coordinates are not the same, check if the point has an x-coordinate within the range of the line segment
  return Math.min(point1[0], point2[0]) <= point[0] && point[0] <= Math.max(point1[0], point2[0]);
}
// let a = intersection(points1,points2);
// console.log(a);
