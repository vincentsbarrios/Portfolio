#include "Menu.h"

Menu::Menu(float width, float height)
{
	if (!font.loadFromFile("af.ttf"))
	{
		//gandle ERROR
	}

	menu[0].setFont(font);
	menu[0].setFillColor(sf::Color::White);
	menu[0].setString("PLAY GAME");
	menu[0].setCharacterSize(40);
	menu[0].setPosition(500,350);

	menu[1].setFont(font);
	menu[1].setFillColor(sf::Color::White);
	menu[1].setString("CONTROLS");
	menu[1].setCharacterSize(40);
	menu[1].setPosition(500, 470);

	menu[2].setFont(font);
	menu[2].setFillColor(sf::Color::White);
	menu[2].setString("STATISTICS");
	menu[2].setCharacterSize(40);
	menu[2].setPosition(500, 585);

	menu[3].setFont(font);
	menu[3].setFillColor(sf::Color::White);
	menu[3].setString("EXIT");
	menu[3].setCharacterSize(33);
	menu[3].setPosition(550, 715);

	selectedItemIndex = 0;
}

void Menu::draw(sf::RenderWindow &window)
{
	for (int i = 0; i < MAX_NUMBER_OF_ITEMS; i++)
	{
		window.draw(menu[i]);
	}
}

void Menu::MoveUp() 
{
	if (selectedItemIndex - 1 >= 0)
	{
		menu[selectedItemIndex].setFillColor(sf::Color::White);
		selectedItemIndex--;
		menu[selectedItemIndex].setFillColor(sf::Color::Cyan);
	}
}

void Menu::MoveDown()
{
	if (selectedItemIndex + 1 < MAX_NUMBER_OF_ITEMS)
	{
		menu[selectedItemIndex].setFillColor(sf::Color::White);
		selectedItemIndex++;
		menu[selectedItemIndex].setFillColor(sf::Color::Cyan);
	}
}