import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { Input } from './contact-form-elements/input'
import { Textarea } from './contact-form-elements/textarea'
import { sendContactForm } from './contact-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Captcha from './contact-form-elements/recaptcha'
import SectionTitle from '../../shared/section-title'


const required = value => (value || typeof value === 'number' ? undefined : 'Ce champ est requis')
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Veuillez saisir seulement des caractères alpha numérique'
        : undefined

class ContactForm extends Component {

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <section id="contact" className="contact pt-4">
                <SectionTitle data={{ title: "Contactez moi" }} />
                <div className="w-75 w-md-50 m-auto">
                    <form onSubmit={handleSubmit(this.sendContactForm.bind(this))}>
                        <div className="form-group mb-4">
                            <Field
                                name="username"
                                type="text"
                                className="form-control mb-3"
                                placeholder="Nom *"
                                component={Input}
                                validate={[required]}
                                warn={alphaNumeric}
                            />
                            <Field
                                name="company"
                                type="text"
                                className="form-control mb-3"
                                component={Input}
                                placeholder="Société"
                                warn={alphaNumeric}
                            />
                            <Field
                                name="message"
                                className="form-control mb-3"
                                component={Textarea}
                                placeholder="Message *"
                                validate={[required]}
                            />
                            <Field
                                name="captcha"
                                className="form-control mb-3"
                                component={Captcha}
                                validate={[required]} />
                        </div>
                        <div>
                            <button className="btn btn-primary text-uppercase mr-3" type="submit" disabled={submitting}>
                                Envoyer
                            </button>
                                <button className="btn btn-secondary text-uppercase" disabled={pristine || submitting} onClick={reset}>
                                    Réinitialiser
                            </button>
                            <div className="mt-4">
                                {(this.props.sendContact && this.props.sendContact.isLoading) ? <div>Envoi en cours...</div> : null}
                                {(this.props.sendContact && this.props.sendContact.reponseMsg) ? <div>{this.props.sendContact.reponseMsg}</div> : null}
                                {(this.props.sendContact && this.props.sendContact.errorMsg) ? <div>{this.props.sendContact.errorMsg}</div> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
    sendContactForm(contact) {
        this.props.sendContactForm(contact);
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