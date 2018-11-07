import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

export default class OktaSignInWidget extends Component {
    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.widget = new OktaSignIn({
            baseUrl: this.props.baseUrl,
            logo: './logo.png',
            registration: {
                parseSchema: function(schema, onSuccess, onFailure) {
                    // handle parseSchema callback
                    onSuccess(schema);
                },
                preSubmit: function (postData, onSuccess, onFailure) {
                    // handle preSubmit callback
                    onSuccess(postData);
                },
                postSubmit: function (response, onSuccess, onFailure) {
                    // handle postsubmit callback
                    onSuccess(response);
                }
            },
            features: {
                // Used to enable registration feature on the widget.
                // https://github.com/okta/okta-signin-widget#feature-flags
                registration: true // REQUIRED
            }
        });
        this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
    }

    componentWillUnmount() {
        this.widget.remove();
    }

    render() {
        return <div />;
    }
};
