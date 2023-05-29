function moveObjects() {
    const objects = Array.from(document.getElementsByClassName("object"));
    objects.forEach(object => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 50));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 50));
        object.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

window.addEventListener('load', () => {
    moveObjects(); // Call moveObjects immediately after the page is loaded
    setInterval(moveObjects, 5000); // Moves objects every 5 seconds
});