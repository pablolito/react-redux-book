import React, { Component } from 'react'

class SentenceIncrement extends Component {
    constructor(props) {
        super(props);
        this.state = { sentenceIncrement: "", sentenceIsLoaded: false }
        this.interval;
        this.techIncInterval;
        this.cptTech = 0;
    }
    addingTechWord(wordTab){
        if(this.cptTech<wordTab.length){
            let newSentence = this.state.sentenceIncrement + wordTab[this.cptTech];
            this.setState({sentenceIncrement : newSentence});
            this.cptTech++;
        }else{
            clearInterval(this.techIncInterval);
            this.props.sentenceIsLoadedCallback(true);
        }
        
    }

    clearSentence(caracPos){
        if(this.cptTech<caracPos){
            let newSentence = this.state.sentenceIncrement.substring(0, this.state.sentenceIncrement.length - 1);
            this.setState({sentenceIncrement: newSentence});
            this.cptTech++;
        }else{
            clearInterval(this.techIncInterval);
            this.cptTech = 0;
            const word = ":)";
            this.techIncInterval = setInterval(()=>this.addingTechWord(word.split('')), 100);
            this.setState({sentenceIsLoaded : true});
        }
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
                this.setState({sentenceIsLoaded : true});

                setTimeout(()=>{
                    this.setState({sentenceIsLoaded : false});
                    const caracPos = cptMax - sentenceIncrement.indexOf('Jquery');
                    this.techIncInterval = setInterval(()=>this.clearSentence(caracPos), 200);
                }, 2000)
                
            }
        }, 100);
        
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        clearInterval(this.techIncInterval);
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