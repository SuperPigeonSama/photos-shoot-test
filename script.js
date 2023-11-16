    const videoTakePic = document.querySelector('.player');
    const canvasTakePic = document.querySelector('.photo');

    if (navigator.getUserMedia && (window as any).MediaStreamTrack) {
        navigator.mediaDevices(MediaStreamTrack as any).getSources((sources: SourceInfo[]) => {
    
            this.videoSources = sources.filter((source: SourceInfo) => {
              return source.kind === 'video';
              // or source.facing === 'environment'
            });
            // console.log('got video sources', this.videoSources);
    
            try {
              const rearCameraDevice = this.videoSources.find((device: SourceInfo) => device.facing === 'environment');
              const anyCameraDevice = this.videoSources[0];
              const videoConstraints = {
                video: {
                  mandatory: {
                    sourceId: rearCameraDevice.id || anyCameraDevice.id
                  }
                }
              };
              return navigator.mediaDevices.getUserMedia(<any>videoConstraints);
            } catch (error) {
                showErrorCamera();
            }
        })
        .then(function(mediaStream) {  
          if (window.webkitURL) {
            video.src = window.webkitURL.createObjectURL(mediaStream);
          } else {
            videoTakePic.srcObject = mediaStream;
          }
          videoTakePic.onloadedmetadata = function(e) {
            videoTakePic.play();
          };
        })
        .catch(function(err) {
            showErrorCamera();
        });
    } else {
        showErrorCamera();
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
        videoTakePic.html = "<strong>Erreur lors de la récupération de la caméra.</strong>";
    }
