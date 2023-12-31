    const videoTakePic = document.querySelector('.player');
    const canvasTakePic = document.querySelector('.photo');
    const videoSourcePic = document.querySelector('#videoSource');
    const listDevicesSupported = [];

    changeStream();
    function changeStream() {
        navigator.mediaDevices.enumerateDevices()
            .then(listDevicesVideo)
            .then(getStreamVideo)
            .then(function (mediaStream) {
                videoTakePic.srcObject = mediaStream;
                videoTakePic.onloadedmetadata = function(e) {
                    videoTakePic.play();
                };
            })
            .catch(showErrorCamera);
    }
    
    function listDevicesVideo(deviceInfos) {
      window.deviceInfos = deviceInfos; // make available to console
      for (const deviceInfo of deviceInfos) {
        if (deviceInfo.kind === 'videoinput') {
          if(deviceInfo.facing == 'environment' ) {
            listDevicesSupported.unshift(deviceInfo.deviceId);
          } else {
            listDevicesSupported.push(deviceInfo.deviceId);
          }
        }
      }
    }
    
    function getStreamVideo() {
      const videoConstraints = {
        video: listDevicesSupported.length ? { deviceId: listDevicesSupported[0] } : true
      };
    
      return navigator.mediaDevices.getUserMedia(videoConstraints);
    }

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

    function showErrorCamera() {
        videoTakePic.html += "<strong>Erreur lors de la récupération de la caméra.</strong>";
    }
