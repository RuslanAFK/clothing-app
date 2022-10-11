import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryType } from '../../routes/home/home.components';
import './category-item.styles.scss';

type CategoryItemProps = {
    category: CategoryType;
}

const CategoryItemComponent: FC<CategoryItemProps> = ({ category }) => (
    <Link to={category.route} className="category-container">
        <div className="background-image" style={{
            backgroundImage: `url(${category.imageUrl})`
        }} />

        <div className="category-body-container">
            <h2>{category.title}</h2>
            <p>Shop Now</p>
        </div>
    </Link>)

export default CategoryItemComponent;