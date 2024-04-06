// SimpleComponent.js
import React, { useState } from 'react';
import '../Roag.css';

const GenerateCoordinates = () => {
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = Array.from({ length: 26 }, (_, i) => i + 1); // Array [1, 2, 3, ..., 26]

    const [points, setPoints] = useState([]);
    const [consumables, setConsumables] = useState([]);
    const [players, setPlayers] = useState();
    const [eruptiveTraps, setEruptiveTraps] = useState([]);
    const [projectileTraps, setProjectileTraps] = useState([]);
    const [seizeTraps, setSeizeTraps] = useState([]);
    const [location, setLocation] = useState("");
    const [locationResult, setLocationResult] = useState([]);
    const [deactivatedTraps, setDeactivatedTraps] = useState([]);


    const generateCoordinates = (length) => {
        const coOrdinates = [];
        for (let i = 0; i < length; i++) {
            const randomAlphabetIndex = Math.floor(Math.random() * alphabets.length);
            const randomNumberIndex = Math.floor(Math.random() * numbers.length);
            coOrdinates.push(`${alphabets[randomAlphabetIndex]}${numbers[randomNumberIndex]}`);
        }
        return coOrdinates;
    };

    const generatePointsCoordinates = () => {
        // formula amount to generate
        let points_amount = players * 2;
        setPoints(generateCoordinates(points_amount));
    }

    const generateConsumablesCoordinates = () => {
        // formula amount to generate
        let consumables_amount = players / 2;
        setConsumables(generateCoordinates(consumables_amount));
    }

    const generateTrapsCoordinates = () => {
        // formula amount to generate
        let traps_amount = 270; // 40% of boxes on the grid
        let traps = generateCoordinates(traps_amount);
        //  split the traps into 3 arrays, 40%, 40%, 20%
        let erruptive = traps.slice(0, traps.length * 0.4);
        let projectile = traps.slice(traps.length * 0.4, traps.length * 0.8);
        let seize = traps.slice(traps.length * 0.8, traps.length);
        setEruptiveTraps(erruptive);
        setProjectileTraps(projectile);
        setSeizeTraps(seize);
    }

    const createTrapdistrubution = () => {
        let trapType = ['eruptive', 'projectile', 'seize'];
        let trapDistribution = [50, 30, 20];

        // generate new array of 100 elements using the distribution
        let traps = [];
        for (let i = 0; i < trapDistribution.length; i++) {
            for (let j = 0; j < trapDistribution[i]; j++) {
                traps.push(trapType[i]);
            }
        }
        console.log(traps);

        return traps;
    }

    const generateAllCoordinates = () => {
        generatePointsCoordinates();
        generateConsumablesCoordinates();
        generateTrapsCoordinates();
    }

    const checkIfCoordinatesExist = () => {
        let trapDistibution = createTrapdistrubution();
        // randomize the trap type
        let randomTrapType = trapDistibution[Math.floor(Math.random() * trapDistibution.length)];
        // check if corrdinates exist in the array
        if (eruptiveTraps.includes(location) || projectileTraps.includes(location) || seizeTraps.includes(location)) {
            // eruptive types
            let eruptiveTypes = ['NS Depletion', 'SV Depletion'];
            // if randomTrapType is an eruptive trap, select a random eruptive type
            if (randomTrapType === 'eruptive') {
                let EType = "";
                EType = eruptiveTypes[Math.floor(Math.random() * eruptiveTypes.length)];
                setLocationResult([location, "It Exist", randomTrapType, EType]);
                // remove the location from any of the trap arrays
                if (eruptiveTraps.includes(location)) {
                    let index = eruptiveTraps.indexOf(location);
                    let newEruptiveTraps = [...eruptiveTraps];
                    newEruptiveTraps.splice(index, 1);
                    setEruptiveTraps(newEruptiveTraps);
                } else if (projectileTraps.includes(location)) {
                    let index = projectileTraps.indexOf(location);
                    let newProjectileTraps = [...projectileTraps];
                    newProjectileTraps.splice(index, 1);
                    setProjectileTraps(newProjectileTraps);
                }
                else if (seizeTraps.includes(location)) {
                    let index = seizeTraps.indexOf(location);
                    let newSeizeTraps = [...seizeTraps];
                    newSeizeTraps.splice(index, 1);
                    setSeizeTraps(newSeizeTraps);
                }
            } else {
                setLocationResult([location, "It Exist", randomTrapType]);
            }
        } else {
            setLocationResult([location, "Doesnt Exist", "None"]);
        }
    }


    return (
        <div>
            <h1>R.O.A.G Assiter!</h1>
            <p>This is a simple tool to generate coordinates for the R.O.A.G game</p>

            <label>
                Enter the number of players:
                <input
                    type="number"
                    value={players}
                    onChange={(e) => setPlayers(parseInt(e.target.value))}
                />
            </label>


            <label>
                Search Trap
                <input
                    type="text"
                    value={location}
                    // auto capitalize the input
                    onChange={(e) => setLocation(e.target.value.toUpperCase())}
                />
            </label>

            <button onClick={generateAllCoordinates}>Generate Co Ordinates</button>
            <br />
            <br />
            <button style={{ backgroundColor: '#ab1818', color: 'white' }} onClick={checkIfCoordinatesExist}>Check if Coordinates Exist</button>

            {/* show if coordinates exist */}
            {locationResult.length > 0 && (
                <div className="result-container">
                    <p>Generated Trap Type:</p>
                    <div className="result-boxes">
                        {locationResult.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Generate Point Boxes */}
            {points.length > 0 && (
                <div className="result-container">
                    <p>Generated Points Co-ordinates:</p>
                    <div className="result-boxes">
                        {points.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Generate Consumables Boxes */}
            {consumables.length > 0 && (
                <div className="result-container">
                    <p>Generated Consumables Co-ordinates:</p>
                    <div className="result-boxes">
                        {consumables.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Generate Erupitve Traps Boxes */}
            {/* {eruptiveTraps.length > 0 && (
                <div className="result-container">
                    <p>Generated Eruptive Traps Co-ordinates</p>
                    <div className="result-boxes">
                        {eruptiveTraps.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Generate Projectile Traps Boxes */}
            {/* {projectileTraps.length > 0 && (
                <div className="result-container">
                    <p>Generated Projectile Traps Co-ordinates</p>
                    <div className="result-boxes">
                        {projectileTraps.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Generate Seize Traps Boxes */}
            {/* {seizeTraps.length > 0 && (
                <div className="result-container">
                    <p>Generated Seize Traps Co-ordinates</p>
                    <div className="result-boxes">
                        {seizeTraps.map((value, index) => (
                            <div className="result-box" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default GenerateCoordinates;
