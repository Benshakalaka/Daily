# -*- coding: utf-8 -*-
import os
import sys
import time
import shutil
import subprocess
import json
import zipfile
import logging
from datetime import datetime
from functools import partial

CONFIG_FILE_PATH = './config.json'
DOWNLOAD_TO_DIR = '.'
CONFIG_ENTITY = None
LOG_FILE = 'download.log'

logging.basicConfig(
	filename=LOG_FILE,
	format='%(asctime)s -%(name)s-%(levelname)s-%(module)s:%(message)s',
	datefmt='%Y-%m-%d %H:%M:%S %p',
	level=logging.DEBUG
)

def showFileInfo(dir, index, filename):
	fileName = os.path.join(dir, filename)
	fileStat = os.stat(fileName)
	if fileStat:
		print('%d. %s\t\t%s' % (index, fileName, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(fileStat.st_ctime))))

def getAllExistedFiles():
	try:
		dirPath = CONFIG_ENTITY['remote_address']
		allFilesExisted = os.listdir(dirPath)
		print('Total Files : %d' % len(allFilesExisted))

		if 'folder_name' not in CONFIG_ENTITY or CONFIG_ENTITY['folder_name'] is None or CONFIG_ENTITY['folder_name'] == '':
			latestFile = allFilesExisted[listChoicesOnConsole(allFilesExisted, 'Pick up a folder to open: ', 1, partial(showFileInfo, dirPath))]
		else:
			latestFile = CONFIG_ENTITY['folder_name']

		latestFileName = os.path.join(dirPath, latestFile)
		if os.path.isdir(latestFileName) == False:
			print('File not existed: %s...' % latestFileName)
			return

		latestFileStat = os.stat(latestFileName)
		if latestFileStat:
			print('Source Dir Created Time: %s' % time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(latestFileStat.st_ctime)))
		currentDate = datetime.now()
		print('Current Time : %s' % str(datetime.now()))

		# download folder
		if 'download_is_folder' in CONFIG_ENTITY and CONFIG_ENTITY['download_is_folder']:
			localFolderPath = os.path.join(DOWNLOAD_TO_DIR, latestFile)
			return download_folder(latestFileName, localFolderPath)

		print('Start to Open File: [%s]...' % latestFileName)
		getSubFolder(latestFileName)
	except Exception as e:
		raise e

def download_folder(remoteFolderPath, localFolderPath):
	if os.path.exists(localFolderPath) and os.path.isdir(localFolderPath):
		print('Delete existed folder...')
		shutil.rmtree(localFolderPath)
	
	print('start copy dir ....')
	shutil.copytree(remoteFolderPath, localFolderPath, copy_function=folder_copy_single)
	print('All Done')
	return

def folder_copy_single(src, dst):
	# print('Copy %s ...' % src)
	# shutil.copy2(src, dst)
	toDownloadFileStat = os.stat(src)
	print('Dwonloading File: [%s]... Size is %dM' % (src, round(toDownloadFileStat.st_size / 1024 / 1024, 2)))
	# p = subprocess.Popen(['python','monitor.py', src, dst])
	p = subprocess.Popen(['monitor.exe', src, dst])
	
	monitor(dst, toDownloadFileStat.st_size)
	p.wait()

def getSubFolder(dirPath):
	try:
		allFilesExisted = os.listdir(dirPath)
		if 'file_name' not in CONFIG_ENTITY or CONFIG_ENTITY['file_name'] is None or CONFIG_ENTITY['file_name'] == '':
			toDownload = listChoicesOnConsole(allFilesExisted, "Choose a file to download: ")
			fileName = allFilesExisted[int(toDownload)]
		else:
			fileName = CONFIG_ENTITY['file_name']

		toDownloadFileName = os.path.join(dirPath, fileName)
		if os.path.exists(toDownloadFileName) is not True:
			print('The source file does not exist...')
			return

		downloadToFileName = os.path.join(DOWNLOAD_TO_DIR, fileName)
		toDownloadFileStat = os.stat(toDownloadFileName)
		print('\nTo Dwonload File: [%s]... Size is %dM' % (toDownloadFileName, round(toDownloadFileStat.st_size / 1024 / 1024, 2)))

		if os.path.isdir(toDownloadFileName):
			return download_folder(toDownloadFileName, downloadToFileName)

		if os.path.exists(downloadToFileName):
			os.remove(downloadToFileName)

		p = subprocess.Popen(['monitor.exe', toDownloadFileName, downloadToFileName])
		# p = subprocess.Popen(['python','monitor.py', toDownloadFileName, downloadToFileName])

		monitor(downloadToFileName, toDownloadFileStat.st_size)
		p.wait()
		print('Downloading over ...')

		if downloadToFileName.split('.')[-1] == 'zip' and CONFIG_ENTITY['unzip'] and ('zip' in CONFIG_ENTITY['unzip']):
			unzipFile(downloadToFileName)
		
		if downloadToFileName.split('.')[-1] == 'apk':
			deviceUUid = isConnect2Andorid()
		else:
			deviceUUid = None

		if deviceUUid is not None:
			deviceConfig = getDeviceConfig(deviceUUid)
		else:
			deviceConfig = None

		if downloadToFileName.split('.')[-1] == 'apk' and ('auto_install_apk' in CONFIG_ENTITY) and CONFIG_ENTITY['auto_install_apk'] and deviceConfig is not None:
			if isScreeLighted() is False:
				print('start waking up the device...')
				wakeUpDevice(deviceConfig)

			if isUnLocked():
				# copyFile2Device(downloadToFileName, deviceConfig)
				installAPKDevice(downloadToFileName, deviceConfig)
			else:
				print('Fail to wake up the screen...')
				logging.error('Cannot unlock the screen!')

		print('All Done.')

		if 'open_dir_after_done' in CONFIG_ENTITY and CONFIG_ENTITY['open_dir_after_done']:
			os.startfile(DOWNLOAD_TO_DIR)
	except Exception as e:
		raise e
		

