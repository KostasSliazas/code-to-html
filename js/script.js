(function () {
  const textInput = document.getElementById('text-input')
  const textOutput = document.getElementById('text-output')
  const example = document.getElementsByClassName('code')[0]
  const convertButton = document.getElementById('convert')

  const getValue = function (element) {
    if (!element.value) return false
    return element.value.trim()
  }

  const wraper = function (text, tagName, className) {
    const elem = document.createElement(tagName)
    if (className) elem.className = className
    if (text) elem.innerText = text
    return elem
  }

  // function classNames (string) {
  //   // let classname = ''
  //   switch (string) {
  //     case 'rel':
  //     case 'href':
  //     case 'src':
  //     case 'const':
  //     case 'let':
  //     case 'function':
  //     case 'abstract':
  //     case 'arguments':
  //     case 'await':
  //     case 'boolean':
  //     case 'break':
  //     case 'byte':
  //     case 'catch':
  //     case 'class':
  //     case 'char':
  //     case 'continue':
  //     case 'debugger':
  //     case 'default':
  //     case 'delete':
  //     case 'do':
  //     case 'double':
  //     case 'else':
  //     case 'enum':
  //     case 'eval':
  //     case 'export':
  //     case 'extends':
  //     case 'false' :
  //     case 'final' :
  //     case 'finally' :
  //     case 'float' :
  //     case 'for' :
  //     case 'goto' :
  //     case 'if':
  //     case 'implements':
  //     case 'import' :
  //     case 'in' :
  //     case 'instanceof':
  //     case 'int' :
  //     case 'interface' :
  //     case 'long' :
  //     case 'native' :
  //     case 'new':
  //     case 'null' :
  //     case 'package' :
  //     case 'private' :
  //     case 'protected' :
  //     case 'public' :
  //     case 'return' :
  //     case 'short' :
  //     case 'static' :
  //     case 'super' :
  //     case 'switch' :
  //     case 'synchronized':
  //     case 'this':
  //     case 'throw' :
  //     case 'throws' :
  //     case 'transient':
  //     case 'true':
  //     case 'try' :
  //     case 'typeof' :
  //     case 'var' :
  //     case 'void':
  //     case 'volatile' :
  //     case 'while' :
  //     case 'with' :
  //     case 'yield' :
  //       return 'js'
  //     case 'link':
  //     case '/script':
  //     case 'script':
  //       return 'crr'
  //     default:
  //       return 'el'
  //   }
  // }

  function convertStrings () {
    example.innerHTML = ''
    const text = getValue(textInput)
    if (text) {
      const splitedText = text.split('\n')
      const fragment = document.createDocumentFragment()
      const comment = /(\/\/.*)/g
      splitedText.filter(function (e) {
        return e.length > 0
      }).forEach(e => {
        const mached = e.match(comment)
        const pTag = wraper('', 'p', 'code__p')
        const splitedWord = e.split('')
        const arr = splitedWord.map(e => {
          if (e === '>') return e.replace('>', `<i class="code__i--el">${e}</i>`)
          if (e === '<') return e.replace('<', `<i class="code__i--el">${e}</i>`)
          if (e === '=') return e.replace('=', `<i class="code__i--el">${e}</i>`)
          if (e === ',') return e.replace(',', `<i class="code__i--el">${e}</i>`)
          if (e === ':') return e.replace(':', `<i class="code__i--el">${e}</i>`)
          if (e === ';') return e.replace(';', `<i class="code__i--el">${e}</i>`)
          return e
        }).join('')
          .replaceAll('href', '<i class="code__i--re"> href</i>')
          .replaceAll('rel', '<i class="code__i--re"> rel</i>')
          .replaceAll('src', '<i class="code__i--re"> src</i>')
          .replaceAll('link', '<i class="code__i--sc">link</i>')
          .replaceAll('"stylesheet"', '<i class="code__i--st">"stylesheet"</i>')
          .replaceAll('script', '<i class="code__i--sc">script</i>')
          .replaceAll(' defer ', '<i class="code__i--re"> defer </i>')
          .replaceAll(comment, `<i class="code__i--co">${mached}</i>`)
          .trim()
        pTag.innerHTML = arr

        fragment.appendChild(pTag)
      })

      example.appendChild(fragment)
      textOutput.value = example.outerHTML
    } else {
      window.alert('emty input')
    }
  }

  textInput.addEventListener('input', convertStrings)

  convertButton.addEventListener('click', convertStrings)
})()
