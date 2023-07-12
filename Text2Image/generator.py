import os, re

LOCATION = './fonts'
TARGET = 'fonts.css'

def isfont(filename):
	return re.search('^([a-zA-Z0-9\s_\\.\-\(\):])+(.ttc|.ttf|.otf)$', filename)

def write_file(path, filename):
	full_path = os.path.join(path, filename)

	name, font_type = filename.split('.')
	if font_type == 'ttf' or font_type == 'ttc':
		font_type = 'truetype'
	elif font_type == 'otf':
		font_type = 'opentype'

	file = open(TARGET, 'a')
	file.write('@font-face {\n    font-family: "' + name + '";\n    src: url("' + full_path + '") format("' + font_type + '");\n    font-display: swap;\n}\n\n')
	file.close()

for item in os.listdir(LOCATION):
	folder = os.path.join(LOCATION, item)

	if os.path.isdir(folder):
		for filename in os.listdir(folder):
			if isfont(filename):
				write_file(folder, filename)
