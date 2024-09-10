import { Link } from "react-router-dom"

const ButtonSection = () => {
    return (
        <div className="flex flex-col items-center space-y-6 mb-8">
            <h2 className="text-2xl font-semibold">Welcome to the Link Shortener App</h2>
            <div className="flex space-x-4">
                <Link to="/shorten">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                        Create Short URL
                    </button>
                </Link>
                <Link to="/original_url">
                    <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
                        Check Code
                    </button>
                </Link>
            </div>
        </div>
    )

}

export default ButtonSection;