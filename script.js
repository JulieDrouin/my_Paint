 window.onload = function() { 
    // var user = $("canvas");
    var mouse = {x: 0, y: 0};
    var canvas = $("#canvas");
    var saveAs = $("#save");
    var undo = $(".btn-undo");
    var redo = $(".btn-redo");
    var paletteDflt = $(".btn-paletteDflt");
    var optionFile = $(".btn-optionFile");
    var accueil = $(".btn-accueil");
    var affichage = $(".btn-affichage");
    var copy = $(".btn-copy");
    var paste = $(".btn-paste");
    var pencil = $(".btn-pencil");
    var eraser = $(".btn-eraser");
    var line = $(".btn-line");
    var strokeCircle = $(".btn-strokeCircle");
    var fillCircle = $(".btn-fillCircle");
    var strokeRectangle = $(".btn-strokeRectangle");
    var fillRectangle = $(".btn-fillRectangle");
    var crop = $(".btn-crop");
    var colorPicker = $("#color-picker");
    var brushSize = $("#brush-size");
    var mode = 'LIBRE';
    $(function() {
        var context = canvas[0].getContext('2d');
        console.log(mouse);
        
        canvas[0].addEventListener('mousemove', function(e) {
            
            var PosCanvas =  canvas[0].getBoundingClientRect();
            
            mouse.x = e.clientX - PosCanvas.left
            mouse.y = e.clientY - PosCanvas.top
        }, false);
        
        canvas[0].addEventListener('mousedown', function(e) {
            console.log('Mousedown');
            if( mode == 'LIBRE') {
                context.beginPath();
                
                console.log(context);
                context.moveTo(mouse.x, mouse.y);
                canvas[0].addEventListener('mousemove', onPaint, false);
            }
        }, false);
        
        var started = false;
        var topLeftCorner = null;
        canvas[0].addEventListener('mouseup', function() {
            console.log('MouseUp');
            if( mode == 'LIBRE') {
                canvas[0].removeEventListener('mousemove', onPaint, false);
            }
            else if(mode == 'LINE') {
                if(started == false) {
                    context.beginPath();
                    context.moveTo(mouse.x, mouse.y);
                    started = true;
                }
                else {
                    context.lineTo(mouse.x, mouse.y);
                    context.stroke();
                    started = false;
                }
            }
            else if(mode == 'FILL RECTANGLE') {
                if(started == false) {
                    topLeftCorner = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    started = true;
                }
                else {
                    var bottomRightCorner = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    var hauteur = bottomRightCorner.y - topLeftCorner.y;
                    var longueur = bottomRightCorner.x - topLeftCorner.x;
                    context.fillStyle = context.strokeStyle;
                    context.fillRect(topLeftCorner.x, topLeftCorner.y, longueur, hauteur);
                    topLeftCorner = null;
                    started = false;
                }
            }
            else if(mode == 'STROKE RECTANGLE') {
                if(started == false) {
                    topLeftCorner = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    started = true;
                }
                else {
                    var bottomRightCorner = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    var hauteur = bottomRightCorner.y - topLeftCorner.y;
                    var longueur = bottomRightCorner.x - topLeftCorner.x;
                    context.strokeRect(topLeftCorner.x, topLeftCorner.y, longueur, hauteur);
                    topLeftCorner = null;
                    started = false;
                }
            }
            else if(mode == 'STROKE CIRCLE') {
                if(started == false) {
                    centerCirle = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    started = true;
                }
                else {
                    var arc = {
                        x: mouse.x,
                        y: mouse.y
                    };
                    var rayon = Math.sqrt(
                        Math.pow((arc.x - centerCirle.x),2) +
                        Math.pow((arc.y - centerCirle.y),2));
                        console.log(rayon)
                        context.beginPath();
                        context.arc(centerCirle.x, centerCirle.y, rayon, 0, 2 *Math.PI);
                        context.stroke();
                        //CREATION CIRCLE  :::  context.arc(POSITIONcenterCirle.x, POSITIONcenterCirle.y, Rayon, AngleStart 0, AngleEnd, false ou true SENS de L'ARC)
                        centerCirle = null;
                        started = false;
                    }
                }
                else if(mode == 'FILL CIRCLE') {
                    if(started == false) {
                        centerCirle = {
                            x: mouse.x,
                            y: mouse.y
                        };
                        started = true;
                    }
                    else {
                        var arc = {
                            x: mouse.x,
                            y: mouse.y
                        };
                        var rayon = Math.sqrt(
                            Math.pow((arc.x - centerCirle.x),2) +
                            Math.pow((arc.y - centerCirle.y),2));
                            console.log(rayon)
                            context.fillStyle = context.strokeStyle;
                            context.beginPath();
                            context.arc(centerCirle.x, centerCirle.y, rayon, 0, 2 *Math.PI);
                            context.fill();
                            //CREATION CIRCLE  :::  context.arc(POSITIONcenterCirle.x, POSITIONcenterCirle.y, Rayon, AngleStart 0, AngleEnd, false ou true SENS de L'ARC)
                            centerCirle = null;
                            started = false;
                        }
                    }
            }, false);
            
            var onPaint = function() {
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            };
            
            pencil.click(clickPencil);
            eraser.click(clickEraser);
            line.click(clickLine);
            strokeCircle.click(clickStrokeCircle);
            fillCircle.click(clickFillCircle);
            strokeRectangle.click(clickStrokeRectangle);
            fillRectangle.click(clickFillRectangle);
            colorPicker.change(clickColorPicker);
            brushSize.change(clickBrushSize);
            saveAs.click(clickSaveAs);
            // undo.click(clickUndo);
            
            function clickPencil() {
                context.lineCap = 'round';
                mode = 'LIBRE';
            };
            function clickEraser() {
                context.lineJoin = 'round';
                context.lineCap = 'round';
                context.strokeStyle = '#FFFFFF';
                mode = 'LIBRE';
            };
            function clickLine() {
                console.log('LINE click');
                context.lineCap='round';
                context.lineJoin = 'round';
                mode = 'LINE';
            };
            function clickStrokeCircle() {
                console.log('STROKE CIRCLE');
                context.lineCap='round';
                context.lineJoin = 'round';
                mode = 'STROKE CIRCLE';
            };
            function clickFillCircle() {
                console.log('FILL CIRCLE');
                context.lineCap='round';
                context.lineJoin = 'round';
                mode = 'FILL CIRCLE';
            };
            function clickStrokeRectangle() {
                console.log('STROKE RECTANGLE');
                mode = 'STROKE RECTANGLE';
            };
            function clickFillRectangle() {
                console.log('FILL RECTANGLE');
                mode = 'FILL RECTANGLE';
            };
            function clickColorPicker() {
                context.strokeStyle = this.value;
            };
            function clickBrushSize() {
                context.lineWidth = this.value;
                context.lineJoin = 'round';
                context.lineCap = 'round';
            };
            function clickSaveAs() {
                var saveImg = canvas[0].toDataURL("image/png");
                console.log(this);
                this.href = saveImg;
            };
            function clickUndo() {
                
            };
            
            // function clickRedo() {
                
            // };
            // function clickPaletteDflt() {
                
            // };
            // function clickOptionFile() {
                
            // };
            // function clickAccueil() {
                
            // };
            // function clickAffichage() {
                
            // };
            // function clickCopy() {
                
            // };
            // function clickPaste() {
                
            // };
            // function clickCrop() {
                
            // };
            
        });
    };