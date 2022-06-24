const FlightModel = require('../models/Flight.js')

exports.addFlight = (req, res) => {
    const newFlight = req.body
    if(!newFlight.title || !newFlight.time || !newFlight.price || !newFlight.date) { 
        res.status(400).send("Incorrect Flight Properties");
        return;
    }

    FlightModel.push(newFlight)
    res.status(200).send(`Flight "${newFlight.title}" has been Added`);
}

exports.getAllFlights = (req, res) => {
    const allFlights = FlightModel
    res.status(200).send(allFlights);
}

exports.getFlight = (req, res) => {
    const title = req.query.title
    
    if(!title) {
        res.status(401).send("Flight's title required")
        return 
    }
    
    const flight = FlightModel.filter(flight => flight.title === title)
    
    if(!flight[0]) {
        res.status(402).send("Flight doesn't exist")
        return
    }
    res.status(200).send(flight[0])
}

exports.updateFlight = (req, res) => {
    const { title, time, price, date } = req.body
    var flightIndex;
    
    if(!title) {
        res.status(403).send("Flight's title required")
        return 
    }
    
     FlightModel.map((flight, i) => {
        if(flight.title === title) {
            flightIndex = i
        }
     })
    
     if(!flightIndex && flightIndex != 0) {
        res.status(405).send("Flight doesn't exist")
        return
     }

     const updatedFlight = {
        title : title ,
        time : time || FlightModel[flightIndex]?.time,
        price : price || FlightModel[flightIndex]?.price,
        date : date || FlightModel[flightIndex]?.date,
     }

     FlightModel.splice(flightIndex, 1, updatedFlight);
    
    res.send(`flight "${title}" has been updated`)
}

exports.deleteFlight = (req, res) => {
    const { title } = req.query
    var flightIndex;
    
    if(!title) {
        res.status(403).send("Flight's title required")
        return 
    }
    
     FlightModel.map((flight, i) => {
        if(flight.title === title) {
            flightIndex = i
        }
     })
    
     if(!flightIndex && flightIndex != 0) {
        res.status(405).send("Flight doesn't exist")
        return
     }

     FlightModel.splice(flightIndex, 1);
    
    res.send(`flight "${title}" has been deleted`)
}
