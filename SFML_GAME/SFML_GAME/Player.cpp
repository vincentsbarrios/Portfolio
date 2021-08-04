#include "Player.h"
#include "Laser.h"
#include <iostream>
using namespace std;

sf::Vector2f posLaser;

Player::Player(sf::Texture* texture, float speed)
{
	this->speed = 0.7;

	//setCaracteristicas del Objeto Player

	body.setSize(sf::Vector2f(100.0f, 100.0f));
	body.setOrigin(-400, -780);
	body.setTexture(texture);

}


Player::~Player()
{
}

//Actualiza el Movimiento del Objeto Player

void Player::Update(float deltaTime)
{
	sf::Vector2f movement(0.0f, 0.0f);
	position = body.getPosition();
	posLaser = position;
	
	if (position.x <= 380) {
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
			movement.x += speed * deltaTime;
	}
	if (position.x >= -380) {
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
			movement.x -= speed * deltaTime;
	}

	/*std::cout << position.x << std::endl;*/

	body.move(movement);
}

//Dibuja el Objeto Player

void Player::Draw(sf::RenderWindow& windows)
{
	windows.draw(body);
}






