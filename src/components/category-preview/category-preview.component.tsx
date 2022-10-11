import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../store/categories/categories.types';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                        .map(product =>
                            <ProductCard key={product.id} product={product} />
                        )
                }
            </div>
        </div>
    )
}

export default CategoryPreview;