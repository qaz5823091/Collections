import os, re

FONT_LOCATION = './fonts'
FONT_TARGET = 'fonts.css'
EMOJI_LOCATION = './emojis'
EMOJI_TARGET = 'emojis.css'


def isfont(filename):
	return re.search(r'^([a-zA-Z0-9\s_\\.\-\(\):])+(.ttc|.ttf|.otf)$', filename)

def write_file(path, filename, target):
	full_path = os.path.join(path, filename)

	name, font_type = filename.split('.')
	if font_type == 'ttf' or font_type == 'ttc':
		font_type = 'truetype'
	elif font_type == 'otf':
		font_type = 'opentype'

	file = open(target, 'a')
	file.write('@font-face {\n    font-family: "' + name + '";\n    src: url("' + full_path + '") format("' + font_type + '");\n    font-display: swap;\n}\n\n')
	file.close()

def list_and_write(location, taget):
	for item in os.listdir(location):
		folder = os.path.join(location, item)

		if os.path.isdir(folder):
			for filename in os.listdir(folder):
				if isfont(filename):
					write_file(folder, filename, taget)

list_and_write(FONT_LOCATION, FONT_TARGET)
list_and_write(EMOJI_LOCATION, EMOJI_TARGET)
