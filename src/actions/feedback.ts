import { Dispatch } from "../store";

import {client, gql} from './graphql'


export interface CreateActionType {
    readonly email: string,
    readonly nickname: string,
    readonly msg: string
}

interface FinishedCreateFeedbackAction {

}

enum FinishedCreateFeedbackTypes {
    SUCCESS,
    FAILURE
}

export interface SuccessCreateFeedbackAction {
    readonly success: boolean
    readonly data: CreateActionType,
    readonly type: FinishedCreateFeedbackTypes.SUCCESS
}

export interface FailureCreateFeedbackAction {
    readonly error: string
    readonly type: FinishedCreateFeedbackTypes.FAILURE
}

export type SendActiontype = SuccessCreateFeedbackAction | FailureCreateFeedbackAction



export const createFeedback = (payload: CreateActionType) => 
    async (dispatch: Dispatch) => {
        try {
            const newFeedback = await client.query({
                query: gql`
                    {feedback {
                        id,
                        email, 
                        msg,
                        nickname
                    }}
                `,
            })
                        // createFeedback({
                        //     $msg: ${payload.msg},
                        //     $email: ${payload.email},
                        //     $nickname: ${payload.nickname}
                        // }) {
                        //     id,
                        //     email,
                        //     msg,
                        //     nickname
                        // }
            // const graphqlTmpl = `query createFeedback(
            //     $msg: String!,
            //     $email: String!,
            //     $nickname: String!
            // ) {
            //   id,
            //   email,
            //   msg,
            //   nickname
            // }`
            // const res = await fetch('/graphql', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       'Accept': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         query: graphqlTmpl,
            //         variables: {
            //             msg: payload.msg,
            //             email: payload.email,
            //             nickname: payload.nickname,
            //         }
            //     })
            // })
            // const res = await fetch({
            //     query: `mutation createFeedback($feedback: feedbackinput) {
            //             id,
            //             email,
            //             msg,
            //             nickname
            //         }
            //     `,
            //     variables: { msg: payload.msg, email: payload.email, nickname: payload.nickname },
            // })
            // console.log(res)
            return dispatch<SuccessCreateFeedbackAction>({
                success: true,
                type: FinishedCreateFeedbackTypes.SUCCESS,
                data: payload
            })
        }
        catch(e) {
            return dispatch<FailureCreateFeedbackAction>({
                error: 'Error',
                type: FinishedCreateFeedbackTypes.FAILURE
            })
        }
    }