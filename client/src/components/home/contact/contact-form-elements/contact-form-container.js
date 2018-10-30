import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { Input } from './contact-form-elements/input'
import { Textarea } from './contact-form-elements/textarea'
import { sendContactForm } from '../../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Captcha} from '../../shared/captcha'
import SectionTitle from '../../shared/section-title';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Seulment des caractères alpha numérique merci'
        : undefined

class ContactForm extends Component {
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <section className="contact pt-4 pb-4">
                <SectionTitle data={{ title: "Contactez moi" }} />
                <div className="w-75 w-md-50 m-auto">
                    <form onSubmit={handleSubmit(this.sendContactForm.bind(this))}>
                        <div className="form-group">
                            <Field
                                name="username"
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nom"
                                component={Input}
                                validate={[required]}
                                warn={alphaNumeric}
                            /> <span>*</span>
                            <Field
                                name="company"
                                type="text"
                                className="form-control mb-2"
                                component={Input}
                                placeholder="Société"
                                validate={[required]}
                                warn={alphaNumeric}
                            />
                            <Field
                                name="message"
                                className="form-control"
                                component={Textarea}
                                placeholder="Message"
                                validate={[required]}
                            /> *
                    </div>
                        <div>
                            <button className="btn btn-primary mr-2" type="submit" disabled={submitting}>
                                Envoyer
                        </button>
                            <button className="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>
                                Réinitialiser
                        </button>
                        <Field name='captcharesponse' component={Captcha} validate={[required]} />
                            {(this.props.sendContact && this.props.sendContact.isLoading) ? <div>Loading please wait</div> : null}
                            {(this.props.sendContact && this.props.sendContact.reponseMsg) ? <div>{this.props.sendContact.reponseMsg}</div> : null}
                            {(this.props.sendContact && this.props.sendContact.errorMsg) ? <div>{this.props.sendContact.errorMsg}</div> : null}
                        </div>
                    </form>
                </div>
            </section>
        )
    }
    sendContactForm(contact) {
        this.props.sendContactForm(contact);
        //browserHistory.push("/");
    }
}

const clearForm = (result, dispatch, props) => {
    if (props.sendContact == null)
        dispatch(reset('contactForm'));
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sendContactForm }, dispatch)
}

function mapStateToProps(state) {
    return {
        sendContact: state.sendContact,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'contactForm',
    onSubmitSuccess: clearForm
})(ContactForm))