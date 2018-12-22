import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';
  
  import Db from './db';
  
  const Feedback = new GraphQLObjectType({
    name: 'Feedback',
    description: 'Description of feedback',
    fields () {
      return {
        id: {
            type: GraphQLInt,
            resolve (feedback) {
                return feedback.id;
            }
        },
        email: {
          type: GraphQLString,
          resolve (feedback) {
            return feedback.email;
          }
        },
        msg: {
          type: GraphQLString,
          resolve (feedback) {
            return feedback.msg;
          }
        },
      };
    }
  });

  
  const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
      return {
        feedback: {
          type: new GraphQLList(Feedback),
          args: {
            id: {
              type: GraphQLInt
            },
            email: {
              type: GraphQLString
            },
            msg: {
                type: GraphQLString
            }
          },
          resolve (root, args) {
            return Db.models.feedback.findAll({ where: args });
          }
        },
      };
    }
  });
  
  const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
      return {
        addMsg: {
          type: Feedback,
          args: {
            msg: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve (source, args) {
            return Db.models.feedback.create({
              msg: args.msg,
              email: args.email.toLowerCase()
            });
          }
        },
      };
    }
  });
  
  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
  
  export default Schema;