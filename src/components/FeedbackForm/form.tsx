import {createElement, PureComponent, SyntheticEvent} from 'react'
import {
    Button, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import {createFeedback, SuccessCreateFeedbackAction, CreateActionType} from '../../actions/feedback'
import { Dispatch } from '../../store';
import { connect } from 'react-redux';
import { client , gql} from '../../actions/graphql';

const FormItem = Form.Item
const Option = Select.Option
const Textarea = Input.TextArea

interface RegistrationFormState {
    confirmDirty: boolean,
    feedback?: {
        email: string,
        nickname: string,
        msg: string
    }
}


type OwnProps = {
    readonly onSubmit: (data: any) => any
}

type RegistrationFormProps = FormComponentProps & OwnProps;

class FormComponent extends PureComponent<RegistrationFormProps, RegistrationFormState> {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            debugger
            this.props.onSubmit({
                email: values.email,
                msg: values.msg,
                nickname: values.nickname,
            });
        })
    }

    handleConfirmBlur = (e: SyntheticEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator(
            'prefix', {
                initialValue: '86',
            }
        )(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                
                
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                {/*  */}
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        Text&nbsp;
                        <Tooltip title="What do you want write down here?">
                            <Icon type="align-left" />
                        </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('msg', {
                        rules: [{ required: true, message: 'Please input your text!', whitespace: true }],
                    })(
                        <Textarea rows={4} />
                    )}
                </FormItem>
                {/*  */}
                          
                {/* <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human."
                    >
                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(
                            <Input />
                        )}
                        </Col>
                        <Col span={12}>
                        <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </FormItem> */}
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        )
    }
}

export const WrappedFeedbackForm = Form.create()(FormComponent);


