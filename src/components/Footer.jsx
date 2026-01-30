const Footer = () => {
    return (
        <footer className="py-12 bg-comic-black text-center text-comic-white border-t-4 border-comic-black relative z-20 snap-start">
            <h2 className="text-4xl font-comic mb-4">VIVEK MUNNANGI</h2>
            <p className="font-comic text-xl text-comic-white/60 mb-8">BUILDING COOL STUFF.</p>
            <p className="font-body text-sm text-comic-white/40">&copy; {new Date().getFullYear()} VIVEK MUNNANGI. ALL RIGHTS RESERVED.</p>
        </footer>
    );
};

export default Footer;
