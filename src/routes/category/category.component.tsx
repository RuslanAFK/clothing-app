import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selectors";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])

    return (
        <>
            <h2 className="shop-category-title">{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner /> :
                    <div className="shop-category-container">
                        {!products && <h1>Loading...</h1>}
                        {products &&
                            products.map(product => (<ProductCard key={product.id} product={product} />))
                        }
                    </div>
            }

        </>

    )
}

export default Category;