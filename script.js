(function() {
    class Keyboard {
        constructor() {
        }
        init() {
            this.renderBody();
            this.initEventListeners();
        }
        initEventListeners() {
            document.addEventListener('keydown', (e) => {
                let area = document.querySelector('#area');
                area.focus();
                if(!(document.activeElement == area)) { 
                    area.value += e.key;                
                }
                console.log(e.keyCode);
                this.highlightButton(e);
            });
        }
    
        renderBody() {
            this.renderArea();
            this.renderKeyboard();
        }
        renderArea() {
            const area = document.createElement('textarea');
            area.setAttribute('id', 'area');
            area.setAttribute('name', 'area');
            document.querySelector('.container').appendChild(area);
        }
        renderKeyboard() {}

        highlightButton(e) {
            const pressed = document.querySelectorAll('.key').find(item => item.innerText.charCodeAt() === e.keyCode);
            pressed.classList.add('key--press');
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        new Keyboard().init();
    });
}) ();
