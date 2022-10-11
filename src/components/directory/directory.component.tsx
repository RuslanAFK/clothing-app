import './directory.styles.scss';
import CategoryItemComponent from '../category-item/category-item.component';
import { CategoryType } from '../../routes/home/home.components';
import { FC } from 'react';

type DirectoryProps = {
    categories: CategoryType[];
}

const Directory: FC<DirectoryProps> = ({ categories }) => (
    <div className="categories-container">
        {categories.map(category => (<CategoryItemComponent key={category.id} category={category} />)
        )}
    </div>
)

export default Directory;