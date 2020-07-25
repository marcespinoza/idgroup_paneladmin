import React from "react";
import Spinner from "./../Images/animation_loading.gif";
import './../App.css';

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;