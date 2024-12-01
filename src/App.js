
import { useEffect } from 'react';
import { useState } from 'react';

import style from '../src/App.css'

import pathIconDog1 from '../src/img/dog1.png'
import pathIconDog2 from '../src/img/dog2.png'
import pathIconDog3 from '../src/img/dog3.png'
import pathIconDog4 from '../src/img/dog4.png'
import pathIconQuestion from '../src/img/question.jpg'






function App() {

    const initialArrayCards = [
        {id:1, img: pathIconDog1},
        {id:2, img: pathIconDog2},
        {id:3, img: pathIconDog3},
        {id:4, img: pathIconDog4},
    ]

    const [arrayCards, setArrayCards] = useState([])
    const [openedCards, setOpenedCards] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)

    const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]

    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    useEffect(()=>{
        setArrayCards(shuffle(pairOfArrayCards))
    }, [])


    // нажатие на карточку
    const flipCard = (index) => () => {
        setOpenedCards(opened => [...opened, index])
        setMoves(prevMove => prevMove + 1)

    }

// закрывается открытые карточки через секунду при несовпадении/ при совпадении не закрываются

    useEffect(() => {
        if (openedCards < 2) return
        const firstMatched = arrayCards[openedCards[0]];
        const secondMatched = arrayCards[openedCards[1]]

        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id])
        }

        if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000)
    }, [openedCards])



    // начать игру 
    const handleGameRestart = () => {
        setOpenedCards([]);
        setMatched([])
        setMoves(0)
        setArrayCards(shuffle(pairOfArrayCards))
    }



    return (
        <div className="container">
            <p className="number-of-strokes">Проверить ходы:{moves}</p>
            <div className="cards">
                {arrayCards.map((item, index) => {
                    let isFlipped = false;

                    if(openedCards.includes(index)) isFlipped = true
                    if(matched.includes(item.id)) isFlipped = true

                    return (

                        <div key={index} className={`card ${isFlipped ? 'flipped' : ''}`}
                        onClick={flipCard(index)}>


                            <div className="inner">
                                <div className="front">
                                    <img src={item.img} alt="front-card"/>
                                </div>
                                <div className="back">
                                    <img src={pathIconQuestion} alt="question"/>
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>
            <button className="button-restart" onClick={handleGameRestart}>Начать</button>
        </div>
    );
}

export default App;
