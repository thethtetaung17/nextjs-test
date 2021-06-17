import firebase from 'firebase/app';
import 'firebase/firestore';

const ReadFromCloudFirestore = () => {
    const retrieveData = () => {
        try {
            firebase.
                firestore()
                .collection('myCollection')
                .doc('my_document2')
                .onSnapshot(function (doc) {
                    console.log(doc.data());
                })
                alert('Data successfully retrieve!')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={retrieveData}
                style={{
                    background: 'blue',
                    padding: '8px',
                    borderRadius: 5,
                    border: 0,
                    color: 'white',
                    margin: '5px'
                }}>Retrieve data to firestore</button>
        </>
    )
}

export default ReadFromCloudFirestore;