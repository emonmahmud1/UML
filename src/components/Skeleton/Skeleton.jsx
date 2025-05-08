
const Skeleton = ({type}) => {
  return (
    <div className="w-full flex gap-4">
      <div className={ `skeleton w-30 h-10`} />
      <div className={ `skeleton flex-1 h-10`} />
      <div className={ `skeleton w-5 h-10`} />
    </div>
  );
};

export default Skeleton;
