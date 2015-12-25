/*
タブ区切り文字をエリア内文字に変換.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
ver. 0.1.5
*/

(function() {

	// Settings
	var settings = {
		'cellX' : 0,
		'cellY' : 0,
		'cellWidth' : 200,
		'cellHeight' : 150,
		'addCellStyle' : false
	}

	// Get Elements
	var doc = app.activeDocument;
	var sel = doc.selection;
	var layer = doc.activeLayer;
	var unit = String(doc.rulerUnits).split('.')[1];
	var units = {
		Centimeters : 'cm',
		Millimeters : 'mm',
		Inches : 'in',
		Pixels : 'px',
		Points : 'pt',
		Qs : 'Q',
		Picas : 'pc',
		Unknown : 'px'
	};

	// Run
	try {
		mainProcess();
	} catch(e) {
			alert(e);
	}

	// Main Process
	function mainProcess() {
		var target = getTagetItems(sel);

		// Confirm data
		if(sel.length == 0 || target.TextFrame.length == 0) {
			throw('必要なオブジェクトが選択されていません。少なくともタブ区切りのテキストオブジェクトを1つ選択してください');
			return;
		} else if(sel.length > 2 || target.TextFrame.length > 1 || target.PathItem.length > 1) {
			throw('選択オブジェクトが多すぎます。下記を参照してください\n1. タブ区切りのテキストオブジェクト（必須）\n2. 表組みのサイズ基準となるパスオブジェクト（任意）');
			return;
		}

		if(!target.PathItem[0]) {
			var inputSize = prompt('半角数字で全体の［幅,高さ］を入力\n単位：' + units[unit], settings.cellWidth + ',' + settings.cellHeight);
			if(!inputSize) return;
			var customSize = inputSize.split(',');
			if(customSize.length != 2 || isNaN(customSize[0]) || isNaN(customSize[1]) || customSize[0] == 0 || customSize[1] == 0) {
				if(!confirm('値が無効です。初期設定のサイズを使用して作成しますか？（幅：' + settings.cellWidth + ' ' + units[unit] + ' 高さ：' + settings.cellHeight + ' ' + units[unit] + '）')) return;
			} else {
				settings.cellWidth = Number(customSize[0]);
				settings.cellHeight = Number(customSize[1]);
			}

			// Convert units
			for(var key in settings) {
				settings[key] = convertUnits(settings[key] + units[unit], 'px');
			}
			var abr = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;
			target.PathItem[0] = doc.activeLayer.pathItems.rectangle(-settings.cellY + abr[1], settings.cellX + abr[0], settings.cellWidth, settings.cellHeight);
		}

		// Get objects, layer, bounds
		var items = {
			'textFrame' : target.TextFrame[0],
			'pathItem' : target.PathItem[0]
		};
		layer = items.pathItem.layer;
		var bounds = items.pathItem.geometricBounds;

		// Get Character Attributes
		var neededAttr = ['size', 'textFont', 'leading', 'kerningMethod', 'tracking', 'verticalScale', 'horizontalScale', 'baselineShift', 'autoLeading', 'leading'];
		var copyAttributes = {};
		for (var i = 0; i < neededAttr.length; i++) {
			try {
				copyAttributes[neededAttr[i]] = items.textFrame.textRange.characterAttributes[neededAttr[i]];
			} catch(e) {}
		};

		// Get Strings
		var str = items.textFrame.contents;
		var pattern = /[\n\r]/
		var lines = str.split(pattern);
		var tableData = [];
		for (var i = 0; i < lines.length; i++) {
			tableData.push(lines[i].split('\t'));
		};

		// Get cell bounds
		var cellBounds = [bounds[0], -bounds[1], (bounds[2] - bounds[0])/tableData[0].length, (-bounds[3] + bounds[1])/lines.length];

		// Create cell
		var cell = [];
		for (var row = 0; row < tableData.length; row++) {
			for (var col = 0; col < tableData[row].length; col++) {
				cell.push(addAreaText(cellBounds[2] * col + cellBounds[0], cellBounds[3] * row + cellBounds[1], cellBounds[2], cellBounds[3], tableData[row][col], copyAttributes));
			};
		};

		// Remove objects and select area type
		items.pathItem.remove();
		items.textFrame.selected = false;

	}

	// Get Target items
	function getTagetItems(obj) {
		var itemNum = {
			'TextFrame' : [],
			'PathItem' : []
		};
		for (i = 0; i < obj.length; i++) {
			if (obj[i].typename == 'TextFrame' || obj[i].typename == 'PathItem') {
				itemNum[obj[i].typename].push(obj[i]);
			}
		}
		return itemNum;
	}

	// Create area type
	function addAreaText(x, y, w, h, str, attr) {
		var frameRect = layer.pathItems.rectangle(-y, x, w, h);
		var areaText = layer.textFrames.areaText(frameRect);
		areaText.contents = str;
		for (var key in attr) {
			areaText.textRange.characterAttributes[key] = attr[key];
		}
		var tp = areaText.textPath;
		if(settings.addCellStyle) {
			tp.filled = true;
			tp.fillColor = getColor([0, 0, 0, 100]);
			tp.stroked = true;
			tp.strokeWidth = 1;
			tp.fillColor = getColor([0, 0, 0, 0]);
			areaText.spacing = areaText.height * 0.2;
		}
		areaText.selected = true;
		return areaText;
	}

	// Convert Units
	function convertUnits(val, unit) {
		var unitval = new UnitValue(val);
		return unitval.as(unit);
	}

	// Get Color
	function getColor(color) {
		var newColor;
		if(color.length > 3) {
			newColor = new CMYKColor();
			newColor.black = color[0];
			newColor.cyan = color[1];
			newColor.magenta = color[2];
			newColor.yellow = color[3];
		} else {
			newColor = new RGBColor();
			newColor.red = color[0];
			newColor.green = color[1];
			newColor.blue = color[2];
		}
		return newColor;
	}

}());