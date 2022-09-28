import { Link } from 'react-router-dom';
import './category-item.styles.scss';

const CategoryItem = ({ category: { imageUrl, title, route } }) => (
    <Link to={route} className="category-container">
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }} />

        <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
        </div>
    </Link>)

export default CategoryItem;