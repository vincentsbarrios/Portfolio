#include <windows.h>
#include <ctime>
#include <thread>
#include <string>

void run();
//void KeyListener(PlayerCar *move);
void printStats();



class IncomingCar 
{
public:
	IncomingCar();
	int positionXI, positionYI;
	void createCar();
	void printCar();
};

class PlayerCar 
{
public:
	PlayerCar();
	int positionXP, positionYP;
	void createPlayerCar();
	void pos1();
	void pos2();
	void impact(IncomingCar *,bool *);
};





