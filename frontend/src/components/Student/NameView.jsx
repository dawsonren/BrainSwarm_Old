import React, { useState, useEffect, useRef } from 'react';

export const NameView = ({ username, setUsername, finished }) => {
    const famousPeople = ['Thomas Bayes', 'Tim Berners-Lee', 'Andrey Kolmogorov', 'Alan Turing', 'Barbara Liskov', 'Grace Hopper', 'Ada Lovelace']
    const [error, setError] = useState(false)

    function submit(name) {
        if (name.length >= 2) {
            setUsername(name)
            finished()
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <label htmlFor="name">Who's joining?</label>
            <div className="input-group">
                <input type="text" className="form-control"
                    placeholder={famousPeople[Math.floor(Math.random() * famousPeople.length)]}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => submit(username)}>Join</button>
                </div>
            </div>
            {error && (
                <div className="text-danger">
                    Please provide a valid username.
                </div>
            )}
        </div>
    )
}