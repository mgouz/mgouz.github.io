export function getTheme(): 'dark' | '' {
  if (typeof window !== 'undefined') {
    let theme = localStorage.getItem('theme')
    if (theme !== null ) {
      return theme as 'dark' | '';
    }

    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
    localStorage.setItem('theme', theme)
    return theme as 'dark' | '';
  }
  return ''
}
