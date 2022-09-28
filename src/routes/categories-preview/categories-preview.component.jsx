import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selectors";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <>
            {
                isLoading ? <Spinner /> :
                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} products={products} title={title} />
                    })
            }

        </>

    )
}

export default CategoriesPreview;