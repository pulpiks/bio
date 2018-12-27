
import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';
  

export default new GraphQLInputObjectType({
    name: 'feedbackinput',
    fields: () => ({
        msg: { type: GraphQLString },
        email: { type: GraphQLString },
        nickname: { type: GraphQLString },
    })
});