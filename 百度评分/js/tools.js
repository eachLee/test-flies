function $(selctor,context) {
				context = context||document;
				switch(selctor.charAt(0)){
					case '#':
					return document.getElementById(selctor.substring(1));
					break;
					case '.':
					return context.getElementsByClassName(selctor.substring(1));
					break;
					default:
					return context.getElementsByTagName(selctor);
				}
			}