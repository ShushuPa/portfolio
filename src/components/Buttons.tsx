export default function Button({label}: {label: string}) {
 return (
        <button type="button" className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">{label}</button>
    );   
};
