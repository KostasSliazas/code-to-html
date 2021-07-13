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

  const mapObj = {
    text: function (e) {
      return `<i class="code__i--sc">${e}</i>`
    },
    simbols: function (e) {
      const symbol = e === '<' ? '&lt;' : e === '>' ? '&gt;' : e === '=' ? '&equals;' : '&lt;&sol;'
      return `<i class="code__i--re">${symbol}</i>`
    },
    tags: function (e) {
      return `<i class="code__i--ta">${e}</i>`
    }
  }
  const matchSimbols = /(?:[</]{2,2}|<|>|=)/g
  const matchTexts = /\b(?<=\s)src|href|content|defer|rel|src\b/g
  const matchTag = /\b(?<=[</])(DOCTYPE|a|abbr|acronym|address|applet|area|article|aside|audio|base|basefont|bdo|bgsound|blink|blockquote|body|br|button|canvas|caption|center|col|colgroup|command|comment|datalist|dd|del|details|dir|div|dl|dt|embed|fieldset|figure|b|big|i|small|tt|font|footer|form|frame|frameset|head|header|hgroup|h6|hr|html|isindex|iframe|ilayer|img|input|ins|keygen|keygen|label|layer|legend|li|link|map|mark|marquee|menu|meta|meter|multicol|nav|nobr|embed|noframes|noscript|object|ol|optgroup|option|output|p|param|cite|code|dfn|em|kbd|samp|strong|var|plaintext|pre|progress|q|rp|script|section|select|spacer|span|s|strike|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|u|ul|video|wbr|nobr|xmp)\b/g

  function convertStrings () {
    example.innerHTML = ''
    const text = getValue(textInput)
    if (text) {
      const splitedText = text.split('\n')
      const fragment = document.createDocumentFragment()
      splitedText.filter(function (e) {
        return e.length > 0
      }).forEach(e => {
        // create p tag elment
        const pTag = wraper('', 'p', 'code__p')
        // loop every line
        // console.log(e)

        // const str = e.replace(matchSimbols, matched => {
        //   return mapObj.simbols(matched)
        // })
        const str = e.split(' ').map(e => {
          let tagd
          const machhed1 = e.match(matchTexts)
          const matched2 = e.match(matchTag)
          // const matched3 = e.match(matchSimbols)
          e = e.replace(matchSimbols, matched => {
            return mapObj.simbols(matched)
          })
          if (machhed1) {
            tagd = e.replace(machhed1, matched => {
              return mapObj.text(matched)
            })
          } else if (matched2) {
            tagd = e.replace(matched2, matched => {
              return mapObj.tags(matched)
            })
          } else tagd = e
          return tagd
        })
        // const str1 = str.replace(matchTag, matched => {
        //   return mapObj.tags(matched)
        // })
        // const str2 = str1.replace(matchTexts, matched => {
        //   return mapObj.text(matched)
        // })
        pTag.innerHTML = str.join(' ')
        fragment.appendChild(pTag)
      })
      example.appendChild(fragment)
      textOutput.value = example.innerHTML
    } else {
      textOutput.value = 'no input'
    }
  }

  textInput.addEventListener('input', convertStrings)

  convertButton.addEventListener('click', convertStrings)
})()
