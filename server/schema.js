'use strict'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
  } from 'graphql';
  
import Db from './db';

  
const Feedback = new GraphQLObjectType({
    name: 'Feedback',
    description: 'Description of feedback',
    fields() {
      return {
        id: {
            type: GraphQLID,
            description: 'feedback\'s id',
            resolve (feedback) {
                return feedback.id;
            }
        },
        email: {
          type: GraphQLString,
          description: 'feedback\'s email',
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
    fields: () => ({
        feedback: {
          type: new GraphQLList(Feedback),
          args: {
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            msg: {
                type: new GraphQLNonNull(GraphQLString),
            },
          },
          resolve (root, args) {
            return Db.models.feedback.findAll({ where: args });
          }
        },
    })
});
  
const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields:() => ({
        addMsg: {
          type: Feedback,
          args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
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
    })
});
  
const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    pretty: true,
});
  
export default Schema;