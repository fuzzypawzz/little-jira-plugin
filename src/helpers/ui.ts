export const getLozengeStyle = (colorName?: string): string => {
  const dict: { [index: string]: string } = {
    yellow: 'aui-lozenge-inprogress',
    green: 'aui-lozenge-success',
  }

  return colorName ? dict[colorName] : ''
}
