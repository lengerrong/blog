import { AuthenticationError } from 'apollo-server-micro'
import { ApolloServerContext } from '../types/ApolloServerContext'

const fakeDatabase = {
  id: ''
}

type User = {
  id: string
}

export const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: fakeDatabase.id
      }
    }
  },
  Mutation: {
    setUser: (_: any, user: User, context: ApolloServerContext) => {
      const { req } = context
      if (!req.headers.authorization) {
        throw new AuthenticationError('you must be logged in')
      }
      fakeDatabase.id = user.id
      return fakeDatabase.id
    }
  }
}
