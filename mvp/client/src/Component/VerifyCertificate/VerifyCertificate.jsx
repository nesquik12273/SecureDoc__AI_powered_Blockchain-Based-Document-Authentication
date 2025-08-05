import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const VerifyCertificate = () => {
    const [visible, setVisible] = useState(false);
    const [visibleR, setVisibleR] = useState(false);
    const [report, setReport] = useState([]);
    const [newUser, setNewUser] = useState({
        number: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewUser({
            ...newUser,
            [name]: value,
        });
    }
    let navigate = useNavigate();
    const userSubmit = (e) => {
        e.preventDefault();
        const found = report.some(item => item._id === newUser.number);
        if (found) {

            setVisible(true);

        } else {
            setVisibleR(true);
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/Upload/VerifyReportPost', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => setReport(res))
    }, []);
    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(() => {
                setVisible(false);
                navigate(`/fullimage/${newUser.number}`, { replace: true });
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [visible]);

    useEffect(() => {
        if (visibleR) {
            const timeout = setTimeout(() => {
                setVisibleR(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [visibleR]);

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
            <div
                className={`fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end transition-all duration-500 ${visible ? '' : 'hidden'
                    }`}
            >
                <div className="max-w-xl w-full bg-green-400 text-white shadow-lg rounded-lg pointer-events-auto h-10 text-center ">
                    It's Correct Document
                </div>
            </div>
            <div
                className={`fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end transition-all duration-500 ${visibleR ? '' : 'hidden'
                    }`}
            >
                <div className="max-w-xl w-full bg-red-400 text-white shadow-lg rounded-lg pointer-events-auto h-10 text-center ">
                    Fake Document
                </div>
            </div>
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-5 bg-white md:flex-1">
                    <form onSubmit={userSubmit} className="flex flex-col space-y-5">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Verify Document</h3>
                        <input
                            type="text"
                            name="number"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            value={newUser.number}
                            onChange={handleChange}
                            placeholder="Number"
                            required
                        />
                        <button type="submit" name="reg" className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-theam-color rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                            <b>Check Document</b>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
