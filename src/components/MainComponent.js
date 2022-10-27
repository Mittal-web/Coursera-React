import Menu from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { Component } from 'react'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetailComponent dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} />
                <Footer />
            </div>
        );
    }
}

export default Main;
