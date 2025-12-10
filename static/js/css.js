const getConfig = () => {
	let sa = document.querySelector('#stripAllComment');
	let sc = document.querySelector('#superCompact');
	let cm = document.querySelector('#keepLastComma');
	let bi = document.querySelector('#betterIndentation');
	let bs = document.querySelector('#breakSelector');
	let tt = document.querySelector('#toTab');
	let to = document.querySelectorAll('#tabOpts input');
	let sb = document.querySelector('#spaceBetween');
	let ip = document.querySelector('#inlineSingleProp');
	let rs = document.querySelector('#removeLastSemicolon');
	let il = document.querySelector('#inlineLayout');
	let si = document.querySelector('#singleBreak');
	let hr = document.querySelector('#highlightedResult');
	let rt = document.getElementsByTagName('h2')[1];
	return {
		sa,
		sc,
		cm,
		bi,
		bs,
		tt,
		to,
		sb,
		ip,
		rs,
		il,
		si,
		hr,
		rt
	};
}

/* CSS Compressor */
function compressCSS(id) {
	let {
		sa,
		sc,
		cm,
		bi,
		bs,
		tt,
		to,
		sb,
		ip,
		rs,
		il,
		si,
		hr,
		rt
	} = getConfig();
	var cf = document.querySelector('#' + id),
		iq = /@(media|-w|-m|-o|keyframes|page)(.*?)\{([\s\S]+?)?\}\}/ig,
		v = cf.value,
		ln = v.length;
	v = (sa.checked || sc.checked) ? v.replace(/\/\*[\w\W]*?\*\//gm, "") : v.replace(/(\n+)?(\/\*[\w\W]*?\*\/)(\n+)?/gm, "\n$2\n");
	v = v.replace(/([\n\r\t\s ]+)?([\,\:\;\{\}]+?)([\n\r\t\s ]+)?/g, "$2");
	v = (sc.checked) ? v : v.replace(/\}(?!\})/g, "}\n");
	v = (bi.checked) ? v.replace(iq, function (m) {
		return m.replace(/\n+/g, "\n  ");
	}) : v.replace(iq, function (m) {
		return m.replace(/\n+/g, "");
	});
	v = (bi.checked && !sc.checked) ? v.replace(/\}\}/g, "}\n}") : v;
	v = (bi.checked && !sc.checked) ? v.replace(/@(media|-w|-m|-o|keyframes)(.*?)\{/g, "@$1$2{\n  ") : v;
	v = (cm.checked) ? v.replace(/;\}/g, "}") : v.replace(/\}/g, ";}").replace(/;+\}/g, ";}").replace(/\};\}/g, "}}");
	v = v.replace(/\:0(px|em|pt)/ig, ":0");
	v = v.replace(/ 0(px|em|pt)/ig, " 0");
	//v = v.replace(/ +?(\>|\+|\~) +?/g,"$1");
	v = v.replace(/\s+\!important/ig, "!important");
	v = v.replace(/(^\n+|\n+$)/, "");
	cf.value = v;
}

