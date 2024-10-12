export default function TotalProducts() {
    return (
        <div className="flex flex-col gap-5">
            <p className="title_text">Products In Stock</p>
            <table className="w-96 rounded-lg overflow-hidden border-b">
                <thead className="text-left bg-gray-200 text-2xl font-montserrat tracking-widest">
                    <tr>
                        <th className="p-3 text-left">Total</th>
                        <th className="p-3 text-right">50</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 text-2xl font-montserrat tracking-widest">
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Sapphire</td>
                        <td className="p-3 text-right">10</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Padparadscha</td>
                        <td className="p-3 text-right">5</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Ruby</td>
                        <td className="p-3 text-right">4</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Spinel</td>
                        <td className="p-3 text-right">6</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Alexandrite</td>
                        <td className="p-3 text-right">3</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Garnet</td>
                        <td className="p-3 text-right">5</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Aquamarine</td>
                        <td className="p-3 text-right">2</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Chrysoberyl</td>
                        <td className="p-3 text-right">4</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Emerald</td>
                        <td className="p-3 text-right">6</td>
                    </tr>
                    <tr className=" font-light p-3 border-b border-gray-300">
                        <td className="p-3 text-left">Others</td>
                        <td className="p-3 text-right">5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};
