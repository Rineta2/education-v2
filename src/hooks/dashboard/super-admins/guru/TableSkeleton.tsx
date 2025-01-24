export const TableSkeleton = () => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-2">
                        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="border p-2">
                        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="border p-2">
                        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="border p-2">
                        <div className="animate-pulse h-6 w-16 bg-gray-200 rounded-full mx-auto"></div>
                    </td>
                    <td className="border p-2">
                        <div className="flex gap-2 justify-center">
                            <div className="animate-pulse h-7 w-14 bg-gray-200 rounded"></div>
                            <div className="animate-pulse h-7 w-16 bg-gray-200 rounded"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};