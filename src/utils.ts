export function htmlToElement(html: string) {
  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstChild;
}

export type TPosition = {
  x: number;
  y: number
}

export type TDirection = 'right' | 'left' | 'down'
