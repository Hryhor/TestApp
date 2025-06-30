import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
    return(
        <div>
            <Sidebar />
            
            <div className='main-area'>
                <div className='container'>
                    Home
                </div>
            </div>
        </div>
    )
}

export default Home;