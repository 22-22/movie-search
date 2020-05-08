const charsLatin = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ']', '[', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter', 'Shift',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const charsCyrillic = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const shiftLatin = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
  'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\'', 'Enter', 'Shift',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const shiftCyrillic = ['Ё', '!', '\'', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
  'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift',
  'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const input = document.querySelector('.search-input');
const keyboardWindow = document.querySelector('.keyboard-window');
const keysContainer = [];
let key;

class Helper {
  constructor() {
    this.isAlt = false;
    this.isControl = false;
  }

  toggleCapsLock() {
    this.caps = !this.caps;
    document.querySelectorAll('button').forEach((item) => {
      if (item.textContent.length === 1) {
        item.textContent = this.caps ? item.textContent.toUpperCase()
          : item.textContent.toLowerCase();
      }
    });
  }

  changeLang() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsCyrillic[idx];
      });
      this.isEnglish = false;
      localStorage.setItem('isEnglish', false);
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsLatin[idx];
      });
      this.isEnglish = true;
      localStorage.setItem('isEnglish', true);
    }
  }

  onShiftPressed() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = shiftLatin[idx];
      });
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = shiftCyrillic[idx];
      });
    }
  }

  onShiftReleased() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsLatin[idx];
      });
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsCyrillic[idx];
      });
    }
  }
}

const helper = new Helper();

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
  let lang;
  if (localStorage.getItem('isEnglish') === true || typeof localStorage.getItem('isEnglish') === 'undefined') {
    lang = charsLatin;
  } else {
    lang = charsCyrillic;
  }
  lang.forEach((item, idx) => {
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
      case 'Tab':
        key.addEventListener('mousedown', () => {
          input.value += '    ';
        });
        break;
      case 'Shift':
        key.classList.add('keyboard__key-wide');
        key.addEventListener('mousedown', helper.onShiftPressed);
        key.addEventListener('mouseup', helper.onShiftReleased);
        break;
      case 'CapsLock':
        key.classList.add('keyboard__key-wide');
        key.addEventListener('mousedown', helper.toggleCapsLock);
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
    if (item.id === 'Backspace' || item.id === 'Delete' || item.id === 'Enter' || item.id === 'ShiftRight') {
      const br = document.createElement('br');
      container.append(br);
    }
  });
  keyboardWindow.innerHTML = 'Change language: Ctrl + Alt<br>';
  keyboardWindow.insertAdjacentHTML('afterbegin', '<div class="keyboard-window--close">×</div>');
  keyboardWindow.append(keyboard);

  document.querySelector('.keyboard-window--close').addEventListener('click', () => {
    keyboardWindow.classList.add('hidden');
  });
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Alt':
      helper.isAlt = true;
      event.preventDefault();
      break;
    case 'Control':
      helper.isControl = true;
      break;
    default:
  }
  if (helper.isControl === true && helper.isAlt === true) {
    helper.changeLang();
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'Control':
      helper.isControl = false;
      break;
    case 'Alt':
      helper.isAlt = false;
      break;
    default:
  }
});

document.querySelector('.search-keyboard').addEventListener('click', () => {
  keyboardWindow.classList.remove('hidden');
});

input.addEventListener('blur', () => input.focus());

export default createKeyboard;
