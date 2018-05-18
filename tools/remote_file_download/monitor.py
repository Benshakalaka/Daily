# -*- coding: utf-8 -*-
import os
import time
import sys
import shutil

def copyfile_download(toDownloadFilePath, downloadToFilePath):
    try:
        shutil.copy(toDownloadFilePath, downloadToFilePath)
    except Exception as e:
        print(e)

if __name__ == "__main__":
	fileSrcPath = sys.argv[1]
	fileToPath = sys.argv[2]
	if fileSrcPath and fileToPath:
		copyfile_download(fileSrcPath, fileToPath)
	# monitor(filePath, int(fileToSize))
