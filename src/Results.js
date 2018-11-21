import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import black from './img/black.png';
import blue from './img/blue.png';
import green from './img/green.png';
import placeHolder from './img/hiker-mini.jpg'
import './Results.scss';
import JwPagination from 'jw-react-pagination';

export class HikeCard extends Component {

    render() {
        //get rating
        let ratings = [];
        let num = this.props.hike.stars;
        for (let i = 0; i < num - 1; i++) {
            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
        }
        if (num % 1 !== 0) {
            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
        }
        let stars = ratings.map((star) => {
            return star;
        });
        let img = this.props.hike.imgSmall;
        if (img === ''){
            img = placeHolder;
        } 
        //get difficulty
        let diff = this.props.diff;
        return (
            <div className="card">
                <img className='p-3' src={img} alt='the hiking place' />
                <div className="card-body">
                    <h5 className="card-title">{this.props.hike.name}</h5>
                    <ul className="card-text">
                        <li>Location: {this.props.hike.location}</li>
                        <li className='rating'>Ratings: {stars}</li>
                        <li>Length: {this.props.hike.length} miles</li>
                        <li>Description: {this.props.hike.summary}</li>
                        <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                        <button href={this.props.hike.url} className="btn btn-dark">More Info</button>
                    </ul>
                </div>
            </div>
        );

    }

}


export class CardContainer extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);

        this.state = {
            trails: this.props.trails,
            pageOfItems: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ trails: props.trails });
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems });
    }

    render() {
        let filter = this.state.pageOfItems.map((hike) => {
            let diff;
            if (this.props.easy && (hike.difficulty === 'green' || hike.difficulty === 'greenBlue')){
                diff = green;
            } else if (this.props.medium && (hike.difficulty === 'blue' || hike.difficulty === 'blueBlack')){
                diff = blue;
            } else if (this.props.hard && (hike.difficulty === 'black' || hike.difficulty === 'blackBlack')){
                diff = black;
            } else {
                return "";
            }
            return <HikeCard key={hike.id} hike={hike} diff={diff}/>
        })
        if (this.props.error) {
            return '';
        } else {
            return (
                <div className="hike-results card-container">
                    <div className='row'>
                        {filter}
                    </div>
                    <div className='pagination-holder'>
                        <JwPagination items={this.state.trails} onChangePage={this.onChangePage} 
                        pageSize={6} disableDefaultStyles={true}/>
                    </div>
                </div>
            );
        }
    }


}