#include <SFML/Graphics.hpp>
#include <math.h>
#include <cstdlib>
#include <iostream>
#include <SFML/Audio.hpp>
#include "Player.h"
#include "Enemy.h"
#include <vector>
#include "Laser.h"
#include <sstream>
#include "Menu.h"
#include <Windows.h>

#include <vector>
#include <iterator>

using namespace std;

//VARIBLES GLOBALES
int pos = 0;
int player_points = 0;
int level = 1;
int scorex[5];
int levelx[5];


void levelWin() 
{
	sf::RenderWindow windowMain(sf::VideoMode(1200, 900), "YOU WIN!", sf::Style::Close | sf::Style::Titlebar);
	sf::RectangleShape image(sf::Vector2f(1200.0f, 900.0f));
	sf::Texture texture;
	texture.loadFromFile("win.jpg");
	image.setTexture(&texture);

	while (windowMain.isOpen())
	{
		sf::Event evnt;

		while (windowMain.pollEvent(evnt))
		{
			if (evnt.type == evnt.Closed) {
				windowMain.close();
			}
			switch (evnt.type) {
			case sf::Event::KeyPressed:
				if (evnt.key.code == sf::Keyboard::Space)
					windowMain.close();
				break;
			}
		}
		windowMain.draw(image);
		windowMain.display();
	}
}

void levelLose()
{
	sf::RenderWindow windowMain(sf::VideoMode(1200, 900), "YOU LOSER!", sf::Style::Close | sf::Style::Titlebar);
	sf::RectangleShape image(sf::Vector2f(1200.0f, 900.0f));
	sf::Texture texture;
	texture.loadFromFile("loser.jpg");
	image.setTexture(&texture);

	while (windowMain.isOpen())
	{
		sf::Event evnt;

		while (windowMain.pollEvent(evnt))
		{
			if (evnt.type == evnt.Closed) {
				windowMain.close();
			}
			switch (evnt.type) {
			case sf::Event::KeyPressed:
				if (evnt.key.code == sf::Keyboard::Space)
					windowMain.close();
				break;
			}
		}
		windowMain.draw(image);
		windowMain.display();
	}
}

