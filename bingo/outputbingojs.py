import time
import sys
import random
import csv
import math
import threading
from threading import Thread
from selenium import webdriver
from selenium.webdriver.support.ui import Select


def writecsv(parr, filen):
        with open(filen, 'wb') as csvfile:
                spamwriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                for i in range(0,len(parr)):
                        try:
                                spamwriter.writerow(parr[i])
                        except:
                                print parr[i], i

def readcsv(filen):
        allgamesa  =[]
        with open(filen, 'rb') as csvfile:
                spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
                for row in spamreader:
                        allgamesa.append(row)
        return allgamesa



row0 = ['3x^2','4x^3','5x^4','6x^5','7x^6','4x^3','5x^4','6x^5','7x^6','4x^3','5x^4','6x^5']

istr = 'listQ = ['

for i in row0:
    istr += '"'+i+'",'
istr = istr[:-1]+'];'


f = open('hello_functions.txt','w')
f.write(istr+'\n')
f.close()