class timeNote{
	constructor(time, note) {
	    // invokes the setter
	    this.note = note;
	    this.time = time;
  	}

  	get note(){
  		return this._note;
  	}

  	get time(){
  		return this._time;
  	}

  	set note(note){
  		this._note = note;
  	}

  	set time(time){
  		this._time = time;
  	}
}