void menuStats()
{
	sf::RenderWindow windowMain(sf::VideoMode(1200, 900), "MENU STATS", sf::Style::Close | sf::Style::Titlebar);
	sf::RectangleShape image(sf::Vector2f(1200.0f, 900.0f));
	sf::Texture texture;
	texture.loadFromFile("stats.jpg");
	image.setTexture(&texture);


	while (windowMain.isOpen())
	{
		sf::Event evnt;

		while (windowMain.pollEvent(evnt))
		{
			if (evnt.type == evnt.Closed) {
				windowMain.close();
			}
			switch (evnt.type) {
			case sf::Event::KeyPressed:
				if (evnt.key.code == sf::Keyboard::Space)
					windowMain.close();
				break;
			}
		}

		sf::Font font;
		if (!font.loadFromFile("af.ttf"))
		{
			//ERROR
		}

		sf::Text text_name;
		text_name.setFont(font);
		text_name.setString("BATMAN");
		text_name.setFillColor(sf::Color::Black);
		text_name.setPosition(95, 350);
		text_name.setCharacterSize(40);

		sf::Text text_name1;
		text_name1.setFont(font);
		text_name1.setString("SUPERMAN");
		text_name1.setFillColor(sf::Color::Cyan);
		text_name1.setPosition(95, 450);
		text_name1.setCharacterSize(40);

		sf::Text text_name2;
		text_name2.setFont(font);
		text_name2.setString("IRONMAN");
		text_name2.setFillColor(sf::Color::Yellow);
		text_name2.setPosition(95, 550);
		text_name2.setCharacterSize(40);

		sf::Text text_name3;
		text_name3.setFont(font);
		text_name3.setString("SPIDERMAN");
		text_name3.setFillColor(sf::Color::Red);
		text_name3.setPosition(95, 650);
		text_name3.setCharacterSize(40);

		sf::Text text_name4;
		text_name4.setFont(font);
		text_name4.setString("HULK");
		text_name4.setFillColor(sf::Color::Green);
		text_name4.setPosition(95, 750);
		text_name4.setCharacterSize(40);

		///////////////////////////////////////////////////////////////////////////////////////

		stringstream  points_ss;
		points_ss << levelx[0];
		sf::Text text_level;
		text_level.setFont(font);
		text_level.setFillColor(sf::Color::White);
		text_level.setCharacterSize(50);
		text_level.setString(points_ss.str().c_str());
		text_level.setPosition(580, 350);

		stringstream  points_ss1;
		points_ss1 << levelx[1];
		sf::Text text_level1;
		text_level1.setFont(font);
		text_level1.setFillColor(sf::Color::White);
		text_level1.setCharacterSize(50);
		text_level1.setString(points_ss1.str().c_str());
		text_level1.setPosition(580, 450);

		stringstream  points_ss2;
		points_ss2 << levelx[2];
		sf::Text text_level2;
		text_level2.setFont(font);
		text_level2.setFillColor(sf::Color::White);
		text_level2.setCharacterSize(50);
		text_level2.setString(points_ss2.str().c_str());
		text_level2.setPosition(580, 550);

		stringstream  points_ss3;
		points_ss3 << levelx[3];
		sf::Text text_level3;
		text_level3.setFont(font);
		text_level3.setFillColor(sf::Color::White);
		text_level3.setCharacterSize(50);
		text_level3.setString(points_ss3.str().c_str());
		text_level3.setPosition(580, 650);

		stringstream  points_ss4;
		points_ss4 << levelx[4];
		sf::Text text_level4;
		text_level4.setFont(font);
		text_level4.setFillColor(sf::Color::White);
		text_level4.setCharacterSize(50);
		text_level4.setString(points_ss4.str().c_str());
		text_level4.setPosition(580, 750);

		//////////////////////////////////////////////////////////////////////////////////////

		stringstream  points_s1;
		points_s1 << scorex[0];
		sf::Text text_point1;
		text_point1.setFont(font);
		text_point1.setFillColor(sf::Color::White);
		text_point1.setCharacterSize(50);
		text_point1.setString(points_s1.str().c_str());
		text_point1.setPosition(950, 350);

		stringstream  points_s2;
		points_s2 << scorex[1];
		sf::Text text_point2;
		text_point2.setFont(font);
		text_point2.setFillColor(sf::Color::White);
		text_point2.setCharacterSize(50);
		text_point2.setString(points_s2.str().c_str());
		text_point2.setPosition(950, 450);

		stringstream  points_s3;
		points_s3 << scorex[2];
		sf::Text text_point3;
		text_point3.setFont(font);
		text_point3.setFillColor(sf::Color::White);
		text_point3.setCharacterSize(50);
		text_point3.setString(points_s3.str().c_str());
		text_point3.setPosition(950, 550);

		stringstream  points_s4;
		points_s4 << scorex[3];
		sf::Text text_point4;
		text_point4.setFont(font);
		text_point4.setFillColor(sf::Color::White);
		text_point4.setCharacterSize(50);
		text_point4.setString(points_s4.str().c_str());
		text_point4.setPosition(950, 650);

		stringstream  points_s5;
		points_s5 << scorex[4];
		sf::Text text_point5;
		text_point5.setFont(font);
		text_point5.setFillColor(sf::Color::White);
		text_point5.setCharacterSize(50);
		text_point5.setString(points_s5.str().c_str());
		text_point5.setPosition(950, 750);

		//////////////////////////////////////////////////////////////////////////

		windowMain.draw(image);
		windowMain.draw(text_name);
		windowMain.draw(text_name1);
		windowMain.draw(text_name2);
		windowMain.draw(text_name3);
		windowMain.draw(text_name4);

		windowMain.draw(text_level);
		windowMain.draw(text_level1);
		windowMain.draw(text_level2);
		windowMain.draw(text_level3);
		windowMain.draw(text_level4);

		windowMain.draw(text_point1);
		windowMain.draw(text_point2);
		windowMain.draw(text_point3);
		windowMain.draw(text_point4);
		windowMain.draw(text_point5);


		windowMain.display();
	}
}

