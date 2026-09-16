(function () {
  "use strict";

  var v1 = { content: [8, 9, 10, 10], design: [7, 8, 9, 10] };
  var v2 = { content: [9, 10, 10, 10, 9, 10, 10, 10], design: [8, 9, 9, 9, 9, 9, 9, 9] };
  var MAX_ROUNDS = 8;

  function colors() {
    var style = getComputedStyle(document.documentElement);
    return {
      v1: style.getPropertyValue("--v1").trim() || "#756B60",
      v2: style.getPropertyValue("--v2").trim() || "#BE0000",
      border: style.getPropertyValue("--border").trim() || "#DDD2BC",
      muted: style.getPropertyValue("--muted").trim() || "#6B6156"
    };
  }

  function pathFor(values, x, y) {
    return values
      .map(function (v, i) {
        return (i === 0 ? "M" : "L") + x(i + 1) + "," + y(v);
      })
      .join(" ");
  }

  function drawChart() {
    var container = document.getElementById("chart");
    if (!container) return;

    var w = 640, h = 280;
    var padL = 34, padR = 16, padT = 16, padB = 28;
    var innerW = w - padL - padR, innerH = h - padT - padB;

    var x = function (round) {
      return padL + ((round - 1) / (MAX_ROUNDS - 1)) * innerW;
    };
    var y = function (score) {
      return padT + (1 - score / 10) * innerH;
    };

    var c = colors();
    var svgParts = [];

    svgParts.push(
      '<svg viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg" role="presentation">'
    );

    for (var s = 0; s <= 10; s += 2) {
      var gy = y(s);
      svgParts.push(
        '<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy +
        '" stroke="' + c.border + '" stroke-width="1" />' +
        '<text x="' + (padL - 8) + '" y="' + (gy + 4) + '" text-anchor="end" font-size="11" fill="' + c.muted + '">' + s + "</text>"
      );
    }

    for (var r = 1; r <= MAX_ROUNDS; r++) {
      svgParts.push(
        '<text x="' + x(r) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="11" fill="' + c.muted + '">' + r + "</text>"
      );
    }
    svgParts.push(
      '<text x="' + (w / 2) + '" y="' + (h - 0) + '" text-anchor="middle" font-size="0"></text>'
    );

    function line(values, stroke, dashed) {
      return '<path d="' + pathFor(values, x, y) + '" fill="none" stroke="' + stroke +
        '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"' +
        (dashed ? ' stroke-dasharray="5 5"' : "") + " />";
    }

    function dots(values, stroke) {
      return values
        .map(function (v, i) {
          return '<circle cx="' + x(i + 1) + '" cy="' + y(v) + '" r="3.5" fill="' + stroke + '" />';
        })
        .join("");
    }

    svgParts.push(line(v1.design, c.v1, true));
    svgParts.push(line(v1.content, c.v1, false));
    svgParts.push(line(v2.design, c.v2, true));
    svgParts.push(line(v2.content, c.v2, false));

    svgParts.push(dots(v1.content, c.v1));
    svgParts.push(dots(v1.design, c.v1));
    svgParts.push(dots(v2.content, c.v2));
    svgParts.push(dots(v2.design, c.v2));

    svgParts.push("</svg>");
    container.innerHTML = svgParts.join("");
  }

  drawChart();

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", drawChart);
  }

  var loadBtn = document.getElementById("load-compare");
  var frames = document.getElementById("compare-frames");
  if (loadBtn && frames) {
    loadBtn.addEventListener("click", function () {
      var iframes = frames.querySelectorAll("iframe");
      iframes[0].src = "artifacts/v1-final.html";
      iframes[1].src = "artifacts/v2-showcase.html";
      frames.hidden = false;
      loadBtn.hidden = true;
      frames.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
