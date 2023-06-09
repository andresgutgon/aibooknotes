type Font = {
  src: string
  weight: 400 | 500 | 600 | 700
}
export default function loadFont() {
  const regular = chrome.runtime.getURL('assets/fonts/Inter/regular.otf')
  const medium = chrome.runtime.getURL('assets/fonts/Inter/medium.otf')
  const bold = chrome.runtime.getURL('assets/fonts/Inter/bold.otf')
  const black = chrome.runtime.getURL('assets/fonts/Inter/black.otf')

  const stylesheet = document.createElement('style')

  const fonts: Font[] = [
    { src: regular, weight: 400 },
    { src: medium, weight: 500 },
    { src: bold, weight: 600 },
    { src: black, weight: 700 },
  ]
  const fontStyles = fonts.map((font: Font) => `
    @font-face {
      font-family: 'Inter_Chrome_Extension';
      src: url(${font.src});
      font-weight: ${font.weight};
    }
  `).join('\n')

  const content = `
    ${fontStyles}

    .__IABookNotes_Inter {
      --font-sans: 'Inter_Chrome_Extension'
    }

  `
  stylesheet.textContent = content

  document.head.appendChild(stylesheet)
}
