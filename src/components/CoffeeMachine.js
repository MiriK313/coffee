export default class CoffeeMachine {
    constructor() {
        this.isReady = true;
        this.orders = [];
        this.power = 3;

    }
    // Check if Machine is ready
    checkMachineReady() {
        var machineReady = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isReady) {
                    resolve(true);
                } else if (!this.isReady) {
                    reject(false)
                }
            }, 3000);
        });

        return Promise.resolve(machineReady);
    }
    /*
     * Sends a command to the coffee machine to start making a drink.
     */
    makeCoffeeTo(name, time) {
        this.orders.push({ name, time });
        console.log(this.orders);
        // return true
    }


    calculatePower = () => {
        this.power -= 1
        var p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.power <= 0) {
                    reject(false)
                } else {
                    resolve(true)
                }
            }, 50);
        });

        return Promise.resolve(p1);
    }

    // reset all values to default
    errorResolved(message) {
        if (message === "Power Value is to low") {
            this.power = 3;
        }
        var p1 = new Promise((resolve) => {
            setTimeout(() => {
                resolve("resolved")
            }, 50);
        });

        console.log(this.power + "solved")
        return Promise.resolve(p1);
    }


    /**
     * Callback for retrieving error messages, takes callback function as parameter. Setting the callback 
     * tiggers a response in a minute
     */
    errorCallback(callback) {
        this._cbError = callback;

        setTimeout(function () {
            this._cbError(Math.round(Math.random() * 4));
        }, Math.random() * 60000);
    }

    /**
     * Callback for retrieving ready messages, takes callback function as parameter.  Setting the callback 
     * tiggers a response in a minute
     */
    readyCallback = (callback) => {
        this._cbReady = callback;

        setTimeout(() => {
        }, 3000);
    }

}