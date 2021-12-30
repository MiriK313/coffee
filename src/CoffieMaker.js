import './App.css';
import CoffeeMachine from './components/CoffeeMachine'
import MachineErrorMessages from './components/MachineErrorMessages'

// import axios from 'axios';
import { Component } from 'react';
import { Button, CardActions, FormControl, TableCell, TableRow, TextField } from '@material-ui/core';
import { Select, MenuItem, InputLabel, touchRippleClasses } from '@mui/material';

class CoffeeMaker extends Component {
    constructor() {
        super();
        this.state = {
            coffeeMachine: new CoffeeMachine(),
            isMachineReady: '',
            updateMachineStatus: "",
            // Machine in Error
            machineError: false,
            errorMessageDescription: "",
            errorData: MachineErrorMessages,        // Get MachineErrorMessages from Json file
            checkPowerValue: true,
            name: '',
            time: '0',
            // order:'',
            apiResponse: "",
        }
    }

    callAPI() {
        fetch("http://localhost:9000/coffeeApi")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }
    componentDidMount() {
        this.checkApiConnection()

    }

    // Checks if SweetCoffeeMock Api is ready 
    async checkApiConnection() {
        try {
            this.setState({
                updateMachineStatus: "Wait..."
            })

            await this.state.coffeeMachine.checkMachineReady()
                .then(ready => {
                    this.setState({
                        isMachineReady: ready,
                    })
                })
        } catch (error) {
            console.log("Unable to Make Coffee")
        }

        if (this.state.isMachineReady) {
            this.setState({
                updateMachineStatus: "Ready",
            })
        }
    }


    makeCoffee = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;

        console.log(name);
        console.log(this.state.time);

        this.setState({
            name: name,
        })
        this.MachineMakesCoffee();

    }

    MachineMakesCoffee() {
        // this.setState({
        //     order:{
        //        name: this.state.name, 
        //        time: this.state.time,
        //     },
        // });
        //     axios.post('http://localhost:9000/', this.state.order)
        //   .then(res => console.log(res.data));
        this.state.coffeeMachine.makeCoffeeTo(this.state.name, this.state.time);
        setTimeout(() => {
            this.FinishCoffeeAndCheckPower()
        }, 3000);
        return true;
    }

    // Finishing the coffee creation and Checks the Api values of Power
    FinishCoffeeAndCheckPower = () => {
        this.setState({
            updateMachineStatus: "Done",

        });
        setTimeout(() => {
            this.checkApiConnection();
        }, 3000);
        // Every Api value will be checked      
        this.checkPowerValue();

    }

    // Check Values from API
    async checkPowerValue() {
        try {
            await this.state.coffeeMachine.calculatePower();
        } catch (error) {
            const message = "Power Value is to low";
            console.log(message)
            this.setState({
                updateMachineStatus: "Charging. Pls Wait",
            });
            setTimeout(() => {
                this.state.coffeeMachine.errorResolved(message);
                this.checkApiConnection();
            }, 6000);

        }

    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            time: event.target.value,
        });
    };
    render() {
        return (
            <FormControl>
                <InputLabel id="demo-simple-select-label">Name:</InputLabel>
                <TextField
                    id="name"
                    label="Your Name"
                    type="search"
                    variant="outlined"
                    className="Text"

                />
                <InputLabel id="demo-simple-select-label">I want the Coffee in:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="time"
                    value={this.state.time}
                    onChange={this.handleChange}
                >
                    <MenuItem value={0}>Now</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
                <Button type="submit" color="primary" variant="outlined" onClick={this.makeCoffee}>
                    Submit
                </Button>

                <InputLabel id="demo-simple-select-label">Machine Status: {this.state.updateMachineStatus}</InputLabel>

            </FormControl>



        )
    }
}

export default CoffeeMaker;
