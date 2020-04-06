(function() {
    class Keyboard {
        constructor() {
            this.keyCodes = [["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"], ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "IntlBackslash", "Delete"], ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"], ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"], ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]];

            this.engKeys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Del'], ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];
            this.engKeysUp = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspase'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'], ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.rusKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspase'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'], ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.rusKeysUp = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspase'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'], ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'ь', 'б', 'ю', '.', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.specKey = ['Tab', 'Backspace', 'Capslock', 'Shift', 'Enter', 'Control', 'Alt', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];


        }
        init() {
            this.renderBody();
            this.initEventListeners();
        }
        initEventListeners() {
            document.addEventListener('keydown', (e) => {
                let area = document.querySelector('#area');
                //e.preventDefault();
                area.focus();
               // console.log(e);
                if(e.code === 'Tab') {
                    e.preventDefault();
                    area.value += '   ';
                    document.querySelectorAll('.key')[14].classList.add('key--press');
                }
                console.log(e);
                document.querySelectorAll('.key').forEach(key => {
                    if (key.innerText === e.key) {
                        key.classList.add('key--press');
                    }
                });
                /* if(!(document.activeElement == area)) { 
                    area.value += e.key;                
                } */
               // this.highlightButton(e);
            });

            document.addEventListener('keyup', (e) => {
                document.querySelectorAll('.key').forEach(key => {
                    if (key.innerText === e.key) {
                        key.classList.remove('key--press');
                    }
                });
            });
        }
    
        renderBody() {
            this.renderArea();
            this.renderKeyboard();
        }

        renderArea() {
            const container = document.createElement('div');
            container.classList.add('container');
            document.querySelector('body').appendChild(container);
            const area = document.createElement('textarea');
            area.setAttribute('id', 'area');
            area.setAttribute('name', 'area');
            container.appendChild(area);
        }

        renderKeyboard() {
            const keyboard = document.createElement('div');
            keyboard.classList.add('keyboard');

                this.engKeys.forEach((row, i)=> {
                    let fragmentRow = '<div class="row">';
                        row.forEach((key, j)=> {
                            let fragmentKey = '';
                            fragmentKey += this.renderKeyboardKey(key, this.keyCodes[i][j]);
                            fragmentRow += fragmentKey;
                        });
                        fragmentRow += '</div>';
                        keyboard.insertAdjacentHTML('beforeend', fragmentRow);
                });
            document.querySelector('.container').appendChild(keyboard);
            this.addExtraKeyClasses();
       }

       renderKeyboardKey(key, data) {
            return `<span class="key" data="${data}">${key}</span>`;
        }
        addExtraKeyClasses() {
            document.querySelectorAll('.key').forEach((key,i,arr) => {
                if (key.innerText === 'Backspace' || key.innerText === 'Enter' || key.innerText === '') key.classList.add('key--wide');
                if((key.innerText === 'Shift' && arr[i - 1].innerText === 'Enter') || key.innerText === 'Enter') key.classList.add('key--shift');
            });
        }
       
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        new Keyboard().init();
    });
}) ();
