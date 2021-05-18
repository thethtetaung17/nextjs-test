import firebase from 'firebase/app'
import 'firebase/database';
import { useEffect, useState } from 'react';

const Counter = ({ id }) => {
    const [count, setCount] = useState('');

    const increaseCount = async () => {
        fetch(`/api/incrementCount?id=${encodeURIComponent(id)}`);
    }

    useEffect(() => {
        const onCountIncrease = (count) => setCount(count.val());
        const fetchCounts = async () => {
            firebase.database().ref('counts').child('counter-sag389').on('value', onCountIncrease);
        }
        fetchCounts();
        return () => firebase.database().ref('counts').child('counter-sag389').off('value', onCountIncrease);
    }, [id]);

    return (
        <button onClick={increaseCount}
            style={{
                background: 'blue',
                padding: '8px',
                borderRadius: 5,
                border: 0,
                color: 'white',
                margin: '5px'
            }}>Increase Count {count ? count : '---'}</button>
    )
}

export default Counter;