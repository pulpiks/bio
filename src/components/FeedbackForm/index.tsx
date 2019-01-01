import {createElement, PureComponent, SyntheticEvent} from 'react'

import { FormComponentProps } from 'antd/lib/form';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import { Dispatch } from '../../store';
import { connect } from 'react-redux';
import { client , gql} from '../../actions/graphql';
import { WrappedFeedbackForm } from './form';
import { Button, message, Icon } from 'antd';
  

interface RegistrationFormState {
    mutate: boolean
    feedback?: {
        email: string,
        nickname: string,
        msg: string
    }
}

type RegistrationFormOwnProps = FormComponentProps;
type RegistrationFormProps = RegistrationFormOwnProps;

// @connect(
//     (_, ownProps: FormComponentProps) => ({
//         ...ownProps
//     }), null
// )

// @(connect(null, null) as any)


// const FEEDBACk_QUERY =  gql `
// {feedback {
//     id,
//     email, 
//     msg,
//     nickname
// }}
// `


const FEEDBACK_QUERY =  gql`
mutation createFeedback($feedback: feedbackinput) {
    createFeedback(feedback: $feedback) {
      id
      email
      msg
      nickname
    }
}
`;

// client.query({
//     query: FEEDBACK_QUERY,
// })


{/* <Query query={FEEDBACK_QUERY}>
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        console.log(data)
        const {feedback} = data
    }}
</Query> */}


const showButtonbackToForm: React.SFC = () => {
    return (
        <Button type="primary" block onClick={this.showForm}>Back to form</Button>
    )
}
  
class RegistrationForm extends PureComponent<RegistrationFormProps, RegistrationFormState> {
   state = {
       mutate: false
   }
    constructor(props: RegistrationFormProps) {
        super(props)
    }

    

    renderFailure() {
        message.error('This is a message of error');
        return (
            <div>
                <p>Your data hasn't been successfully sent. Please try it out again!</p>
                {this.renderButton()}
            </div>
        )
    }

    renderButton = () => {
        return (
            <Button type="primary" block onClick={this.showForm}><Icon type="left" />Back to form</Button>
        )
    }

    showForm = () => {
        this.setState({
            mutate: true
        })
    }

    renderSuccess() {
        return (
            <div>
                <p>Your data has been successfully sent</p>
                {this.renderButton()}
            </div>
        )
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <h1> Thanks for your interest! Please fill out this form and I’ll get back to you as quickly as I can. It usually takes 3-4 days to reply. :) </h1>
                
                <Mutation mutation={FEEDBACK_QUERY}
                /*variables={{ feedback: this.state.feedback }}*/ onError={(e) => {
                    console.log(e)
                }} update={(_, mutationResult) => {
                }}>
                    {(createFeedback, result) => {
                        const { data, loading, error, called } = result;
                        if (!called || this.state.mutate) {
                            return (
                                <WrappedFeedbackForm 
                                    onSubmit={(feedback: any) => {
                                        this.setState({
                                            mutate: false
                                        })
                                        createFeedback({variables: {
                                            feedback
                                        }})
                                    }}
                                />
                            )
                        }
                        if (loading) {
                            return <div>LOADING</div>;
                        }
                        if (error) {
                            return <div>{this.renderFailure()}</div>
                        }
                        return <div>{this.renderSuccess()}</div>
                    }}
                </Mutation>
            </ApolloProvider>
        );
    }
}



export const Feedback = connect<null, {}, RegistrationFormOwnProps>(
    null,
)(RegistrationForm);
