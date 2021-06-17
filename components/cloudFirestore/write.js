import firebase from 'firebase/app';
import 'firebase/firestore';

const data = {
    id: "26739163-442e-41bf-9989-01f437202b20",
    name: "Thet Htet Aung",
    photo: "https://cx-devx-cdn-uploaded-images.s3.ap-southeast-1.amazonaws.com/profile-images/338b787a-ed53-4cc2-b4cd-32845ad6fe1e.jpg",
    gender: "Male",
    dob: "1998-06-19T00:00:00Z",
    addresses: [
        {
            "addressL1": "",
            "city": "Shwebo",
            "state": "Sagaing",
            "country": "MM",
            "geolocation": "geo",
            "isCurrent": true
        }
    ],
    "about": "SoftwareDeveloper@connacx",
    "nationality": "MM"
};

const WriteToCloudFirestore = () => {
    const sendData = () => {
        try {
            firebase.
                firestore()
                .collection('myCollection')
                .doc('my_document2')
                .set(data)
                .then(alert('Data was successfully sent to cloud firestore!'))
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={sendData}
                style={{
                    background: 'blue',
                    padding: '8px',
                    borderRadius: 5,
                    border: 0,
                    margin: '5px',
                    color: 'white'
                }}>Send data to firestore</button>
        </>
    )
}

export default WriteToCloudFirestore;