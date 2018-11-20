import React, { Component } from 'react'

class SentenceIncrement extends Component {
    constructor(props) {
        super(props);
        this.state = { sentenceIncrement: "", sentenceIsLoaded: false }
        this.interval;
    }
    componentDidMount() {
        const sentence = this.props.initialSentence.split('');
        let sentenceIncrement = "";

        let cpt = 0;
        let cptMax = sentence.length;
        this.interval = setInterval(() => {
            if (cpt < cptMax) {
                sentenceIncrement = sentenceIncrement + sentence[cpt];
                this.setState({ sentenceIncrement: sentenceIncrement });
                cpt++;
            } else {
                clearInterval(this.interval);
                this.props.sentenceIsLoadedCallback(true);
                this.setState({sentenceIsLoaded : true});
            }
        }, 50);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        
        return (
            
            <h2 className="ttl-bis medium">
                {this.state.sentenceIncrement}
                <span className={(this.state.sentenceIsLoaded) ? "animated infinite fast fadeIn" : ''}>|</span>
            </h2>
            
        )
    }
}

export default SentenceIncrement