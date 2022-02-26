type Content = {
  fetch?: () => any
}

export default () => {
  // eslint-disable-next-line
  const browserSpecificFetch = (content as Content).fetch ?? fetch;

  console.log(browserSpecificFetch)
}