import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";
import "./JokeList.css";
const API = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
        numJokes: 10
    };

    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
            loading: false
        };
        this.seenJoke = new Set(this.state.jokes.map(el => el.text));
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes() {
        try {
            let jokes = [];
            this.setState({ loading: true });

            while (jokes.length < this.props.numJokes) {
                let res = await axios.get(API, {
                    headers: { Accept: "application/json" }
                });
                let newJoke = res.data.joke;
                if (!this.seenJoke.has(newJoke)) {
                    jokes.push({ id: uuid(), text: newJoke, vote: 0 });
                    this.seenJoke.add(newJoke);
                } else {
                    console.log(`Found Duplicate: ${newJoke}`);
                }
            }

            this.setState(
                st => ({
                    loading: false,
                    jokes: [...st.jokes, ...jokes]
                }),
                () =>
                    window.localStorage.setItem(
                        "jokes",
                        JSON.stringify(this.state.jokes)
                    )
            );
        } catch (e) {
            alert(e);
            this.setState({ loading: false });
        }
    }

    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(el =>
                    el.id === id ? { ...el, vote: el.vote + delta } : el
                )
            }),
            () =>
                window.localStorage.setItem(
                    "jokes",
                    JSON.stringify(this.state.jokes)
                )
        );
    }

    handleClick() {
        this.getJokes();
    }

    render() {
        let jokes = this.state.jokes.sort((a, b) => b.vote - a.vote);
        let jokeList = jokes.map(el => (
            <Joke
                handleVote={this.handleVote}
                text={el.text}
                vote={el.vote}
                id={el.id}
                key={el.id}
            />
        ));

        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            );
        }

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="Smile Cry Face"
                    ></img>
                    <button onClick={this.handleClick} className="JokeList-btn">
                        Get More
                    </button>
                </div>
                <div className="JokeList-jokes">{jokeList}</div>
            </div>
        );
    }
}

export default JokeList;
