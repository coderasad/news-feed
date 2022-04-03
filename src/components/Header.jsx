import React, {Component} from 'react';
import {newsCategory}     from "../news";

class Header extends Component {
    state = {
        searchTerm: ""
    }

    handleChange = e => {
        this.setState({searchTerm: e.target.value});
    }

    handleKeyPress = e => {
        if(e.key === 'Enter'){
            this.props.search(this.state.searchTerm)
        }
    }

    render() {
        const {category,changeCategory} = this.props;
        return (
            <div className='my-4'>
                <h1 className='mb-4' style={{fontWeight: '300'}}>
                    Block Buster Headlines
                </h1>
                <input
                    type="search"
                    className='form-control'
                    placeholder='Type Anything & Press Enter To Search'
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <div className='my-4'>
                    {newsCategory && Object.keys(newsCategory).map((item) => {

                        return (
                            <button onClick={()=> changeCategory(newsCategory[item])} className={`${category === newsCategory[item] ? 'btn-warning' : 'btn-light'} btn btn-sm me-2 mb-2`}>
                                {`#${newsCategory[item]}`}
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Header;