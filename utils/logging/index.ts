const log = {
  info: (...args: any[]) => {
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      // do nothing for browser
      return
    }
    if (process.env.NODE_ENV?.toLocaleLowerCase() === 'production') {
      // TODO... log for production
      return
    }
    // for development
    console.log.apply(null, args)
  }
}

export default log
