import React, {Component} from 'react';
import './Joke.css'

class Joke extends Component{
    constructor(props){
        super(props)
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    upvote(){
        this.props.handleVote(this.props.id, 1);
 
    }

    downvote(){
        this.props.handleVote(this.props.id, -1);
    }


    getRGB(rating) {
        if (rating > 0) return `${200 - rating * 20},200,0`;
        return `200,${200 - rating * -20},0`;
      }
    
    getEmoji() {
    if (this.props.vote >= 15) {
        return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.vote >= 12) {
        return "em em-laughing";
    } else if (this.props.vote >= 9) {
        return "em em-smiley";
    } else if (this.props.vote >= 6) {
        return "em em-slightly_smiling_face";
    } else if (this.props.vote >= 3) {
        return "em em-neutral_face";
    } else if (this.props.vote >= 0) {
        return "em em-confused";
    } else {
        return "em em-angry";
    }
    }

   
    render(){
        return(
            <div className="Joke">
                <div className="Joke-btn">
                    <i onClick={this.upvote} className="fas fa-arrow-up"></i>
                    <span className="Joke-vote" style={{border: `3px solid rgb(${this.getRGB(this.props.vote)})`}}>
                        {this.props.vote}
                    </span>
                    <i onClick={this.downvote} className="fas fa-arrow-down"></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-face">
                    <i className={this.getEmoji()}></i>
                </div>
            </div>
        )
    }
}

export default Joke;


