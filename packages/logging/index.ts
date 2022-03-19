const log = {
  info: (...args: any[]) => {
    console.log.apply(null, args)
  },
  error: (...args: any[]) => {
    console.error.apply(null, args)
    if (process.env.NODE_ENV?.toLocaleLowerCase() === 'production') {
      if (
        typeof window !== 'undefined' &&
        typeof window.document !== 'undefined'
      ) {
        // TODO... log error happened in client, the browser
      } else {
        // TODO... log error happened in server, the node.js
      }
    }
  }
}

export default log
