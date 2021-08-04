#include <iostream>
#include "GameLogic.h"

using namespace std;


int main()
{
	int opp;
	
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 9);

	do {
		cout << "\n********MAIN MENU GAME*********" << endl;
		cout << "1. PLAY GAME" << endl;
		cout << "2. LAST GAME INFO" << endl;
		cout << "3. EXIT" << endl;
		cout << "---> ";
		cin >> opp;


		switch (opp) {
		case 1: {
			system("cls");
			run();
			break;
		}
		break;

		case 2:
			printStats();
			break;

		}
	} while (opp != 3);



	return 0;
}
