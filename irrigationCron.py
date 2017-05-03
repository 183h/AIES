from serial import Serial
from subprocess import check_output
from time import sleep

device = findall('ttyUSB[0-9]*', check_output(["ls","/dev"]))[0]
s = Serial('/dev/' + device, 9600)

command='valve_on'
s.write(command.encode())
status = s.readline().decode('ascii').strip()

sleep(5)

command='valve_off'
s.write(command.encode())
status = s.readline().decode('ascii').strip()
