import React from "react";
import {useLocation} from "react-router-dom";

const SymptomsAnalysis = () => {
    const location = useLocation();
    const {symptoms, response} = location.state || {};

    return (
        <div>
            <h1>Symptoms Analysis</h1>
            <p>Analyze and visualize symptoms data here.</p>
            {/* Display received data */}
            {symptoms && response && response.all_features && response.full_feature_array && (
                <>
                    <h2>Selected Symptoms:</h2>
                    <ul>
                        {symptoms.map((symptom, index) => {
                            const featureIndex = response.all_features.indexOf(symptom);
                            const featureValue = featureIndex !== -1 ? response.full_feature_array[featureIndex] : 0;
                            return (
                                <li key={index}>
                                    {symptom} - {featureValue > 0 ? `Votes for diagnosis: ${featureValue}` : "No votes"}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
            {response && (
                <>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response.message, null, 2)}</pre>
                </>
            )}
        </div>
    );
};

export default SymptomsAnalysis;