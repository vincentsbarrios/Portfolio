#include "GameLogic.h"
#include <windows.h>
#include <ctime>
#include <thread>
#include <string>
#include <iostream>

using namespace std;

//VARIABLES GLOBALES
int level = 1, score = 0, dspeed = 0, life = 3, speed = 100, pos = 0, xc, tempscore = 20;
int track[15][20];
int lastgames[10];
string name = "";

//POSICIONAMIENTO DEL CURSOR
void gotoXY(int x, int y)
{
	COORD coord;
	coord.X = x;
	coord.Y = y;
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}


//FUNCION PARA ENVIAR POSICION DONDE DEBE IR IMPRIMIENDO LOS AUTOS
void create(int x, int y) {
	if (y<20 & y >= -0) {
		track[x][y] = 1;
	}
}

//TIMER PARA LOS NIVELES
void times() {

	clock_t start = clock() / CLOCKS_PER_SEC;

	gotoXY(17, 17);
	cout << "TIME: " << start;

	if (start == 20) {
		level = 2;
		speed = 100;
	}
	else if (start == 40) {
		level = 3;
		speed = 100;
	}
	else if (start == 60) {
		level = 4;
		speed = 100;
	}
	else if (start == 80) {
		level = 5;
		speed = 100;
	}
	else if (start == 100) {
		level = 6;
		speed = 100;
	}
	else if (start == 120) {
		level = 7;
		speed = 100;
	}
	else if (start == 140) {
		level = 8;
		speed = 100;
	}
	else if (start == 160) {
		level = 9;
		speed = 100;
	}
	else if (start == 180) {
		level = 10;
		speed = 100;
	}
	else if (start == 200) {
		level = 2;
		speed = 100;
	}

	else if (start == 220) {
		level = 3;
		speed = 100;
	}
	else if (start == 240) {
		level = 4;
		speed = 100;
	}
	else if (start == 260) {
		level = 5;
		speed = 100;
	}
	else if (start == 280) {
		level = 6;
		speed = 100;
	}
	else if (start == 300) {
		level = 7;
		speed = 100;
	}
	else if (start == 320) {
		level = 8;
		speed = 100;
	}
	else if (start == 340) {
		level = 9;
		speed = 100;
	}
	else if (start == 360) {
		level = 10;
		speed = 100;
	}

	if (level == 10) {
		tempscore += 20;
		speed = speed - 20;
		Sleep(1000);
		level = 0;
	}
	



}

//FUNCION PARA LIMPIAR PANTALLA
void refresh() {
	for (int j = 0; j<20; j++) {
		for (int i = 1; i<14; i++) {
			track[i][j] = 0;
		}
	}
}



IncomingCar::IncomingCar() {
	//PRIMERA POSICION DONDE APARESERA EL AUTO ENEMICO
	positionXI = 2;
	positionYI = -3;
}

void IncomingCar::createCar() {
	//DIBUJA LA IMAGEN DEL AUTO
	create(positionXI, positionYI); create(positionXI - 1, positionYI + 1); create(positionXI + 1, positionYI + 1);
	create(positionXI, positionYI + 1); create(positionXI, positionYI + 2); create(positionXI - 1, positionYI + 3);
	create(positionXI + 1, positionYI + 3);
}

void IncomingCar::printCar() {

	//IMPRIMI DE MANERA ALEATORO LOS AUTOS DEPENDIENDO DE LA POSICION DEL RANDOM

	if (positionYI > 18) {
		int randomNo = rand() % 4;
		if (randomNo == 0) {
			positionXI = 2;
		}
		else if (randomNo == 2) {
			positionXI = 5;
		}
		else if (randomNo == 3) {
			positionXI = 8;
		}
		else {
			positionXI = 11;
		}
		positionYI = -3;
	}

	//MUEVE EL AUTO UN ESPACIO MAS EN Y
	positionYI++;

	//PUNTAJE CUANDO REBASA UN AUTO
	if (positionYI > 18) {
		score = score + tempscore;
	}
		

}



PlayerCar::PlayerCar() {
	//PRIMERA POSICION DONDE APARESERA EL AUTO DEL JUGADOR
	positionXP = 5;
	positionYP = 16;
}


void PlayerCar::createPlayerCar() {
	//DIBUJA LA IMAGEN DEL AUTO SEGUN SU POSICION
	create(positionXP, positionYP); create(positionXP - 1, positionYP + 1); create(positionXP + 1, positionYP + 1);
	create(positionXP, positionYP + 1); create(positionXP, positionYP + 2); create(positionXP - 1, positionYP + 3);
	create(positionXP + 1, positionYP + 3);
}

void PlayerCar::pos1() {
	positionXP -= 3;
}

void PlayerCar::pos2() {
	positionXP += 3;
}


void PlayerCar::impact(IncomingCar *XX, bool *start) {
	if (XX->positionXI == positionXP & XX->positionYI>13) {
		if (life == 1) {
			*start = false;
			lastgames[pos] = score;
			pos++;
		}
		positionXP = 5;
		life--;
		refresh();
		Sleep(1000);

	}
}

void KeyListener(PlayerCar *move) {
	while (true) {
		if (GetAsyncKeyState(VK_LEFT) & (0x8000 != 0)) {
			move->pos1();
		}
		else if (GetAsyncKeyState(VK_RIGHT) & (0x8000 != 0)) {
			move->pos2();
		}
		else if (GetAsyncKeyState(VK_UP) & (0x8000 != 0)) {
			speed = 30;
			gotoXY(2, 2);
			cout << "NITROUS ACTIVADO";
		}
		if (GetAsyncKeyState(VK_F4) & (0x8000 != 0)) {
			system("pause");
		}
	}
}

//EJECUTA EL JUEGO
void run() {
	PlayerCar PC = PlayerCar();
	IncomingCar IC = IncomingCar();
	thread _thread(KeyListener, &PC);
	bool start = true;
	life = 3;
	score = 0;
	xc = 0;

	cout << "\nNAME PLAYER: ";
	cin >> name;
	system("cls");

	while (start) {
		refresh();
		times();
		IC.printCar();
		IC.createCar();
		PC.createPlayerCar();
		PC.impact(&IC, &start);

		gotoXY(17, 2);
		cout << "PLAYER: " << name;

		gotoXY(17, 5);
		cout << "LIFES: " << life;

		gotoXY(17, 8);
		cout << "LEVEL: " << level;

		gotoXY(17, 11);
		cout << "POINTS: " << score;

		gotoXY(17, 14);
		cout << "SPEED: " << speed;


		for (int j = 0; j<23; j++) {
			for (int i = 0; i<15; i++) {
				if (i == 0 | i == 14) {
					gotoXY(i, j);
					cout << (char(186));
				}
				else if (track[i][j] == 1) {
					gotoXY(i, j);
					cout << (char(219));
				}
				else {
					gotoXY(i, j);
					cout << " ";
				}
			}
		}

		Sleep(speed);
	}
	
	_thread.detach();
	Sleep(1000);
	system("cls");
	gotoXY(5, 4);
	cout << "****************GAME OVER****************";
	Sleep(2000);
	system("cls");

}

void printStats() {
	cout << "******** LAST GAMES SCORES ********" << endl;
	while (xc != 10) {
		cout << xc + 1 << ". " << name << " points-> " << lastgames[xc] << endl;
		xc++;
	}
}