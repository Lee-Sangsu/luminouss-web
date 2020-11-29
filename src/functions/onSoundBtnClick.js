const onSoundBtnClick = (event) => {
    const firstAudio = new Audio(require('voice/firstvoice.m4a').default);

    // event.preventDefault();
    if (event.target.id === 'first-sound-btn') {
        document.getElementById('first-h4').style.opacity = 0;
        document.getElementById('second-test-box').style.display = 'inline-flex';
        document.getElementById('second-sound-btn').style.display = 'inline-flex';
        document.getElementById('second-h4').style.display = 'inline-flex';
        firstAudio.play();
    } else if (event.target.id === 'second-sound-btn') {
        document.getElementById('second-h4').style.opacity = 0;
        document.getElementById('third-test-box').style.display = 'inline-flex';
        document.getElementById('third-sound-btn').style.display = 'inline-flex';
        document.getElementById('third-h4').style.display = 'inline-flex';
        setTimeout(() => document.getElementById('down-arrow').style.display = 'block', 2000)
    } 
};

export default onSoundBtnClick;