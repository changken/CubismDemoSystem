import glob, os

sep = "/"

while True:

    dirName = input('dirName? ')
    is_motions = input('is motions? (yes: 1, no etc) ')
    motion_dir = 'motion'

    if dirName == 'end':
        break

    if int(is_motions) == 1:
        motion_dir = 'motions'

    AllStr = '{"All": [';

    for fname in glob.glob(dirName+'/' + motion_dir + '/*.json'):
        # print(fname.replace(os.sep, "/")[2:])
        AllStr += '{ "File": "%s"},'%(sep.join(fname.replace(os.sep, "/").split('/')[1:]))
        
    AllStr += ']}';

    print(AllStr)