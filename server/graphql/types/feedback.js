import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

import models from '../../models/index.js';

export default new GraphQLObjectType({
    name: 'feedback',
    description: 'feedback description',
    fields () {
        return {
            id: {
                type: GraphQLID,
                description: "feedback ID",
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
            nickname: {
                type: GraphQLString,
                resolve (feedback) {
                  return feedback.nickname;
                }
            },
        };
    }
});