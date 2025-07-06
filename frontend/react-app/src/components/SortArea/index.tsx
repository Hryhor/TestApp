const SortArea: React.FC = () => {
    return(
        <div className="sort-area">
            <ul className="sort-list">
                <li>
                    <button className="sort-btn btn-sort-byName">Sort by Name</button>
                </li>
                <li>
                    <button className="sort-btn btn-sort-byEmail">Sort by Email</button>
                </li>
                <li>
                    <button className="sort-btn btn-sort-byDate">Sort by Date</button>
                </li>
            </ul>
        </div>
    );
}

export default SortArea;