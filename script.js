    const video = document.querySelector('.player');
    const canvas = document.querySelector('.photo');
    const ctx = canvas.getContext('2d');
    const strip = document.querySelector('.strip');
    const snap = document.querySelector('.snap'); 

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) {
        video.html += "<strong>Erreur lors de la récupération de la caméra.</strong>";
    });

    document.querySelector(".clickPhoto").addEventListener("click", function() {
      takePhoto();
    });
    
    function takePhoto() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
        // Création de l'image à stocker
        const playImage = new Image();
        playImage.src = "path to image asset";
        playImage.onload = () => {
          const startX = video.videoWidth / 2 - playImage.width / 2;
          const startY = video.videoHeight / 2 - playImage.height / 2;
          canvas
            .getContext("2d")
            .drawImage(playImage, startX, startY, playImage.width, playImage.height);
          canvas.toBlob() = (blob) => {
            const img = new Image();
            img.src = window.URL.createObjectUrl(blob);
          };
        };
    }
