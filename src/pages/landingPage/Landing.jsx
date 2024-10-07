import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate()


    return (
        <div className="w-full h-screen flex flex-row">
            <section className="w-1/2 h-full flex flex-col justify-center items-center bg-gray-100 gap-y-10">
                <h1 className="text-2xl font-bold">Look for the events</h1>
                <Button onClick={() => navigate('/events')} >click here list the events</Button>
            </section>
            <section className="w-1/2 h-full flex flex-col justify-center items-center bg-gray-200 gap-y-10">
                <h1 className="text-2xl font-bold">Host your event and manage</h1>
                <Button onClick={() => navigate('/admin')}>click here to manage event</Button>
            </section>
        </div>
    );
}


export default Landing;