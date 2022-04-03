import React          from 'react';
import News, {newsCategory} from "./news";

import Header     from "./components/Header";
import NewsList   from "./components/NewsList";
import Pagination from "./components/pagination";
import Loading    from "./components/Loading";

const news = new News(newsCategory.technology)
class App extends React.Component {
    

    state = {
        data: {},
        isLoading: true
    }
    
    componentDidMount() {
        news.getNews()
        .then(data => {
            this.setState({data, isLoading:false})
        })
        .catch(e=> {
            alert("Something Went Wrong")
            this.setState({isLoading:false})
        })   
    }

    next = ()=>{

        if(this.state.data.isNext){
            this.setState({isLoading: true})
        }
        news.next()
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            alert("Something Went Wrong")
            this.setState({isLoading:false})
        })
    }

    prev = ()=>{
        if(this.state.data.isPrevious){
            this.setState({isLoading: true})
        }
        news.prev()
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            alert("Something Went Wrong")
            this.setState({isLoading:false})
        })
    }

    handlePageChange = value => {
        this.setState({
            data: {
                ...this.state.data,
                currentPage:Number.parseInt(value)
            }
        })
        console.log(this.state.currentPage,'currentPage')

    }

    goToPage = () => {
        this.setState({isLoading: true})
        news.setCurrentPage(this.state.data.currentPage)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            alert("Something Went Wrong")
            this.setState({isLoading:false})
            news.setCurrentPage(this.state.currentPage)
        })
    }

    changeCategory = category =>{
        this.setState({isLoading: true})
        news.changeCategory(category)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            alert("Something Went Wrong")
            this.setState({isLoading:false})
            news.setCurrentPage(this.state.currentPage)
        })
    }

    search = searchTerm =>{
        this.setState({isLoading: true})
        news.search(searchTerm)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            alert("Something Went Wrong")
            this.setState({isLoading:false})
            news.setCurrentPage(this.state.currentPage)
        })
    }


    render() {
        const {
            articles,
            isPrevious,
            isNext,
            category,
            totalResults,
            currentPage,
            totalPage
        } = this.state.data
        
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-md-3">
                            <Header 
                            category={category} 
                            changeCategory={this.changeCategory}
                            search={this.search}
                            />
                            <div className='d-flex'>
                                <p className='text-black-50'>
                                    About {totalResults} results found
                                </p>
                                <p className='text-black-50 ms-auto'>
                                    {currentPage} page of {totalPage}
                                </p>
                            </div>
                            {this.state.isLoading ? (
                                <Loading/>
                            ): (
                                <div>
                                    <NewsList news={articles}/>
                                    
                                    <Pagination
                                        next={this.next}
                                        prev={this.prev}
                                        isPrevious={isPrevious}
                                        isNext={isNext}
                                        totalPage={totalPage}
                                        currentPage={currentPage}
                                        handlePageChange={this.handlePageChange}
                                        goToPage={this.goToPage}
                                    />
                                </div>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
