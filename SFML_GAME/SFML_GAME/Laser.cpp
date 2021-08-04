#include "Laser.h"
#include <iostream>

Laser::Laser(sf::Texture* texture, int x)

//setCaracteristicas del Objeto Laser
{
	laser.setSize(sf::Vector2f(100.f, 100.f));
	laser.setPosition(x,700);
	laser.setTexture(texture);
	position = laser.getPosition();
}


//Actualiza el Movimiento del Objeto Laser
void Laser::UpdateLaser( )
{
	sf::Vector2f movement(0.0f, 0.0f);

	if (laserm == true) {
		movement.y -= 2.f;
	}
	if (position.y <= -700) {
		laserm = false;
	}

	laser.move(movement);
}

//Dibuja el Objeto Laser

void Laser::Draw(sf::RenderWindow & windows)
{
	windows.draw(laser);
}


Laser::~Laser()
{
	//std::cout << "Laser destroyed" << std::endl;
}