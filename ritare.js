function getoffset(el) {
	if(!el){
		el = this;
	}

	var x = el.offsetLeft;
	var y = el.offsetTop;

	while (el = el.offsetParent) {
		x += el.offsetLeft;
		y += el.offsetTop;
	}

	return [x, y]
}

var Ritare = {
	parentel: null,
	applet: null,
	canvas: null,
	finishbutton: null,
	widthselect: null,

	colors: [0,0,0],
	mouseX: null,
	mouseY: null,
	width: 3,
	paint: null,
	start: function(options) {
		this.parentel = document.getElementById(options.parentel);

		// Prepare applet
		this.applet = document.createElement("div");
		this.applet.id = 'ritare';
		this.applet.style.width = options.width+'px';
		this.applet.style.height = options.height+'px';
		this.parentel.appendChild(this.applet);

		// Prepare canvas
		this.canvas = document.createElement("canvas");
		this.canvas.id = 'ritare-canvas';
		this.canvas.width = options.width;
		this.canvas.height = options.height;
		this.applet.appendChild(this.canvas);

		// Prepare context
		this.context = this.canvas.getContext("2d");
		this.context.fillStyle = "#fff";
		this.context.fillRect(0,0,options.width,options.height);

		// Prepare width select field
		this.widthlabel = document.createElement("span");
		this.widthlabel.innerHTML = "W: ";
		this.widthlabel.id = "widthlabel";
		this.applet.appendChild(this.widthlabel);

		this.widthselect = document.createElement("input");
		this.widthselect.type = 'number';
		this.widthselect.id = 'widthselect';
		this.widthselect.value = this.width;
		this.applet.appendChild(this.widthselect);
		this.widthselect.addEventListener("change", (function(e){
			Ritare.width = Ritare.widthselect.value;
		}));

		// Prepare color selectors
		this.rgblabel = document.createElement("span");
		this.rgblabel.innerHTML = "RGB: ";
		this.applet.appendChild(this.rgblabel);

		this.selectors = document.createElement("div");
		this.selectors.id = "selectors";
		this.applet.appendChild(this.selectors);

		this.redselect = document.createElement("input"); // There must be a better way to add these three fields
		this.redselect.type = 'number';
		this.redselect.min = '0';
		this.redselect.max = '255';
		this.redselect.value = this.colors[0];
		this.redselect.style.background = 'red';
		this.selectors.appendChild(this.redselect);
		this.redselect.addEventListener("change", (function(e){
			Ritare.colors[0] = Ritare.redselect.value;
		}));
		this.greenselect = document.createElement("input");
		this.greenselect.type = 'number';
		this.greenselect.min = '0';
		this.greenselect.max = '255';
		this.greenselect.value = this.colors[1];
		this.greenselect.style.background = 'green';
		this.selectors.appendChild(this.greenselect);
		this.greenselect.addEventListener("change", (function(e){
			Ritare.colors[1] = Ritare.greenselect.value;
		}));
		this.blueselect = document.createElement("input");
		this.blueselect.type = 'number';
		this.blueselect.min = '0';
		this.blueselect.max = '255';
		this.blueselect.value = this.colors[2];
		this.blueselect.style.background = 'blue';
		this.selectors.appendChild(this.blueselect);
		this.blueselect.addEventListener("change", (function(e){
			Ritare.colors[2] = Ritare.blueselect.value;
		}));

		// Prepare finish button
		this.finishbutton = document.createElement("button");
		this.finishbutton.id = 'ritare-finished';
		this.finishbutton.type = 'button';
		this.finishbutton.innerHTML = 'Finished!';
		this.finishbutton.outerHTML = ' ';
		this.applet.appendChild(this.finishbutton);
		this.finishbutton.addEventListener("mousedown", options.onFinish);

		this.canvas.addEventListener("mousedown", (function(e){
			Ritare.mouseX = e.pageX - Ritare.canvas.offsetLeft;
			Ritare.mouseY = e.pageY - Ritare.canvas.offsetTop;
			Ritare.paint = true;
		}));

		this.canvas.addEventListener("mousemove", (function(e){
			offsets = getoffset(Ritare.canvas);
			Ritare.mouseX = e.pageX - offsets[0];
			Ritare.mouseY = e.pageY - offsets[1];
			if(Ritare.paint){
				Ritare.context.fillStyle = "rgba("+Ritare.colors[0]+","+Ritare.colors[1]+","+Ritare.colors[2]+",255)";
				//Ritare.context.fillRect(Ritare.mouseX, Ritare.mouseY, Ritare.width, Ritare.width);
				Ritare.context.beginPath();
				Ritare.context.arc(Ritare.mouseX, Ritare.mouseY, Ritare.width, 0, 2*Math.PI)
				Ritare.context.fill();
			}
		}));

		document.body.addEventListener("mouseup", (function(e){
			Ritare.paint = false;
		}));
	}
};
