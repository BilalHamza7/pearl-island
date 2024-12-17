import Skeleton from 'react-loading-skeleton'

export default function CardSkeleton() {

    return (
        <div className="grid grid-cols-5 gap-7 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    {/* Skeleton for Image */}
                    <div className="mb-4 bg-gray-300 h-52 w-full"></div>

                    {/* Skeleton for Title */}
                    <div className="w-full flex gap-3 flex-col items-center">
                        <div className="bg-gray-300 h-6 w-44"></div>
                        <div className="bg-gray-300 h-6 w-12"></div>
                    </div>
                </div>
            ))}
        </div>
    )
};
