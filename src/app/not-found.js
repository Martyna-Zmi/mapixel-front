import Link from 'next/link';
import {PiFileMagnifyingGlass} from "react-icons/pi";

export default function NotFound() {
    return (
        <div className="flex justify-center text-center">
            <div className="mt-16">
                <h1 className="text-7xl py-3">404 - Not found</h1>
                <div className="flex justify-center">
                    <PiFileMagnifyingGlass size={70}/>
                </div>
                <p className="py-3">Przepraszamy, nie znaleźliśmy tego, czego szukasz...</p>
                <Link className="text-green-800 font-bold underline" href="/main">Powrót do strony głównej</Link>
            </div>
        </div>
    );
}