/* CSS Beautifier */
function beautifyCSS(id) {
	let {
		sa,
		sc,
		cm,
		bi,
		bs,
		tt,
		to,
		sb,
		ip,
		rs,
		il,
		si,
		hr,
		rt
	} = getConfig();
	sc.checked = false;
	sa.checked = false;
	bi.checked = false;
	compressCSS('cssBox'); // Compress first...
	var bf = document.querySelector('#' + id),
		iq = /\n@(media|-w|-m|-o|keyframes|page)(.*?)\{([\s\S]+?)?\}\n\}/ig, // Inside `@query{}`
		v = bf.value;
	if (!il.checked) {
		v = v.split(';').join(';\n  ');
		v = v.split('{').join(' {\n  ');
		v = v.split('}').join(';\n}\n');
		v = v.replace(/\}([\n\s;]+?)?\}/g, "}\n}");
		v = (bs.checked) ? v.replace(/\n(.*?)\{/g, function (m) {
			return m.replace(/,/g, ",\n"); // Break multiple selectors
		}) : v;
		v = v.replace(/@([\s\S]+?)\{/g, function (m) {
			return m.replace(/,\n/g, ", ");
		});
		v = v.replace(iq, function (m) {
			return m.replace(/\n/g, "\n  ").replace(/\n\s+\n/g, "\n").replace(/\}\n+\s+\}/g, "}\n}");
		});
	} else {
		v = v.replace(/;/g, "; ");
		v = v.replace(/\{(.*?)\}/g, " { $1; }");
		v = v.replace(/\}\}/g, "}\n}");
		v = v.replace(iq, function (m) {
			return m.replace(/\n/g, "\n    ").replace(/\n+\s+\n/g, "\n").replace(/\}\n\s+\}/g, "}\n}");
		})
		v = v.replace(/\{(.*?)\{(.*?):(.*?)\}\n/g, "{\n     $1 { $2:$3}\n");
	}
	v = v.replace(/\{\n  ;\n\}|\{ ; \}/g, "{}"); // Empty selectors
	v = (sb.checked) ? v.replace(/\{([\s\S]+?)\}|\((.*?)\)/gm, function (m) {
		return m.replace(/(,|\:)/g, "$1 ");
	}) : v;
	v = (sb.checked) ? v.replace(/(.*?)\{/g, function (m) {
		return m.replace(/,/g, ", ");
	}) : v;
	v = v.replace(/\!important/g, " !important");
	v = v.replace(/data: ?image(.*?);([\n\r\t\s]+)base64, ?/g, "data:image$1;base64,"); // Data URI Image
	v = v.replace(/\n\s+@(.*?)\{\n    /g, "\n\n@$1{\n  ");
	//v = v.replace(/(\>|\+|\~)/g," $1 ");
	v = (ip.checked) ? v.replace(/(.*){(\n\s+|\t)(.*)\:(.*);\n(\s+)?}/g, "$1{$3:$4;}") : v;
	v = (rs.checked) ? v.replace(/\{(.*?)\;(\s+)?\}/g, "{$1$2}") : v;
	v = (tt.checked && to[0].checked) ? v.split(/  /).join('\t') : v;
	v = (tt.checked && to[1].checked) ? v.split(/  /).join('    ') : v;
	v = (il.checked) ? v.replace(iq, function (m) {
		return m.replace(/\}/g, "} ");
	}) : v;
	v = (si.checked) ? v.replace(/(\}|\*\/)\n+/g, "$1\n").replace(/\/\*/g, "\n/*") : v.replace(/\*\/\n(.)/g, "*/\n\n$1");
	v = v.replace(/(^\n+|\n+$)/, "");
	bs.disabled = (il.checked) ? true : false;
	ip.disabled = (il.checked) ? true : false;
	tt.disabled = (il.checked) ? true : false;
	to[0].disabled = (tt.checked && !il.checked) ? false : true;
	to[1].disabled = (tt.checked && !il.checked) ? false : true;
	bf.value = v;
}

/* Clear the field value */
function clearField(id) {
	var fl = document.querySelector('#' + id);
	fl.value = "";
	fl.focus();
}

/* Select All */
function selectAll(id) {
	document.querySelector('#' + id).focus();
	document.querySelector('#' + id).select();
}
function copyTextareaToClipboard(textareaId) {
	const textarea = document.getElementById(textareaId);
	if (textarea) {
		textarea.select(); // Selects all text in the textarea
		textarea.setSelectionRange(0, 99999); // For mobile devices, ensures all text is selected
		try {
			document.execCommand('copy'); // Copies the selected text to the clipboard
			Toastify({
				text: "Đã sao chép!",
				duration: 3000,
				style: {
					background: "#FF79C6",
				}
			}).showToast();
		} catch (err) {
			console.error(err)
		}
	} else {
		console.error('Textarea with ID "' + textareaId + '" not found.');
	}
}