void levelThree() {

	vector <Laser> bullets;
	vector<Enemy> enemies;

	int LifePoints = 600, LifePoints1 = 600, LifePoints2 = 600, LifePoints3 = 600;
	int nextlevel = 4;
	//PROTOTYPE
	level = 3;

	bool lf1 = true, lf2 = false, lf3 = false, lf4 = false;
	//Crea la ventana y el objeto
	sf::RenderWindow window(sf::VideoMode(1200, 900), "SPACE INVADER (SUPER ALPHA VERSION)", sf::Style::Close | sf::Style::Titlebar);

	sf::RectangleShape rectangle(sf::Vector2f(1200.0f, 900.0f));
	bool jugadorDisparo = false;
	sf::Texture texture;
	texture.loadFromFile("scene3.jpg"); // backgroung GALAXY--> photo.jpg backgorundRetorx.png
	rectangle.setTexture(&texture);

	//PROTOTYPE TESTING... /////////////////////////////////////////////////////////////////////
	sf::Font font;
	if (!font.loadFromFile("af.ttf"))
	{
		//ERROR
	}

	sf::Text text_name;
	text_name.setFont(font);
	text_name.setString("PLAYERNAME");
	text_name.setFillColor(sf::Color::Cyan);
	text_name.setPosition(960, 600);
	text_name.setCharacterSize(25);



	//////////////////////////////////////////////////////////////////////////////////////////////

	//THEME SONG GAME
	sf::SoundBuffer soundBuffer;
	sf::Sound sound;
	soundBuffer.loadFromFile("spaceinvader.ogg"); //theme song ->  "spaceinvader.ogg"
	sound.setBuffer(soundBuffer);

	//SOUND EFFECT LASER
	sf::SoundBuffer soundBuffer2;
	sf::Sound sound2;
	soundBuffer2.loadFromFile("laser.wav");
	sound2.setBuffer(soundBuffer2);

	//PLAYER SHIP
	sf::Texture playerTexture;
	//Imagen del Ship
	playerTexture.loadFromFile("ship.png");
	Player player(&playerTexture, 0.5f);
	float deltaTime = 1.0f;


	sf::Texture laserTexture;
	//Imagen del Laser
	laserTexture.loadFromFile("laser.png");

	//ENEMIES
	sf::Texture enemyTexture;
	enemyTexture.loadFromFile("enemy3.png");

	sf::Texture enemyTexture1;
	enemyTexture1.loadFromFile("enemy.png");

	enemies.push_back(Enemy(&enemyTexture, -100, -10, 1.0f,50.0f,50.0f,1));
	enemies.push_back(Enemy(&enemyTexture, -300, -10, 1.0f, 50.0f, 50.0f,1));
	enemies.push_back(Enemy(&enemyTexture, -500, -10, 1.0f, 50.0f, 50.0f,1));
	enemies.push_back(Enemy(&enemyTexture, -700, -10, 1.0f, 50.0f, 50.0f,1));

	bool shoot = true;


	while (window.isOpen()) {
		sf::Event _event;
		while (window.pollEvent(_event))
		{
			switch (_event.type) {

			case sf::Event::Closed:
				window.close();
				break;

			case sf::Event::KeyPressed:
				if (_event.key.code == sf::Keyboard::U)
					sound.play();
				if (_event.key.code == sf::Keyboard::I)
					sound.pause();
				if (_event.key.code == sf::Keyboard::Escape)
					window.close();
				if (_event.key.code == sf::Keyboard::Space)
					sound2.play();
				break;
			}

		}


		float right = 0;

		//KEYBOARDS INPUTS
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Space)) {

			if (shoot == true) {
				bullets.push_back(Laser(&laserTexture, player.position.x + 400));
				shoot = false;
			}
		}
		else {
			shoot = true;
		}


		player.Update(deltaTime);

		int finally = 0;

		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false) {
				enemies[i].Update();
				finally = enemies[i].globalpos;
			}
		}

		if (nextlevel <= 0)
		{
			window.close();
			levelWin();
		}
		if (finally == 700)
		{
			scorex[pos] = player_points;
			levelx[pos] = level;
			pos = pos + 1;
			window.close();
			levelLose();
		}

		window.clear();
		window.draw(rectangle);

		//DISPLAY POINTS
		stringstream  points_ss;
		points_ss << player_points;
		sf::Text text_points;
		text_points.setFont(font);
		text_points.setFillColor(sf::Color::Cyan);
		text_points.setCharacterSize(40);
		text_points.setString(points_ss.str().c_str());
		text_points.setPosition(1010, 240);

		stringstream  level_ss;
		level_ss << level;
		sf::Text text_level;
		text_level.setFont(font);
		text_level.setFillColor(sf::Color::Cyan);
		text_level.setCharacterSize(40);
		text_level.setString(level_ss.str().c_str());
		text_level.setPosition(1015, 400);

		//DISPLAY TEXT AND NUMBERS
		window.draw(text_name);
		window.draw(text_points);
		window.draw(text_level);


		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false)
				enemies[i].Draw(window);
		}

		player.Draw(window);


		for (int i = 0; i < bullets.size(); i++) {
			bullets[i].UpdateLaser();
			bullets[i].Draw(window);

			for (int j = 0; j < enemies.size(); j++)
			{

				if (bullets[i].laser.getGlobalBounds().intersects(enemies[j].getBody().getGlobalBounds())) {

					if (lf1 == true) {
						LifePoints--;
						if (LifePoints < 9) {
							enemies[j].dead = true;
							lf2 = true;
							lf1 = false;
							player_points = player_points + 200;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf2 == true) {
						LifePoints1--;
						if (LifePoints1 < 9) {
							enemies[j].dead = true;
							lf3 = true;
							lf2 = false;
							player_points = player_points + 200;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf3 == true) {
						LifePoints2--;
						if (LifePoints2 < 9) {
							enemies[j].dead = true;
							lf4 = true;
							lf3 = false;
							player_points = player_points + 200;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf4 == true) {
						LifePoints3--;
						if (LifePoints3 < 9) {
							enemies[j].dead = true;
							nextlevel = nextlevel - 1;
						}
					}

				}

			}
		}
		window.display();
	}
}

void levelTwo() {
	vector <Laser> bullets;
	vector<Enemy> enemies;

	int LifePoints = 400, LifePoints1 = 400, LifePoints2 = 400, LifePoints3 = 400;
	int nextlevel = 4;
	//PROTOTYPE
	level = 2;

	bool lf1 = true, lf2 = false, lf3 = false, lf4 = false;
	//Crea la ventana y el objeto
	sf::RenderWindow window(sf::VideoMode(1200, 900), "SPACE INVADER (SUPER ALPHA VERSION)", sf::Style::Close | sf::Style::Titlebar);

	sf::RectangleShape rectangle(sf::Vector2f(1200.0f, 900.0f));
	bool jugadorDisparo = false;
	sf::Texture texture;
	texture.loadFromFile("scene2.jpg"); // backgroung GALAXY--> photo.jpg backgorundRetorx.png
	rectangle.setTexture(&texture);

	//PROTOTYPE TESTING... /////////////////////////////////////////////////////////////////////
	sf::Font font;
	if (!font.loadFromFile("af.ttf"))
	{
		//ERROR
	}

	sf::Text text_name;
	text_name.setFont(font);
	text_name.setString("PLAYERNAME");
	text_name.setFillColor(sf::Color::Cyan);
	text_name.setPosition(960, 600);
	text_name.setCharacterSize(25);


	//////////////////////////////////////////////////////////////////////////////////////////////

	//THEME SONG GAME
	sf::SoundBuffer soundBuffer;
	sf::Sound sound;
	soundBuffer.loadFromFile("spaceinvader.ogg"); //theme song ->  "spaceinvader.ogg"
	sound.setBuffer(soundBuffer);

	//SOUND EFFECT LASER
	sf::SoundBuffer soundBuffer2;
	sf::Sound sound2;
	soundBuffer2.loadFromFile("laser.wav");
	sound2.setBuffer(soundBuffer2);

	//PLAYER SHIP
	sf::Texture playerTexture;
	//Imagen del Ship
	playerTexture.loadFromFile("ship.png");
	Player player(&playerTexture, 0.5f);
	float deltaTime = 1.0f;


	sf::Texture laserTexture;
	//Imagen del Laser
	laserTexture.loadFromFile("laser.png");

	//ENEMIES
	sf::Texture enemyTexture;
	enemyTexture.loadFromFile("ship2.png");

	sf::Texture enemyTexture1;
	enemyTexture1.loadFromFile("enemy.png");

	enemies.push_back(Enemy(&enemyTexture, -100, -10, 0.7f,80.0f,80.0f,2));
	enemies.push_back(Enemy(&enemyTexture, -300, -10, 0.7f, 80.0f, 80.0f,2));
	enemies.push_back(Enemy(&enemyTexture, -500, -10, 0.7f, 80.0f, 80.0f,2));
	enemies.push_back(Enemy(&enemyTexture, -700, -10, 0.7f, 80.0f, 80.0f,2));

	bool shoot = true;


	while (window.isOpen()) {
		sf::Event _event;
		while (window.pollEvent(_event))
		{
			switch (_event.type) {

			case sf::Event::Closed:
				window.close();
				break;

			case sf::Event::KeyPressed:
				if (_event.key.code == sf::Keyboard::U)
					sound.play();
				if (_event.key.code == sf::Keyboard::I)
					sound.pause();
				if (_event.key.code == sf::Keyboard::Escape)
					window.close();
				if (_event.key.code == sf::Keyboard::Space)
					sound2.play();
				break;
			}

		}


		float right = 0;

		//KEYBOARDS INPUTS
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Space)) {

			if (shoot == true) {
				bullets.push_back(Laser(&laserTexture, player.position.x + 400));
				shoot = false;
			}
		}
		else {
			shoot = true;
		}


		player.Update(deltaTime);

		int finally = 0;

		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false) {
				enemies[i].Update();
				finally = enemies[i].globalpos;
			}
		}


		if (nextlevel <= 0)
		{
			window.close();
			levelWin();
			Sleep(200);
			levelThree();
		}
		if (finally == 700)
		{
			scorex[pos] = player_points;
			levelx[pos] = level;
			pos = pos + 1;
			window.close();
			levelLose();
		}

		window.clear();
		window.draw(rectangle);

		//DISPLAY POINTS
		stringstream  points_ss;
		points_ss << player_points;
		sf::Text text_points;
		text_points.setFont(font);
		text_points.setFillColor(sf::Color::Cyan);
		text_points.setCharacterSize(40);
		text_points.setString(points_ss.str().c_str());
		text_points.setPosition(1010, 240);

		stringstream  level_ss;
		level_ss << level;
		sf::Text text_level;
		text_level.setFont(font);
		text_level.setFillColor(sf::Color::Cyan);
		text_level.setCharacterSize(40);
		text_level.setString(level_ss.str().c_str());
		text_level.setPosition(1015, 400);

		//DISPLAY TEXT AND NUMBERS
		window.draw(text_name);
		window.draw(text_points);
		window.draw(text_level);


		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false)
				enemies[i].Draw(window);
		}

		player.Draw(window);


		for (int i = 0; i < bullets.size(); i++) {
			bullets[i].UpdateLaser();
			bullets[i].Draw(window);

			for (int j = 0; j < enemies.size(); j++)
			{

				if (bullets[i].laser.getGlobalBounds().intersects(enemies[j].getBody().getGlobalBounds())) {

					if (lf1 == true) {
						LifePoints--;
						if (LifePoints < 9) {
							enemies[j].dead = true;
							lf2 = true;
							lf1 = false;
							player_points = player_points + 150;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf2 == true) {
						LifePoints1--;
						if (LifePoints1 < 9) {
							enemies[j].dead = true;
							lf3 = true;
							lf2 = false;
							player_points = player_points + 150;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf3 == true) {
						LifePoints2--;
						if (LifePoints2 < 9) {
							enemies[j].dead = true;
							lf4 = true;
							lf3 = false;
							player_points = player_points + 150;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf4 == true) {
						LifePoints3--;
						if (LifePoints3 < 9) {
							enemies[j].dead = true;
							nextlevel = nextlevel - 1;
						}
					}

				}

			}
		}
		window.display();
	}
}

void levelOne() {

	vector <Laser> bullets;
	vector<Enemy> enemies;

	

	int LifePoints = 200, LifePoints1 = 100, LifePoints2 = 200, LifePoints3 = 100;
	int nextlevel = 4;

	//PROTOTYPE
	

	bool lf1 = true, lf2 = false, lf3 = false, lf4 = false;
	//Crea la ventana y el objeto
	sf::RenderWindow window(sf::VideoMode(1200, 900), "SPACE INVADER (SUPER ALPHA VERSION)", sf::Style::Close | sf::Style::Titlebar);

	sf::RectangleShape rectangle(sf::Vector2f(1200.0f, 900.0f));
	bool jugadorDisparo = false;
	sf::Texture texture;
	texture.loadFromFile("scene1.jpeg"); // backgroung GALAXY--> photo.jpg backgorundRetorx.png
	rectangle.setTexture(&texture);

	//PROTOTYPE TESTING... /////////////////////////////////////////////////////////////////////
	sf::Font font;
	if (!font.loadFromFile("af.ttf"))
	{
		//ERROR
	}

	sf::Text text_name;
	text_name.setFont(font);
	text_name.setString("BATMAN");
	text_name.setFillColor(sf::Color::Cyan);
	text_name.setPosition(960, 600);
	text_name.setCharacterSize(25);



	//////////////////////////////////////////////////////////////////////////////////////////////

	//THEME SONG GAME
	sf::SoundBuffer soundBuffer;
	sf::Sound sound;
	soundBuffer.loadFromFile("spaceinvader.ogg"); //theme song ->  "spaceinvader.ogg"
	sound.setBuffer(soundBuffer);

	//SOUND EFFECT LASER
	sf::SoundBuffer soundBuffer2;
	sf::Sound sound2;
	soundBuffer2.loadFromFile("laser.wav");
	sound2.setBuffer(soundBuffer2);

	//PLAYER SHIP
	sf::Texture playerTexture;
	//Imagen del Ship
	playerTexture.loadFromFile("ship.png");
	Player player(&playerTexture, 0.5f);
	float deltaTime = 1.0f;


	sf::Texture laserTexture;
	//Imagen del Laser
	laserTexture.loadFromFile("laser.png");

	//ENEMIES
	sf::Texture enemyTexture;
	enemyTexture.loadFromFile("enemy3.png");

	sf::Texture enemyTexture1;
	enemyTexture1.loadFromFile("enemy.png");
	
	

	enemies.push_back(Enemy(&enemyTexture, -100, -10, 0.5f, 85.0f,100.0f,4));
	enemies.push_back(Enemy(&enemyTexture, -300, -10, 0.5f, 85.0f, 100.0f,4));
	enemies.push_back(Enemy(&enemyTexture, -500, -10, 0.5f, 85.0f, 100.0f,4));
	enemies.push_back(Enemy(&enemyTexture, -700, -10, 0.5f, 85.0f, 100.0f,4));

	bool shoot = true;

	sound.play();

	while (window.isOpen()) {
		sf::Event _event;
		while (window.pollEvent(_event))
		{
			switch (_event.type) {

			case sf::Event::Closed:
				window.close();
				break;

			case sf::Event::KeyPressed:
				if (_event.key.code == sf::Keyboard::U)
					sound.play();
				if (_event.key.code == sf::Keyboard::I)
					sound.pause();
				if (_event.key.code == sf::Keyboard::Escape)
					window.close();
				if (_event.key.code == sf::Keyboard::Space)
					sound2.play();
				break;
			}

		}


		float right = 0;

		//KEYBOARDS INPUTS
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Space)) {

			if (shoot == true) {
				bullets.push_back(Laser(&laserTexture, player.position.x + 400));
				shoot = false;
			}
		}
		else {
			shoot = true;
		}


		player.Update(deltaTime);

		int finally = 0;

		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false) {
				enemies[i].Update();
				finally = enemies[i].globalpos;
			}
		}

		

		//NEXT LEVEL .............................
		if (nextlevel <= 0)
		{
			window.close();
			levelWin();
			Sleep(200);
			levelTwo();
		}
		if (finally == 700) 
		{
			scorex[pos] = player_points;
			levelx[pos] = level;
			pos = pos + 1;
			window.close();
			levelLose();
		}



		window.clear();
		window.draw(rectangle);

		//DISPLAY POINTS
		stringstream  points_ss;
		points_ss << player_points;
		sf::Text text_points;
		text_points.setFont(font);
		text_points.setFillColor(sf::Color::Cyan);
		text_points.setCharacterSize(40);
		text_points.setString(points_ss.str().c_str());
		text_points.setPosition(1010, 240);

		stringstream  level_ss;
		level_ss << level;
		sf::Text text_level;
		text_level.setFont(font);
		text_level.setFillColor(sf::Color::Cyan);
		text_level.setCharacterSize(40);
		text_level.setString(level_ss.str().c_str());
		text_level.setPosition(1015, 400);


		//DISPLAY TEXT AND NUMBERS
		window.draw(text_name);
		window.draw(text_points);
		window.draw(text_level);


		for (int i = 0; i < enemies.size(); i++) {
			if (enemies[i].dead == false)
				enemies[i].Draw(window);
		}

		player.Draw(window);


		for (int i = 0; i < bullets.size(); i++) {
			bullets[i].UpdateLaser();
			bullets[i].Draw(window);

			for (int j = 0; j < enemies.size(); j++)
			{

				if (bullets[i].laser.getGlobalBounds().intersects(enemies[j].getBody().getGlobalBounds())) {

					if (lf1 == true) {
						LifePoints--;
						if (LifePoints < 9) {
							enemies[j].dead = true;
							lf2 = true;
							lf1 = false;
							player_points = player_points + 100;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf2 == true) {
						LifePoints1--;
						if (LifePoints1 < 9) {
							enemies[j].dead = true;
							lf3 = true;
							lf2 = false;
							player_points = player_points + 100;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf3 == true) {
						LifePoints2--;
						if (LifePoints2 < 9) {
							enemies[j].dead = true;
							lf4 = true;
							lf3 = false;
							player_points = player_points + 100;
							nextlevel = nextlevel - 1;
						}
					}
					if (lf4 == true) {
						LifePoints3--;
						if (LifePoints3 < 9) {
							player_points = player_points + 100;
							enemies[j].dead = true;
							nextlevel = nextlevel - 1;
						}
					}

				}

			}
		}
		window.display();
	}
}

