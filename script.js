function generateQR() {
    const url = document.getElementById('urlInput').value;
    const backgroundColor = document.getElementById('backgroundColor').value.substr(1); // Elimina el caracter #
    const dotColor = document.getElementById('dotColor').value.substr(1); // Elimina el caracter #
    const borderColor = document.getElementById('borderColor').value.substr(1); // Elimina el caracter #
    const qrSize = document.getElementById('qrSize').value;
  
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=${qrSize}x${qrSize}&cht=qr&chl=${encodeURIComponent(url)}&choe=UTF-8&chld=L|4&bg=${backgroundColor}&color=${dotColor}&border=${borderColor}`;
  
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.style.backgroundColor = 'transparent';
  
    const qrCanvas = document.getElementById('qrCanvas');
    const context = qrCanvas.getContext('2d');
    qrCanvas.width = qrSize;
    qrCanvas.height = qrSize;
    context.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
  
    const qrCodeImg = new Image();
    qrCodeImg.crossOrigin = "Anonymous";
    qrCodeImg.onload = function() {
      context.drawImage(qrCodeImg, 0, 0);
      qrCodeContainer.classList.remove('hidden');
      document.getElementById('downloadBtn').style.display = 'inline-block'; // Mostrar el botón de descarga después de generar el QR
    };
    qrCodeImg.src = qrCodeUrl;
  }
  
  function downloadQR() {
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCanvas.toDataURL("image/png");
    downloadLink.download = 'qr_code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  