var notes = [];
	var context;
	var bufferLoader;
    // Create a gain node.
    
    
    
    function setVolume(){
        
    }
	function loadNotes(){
		/*
		var oInput = document.getElementById('notes'),
            oChild;
	    for(i = 0; i < oInput.childNodes.length; i++){
	        oChild = oInput.childNodes[i];
	        if(oChild.nodeName == 'BUTTON'){
	        	console.log(oChild.id);
	            notes.push(new Audio("notes/"+oChild.id+".wav"));
	            notes[notes.length-1].preload = 'auto';
	        }
	    }
	    */
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
		bufferLoader = new BufferLoader(
		context,
		[
		  'notes/C5.wav',
		  'notes/CS5.wav',
		  'notes/D5.wav',
		  'notes/DS5.wav',
		  'notes/E5.wav',
		  'notes/F5.wav',
		  'notes/FS5.wav',
		  'notes/G5.wav',
		  'notes/GS5.wav',
		  'notes/A5.wav',
		  'notes/AS5.wav',
		  'notes/B5.wav',
		  'notes/C6.wav',
		  'drums/kick.wav',
		  'drums/snare.wav',
		  'drums/hat.wav',
		],
		getBuffer
		);

		bufferLoader.load();
	}
	var buffer = [];
	function getBuffer(bufferList){
		buffer = bufferList;
	}
	function playText(){
		var text = document.getElementById("pastedText").value;
		pl = playAudio;
		rt = returnNoteFromText;
		pltx = playTextNote;
		for(i = 0; i < text.length; i++){
			num = rt(text.charCodeAt(i));
			console.log(num);
			if(num >= 0 && num <= 12){
		    	pltx(num, i);
		    }
		}
	}
    var intervals = [];
	function playTextNote(num, i){
		intervals.push(setTimeout(function(){pl(num)}, 500 * i));
	}
    
	var keyCheck = false;
	function checkIfChecked(){
		var c = document.getElementById("myCheck");
		if(c.checked == true){
			keyCheck = true;
		}else keyCheck = false;
	}
    function stopStream(){
        for(let i = 0; i < intervals.length; i++){
            
            stopNote(i);
        }
    }
    function stopNote(i){
        
        clearTimeout(intervals[i]);
    }
	var isRecording = false;
		var initial;
		var times = [];
		function setRecorder(){
			btn = document.getElementById("recordBtn");
			isRecording = !isRecording;
			if(isRecording){
				times = [];
				initial = new Date().getTime();
				btn.value = "Stop recording";
				btn.style.backgroundColor = "#E41414";
				//window.alert(initial);
			}else{
				btn.value = "Record";
				btn.style.backgroundColor = "#14E429";
			}
		}

		function playRecorder(){
			if(!isRecording){
				for(let i=0; i<times.length; i++){
					playNote(i);
					console.log(i + " " + times[i].time);
				}
			}
		}
        
		function playNote(p){
			console.log(times[p].time);
			setTimeout(function(){playAudio(times[p].note)}, times[p].time);
			
		}
		
		
		function playAudio(i){
            
			source = context.createBufferSource();
            gainNode = context.createGain();
            source.connect(gainNode);
            gainNode.connect(context.destination);
			source.buffer = buffer[i];
            vol = document.getElementById("vol").value;
            gainNode.gain.value = document.getElementById("vol").value / 100 - 2;
            
			
			//console.log(notes.length);
			//notes[n].load();
  			//notes[n].play();
  			source.connect(context.destination);
  			source.start(0);
			if(isRecording){
				var timestamp = new Date();
				times.push(new timeNote(timestamp.getTime() - initial, i));
					
			}
			
		}
        
		document.onkeydown = function(evt) {
    	    evt = evt || window.event;
		    var charCode = evt.keyCode || evt.which;
		    var charStr = String.fromCharCode(charCode).toUpperCase();
		    if(keyCheck){
		    	var noteNum = returnNote(charStr);
		    	if(noteNum >= 0 && noteNum <= 12){
		    		playAudio(returnNote(charStr));
		    	}
		    }

		};

		function drum(time,note,checked, timestamp){
			this.time = time;
			this.note = note;
			this.checked = checked;
			this.timestamp = timestamp;

			var getTime = function(){
				return (time * timestamp);
			}
		}

		var loop = [new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),
		new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),
		new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),
		new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),
		new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),
		new drum(0,0,false),new drum(0,0,false),new drum(0,0,false),new drum(0,0,false)];
		var ttime = 1000;

		function setTime(tempo){
			var t = tempo.value;
			ttime = 60000 / t;
			for(let i = 0; i<loop.length; i++){
				if(loop[i].checked)
					loop[i].timestamp = ttime;
			}
		}
		function setDrumLoop(sample, time, checked){
			xsample = sample + 13;
			if(sample == 0) pos = time;
			else if(sample == 1) pos = time + 8;
			else pos = time + 16;
			loop[pos] = new drum(time, xsample, checked, ttime);
			//console.log(loop); 
		}
		var stop = true;
		function playBeat(){
			stop = !stop;
			if(stop){
				document.getElementById("beatPlay").value = "Play beat";
			}
			else{ 
				document.getElementById("beatPlay").value = "Stop beat";
				startBeat();
			}
		}

		function startBeat(){
			for(let i = 0; i < loop.length; i++){
				playDrum(i);
			}
			if(!stop){
				setTimeout(function(){startBeat()}, (ttime * 8));
			}
		}

		var drumsTimeout = [];
		function playDrum(i){
			if(loop[i].checked){
				drumsTimeout = setTimeout(function(){playAudio(loop[i].note)}, loop[i].time * loop[i].timestamp);
			}
		}

        function returnNote(char){
            if(char == "A") return 0;
            else if(char == "W") return 1;
            else if(char == "S") return 2;
            else if(char == "E") return 3;
            else if(char == "D") return 4;
            else if(char == "F") return 5;
            else if(char == "T") return 6;
            else if(char == "G") return 7;
            else if(char == "Y") return 8;
            else if(char == "H") return 9;
            else if(char == "U") return 10;
            else if(char == "J") return 11;
            else if(char == "K") return 12;
            else return 99;
        }

        function returnNoteFromText(charCode){
        	if(charCode >= 0 && charCode <= 8){
        		return 0;
        	}else if(charCode >= 9 && charCode <= 13){
        		return 12;
        	}else if(charCode >= 14 && charCode <= 20){
        		return 1;
        	}else if(charCode >= 21 && charCode <= 30){
        		return 2;
        	}else if(charCode >= 31 && charCode <= 40){
        		return 3;
        	}else if(charCode >= 41 && charCode <= 50){
        		return 4;
        	}else if(charCode >= 51 && charCode <= 60){
        		return 5;
        	}else if(charCode >= 61 && charCode <= 66){
        		return 6;
        	}else if(charCode >= 67 && charCode <= 84){
        		return returnNote(String.fromCharCode(charCode));
        	}else if(charCode >= 85 && charCode <= 90){
        		return 7;
        	}else if(charCode >= 91 && charCode <= 96){
        		return 8;
        	}else if(charCode >= 97 && charCode <= 100){
        		return 9;
        	}else if(charCode >= 101 && charCode <= 109){
        		return 10;
        	}else if(charCode >= 41 && charCode <= 50){
        		return returnNote(String.fromCharCode(charCode));
        	}else if(charCode >= 123 && charCode <= 127){
        		return 11;
        	}
        }