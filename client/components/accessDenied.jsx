
export default function AccessDenied() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md py-8 px-4 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-4xl font-bold text-red-600">🚫 Access Denied 🚫</h1>
                <p className="mt-4 text-gray-600">Oops! Seems like you stumbled into a forbidden zone. Did you forget your secret access code?</p>
                <p className="mt-2 text-gray-600">Don't worry, even superheroes have their off days. Maybe try again when you've got your cape on straight!</p>
                <img className="mt-8 mx-auto" src="https://media.giphy.com/media/fDO2Nk0ImzvvW/giphy.gif" alt="Access Denied" />
            </div>
        </div>
    );
}
