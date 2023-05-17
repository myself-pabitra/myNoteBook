import Notes from '../components/Notes'
export const Home = () => {

    return (
        <>

            <div>
                <div className="container my-3" style={{ maxWidth: "750px" }}>
                    <form>
                        <h2 className='text-center text-primary'>Add New Note</h2>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Title of your note here..." />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">Save Note</button>
                        </div>
                    </form>
                </div>

                <Notes />

            </div>
        </>
    );
} 
