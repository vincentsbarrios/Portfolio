#include "Enemy.h"
#include <iostream>


bool derecha = true;
bool izquierda = false;


Enemy::Enemy(sf::Texture* texture,float x ,float y,float speed,float tamx, float tamy,int bajar)
{
	this->speed = speed;
	down = bajar;
	//setCaracteristicas del Objeto Enemy

	body.setSize(sf::Vector2f(tamx, tamy));
	body.setOrigin(x,y);
	body.setTexture(texture);
	cont=0;

	
}

Enemy::~Enemy()
{
}

//Llama la funcion Draw de la clase Enemy.h

void Enemy::Draw(sf::RenderWindow & windows)
{
	windows.draw(body);
}

//WORKING.......
//Actualiza el Movimiento del Objeto Enemy
void Enemy::Update()
{
	
	sf::Vector2f movement(0.0f, 0.0f);
	sf::Vector2f position = body.getPosition();
	globalpos = body.getPosition().y;


	if (position.x < 76 && derecha == true) {
		movement.x += speed;
	}
	if (position.x >= 76) {
		derecha = false;
		izquierda = true;
		cont++;
	}
	if (position.x <= -76) {
		derecha = true;
		izquierda = false;
	}
	if (position.x > -76 && izquierda == true) {
		movement.x -= speed;

	}
	if (cont == down) {
		movement.y += 50;
		cont = 0;
	}

	if (globalpos == 700)
	{
		std::cout << "YOU LOSE!!!" << std::endl;
	}

	body.move(movement);

}

sf::RectangleShape Enemy::getBody()
{
	return body;
}
