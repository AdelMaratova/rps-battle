function moveObjects() {
    const objects = Array.from(document.getElementsByClassName("object"));
    objects.forEach(object => {

        const randomX = Math.floor(Math.random() * (window.innerWidth - 50));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 50));

        object.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

window.addEventListener('load', () => {
    const quantity = Math.floor(Math.random() * 10) + 10;
    const container = document.getElementById('container');

    for (let i = 0; i < quantity; i++) {
        const figureTypes = ['rock', 'paper', 'scissors'];
        const figure = document.createElement('div');
        figure.classList.add('object');
        figure.classList.add(figureTypes[Math.floor(Math.random() * figureTypes.length)]);

        figure.style.left = Math.floor(Math.random() * 450)+'px';
        figure.style.top = Math.floor(Math.random() * 450)+'px';

        container.appendChild(figure);
    }

    moveObjects(); // Call moveObjects immediately after the page is loaded
    setInterval(moveObjects, 5000); // Moves objects every 5 seconds
});