void controlMenu()
{
	sf::RenderWindow windowMain(sf::VideoMode(1200, 900), "MAIN MENU SPACE INVADER", sf::Style::Close | sf::Style::Titlebar);
	sf::RectangleShape image(sf::Vector2f(1200.0f, 900.0f));
	sf::Texture texture;
	texture.loadFromFile("control.jpeg");
	image.setTexture(&texture);

	while (windowMain.isOpen())
	{
		sf::Event evnt;

		while (windowMain.pollEvent(evnt))
		{
			if (evnt.type == evnt.Closed)
				windowMain.close();
		}
		windowMain.draw(image);
		windowMain.display();
	}
}

void mainMenu()
{
	sf::RenderWindow windowMain(sf::VideoMode(1200, 900), "MAIN MENU SPACE INVADER", sf::Style::Close | sf::Style::Titlebar);
	sf::RectangleShape image(sf::Vector2f(1200.0f, 900.0f));

	//PROPOTYPE
	Menu menu(windowMain.getSize().x, windowMain.getSize().y);
	windowMain.setFramerateLimit(60);

	sf::Texture texture;
	texture.loadFromFile("mainMenu.jpg"); 
	image.setTexture(&texture);

	while (windowMain.isOpen())
	{
		sf::Event evnt;
		while (windowMain.pollEvent(evnt))
		{
			switch (evnt.key.code)
			{
			case sf::Keyboard::Up:
				menu.MoveUp();
				break;

			case sf::Keyboard::Down:
				menu.MoveDown();
				break;

			case sf::Keyboard::Escape:
				windowMain.close();
				break;

			case sf::Keyboard::Return:
				switch (menu.GetPressedItem())
				{
				case 0:
					cout << "PLAY" << endl;
					player_points = 0;
					level = 1;
					levelOne();
					break;
				case 1:
					cout << "CONTROLS" << endl;
					controlMenu();
					break;
				case 2:
					cout << "STATISTICS" << endl;
					menuStats();
					break;
				}

			}

			if (evnt.type == evnt.Closed)
				windowMain.close();
		}
		windowMain.draw(image);
		menu.draw(windowMain);
		
		windowMain.display();
	}

}


int main()
{


	mainMenu();

	return 0;
}