def monitorFile(filename, filesize):
	subprocess.run(['python', './monitor.py', filename, filesize])

def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█'):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
    """
    if total == 0:
    	return
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print('\r%s |%s| %s%% %s' % (prefix, bar, percent, suffix), end = '\r')
    # Print New Line on Complete
    if iteration == total: 
        print()


def monitor(filePath, fileSize):
	if "need_show_progress" not in CONFIG_ENTITY or CONFIG_ENTITY['need_show_progress'] is False:
		return

	printProgressBar(0, fileSize, prefix = 'Progress:', suffix = 'Complete', length = 50)
	while(True):
		try:
			fileStat = os.stat(filePath)
			currentSize = fileStat.st_size
		except Exception as e:
			currentSize = 0
		
		printProgressBar(currentSize, fileSize, prefix = 'Progress:', suffix = 'Complete', length = 50)

		if currentSize >= fileSize:
			break;
		time.sleep(1)


def unzipFile (filePath):
	z = zipfile.ZipFile(filePath, 'r')
	uncompress_size = sum((file.file_size for file in z.infolist()))

	print('Start to Unzip file...')
	extracted_size = 0

	if 'unzip_detail' not in CONFIG_ENTITY or CONFIG_ENTITY['unzip_detail'] is None or CONFIG_ENTITY['unzip_detail'] == '':
		printProgressBar(0, uncompress_size, prefix = 'Progress:', suffix = 'UnzipDone', length = 50)
	
	for file in z.infolist():
	    extracted_size += file.file_size
	    z.extract(file, DOWNLOAD_TO_DIR)
	    if 'unzip_detail' not in CONFIG_ENTITY or CONFIG_ENTITY['unzip_detail'] is None or CONFIG_ENTITY['unzip_detail'] == '':
	    	print('Uncompressing %s' % file)
	    else:
	    	printProgressBar(extracted_size, uncompress_size, prefix = 'Progress:', suffix = 'UnzipDone', length = 50)

	z.close()

	if 'remove_after_unzip' in CONFIG_ENTITY and CONFIG_ENTITY['remove_after_unzip']:
		os.remove(filePath)

def listChoicesOnConsole(list, message = 'Choose a Option: ', defaultIndex = 1, showFunc = None):
	if len(list) == 1:
		return 0

	print('')
	for index, item in enumerate(list):
		if showFunc:
			showFunc(index + 1, item)
		else:
			print("%d: %s" % (index + 1, item))

	if defaultIndex > 0:
		newMessage = message + ("(default %d)  " % defaultIndex)
	else:
		newMessage = message

	toChoose = input(newMessage)
	if toChoose == '' and defaultIndex > 0:
		toChoose = defaultIndex

	try:
		toChoose = int(toChoose)
		if toChoose > len(list) or toChoose < 1:
			raise Exception('Not valid.')
		print('')
	except Exception as e:
		return listChoicesOnConsole(list, message)

	return toChoose - 1

def isConnect2Andorid ():
	devices = os.popen('adb.exe devices').readlines()
	devices = list(filter(
		lambda x: x != '', 
		[device.strip() for device in devices]
	))

	try:
		while len(devices) > 2:
			print('Only support one device one time, please leave only one of them...')
			input('Enter to continue or Ctrl+C to exit')
	except KeyboardInterrupt:
		print('\nEnd')

	if len(devices) == 1:
		return None

	return devices[1].split('\t')[0]

def deviceConfigChooseShow (index, item):
	print("%d: %s" % (index, item['id']))

def getDeviceConfig(deviceUUid):
	if "devices" in CONFIG_ENTITY and isinstance(CONFIG_ENTITY["devices"], list) and len(CONFIG_ENTITY["devices"]) > 0:
		chosenDevice = list(filter(
			lambda config: "uuid" in config and config["uuid"] == deviceUUid,
			CONFIG_ENTITY["devices"]
		))

		if len(chosenDevice) > 0:
			return chosenDevice[0]

		if len(CONFIG_ENTITY["devices"]) == 1:
			return CONFIG_ENTITY["devices"][0]
		else:
			return CONFIG_ENTITY["devices"][listChoicesOnConsole(CONFIG_ENTITY["devices"], showFunc=deviceConfigChooseShow)]
	else:
		return None

def copyFile2Device(filePath, deviceConfig):
	os.system('adb.exe push "%s" "%s"' % (filePath, deviceConfig['filePlace']))

def installAPKDevice(filePath, deviceConfig):
	if deviceConfig['keepOld'] is False:
		print('start uninstalling ...')
		os.popen('adb.exe shell pm uninstall %s' % CONFIG_ENTITY['packageName'])

	print('Start installing ...')
	installResult = os.system('adb.exe install -r "%s"' % filePath)
	if 'open_app_after_installed' in CONFIG_ENTITY and CONFIG_ENTITY['open_app_after_installed'] is True and installResult == 0:
		os.system('adb.exe shell am start -n %s/%s' % (CONFIG_ENTITY['packageName'], CONFIG_ENTITY['mainActivity']))

def isScreeLighted ():
	deviceInfo = os.popen('adb.exe shell dumpsys window policy').readlines()
	deviceScreenInfo = list(filter(
		lambda x: x.find('mScreenOnFully=') > -1, 
		deviceInfo
	))

	deviceScreenInfo = deviceScreenInfo[0].strip()
	deviceScreenInfo = list(filter(
		lambda x: x.find('mScreenOnFully=') > -1, 
		deviceScreenInfo.split(' ')
	))

	deviceScreenInfo = deviceScreenInfo[0].strip()
	isDeviceOpen = (deviceScreenInfo.split('=')[1] == 'true')
	return isDeviceOpen

def isUnLocked ():
	deviceInfo = os.popen('adb.exe shell dumpsys window policy').readlines()
	deviceScreenInfo = list(filter(
		lambda x: x.find('mShowingLockscreen=') > -1 or x.find('isStatusBarKeyguard') > -1, 
		deviceInfo
	))

	deviceScreenInfoA = deviceScreenInfo[0].strip()
	deviceScreenInfoB = deviceScreenInfo[1].strip()

	if deviceScreenInfoA.find('mShowingLockscreen=') == -1:
		(deviceScreenInfoA, deviceScreenInfoB) = (deviceScreenInfoB, deviceScreenInfoA)

	isUnLockedA = list(filter(
		lambda x: x.find('mShowingLockscreen=') > -1, 
		deviceScreenInfoA.split(' ')
	))[0].strip().split('=')[1]

	isUnLockedB = list(filter(
		lambda x: x.find('isStatusBarKeyguard=') > -1, 
		deviceScreenInfoB.split(' ')
	))[0].strip().split('=')[1]

	isDeviceLocked = (isUnLockedA == 'true' or isUnLockedB == 'true')
	return not isDeviceLocked


def wakeUpDevice(deviceConfig):
	shells = [
		'adb.exe shell input keyevent 26',
		'adb.exe shell input swipe 50 1000 50 300'
	]

	passwdShells = ['adb.exe shell input keyevent %d' % (int(x) + 7) for x in deviceConfig['screenPass']]
	shells = shells + passwdShells

	shells.append('adb.exe shell input keyevent 66')
	shells.append('adb.exe shell input keyevent 3')

	for shell in shells:
		os.system(shell)

def inheritConfigFromBaseConfig(baseConfig, remote_address_config):
	for (key,value) in baseConfig.items():
		if key not in remote_address_config or remote_address_config[key] is None:
			remote_address_config[key] = baseConfig[key]
	return remote_address_config

if __name__ == "__main__":
	try:
		with open(CONFIG_FILE_PATH) as json_data:
			config = json.load(json_data)

		allConfigEntitiesList = [x for x in config]
		if len(allConfigEntitiesList) == 0:
			exit(-1)

		allConfigEntitiesList.remove('Base_Config')

		if len(allConfigEntitiesList) == 0:
			print('Read Default Base Config.')
			remote_address_config = {}
		else:
			whichFileIndex = listChoicesOnConsole(allConfigEntitiesList, 'Which download config to Use: ')
			remote_address_config = config[allConfigEntitiesList[whichFileIndex]]

		baseConfig = config['Base_Config']
		remote_address_config = inheritConfigFromBaseConfig(baseConfig, remote_address_config)

		if 'dist_dir' in remote_address_config and remote_address_config['dist_dir'] is not None and remote_address_config['dist_dir'] != '':
			DOWNLOAD_TO_DIR = remote_address_config['dist_dir']

		if os.path.exists(DOWNLOAD_TO_DIR) is not True or os.path.isdir(DOWNLOAD_TO_DIR) is not True:
			os.mkdir(DOWNLOAD_TO_DIR)
		
		CONFIG_ENTITY = remote_address_config
		getAllExistedFiles()

		print('close after 3 seconds...')
		time.sleep(3)
		# isConnect2Andorid()
		# wakeUpDevice({
		# 	'screenPass': '1111'
		# })

		# print(isUnLocked())
	except Exception as e:
		logging.error(e)
		raise e