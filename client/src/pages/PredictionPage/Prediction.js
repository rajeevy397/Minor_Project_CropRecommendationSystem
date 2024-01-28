import React, { useState } from 'react';
import './Prediction.css';
import Products from './Products.json';
import Navbar from '../../components/Navbar/Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Prediction() {
  // let navigate=useNavigate();
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      N < 0 ||
      N > 140 ||
      P < 5 ||
      P > 145 ||
      K < 5 ||
      K > 205 ||
      temperature < 8.825674745 ||
      temperature > 43.67549305 ||
      humidity < 14.25803981 ||
      humidity > 99.98187601 ||
      ph < 3.504752314 ||
      ph > 9.93509073 ||
      rainfall < 20.21126747 ||
      rainfall > 298.5601175
    ) {
      toast.error('Invalid input values.', {
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: JSON.stringify({
          N,
          P,
          K,
          temperature,
          humidity,
          ph,
          rainfall,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(()=>{
  //   if(localStorage.getItem('token'))
  //   {
  //     navigate('/seasonalproduct')
  //     // eslint-disable-next-line
  //   }
  //   else{
  //     navigate('/login')
  //   }
  // },[])

  return (
    <>
      {/* <OtherNav /> */}
      <Navbar />
      <div className="predict">
        <div className="seasonalPrediction">
          <div className="ses-left">
            <span>Make a </span>
            <span>prediction</span>
          </div>

          <div className="ses-right">
            <form onSubmit={handleSubmit}>
              <br></br>
              <span>Fill Appropriate Data to get better result</span>
              <br />
              <span>Ranges given according to dataset trained on :)</span>
              <br></br>
              <label className="first">Nitrogen Range: 0-140 eg. 50.55</label>
              <input
                type="text"
                className="user"
                placeholder="N:(Ratio of nitrogen content in the soil)"
                value={N}
                onChange={(e) => setN(e.target.value)}
              />

              <label>Phosphorous Range: 5-145 eg. 53.36</label>
              <input
                type="text"
                className="user"
                placeholder="P:(Ratio of phosphorous content in the soil)"
                value={P}
                onChange={(e) => setP(e.target.value)}
              />

              <label>Potassium Range: 5-205 eg. 48.15</label>
              <input
                type="text"
                className="user"
                placeholder="K:(ration of Potassium content in soil)"
                value={K}
                onChange={(e) => setK(e.target.value)}
              />

              <label>Tempature Range:8.8-43.6 eg. 25.62</label>
              <input
                type="text"
                className="user"
                placeholder="Temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                min={8.825674745}
                max={43.67549305}
              />

              <label>Humidity Range %:14.2-99.9 eg. 71.48</label>
              <input
                type="text"
                className="user"
                placeholder="Humidity"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
              />

              <label>PH Range:3.5-9.9 eg. 6.47</label>
              <input
                type="text"
                className="user"
                placeholder="Ph"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />

              <label>Rainfall Range:20.2-298.5 eg. 103.46</label>
              <input
                type="text"
                className="user"
                placeholder="Rainfall"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />

              <div className="result">
                <input type="submit" value="Submit" className="button last" />

                {/* Plant Predicted Result */}
                {/* <br></br> */}
                {prediction && (
                  <span className="pre-result">
                    Most Suitable Plant:{' '}
                    <span className="plant">{prediction}</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {prediction && (
          <span className="plantDescription">
            <h2 className="p-desc">Description</h2>
            <p>
              {
                Products.plants.filter((plant) => plant.name === prediction)[0]
                  .description
              }
            </p>
          </span>
        )}

        {/* <span className="plantDescription">
          <h2 className="p-desc">Description</h2>
          <p>Papaya is good for health</p>
        </span> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Prediction;
