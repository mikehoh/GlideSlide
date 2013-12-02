(function( $ ) {

  $.fn.glideslide = function( params ) {
	  var containerStyles = {
		  "background-repeat": "no-repeat",
		  "background-position": "center center",
		  "background-size": "cover"
	  };
	  var helperStyles = {
		  "position": "fixed",
		  "top": 0,
		  "bottom": 0,
		  "left": 0,
		  "right": 0,
		  "z-index": -1,
		  "background-color": "transparent",
		  "background-repeat": "no-repeat",
		  "background-position": "center center",
		  "background-size": "cover"		  
	  };
	  var options = $.extend( {
		  "files": "",
		  "path": "images",
		  "delay": 10000
      }, params);
	  
	  if (options.delay < 3000) { options.delay = 5000 };
	  var currentPos = 0;
	  var currentFile = options.files[currentPos]
	  var initFile = options.path + "/" + currentFile;
	  var filesNum = options.files.length;
	  this.css(containerStyles).css("background-image", "url(" + initFile + ")");
	  this.prepend( $('<div id="image-cnt" />') );
	  this.children('#image-cnt').css(helperStyles);
		var that = this;

		setInterval( function(){
			changeBackground(that,options.path,currentFile);
			currentPos += 1;
			if (currentPos == filesNum) { currentPos = 0 };
			currentFile = options.files[currentPos];
		}, options.delay);

	  return this;

  };
  

	changeBackground = function( target,path,file ) {
		var image = new Image();
		var backgroundName = path + '/' + file;
		//$('#loader').show();
		image.src = backgroundName;
		image.onload = function(){	
			var cssBackground = 'url(' + image.src + ')';
			target.children('#image-cnt').hide();		
			target.children('#image-cnt').css('background-image', cssBackground);
			target.children('#image-cnt').fadeIn(2500,function(){
				target.css("background-image", cssBackground);
				setTimeout(function(){
					target.children('#image-cnt').fadeOut(2500);
				}, 1000);
			});
			//$('#loader').hide();
		};
	};
  
})(jQuery);
