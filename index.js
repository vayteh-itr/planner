window.onload = function () {
    let canvas = document.getElementById('canvas');
  if (canvas && canvas.getContext) {
    let ctx = canvas.getContext('2d');
      if (ctx) {

          width = canvas.width = window.innerWidth - 5;
          height = canvas.height = window.innerHeight - 5;
          let isDragging = true;
          let delta = new Object();
          function drawPoligon(poligon) {
              ctx.beginPath();
              ctx.moveTo(poligon.points[0].x, poligon.points[0].y);
              for (let i = 1; i < poligon.points.length; i++) {
                  ctx.lineTo(poligon.points[i].x, poligon.points[i].y);
              }
              ctx.closePath();
              ctx.fill();
          }
          function updatePoligon(star) {
              for (let i = 0; i < star.points.length; i++) {
                  star.points[i].x = star.x + star.offset[i].x;
                  star.points[i].y = star.y + star.offset[i].y;
              }
          }
          function updatePoligons() {
              for (let i = 0; i < list.length; i++) {
                  updatePoligon(list[i]);
              }
          }
          function drawPoligons() {
              for (let i = 0; i < list.length; i++) {
                  drawPoligon(list[i]);
              }
          }
          let list = [
              {
                  'x': 50,
                  'y': 100,
                  'color': '#3F51B5',
                  'points': [
                      { 'x': 0, 'y': 0 },
                      { 'x': 0, 'y': 0 },
                      { 'x': 0, 'y': 0 },
                      { 'x': 0, 'y': 0 },
                  ],
                  'offset': [
                      { 'x': 120, 'y': -48 },
                      { 'x': -40, 'y': -48 },
                      { 'x': -40, 'y': 40 },
                      { 'x': 120, 'y': 40 },
                  ],
                  'bool': false
              },
              {
                  'x': 50,
                  'y': 200,
                  'color': '#3F51B5',
                  'points': [
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                ],
                'offset': [
                    { 'x': 100, 'y': -48 },
                    { 'x': -40, 'y': -48 },
                    { 'x': -40, 'y': 40 },
                    { 'x': 100, 'y': 40 },
                ],
                  'bool': false
              },
              {
                  'x': 50,
                  'y': 300,
                  'color': '#3F51B5',
                  'points': [
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                    { 'x': 0, 'y': 0 },
                ],
                'offset': [
                    { 'x': 120, 'y': -48 },
                    { 'x': -40, 'y': -48 },
                    { 'x': -40, 'y': 40 },
                    { 'x': 120, 'y': 40 },
                ],
                  'bool': false
              }
          ];
          updatePoligons()
          drawPoligons();

          function oMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
              return {
                  x: parseInt(evt.clientX - rect.left),
                  y: parseInt(evt.clientY - rect.top)
              };
          }
          function checkStarCollision(starA, starB) {
              for (let i = 0; i < starA.points.length; i++) {
                let p0 = starA.points[i],
                      p1 = starA.points[(i + 1) % starA.points.length];

                  for (let j = 0; j < starB.points.length; j++) {
                    let p2 = starB.points[j],
                          p3 = starB.points[(j + 1) % starB.points.length];

                      if (segmentIntersect(p0, p1, p2, p3)) {
                          return true;
                      }
                  }
              }
              return false;
          }

          function segmentIntersect(p0, p1, p2, p3) {
            let A1 = p1.y - p0.y,
                  B1 = p0.x - p1.x,
                  C1 = A1 * p0.x + B1 * p0.y,
                  A2 = p3.y - p2.y,
                  B2 = p2.x - p3.x,
                  C2 = A2 * p2.x + B2 * p2.y,
                  denominator = A1 * B2 - A2 * B1;
              if (denominator == 0) {
                  return null;
              }

              let intersectX = (B2 * C1 - B1 * C2) / denominator,
                  intersectY = (A1 * C2 - A2 * C1) / denominator,
                  rx0 = (intersectX - p0.x) / (p1.x - p0.x),
                  ry0 = (intersectY - p0.y) / (p1.y - p0.y),
                  rx1 = (intersectX - p2.x) / (p3.x - p2.x),
                  ry1 = (intersectY - p2.y) / (p3.y - p2.y);

              if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
                  ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                  return {
                      x: intersectX,
                      y: intersectY
                  };
              }
              else {
                  return null;
              }
          }
          // mousedown
          canvas.addEventListener('mousedown', function (evt) {
            let mousePos = oMousePos(canvas, evt);
              for (let i = 0; i < list.length; i++) {
                      drawPoligon(list[i]);
                  if (ctx.isPointInPath(mousePos.x, mousePos.y)) {
                      isDragging = true;
                      list[i].bool = true;
                      delta.x = list[i].x - mousePos.x;
                      delta.y = list[i].y - mousePos.y;
                      break;
                  } else {
                      list[i].bool = false;
                  }
              }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              drawPoligons();
          }, false);
          // mousemove
          canvas.addEventListener('mousemove', function (evt) {
              if (isDragging) {

                let mousePos = oMousePos(canvas, evt),
                      selectPoligon;
                  for (let i = 0; i < list.length; i++) {
                      if (list[i].bool) {
                          ctx.clearRect(0, 0, width, height);
                          list[i].x = mousePos.x + delta.x;
                          list[i].y = mousePos.y + delta.y;
                          updatePoligon(list[i]);
                          selectPoligon = list[i];
                      }
                  }
                  for (let i = 0; i < list.length; i++) {
                      if (checkStarCollision(selectPoligon, list[i])) {
                          ctx.fillStyle = "red";
                      }
                      else {
                          ctx.fillStyle = "black";
                      }
                      drawPoligon(list[i]);
                  }
              }
          }, false);
          // mouseup
          canvas.addEventListener('mouseup', function (evt) {
              isDragging = false;
              ctx.fillStyle = "black";
              for (let i = 0; i < list.length; i++) { 
                  list[i].bool = false
                }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              drawPoligons();
          }, false);
          // mouseout
          canvas.addEventListener('mouseout', function (evt) {
              isDragging = false;
              for (let i = 0; i < list.length; i++) {   
                list[i].bool = false 
            }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              drawPoligons();
          }, false);
      }
  }
}
