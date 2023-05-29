let button = document.getElementById('start');

window.addEventListener('click', button => {
    const quantity = Math.floor(Math.random() * 10) + 10;
    const container = document.getElementById('container');
    const objects = []; // Массив для хранения всех созданных объектов

    for (let i = 0; i < quantity; i++) {
        const figureTypes = ['rock', 'paper', 'scissors'];
        const figure = document.createElement('div');
        figure.classList.add('object');
        figure.classList.add(figureTypes[Math.floor(Math.random() * figureTypes.length)]);

        figure.style.left = Math.floor(Math.random() * 450) + 'px';
        figure.style.top = Math.floor(Math.random() * 450) + 'px';

        container.appendChild(figure);
        objects.push(figure);

        // Задаем случайные начальные скорости по осям X и Y
        let speedX = (Math.random() - 0.5) * 4; // От -2 до 2
        let speedY = (Math.random() - 0.5) * 4; // От -2 до 2

        // Запускаем анимацию элемента
        animateElement(figure, speedX, speedY);
    }

    // Функция для анимации движения элемента
    function animateElement(element, speedX, speedY) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const maxX = containerRect.width - elementRect.width;
        const maxY = containerRect.height - elementRect.height;

        let posX = parseInt(element.style.left);
        let posY = parseInt(element.style.top);

        function moveElement() {
            posX += speedX;
            posY += speedY;

            // Проверяем границы контейнера и меняем направление, если достигнута граница
            if (posX <= 0 || posX >= maxX) {
                speedX *= -1;
            }
            if (posY <= 0 || posY >= maxY) {
                speedY *= -1;
            }

            // Проверяем столкновения с другими объектами
            for (const obj of objects) {
                if (obj !== element) {
                    const objRect = obj.getBoundingClientRect();

                    if (posX < objRect.right && posX + elementRect.width > objRect.left &&
                        posY < objRect.bottom && posY + elementRect.height > objRect.top) {
                        // Если есть столкновение, меняем классы объектов
                        const currentClass = element.classList[1];
                        const otherClass = obj.classList[1];

                        if (currentClass == 'paper' && otherClass == 'rock') {
                            obj.classList.remove(otherClass);
                            obj.classList.add(currentClass);
                            let audio = new Audio('sounds/paper.mp3');
                            audio.play();
                        }
                        else if (currentClass == 'scissors' && otherClass == 'rock') {
                            element.classList.remove(currentClass);
                            element.classList.add(otherClass);
                            let audio = new Audio('sounds/rock.mp3');
                            audio.play();
                        }
                        else if (currentClass == 'scissors' && otherClass == 'paper') {
                            obj.classList.remove(otherClass);
                            obj.classList.add(currentClass);
                            let audio = new Audio('sounds/scissors.mp3');
                            audio.play();
                        }

                    }
                }
            }

            element.style.left = posX + 'px';
            element.style.top = posY + 'px';

            requestAnimationFrame(moveElement);
        }

        moveElement();
    }
});