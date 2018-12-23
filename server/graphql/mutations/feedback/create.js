import models from '../../../models/index.js';
import FeedbackType from '../../types/feedback.js';
import FeedbackInput from '../../inputs/feedback.js';

export default {
    type: FeedbackType,
    args: {
        feedback: {
            type: FeedbackInput
        }
    },
    resolve (source, args) {
        return models.feedback.build({
            msg: args.feedback.msg,
            email: args.feedback.email,
        })
        .save()
        .then(function(newFeedback) {
            return models.feedback.findById(newFeedback.id);
        });
    }
};