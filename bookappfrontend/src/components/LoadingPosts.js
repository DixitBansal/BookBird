export const LoadingCard = () => {
    return (
        <div className="w-full rounded overflow-hidden shadow-lg p-2">
            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
            <div className="px-6 py-4 items-center">
                <div className="font-regular text-xl mb-2 w-20 h-4 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
}

export const LoadingPosts = ({className}) => {
    const loadPages = [1];
    return (
        <div className={`content-start ${className}`}>
            {loadPages.map(num => { return <LoadingCard key={num} /> })}
        </div>
    );
}