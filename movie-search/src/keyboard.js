const charsLatin = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ']', '[', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Lang', ' ', '←', '↓', '→'];
const charsCyrillic = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Lang', ' ', '←', '↓', '→'];
const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const input = document.querySelector('.search-input');
const keyboardWindow = document.querySelector('.keyboard-window');
const keysContainer = [];
let key;

function toggleCapsLock() {
  this.caps = !this.caps;
  document.querySelectorAll('button').forEach((item) => {
    if (item.textContent.length === 1) {
      item.textContent = this.caps ? item.textContent.toUpperCase()
        : item.textContent.toLowerCase();
    }
  });
}

function toggleLang() {
  this.language = !this.language;
  keysContainer.forEach((item, idx) => {
    item.textContent = this.language ? charsLatin[idx] : charsCyrillic[idx];
  });
}

// key handlers
function handleSymbols() {
  key.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.textContent.length === 1
      && ['→', '↓', '←', '↑'].indexOf(event.target.textContent) === -1) {
      input.setRangeText(`${event.target.textContent}`, input.selectionStart, input.selectionEnd, 'end');
    }
  });
}

function handleBackspace(item) {
  if (item === 'Backspace') {
    key.classList.add('keyboard__key-wide');
    key.addEventListener('mousedown', () => {
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        input.focus();
      } else {
        input.value = input.value.substring(0, startPos - 1)
          + input.value.substring(endPos, input.value.length);
        input.selectionStart = startPos - 1;
        input.selectionEnd = endPos - 1;
        input.focus();
      }
    });
  }
}

function handleDelete(item) {
  if (item === 'Del') {
    key.addEventListener('mousedown', () => {
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      input.value = input.value.substring(0, startPos)
        + input.value.substring(endPos + 1, input.value.length);
      input.selectionStart = startPos;
      input.selectionEnd = endPos;
      input.focus();
    });
  }
}

function createKeys() {
  charsCyrillic.forEach((item, idx) => {
    key = document.createElement('button');
    key.setAttribute('type', 'button');
    key.setAttribute('id', `${keyCodes[idx]}`);
    key.classList.add('key');
    key.textContent = item;
    handleSymbols();
    handleBackspace(item);
    handleDelete(item);
    switch (item) {
      case ' ':
        key.classList.add('keyboard__key-widest');
        key.addEventListener('mousedown', () => {
          input.value += ' ';
        });
        break;
      case 'Enter':
        key.classList.add('keyboard__key-wide');
        break;
      case 'CapsLock':
        key.classList.add('keyboard__key-wide');
        key.addEventListener('mousedown', toggleCapsLock);
        break;
      case '←':
        key.addEventListener('mousedown', () => {
          input.selectionStart -= 1;
          input.selectionEnd -= 1;
        });
        break;
      case '→':
        key.addEventListener('mousedown', () => {
          input.selectionStart += 1;
          input.selectionEnd += 1;
        });
        break;
      case 'Lang':
        key.classList.add('keyboard__key-wide');
        key.addEventListener('mousedown', toggleLang);
        break;
      default:
    }
    keysContainer.push(key);
  });
  return keysContainer;
}

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  const container = document.createElement('div');
  container.classList.add('container');
  keyboard.append(container);
  createKeys().forEach((item) => {
    container.append(item);
    if (item.id === 'Backspace' || item.id === 'Delete' || item.id === 'Enter' || item.id === '↑') {
      const br = document.createElement('br');
      container.append(br);
    }
  });
  keyboardWindow.innerHTML = 'Change language: Lang virtual key<br>';
  keyboardWindow.insertAdjacentHTML('afterbegin', '<div class="keyboard-window--close">×</div>');
  keyboardWindow.append(keyboard);

  document.querySelector('.keyboard-window--close').addEventListener('click', () => {
    keyboardWindow.classList.add('hidden');
  });
}

document.querySelector('.search-keyboard').addEventListener('click', () => {
  keyboardWindow.classList.remove('hidden');
});

input.addEventListener('blur', () => input.focus());

export default createKeyboard;
