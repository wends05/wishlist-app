const Footer = () => {
  return (
    <div
      className="relative h-[80vh] min-h-[500px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-20 flex h-[300px] w-full flex-col justify-end gap-4 p-4">
        <h1 className="text-center">Wishlist App</h1>
        <h5 className="text-secondary-500 text-center">
          Created with Next.js and Convex
        </h5>
        
      </div>
      <div className="absolute top-0 h-28 w-full rounded-b-3xl bg-neutral-700" />
    </div>
  );
};

export default Footer;
