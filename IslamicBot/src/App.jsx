import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";

function About() {
    return (
        <div className="text-center p-8">
            <h2 className="text-4xl font-bold text-gray-800">About Page</h2>
            <p className="mt-4 text-gray-600">Learn more about us here.</p>
        </div>
    );
}

function Contact() {
    return (
        <div className="text-center p-8">
            <h2 className="text-4xl font-bold text-gray-800">Contact Page</h2>
            <p className="mt-4 text-green-400">Get in touch with us today!</p>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto rounded-md bg-slate-500">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
