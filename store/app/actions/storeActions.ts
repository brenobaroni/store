

export const getProducstList = async (category: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`,)
        .then((res) => res.json())
        .catch(() => []);


    return response;


}