function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59

  if (h == 0) {
    h = 12;
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

async function recognizeFaces() {
  const video = document.getElementById("video");
  const path =
    window.location.href == "localhost:8080"
      ? "/models"
      : "/smart-mirror/models";
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/smart-mirror/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/smart-mirror/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/smart-mirror/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/smart-mirror/models"),
  ]).then(startVideo);

  function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (video.srcObject = stream),
      (err) => console.error(err)
    );
  }

  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100);
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  showTime();
  recognizeFaces();
});
