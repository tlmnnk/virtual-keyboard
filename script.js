(function() {
    class Keyboard {
        constructor() {
            this.area = null;
            this.keyCodes = [["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"], ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "IntlBackslash", "Delete"], ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"], ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"], ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]];

            this.engKeys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Del'], ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];
            this.engKeysUp = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspase'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'], ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.rusKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspase'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'], ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.rusKeysUp = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspase'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'], ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'ь', 'б', 'ю', '.', 'Shift', '↑', 'lang'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→']];

            this.specKey = ['Tab', 'Backspace', 'Capslock', 'Shift', 'Enter', 'Control', 'Alt', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];

            this.isCapsLock = new KeyboardEvent('a').getModifierState('CapsLock');

        }
        init() {
            this.renderBody();
            this.initEventListeners();
        }
        initEventListeners() {
            document.addEventListener('keydown', (e) => {
                console.log(e);
                area.focus();
                console.log(/[а-я]/i.test(this.area.value));
                if(e.code === 'Tab') {
                    e.preventDefault();
                    this.area.value += '   ';
                }
                if(e.key === 'Alt' || e.code === 'Meta') {
                    e.preventDefault();              
                }
                //console.log(e.getModifierState('CapsLock'));
                this.addButtonHighlight(e);
            });

            document.addEventListener('keyup', (e) => {
                this.removeButtonHighlight(e);
                console.log(e);
            });

            document.querySelector('.keyboard').addEventListener('mousedown', (e) => {
                
                if (e.target.classList.contains('key') ) {
                    if (!e.target.classList.contains('key--special')) {
                        this.area.value += e.target.innerHTML;
                    }

                    console.log();

                    this.backspaceClickHandler(e);
                    this.deleteClickHandler(e);
                    this.enterClickHandler(e);
                    this.tabClickHandler(e);
                    this.arrowClickHandler(e);
                    e.target.classList.add('key--press');                   
                }
            });
            document.querySelector('.keyboard').addEventListener('mouseup', (e) => {
                
                e.target.classList.remove('key--press');
                document.querySelector('#area').focus();
            });
        }

        tabClickHandler(e) {
            if (e.target.getAttribute('data') === 'Tab') {
                this.area.setRangeText('    ', this.area.selectionStart, this.area.selectionEnd, 'end');
            }
        }

        backspaceClickHandler(e) {
            console.log(e.target.getAttribute('data') === 'Backspace');
            if (e.target.getAttribute('data') === 'Backspace') {
                if (this.area.value.length === 0) {
                    return;
                  }
                  this.area.setRangeText('', this.area.selectionStart, this.area.selectionEnd, 'end');
                  if (this.area.selectionStart === this.area.selectionEnd) {
                    this.area.setRangeText('', this.area.selectionStart - 1, this.area.selectionEnd, 'end');
                  }
            }
        }

        deleteClickHandler(e) {
            if (e.target.getAttribute('data') === 'Delete') {
                if (this.area.selectionStart === this.area.selectionEnd) {
                    this.area.setRangeText('', this.area.selectionStart, this.area.selectionEnd + 1, 'end');
                } else if (this.area.selectionStart !== this.area.selectionEnd) {
                    this.area.setRangeText('', inputthis.areaKeyboard.selectionStart, this.area.selectionEnd, 'end');
                }
            }
        }

        enterClickHandler(e) {
            if (e.target.getAttribute('data') === 'Enter')
            this.area.setRangeText('\n', this.area.selectionStart, this.area.selectionEnd, 'end');
        }

        arrowClickHandler(e) {
            const keyData = e.target.getAttribute('data');
            this.cursorPosition = this.area.selectionStart;
            if (keyData.includes('Arrow')) {
            switch (keyData) {
                case 'ArrowLeft':
                    this.area.selectionStart = this.cursorPosition - 1;
                    this.area.selectionEnd = this.area.selectionStart;
                    break;
                case 'ArrowRight':
                    this.area.selectionStart = this.cursorPosition + 1;
                    this.area.selectionEnd = this.area.selectionStart;
                    break;
                case 'ArrowUp':
                    let selectionInRow = this.area.selectionStart;
                    const rowsArea = this.area.value.split('\n');
                    if (this.area.selectionStart > rowsArea[0].length) {
                      let i = 0;
                      while (selectionInRow > rowsArea[i].length) {
                        selectionInRow -= (rowsArea[i].length + 1);
                        i += 1;
                      }
                      let newPosition = 0;
                      let j = 0;
                      while (j < i - 1) {
                        newPosition += rowsArea[j].length + 1;
                        j += 1;
                      }
                      const rowLength = (rowsArea[j].length > selectionInRow) ? selectionInRow : rowsArea[j].length;
                      newPosition += rowLength;
                      this.area.selectionStart = newPosition;
                      this.area.selectionEnd = this.area.selectionStart;
                    }
                    break;
                case 'ArrowDown':
                    let positionInRow = this.area.selectionStart;
                    const rows = this.area.value.split('\n');
                    let i = 0;
                    while (positionInRow > rows[i].length) {
                      positionInRow -= (rows[i].length + 1);
                      i += 1;
                    }
                    if (i < rows.length - 1) {
                      let newPosition = 0;
                      let j = 0;
                      while (j < i + 1) {
                        newPosition += rows[j].length + 1;
                        j += 1;
                      }
                      const rowLength = (rows[j].length > positionInRow) ? positionInRow : rows[j].length;
                      newPosition += rowLength;
                      this.area.selectionStart = newPosition;
                      this.area.selectionEnd = this.area.selectionStart;
                    }
                    break;
                default:
                    break;
                }
            }  
        }

        addButtonHighlight(e) {
            document.querySelectorAll('.key').forEach(key => {
                if (key.getAttribute('data') === e.code) {
                    key.classList.add('key--press');
                }
            });
        }

        removeButtonHighlight(e) {
            document.querySelectorAll('.key').forEach(key => {
                if (key.getAttribute('data') === e.code) {
                    key.classList.remove('key--press');
                }
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
            this.area = document.createElement('textarea');
            this.area.setAttribute('id', 'area');
            this.area.setAttribute('name', 'area');
            container.appendChild(this.area);
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
                if (key.innerText === 'Backspace' || key.innerText === 'Tab' || key.innerText === 'Del' || key.innerText === 'Enter' || key.innerText === 'Shift' || key.innerText === 'Ctrl' || key.innerText === 'Win' || key.innerText === 'Alt' || key.innerText === 'Caps Lock' || key.getAttribute('data').includes('Arrow')) {
                    key.classList.add('key--special');
                }
            });
        }
       
    }
    
    document.addEventListener('DOMContentLoaded', (e) => {
        new Keyboard().init();
    });
}) ();
