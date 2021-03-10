let canvas = document.querySelector('canvas');
let holst = canvas.getContext('2d');

holst.fillRect(0, 0, 699, 399);
holst.strokeRect(10, 60, 70, 100);

holst.fillStyle = "rgb(255,0,0)";  
holst.fillRect(50, 25, 150, 100);
holst.fillStyle = "rgb(255,0,0)";  
holst.fillRect(50, 150, 150, 100); 
holst.fillStyle = "rgb(255,0,0)";  
holst.fillRect(50, 275, 150, 100);
