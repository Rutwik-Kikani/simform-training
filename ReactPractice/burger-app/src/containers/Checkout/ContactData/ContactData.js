import React, { Component } from "react";
import axios from '../../../axios-orders';

import Button from "../../../components/Ui/Button/Button";
import Spinner from "../../../components/Ui/Spinner/Spinner";

import styles from "./ContactData.module.css";
class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Rutwik",
                address: {
                    street: "TestStreet1",
                    zipcode: "364002",
                    country: "india",
                },
                email: "dummydummy@gmail.com",
            },
            deliveryMethod: "fastest",
        };
        axios
            .post("/orders.json", order)
            .then((res) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (<form>
            <input
                className={styles.Input}
                type="text"
                name="name"
                placeholder="Your Name"
            ></input>
            <input
                className={styles.Input}
                type="email"
                name="email"
                placeholder="Your Mail"
            ></input>
            <input
                className={styles.Input}
                type="text"
                name="street"
                placeholder="Street"
            ></input>
            <input
                className={styles.Input}
                type="text"
                name="postal"
                placeholder="Postal Code"
            ></input>
            <Button btnType="Success" clicked={this.orderHandler}>
                ORDER
            </Button>
        </form>);

        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your data here</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
