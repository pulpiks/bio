import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import models from '../../../models/index.js';
import feedback from '../../types/feedback.js';

export default {
    type: feedback,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args) {
        return models.feedback.findById(args.id);
    }
};