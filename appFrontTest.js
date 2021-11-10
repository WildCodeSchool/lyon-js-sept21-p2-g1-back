import { useEffect, useState } from 'react';
import axios from 'axios';
import { text } from 'express';
import { TextArea } from 'express';

function App() {
    const [userList, updateUserList] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserMessage, setNewUserMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/users', {
                name: newUserName,
                message: newUserMessage,
            })
            .then((resp) => {
                updateUserList([...userList, resp.data]);
            });
    };

    const handleNameChange = (e) => {
        setNewUserName(e.target.value);
    };
    const handleMessageChange = (e) => {
        setNewUserMessage(e.target.value);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/users').then((response) => {
            updateUserList(response.data);
        });
    }, []);

    return (
        <div>
            <div className="lg:h-40">
                <img className="object-cover h-48 w-full" src={img} alt="parking" />
            </div>
            <button
                className="bg-yellow-500  text-black -mt-56 ml-8 font-bold py-4 px-8 rounded-full"
                type="button"
            >
                Avis
            </button>
            <form className="flex flex-col  ">
                <p className=" text-center font-semibold ">
                    “Merci de bien vouloir nous donner 5 min.de votre temps pour évaluer
                    l'application.🧐 ”
                </p>
            </form>
            <div className="input flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="flex w-full px-5 rounded-3xl border-gray-400 sm:w-full md:w-7/12 ">
                    <label htmlFor='add-name'>
                        Nom: {' '}
                        <input
                            control={text}
                            placeholder="Your name..."
                            type='text'
                            id='add-name'
                            required
                            value={newUserName}
                            onChange={handleNameChange}
                        />
                    </label>
                </form>

                <div className="flex m-8 justify-center items-center">
                    <RatingStar />
                </div>

                <form onSubmit={handleSubmit} className="flex m-8 w-full px-5 rounded-3xl border-gray-400 sm:w-full md:w-7/12">
                    <label htmlFor='add-message'>
                        Message: {' '}
                        <input
                            className="flex m-8 w-full px-5 rounded-3xl border-gray-400 sm:w-full md:w-7/12"
                            control={TextArea}
                            placeholder="Tell us more about us..."
                            type='textarea'
                            id='add-message'
                            required
                            value={newUserMessage}
                            onChange={handleMessageChange}
                        />
                    </label>
                    <Form.Field
                        className="flex m-8 flex-col items-center w-full px-5 rounded-3xl border-gray-400 sm:w-full md:w-11/12 "
                        control={Checkbox}
                        label="I agree to the Terms and Conditions"
                    />
                    <Form.Field control={Button}>Submit</Form.Field>
                </form>
            </div>
        </div>
    );
}

export default App;