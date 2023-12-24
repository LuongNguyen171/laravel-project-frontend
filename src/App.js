import './App.css';

import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRouters } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import axios from 'axios';

function App() {
    useEffect(() => {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute('content');
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) Layout = Fragment;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
