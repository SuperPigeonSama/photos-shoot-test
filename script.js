    const videoTakePic = document.querySelector('.player');
    const canvasTakePic = document.querySelector('.photo');

    navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
            var videoDevices = [0,0];
            var videoDeviceIndex = 0;
            devices.forEach(function(device) {
                if (device.kind == "videoinput") {  
                    videoDevices[videoDeviceIndex++] =  device.deviceId;    
                }
            });
            
            const cameraConstraints =  { deviceId: { exact: videoDevices[1] } };
            return navigator.mediaDevices
                .getUserMedia(cameraConstraints);
        })
        .then(function(mediaStream) {  
          if (window.webkitURL) {
            video.src = window.webkitURL.createObjectURL(stream);
          } else {
            videoTakePic.srcObject = mediaStream;
          }
          videoTakePic.onloadedmetadata = function(e) {
            videoTakePic.play();
          };
        })
        .catch(function(err) {
            videoTakePic.html += "<strong>Erreur lors de la récupération de la caméra.</strong>";
        });

    document.querySelector(".clickPhoto").addEventListener("click", function() {
      takePhoto();
    });
    
    function takePhoto() {
        canvasTakePic.width = videoTakePic.videoWidth;
        canvasTakePic.height = videoTakePic.videoHeight;
        canvasTakePic
          .getContext("2d")
          .drawImage(videoTakePic, 0, 0, videoTakePic.videoWidth, videoTakePic.videoHeight);
      
        // Création de l'image à stocker
        const playImage = new Image();
        playImage.src = "path to image asset";
        playImage.onload = () => {
          const startX = videoTakePic.videoWidth / 2 - playImage.width / 2;
          const startY = videoTakePic.videoHeight / 2 - playImage.height / 2;
          canvasTakePic
            .getContext("2d")
            .drawImage(playImage, startX, startY, playImage.width, playImage.height);
          canvasTakePic.toBlob() = (blob) => {
            const img = new Image();
            img.src = window.URL.createObjectUrl(blob);
          };
        };
    }
