import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesStart } from "../../store/categories/categories.actions";
import { useDispatch } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = lazy(() => import("../categories-preview/categories-preview.component"));
const Category = lazy(() => import("../category/category.component"));


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch])

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<Category />} />
            </Routes>
        </Suspense>
    )
}

export default Shop;