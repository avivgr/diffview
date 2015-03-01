function HtmlEscape(s)
{
	var el = document.createElement("div");
  	el.innerText = el.textContent = s;
  	s = el.innerHTML;
  	return s;
}

function toDiff(data)
{
	var STATE_COVER_LETTER = 0;
	var STATE_DIFF = 1;
	var STATE_HUNK = 2;
	var STATE_UNKNOWN = 3;
	
	var lines = data.split("\n");
	var state = STATE_COVER_LETTER;
	var out = "";
	for (var i = 0; i < lines.length; i++) {
		var line = HtmlEscape(lines[i].substring(0, lines[i].length-1));
		/* Change state */
		switch(state){
			case STATE_COVER_LETTER:
			case STATE_UNKNOWN:
			if(line.match(/^diff/) != null)
			    state = STATE_DIFF;
			break;
			case STATE_DIFF:
			if(line.match(/^@@/) != null)
			    state = STATE_HUNK;
			break;
			case STATE_HUNK:
			if(line.match(/^diff/) != null) {
			    state = STATE_DIFF;
			} else if(line.length > 0 && line.match(/^[\s+-@]/) == null) {
			    state = STATE_UNKNOWN;
			}
			break;
		}
		/* Output lines */
		switch(state){
			case STATE_COVER_LETTER:
				if (line.match(/Change-Id:/i) != null) {
					out += "<span class=\"gerritcid\">" + line + "</span>";
				} else if  (line.match(/Signed-off-by:/i) != null) {
					out += "<span class=\"sobline\">" + line + "</span>";
				} else if(line.match(/^[A-Za-z-]+:/) != null) {
					out += "<span class=\"headerline\">" + line + "</span>";
				} else {
					out += line;
				}
			break;
			case STATE_UNKNOWN:
				out += line;
			break;
			case STATE_DIFF:
				if(line.match(/^diff/) != null) {
					out += "<span class=\"diffline\">" + line + "</span>";
				} else if(line.match(/^\+\+\+/) != null) {
					out += "<span class=\"targetfile\">" + line + "</span>";
				} else if(line.match(/^---/) != null) {
					out += "<span class=\"sourcefile\">" + line + "</span>";
				} else {
					out += line;
				}
			break;
			case STATE_HUNK:
				switch(line[0]) {
				case '@':
  					hunk_re = /^(@@.*@@)(.*)/;
  					matches = hunk_re.exec(line);
  					if(matches) {
  						var hline = "<span class=\"hunkinfo\">" + matches[1] + "</span>";
						if(matches.length > 1)
  							hline += " <span class=\"funcinfo\">" + matches[2] + "</span>";
						out += hline;
  					} else {
  						out += line;
  					}
				break;
				case '+':
					line = line.replace(/(\s+)$/, function(match, group1) {
						 return "<span class=\"badspace\">" + group1 + "</span>"; 
					}); 
					out += "<span class=\"addline\">" + line + "</span>";
				break;
				case '-':
					out += "<span class=\"delline\">" + line + "</span>";
				break;
				default:
					out += line;				
				break;
				}  					
			break;
		}
		out += "<br>";
	}

	return out;
}
