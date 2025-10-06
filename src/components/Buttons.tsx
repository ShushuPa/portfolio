export default function Button({label}: {label: string}) {
 return (
        <button type="button" className="px-4 py-2 bg-sky-950 text-white font-bold rounded hover:bg-sky-800 transition m-8">{label}</button>
    );   
};
